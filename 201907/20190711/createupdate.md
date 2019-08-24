# ReactDOM.render to scheduleWork

- 创建ReactRoot，并且根据情况调用root.legacyrenderSubtreeIntoContainer,这个是遗留的 API 将来应该会删除，根据ReactDOM.render的调用情况也可以发现parentComponent是写死的null

```JS
    const ReactDOM: Object = {
        createPortal,
        render(
        element: React$Element<any>,
        container: DOMContainer,
        callback: ?Function,) {
            /**
             * parentComponent: ?React$Component<any, any>,
             * children: ReactNodeList,
             * container: DOMContainer,
             * forceHydrate: boolean,
             * callback: ?Function,
             */
            return legacyRenderSubtreeIntoContainer(
            null,
            element,
            container,
            false,
            callback,
            );
        },
    }
    /**
     * 
     * @param {*} parentComponent 
     * @param {*} children 
     * @param {*} container 
     * @param {*} forceHydrate 
     * @param {*} callback 
     */
    function legacyRenderSubtreeIntoContainer( //渲染子树到容器中
        parentComponent: ?React$Component<any, any>,
        children: ReactNodeList,
        container: DOMContainer,
        forceHydrate: boolean,
        callback: ?Function,
        ) {
        // TODO: Without `any` type, Flow says "Property cannot be accessed on any
        // member of intersection type." Whyyyyyy.
        let root: _ReactSyncRoot = (container._reactRootContainer: any);
        let fiberRoot;
        if (!root) {
            // Initial mount 初始化根容器节点 fiberRoot current =>rootFiber
            root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
            container,
            forceHydrate,
            );
            fiberRoot = root._internalRoot;
            if (typeof callback === 'function') {
            const originalCallback = callback;
            callback = function() {
                const instance = getPublicRootInstance(fiberRoot);
                originalCallback.call(instance);
            };
            }
            // Initial mount should not be batched.
            unbatchedUpdates(() => {
                updateContainer(children, fiberRoot, parentComponent, callback);
            });
        } else {
            fiberRoot = root._internalRoot;
            if (typeof callback === 'function') {
            const originalCallback = callback;
            callback = function() {
                const instance = getPublicRootInstance(fiberRoot);
                originalCallback.call(instance);
            };
            }
            // Update
            updateContainer(children, fiberRoot, parentComponent, callback);
        }
        return getPublicRootInstance(fiberRoot);
    }
```
- 首先会创建ReactRoot对象，然后调用updateContainer方法
- 创建ReactRoot的时候会调用legacyCreateRootFromDOMContainer创建FiberRoot，在后期调度更新的过程中这个节点非常重要

```JS
    function legacyCreateRootFromDOMContainer(
        container: DOMContainer,
        forceHydrate: boolean,
    ): _ReactSyncRoot {
        const shouldHydrate =
            forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
        // First clear any existing content.
        if (!shouldHydrate) {
            let warned = false;
            let rootSibling;
            while ((rootSibling = container.lastChild)) {
            if (__DEV__) {
                if (
                !warned &&
                rootSibling.nodeType === ELEMENT_NODE &&
                (rootSibling: any).hasAttribute(ROOT_ATTRIBUTE_NAME)
                ) {
                warned = true;
                warningWithoutStack(
                    false,
                    'render(): Target node has markup rendered by React, but there ' +
                    'are unrelated nodes as well. This is most commonly caused by ' +
                    'white-space inserted around server-rendered markup.',
                );
                }
            }
            container.removeChild(rootSibling);
            }
        }
        // Legacy roots are not batched.
        return new ReactSyncRoot(container, LegacyRoot, shouldHydrate);
    }
```

- 根据container同步创建ReactRoot
  
```JS
    /**
     * 
     * @param {*} container 根容器 #root
     * @param {*} tag 根标签 1
     * @param {*} hydrate 是否需要调和 false
     */
    function ReactSyncRoot( //同步创建根节点
    container: DOMContainer,
    tag: RootTag, 
    hydrate: boolean,
    ) {
    // Tag is either LegacyRoot or Concurrent Root
    const root = createContainer(container, tag, hydrate);
    this._internalRoot = root;
    }
```

- createContainer创建fiberRoot
  
```JS
    //react-master\packages\react-reconciler\src\ReactFiberRoot.js
    function createContainer(
    containerInfo: Container,
    tag: RootTag,
    hydrate: boolean,
    ): OpaqueRoot {
    return createFiberRoot(containerInfo, tag, hydrate);
    }
```

- 创建fiberRoot和rootFiber

```js
    /**
     * 
     * @param {*} containerInfo 根容器 #root
     * @param {*} tag 根标签 1
     * @param {*} hydrate 是否需要调和 false
     */
    export function createFiberRoot( //根据#root节点创建fiber的根节点 fiberRoot
    containerInfo: any, 
    tag: RootTag,
    hydrate: boolean,
    ): FiberRoot {
        //根据根节点root创建fiberRoot
    const root: FiberRoot = (new FiberRootNode(containerInfo, tag, hydrate): any);

    // Cyclic construction. This cheats the type system right now because
    // stateNode is any.
    const uninitializedFiber = createHostRootFiber(tag);
    root.current = uninitializedFiber;
    uninitializedFiber.stateNode = root;

    /**
     * fiberRoot =>current=rootFiber
     */
    return root;
    }
```

- fiberRoot的结构

```js
    function FiberRootNode(containerInfo, tag, hydrate) {
        this.tag = tag; //根节点类型
        this.current = null;  // 当前应用对应的Fiber对象，是Root Fiber
        this.containerInfo = containerInfo;// root节点，render方法接收的第二个参数
        this.pendingChildren = null;  // 只有在持久更新中会用到，也就是不支持增量更新的平台，react-dom不会用到
        this.pingCache = null;
        this.finishedExpirationTime = NoWork;
        this.finishedWork = null;
        this.timeoutHandle = noTimeout;
        this.context = null;
        this.pendingContext = null;
        this.hydrate = hydrate;
        this.firstBatch = null;
        this.callbackNode = null;
        this.callbackExpirationTime = NoWork;
        this.firstPendingTime = NoWork;
        this.lastPendingTime = NoWork;
        this.pingTime = NoWork;

        if (enableSchedulerTracing) {
            this.interactionThreadID = unstable_getThreadID();
            this.memoizedInteractions = new Set();
            this.pendingInteractionMap = new Map();
        }
    }
```

- 创建rootFiber及结构

```js
    /**
     * 
     * @param {*} tag 根节点类型
     */
    export function createHostRootFiber(tag: RootTag): Fiber { //根据节点类型创建fiber
    let mode; 
    if (tag === ConcurrentRoot) {
        mode = ConcurrentMode | BatchedMode | StrictMode;
    } else if (tag === BatchedRoot) {
        mode = BatchedMode | StrictMode;
    } else {
        mode = NoMode;
    }

    if (enableProfilerTimer && isDevToolsPresent) {
        // Always collect profile timings when DevTools are present.
        // This enables DevTools to start capturing timing at any point–
        // Without some nodes in the tree having empty base times.
        mode |= ProfileMode;
    }

    return createFiber(HostRoot, null, null, mode);
    }
    /**
     * 
     * @param {*} tag 标签
     * @param {*} pendingProps 
     * @param {*} key 
     * @param {*} mode 类型
     */
    const createFiber = function(
    tag: WorkTag,
    pendingProps: mixed,
    key: null | string,
    mode: TypeOfMode,
    ): Fiber {
    // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
    return new FiberNode(tag, pendingProps, key, mode);
    };

    function FiberNode(
    tag: WorkTag,
    pendingProps: mixed,
    key: null | string,
    mode: TypeOfMode,
    ) {
            // Instance
            this.tag = tag; // 标记不同的组件类型
            this.key = key;  // ReactElement里面的key
            this.elementType = null;    // ReactElement.type，也就是我们调用`createElement`的第一个参数
            this.type = null;  // 异步组件resolved之后返回的内容，一般是`function`或者`class`
            this.stateNode = null; // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）

            // Fiber
            this.return = null;// 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
            this.child = null;  // 指向自己的第一个子节点
            this.sibling = null;// 兄弟节点的return指向同一个父节点
            this.index = 0;

            this.ref = null; // ref属性

            this.pendingProps = pendingProps;  // 新的变动带来的新的props
            this.memoizedProps = null; // 上一次渲染完成之后的props
            this.updateQueue = null; // 该Fiber对应的组件产生的Update会存放在这个队列里面
            this.memoizedState = null;  // 上一次渲染的时候的state
            this.dependencies = null;

            this.mode = mode;

            // Effects
            this.effectTag = NoEffect;  // 用来记录Side Effect
            this.nextEffect = null;  // 单链表用来快速查找下一个side effect

            this.firstEffect = null;// 子树中第一个side effect
            this.lastEffect = null; // 子树中最后一个side effect

            this.expirationTime = NoWork;   // 代表任务在未来的哪个时间点应该被完成
            this.childExpirationTime = NoWork;  // 快速确定子树中是否有不在等待的变化

            this.alternate = null;// 在渲染完成之后他们会交换位置

    }
```

- updateContainer 计算expirationTime,用这个时间去更新container
  
```js
    export function updateContainer(
    element: ReactNodeList,
    container: OpaqueRoot,
    parentComponent: ?React$Component<any, any>,
    callback: ?Function,
    ): ExpirationTime {
    const current = container.current; //fiberRoot对应的rootFiber
    const currentTime = requestCurrentTime(); //Date().now()
    const suspenseConfig = requestCurrentSuspenseConfig();
    const expirationTime = computeExpirationForFiber(
        currentTime,
        current,
        suspenseConfig,
    );
    return updateContainerAtExpirationTime(
        element,
        container,
        parentComponent,
        expirationTime,
        suspenseConfig,
        callback,
    );
    }
```

- updateContainerAtExpirationTime 获取context 开始调度

```js
    export function updateContainerAtExpirationTime(
    element: ReactNodeList,
    container: OpaqueRoot,
    parentComponent: ?React$Component<any, any>,
    expirationTime: ExpirationTime,
    suspenseConfig: null | SuspenseConfig,
    callback: ?Function,
    ) {
    // TODO: If this is a nested container, this won't be the root.
    const current = container.current;

    const context = getContextForSubtree(parentComponent);
    if (container.context === null) {
        container.context = context;
    } else {
        container.pendingContext = context;
    }

    return scheduleRootUpdate(
        current,
        element,
        expirationTime,
        suspenseConfig,
        callback,
    );
    }
```

- 首先要生成一个update，不管你是setState还是ReactDOM.render造成的 React 更新，都会生成一个叫update的对象，并且会赋值给Fiber.updateQueue
- 然后就是调用scheduleWork。注意到这里之前setState和ReactDOM.render是不一样，
- 但进入schedulerWork之后，就是任务调度的事情了，跟之前你是怎么调用的没有任何关系

```js
    function scheduleRootUpdate(
    current: Fiber,
    element: ReactNodeList,
    expirationTime: ExpirationTime,
    suspenseConfig: null | SuspenseConfig,
    callback: ?Function,
    ) {
        const update = createUpdate(expirationTime, suspenseConfig);
        // Caution: React DevTools currently depends on this property
        // being called "element".
        update.payload = {element};

        callback = callback === undefined ? null : callback;
        if (callback !== null) {
            warningWithoutStack(
            typeof callback === 'function',
            'render(...): Expected the last optional `callback` argument to be a ' +
                'function. Instead received: %s.',
            callback,
            );
            update.callback = callback;
        }

        if (revertPassiveEffectsChange) {
            flushPassiveEffects();
        }
        enqueueUpdate(current, update);
        scheduleWork(current, expirationTime);

        return expirationTime;
    }
```