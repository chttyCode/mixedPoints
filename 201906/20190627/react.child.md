# react 实现关于children的API

- why
    props.child 是数组，而JS原生有现成的API，为什么React还要实现自身有关Chilrend的API
    ```JS
        const React = {
            Children: {
                map,
                forEach,
                count,
                toArray,
                only,
            },
            ....
        }
    ```
- how
    ```JS
    function mapChildren(children, func, context) {
        if (children == null) {
            return children
        }
        const result = []
        mapIntoWithKeyPrefixInternal(children, result, null, func, context)
        return result
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
        let escapedPrefix = ''
        if (prefix != null) {
            escapedPrefix = escapeUserProvidedKey(prefix) + '/'
        }
        const traverseContext = getPooledTraverseContext(
            array,
            escapedPrefix,
            func,
            context,
        )
        traverseAllChildren(children, mapSingleChildIntoContext, traverseContext)
        releaseTraverseContext(traverseContext)
    }
    ```
    getPooledTraverseContext就是从pool里面找一个对象，releaseTraverseContext会把当前的context对象清空然后放回到pool中。
    ```JS
    const POOL_SIZE = 10;
    const traverseContextPool = [];
    function getPooledTraverseContext(
    mapResult,
    keyPrefix,
    mapFunction,
    mapContext,
    ) {
        if (traverseContextPool.length) {
            const traverseContext = traverseContextPool.pop();
            traverseContext.result = mapResult;
            traverseContext.keyPrefix = keyPrefix;
            traverseContext.func = mapFunction;
            traverseContext.context = mapContext;
            traverseContext.count = 0;
            return traverseContext;
        } else {
            return {
            result: mapResult,
            keyPrefix: keyPrefix,
            func: mapFunction,
            context: mapContext,
            count: 0,
            };
        }
    }

    function releaseTraverseContext(traverseContext) {
        traverseContext.result = null;
        traverseContext.keyPrefix = null;
        traverseContext.func = null;
        traverseContext.context = null;
        traverseContext.count = 0;
        if (traverseContextPool.length < POOL_SIZE) {
            traverseContextPool.push(traverseContext);
        }
    }
    ```
    那么按照这个流程来看，是不是pool永远都只有一个值呢，毕竟推出之后操作完了就推入了，这么循环着。答案肯定是否的，这就要讲到React.Children.map的一个特性了，那就是对每个节点的map返回的如果是数组，那么还会继续展开，这是一个递归的过程。接下去我们就来看看。
    ```JS
    function traverseAllChildren(children, callback, traverseContext) {
        if (children == null) {
            return 0;
        }

        return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    function traverseAllChildrenImpl(
    children,
    nameSoFar,
    callback,
    traverseContext,
    ) {
        const type = typeof children;

        if (type === 'undefined' || type === 'boolean') {
            // All of the above are perceived as null.
            children = null;
        }

        let invokeCallback = false;

        if (children === null) {
            invokeCallback = true;
        } else {
            switch (type) {
                case 'string':
                case 'number':
                invokeCallback = true;
                break;
                case 'object':
                switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
        }

        if (invokeCallback) {
            callback(
                traverseContext,
                children,
                // If it's the only child, treat the name as if it was wrapped in an array
                // so that it's consistent if the number of children grows.
                nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar,
            );
            return 1;
        }

        let child;
        let nextName;
        let subtreeCount = 0; // Count of children found in the current subtree.
        const nextNamePrefix =
        nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getComponentKey(child, i);
                subtreeCount += traverseAllChildrenImpl(
                child,
                nextName,
                callback,
                traverseContext,
                );
            }
        } else {
            const iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === 'function') {
                if (__DEV__) {
                // Warn about using Maps as children
                if (iteratorFn === children.entries) {
                    warning(
                    didWarnAboutMaps,
                    'Using Maps as children is unsupported and will likely yield ' +
                        'unexpected results. Convert it to a sequence/iterable of keyed ' +
                        'ReactElements instead.',
                    );
                    didWarnAboutMaps = true;
                }
                }

                const iterator = iteratorFn.call(children);
                let step;
                let ii = 0;
                while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getComponentKey(child, ii++);
                subtreeCount += traverseAllChildrenImpl(
                    child,
                    nextName,
                    callback,
                    traverseContext,
                );
                }
            } else if (type === 'object') {
                let addendum = '';
                if (__DEV__) {
                addendum =
                    ' If you meant to render a collection of children, use an array ' +
                    'instead.' +
                    ReactDebugCurrentFrame.getStackAddendum();
                }
                const childrenString = '' + children;
                invariant(
                false,
                'Objects are not valid as a React child (found: %s).%s',
                childrenString === '[object Object]'
                    ? 'object with keys {' + Object.keys(children).join(', ') + '}'
                    : childrenString,
                addendum,
                );
            }
        }
        return subtreeCount;
    }
    ```
    这里就是一层递归了，对于可循环的children，都会重复调用traverseAllChildrenImpl，直到是一个节点的情况，然后调用callback，也就是mapSingleChildIntoContext
    ```JS
    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
        const {result, keyPrefix, func, context} = bookKeeping;

        let mappedChild = func.call(context, child, bookKeeping.count++);
        if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, c => c);
        } else if (mappedChild != null) {
            if (isValidElement(mappedChild)) {
                mappedChild = cloneAndReplaceKey(
                mappedChild,
                // Keep both the (mapped) and old keys if they differ, just as
                // traverseAllChildren used to do for objects as children
                keyPrefix +
                    (mappedChild.key && (!child || child.key !== mappedChild.key)
                    ? escapeUserProvidedKey(mappedChild.key) + '/'
                    : '') +
                    childKey,
                );
            }
            result.push(mappedChild);
        }
    }
    ```
    mapSingleChildIntoContext这个方法其实就是调用React.Children.map(children, callback)这里的callback，就是我们传入的第二个参数，并得到map之后的结果。注意重点来了，如果map之后的节点还是一个数组，那么再次进入mapIntoWithKeyPrefixInternal，那么这个时候我们就会再次从pool里面去context了，而pool的意义大概也就是在这里了，如果循环嵌套多了，可以减少很多对象创建和gc的损
- target
    因为对Children的处理一般在render里面，所以会比较频繁，所以设置一个pool减少声明和gc的开销
