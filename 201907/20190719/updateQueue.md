# fiber之queue

- 创建维度更新队列，进入调度
  
```JS
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

- 创建队列
  
```JS
    export function createUpdate(
    expirationTime: ExpirationTime,
    suspenseConfig: null | SuspenseConfig,
    ): Update<*> {
        return {
            expirationTime,
            suspenseConfig,

            tag: UpdateState,
            payload: null,
            callback: null,

            next: null,
            nextEffect: null,
        };
    }
```
- Current and work in progress trees
- current tree：在第一次渲染之后，React最终得到一个fiber tree，它反映了用于渲染UI的应用程序的状态。这棵树通常被称为current tree
- workInProgress tree：当React开始处理更新时，它会构建一个所谓的workInProgress tree，它反映了要刷新到屏幕的未来状态
- 所有work都在workInProgress tree中的fiber上执行。
- 当React遍历current tree时，对于每个现有fiber节点，它会使用render方法返回的React元素中的数据创建一个备用(alternate)fiber节点
- 这些节点用于构成workInProgress tree(备用tree)。处理完更新并完成所有相关工作后，React将备用tree刷新到屏幕。一旦这个workInProgress tree在屏幕上呈现，它就会变成current tree。
```JS
    export function enqueueUpdate<State>(fiber: Fiber, update: Update<State>) {
        // Update queues are created lazily.
        const alternate = fiber.alternate;
        let queue1;
        let queue2;
        if (alternate === null) {
            // There's only one fiber.
            queue1 = fiber.updateQueue;
            queue2 = null;
            if (queue1 === null) {
            queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
            }
        } else {
            // There are two owners.
            queue1 = fiber.updateQueue;
            queue2 = alternate.updateQueue;
            if (queue1 === null) {
            if (queue2 === null) {
                // Neither fiber has an update queue. Create new ones.
                queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
                queue2 = alternate.updateQueue = createUpdateQueue(
                alternate.memoizedState,
                );
            } else {
                // Only one fiber has an update queue. Clone to create a new one.
                queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
            }
            } else {
            if (queue2 === null) {
                // Only one fiber has an update queue. Clone to create a new one.
                queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
            } else {
                // Both owners have an update queue.
            }
            }
        }
        if (queue2 === null || queue1 === queue2) {
            // There's only a single queue.
            appendUpdateToQueue(queue1, update);
        } else {
            // There are two queues. We need to append the update to both queues,
            // while accounting for the persistent structure of the list — we don't
            // want the same update to be added multiple times.
            if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
            // One of the queues is not empty. We must add the update to both queues.
            appendUpdateToQueue(queue1, update);
            appendUpdateToQueue(queue2, update);
            } else {
            // Both queues are non-empty. The last update is the same in both lists,
            // because of structural sharing. So, only append to one of the lists.
            appendUpdateToQueue(queue1, update);
            // But we still need to update the `lastUpdate` pointer of queue2.
            queue2.lastUpdate = update;
            }
        }
    }
```

- fiber.updateQueue 是个单链表的结果，appendUpdateToQueue提供维护单链表的方法
  
```JS
    function appendUpdateToQueue<State>(
    queue: UpdateQueue<State>,
    update: Update<State>,
    ) {
        // Append the update to the end of the list.
        if (queue.lastUpdate === null) {
            // Queue is empty
            queue.firstUpdate = queue.lastUpdate = update;
        } else {
            queue.lastUpdate.next = update;
            queue.lastUpdate = update;
        }
    }
```

- 再维护好 updateQueue 之后就会进入统一的scheduleWork工作了