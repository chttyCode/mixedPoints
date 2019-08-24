# sheduleWork

- 创建root
- 创建expirationTime
- 进入调度

```JS
    export function scheduleUpdateOnFiber(
    fiber: Fiber,
    expirationTime: ExpirationTime,
    ) {
    checkForNestedUpdates();
    warnAboutInvalidUpdatesOnClassComponentsInDEV(fiber);

    const root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
    if (root === null) {
        warnAboutUpdateOnUnmountedFiberInDEV(fiber);
        return;
    }

    root.pingTime = NoWork; //ob0000

    checkForInterruption(fiber, expirationTime);
    recordScheduleUpdate();

    // TODO: computeExpirationForFiber also reads the priority. Pass the
    // priority as an argument to that function and this one.
    const priorityLevel = getCurrentPriorityLevel();

    if (expirationTime === Sync) {
        if (
        // Check if we're inside unbatchedUpdates
        (executionContext & LegacyUnbatchedContext) !== NoContext &&
        // Check if we're not already rendering
        (executionContext & (RenderContext | CommitContext)) === NoContext
        ) {
        // Register pending interactions on the root to avoid losing traced interaction data.
        schedulePendingInteractions(root, expirationTime);

        // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
        // root inside of batchedUpdates should be synchronous, but layout updates
        // should be deferred until the end of the batch.
        let callback = renderRoot(root, Sync, true);
        while (callback !== null) {
            callback = callback(true);
        }
        } else {
        scheduleCallbackForRoot(root, ImmediatePriority, Sync);
        if (executionContext === NoContext) {
            // Flush the synchronous work now, wnless we're already working or inside
            // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
            // scheduleCallbackForFiber to preserve the ability to schedule a callback
            // without immediately flushing it. We only do this for user-initated
            // updates, to preserve historical behavior of sync mode.
            flushSyncCallbackQueue();
        }
        }
    } else {
        scheduleCallbackForRoot(root, priorityLevel, expirationTime);
    }

    if (
        (executionContext & DiscreteEventContext) !== NoContext &&
        // Only updates at user-blocking priority or greater are considered
        // discrete, even inside a discrete event.
        (priorityLevel === UserBlockingPriority ||
        priorityLevel === ImmediatePriority)
    ) {
        // This is the result of a discrete event. Track the lowest priority
        // discrete update per root so we can flush them early, if needed.
        if (rootsWithPendingDiscreteUpdates === null) {
        rootsWithPendingDiscreteUpdates = new Map([[root, expirationTime]]);
        } else {
        const lastDiscreteTime = rootsWithPendingDiscreteUpdates.get(root);
        if (lastDiscreteTime === undefined || lastDiscreteTime > expirationTime) {
            rootsWithPendingDiscreteUpdates.set(root, expirationTime);
        }
        }
    }
    }
```

-   checkForNestedUpdates 检测循环嵌套

```JS
    // Use these to prevent an infinite loop of nested updates
    const NESTED_UPDATE_LIMIT = 50;
    let nestedUpdateCount: number = 0;
    let rootWithNestedUpdates: FiberRoot | null = null;

    const NESTED_PASSIVE_UPDATE_LIMIT = 50;
    let nestedPassiveUpdateCount: number = 0;

    function checkForNestedUpdates() {
        if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
            nestedUpdateCount = 0;
            rootWithNestedUpdates = null;
            invariant(
            false,
            'Maximum update depth exceeded. This can happen when a component ' +
                'repeatedly calls setState inside componentWillUpdate or ' +
                'componentDidUpdate. React limits the number of nested updates to ' +
                'prevent infinite loops.',
            );
        }
    }
```
- warnAboutInvalidUpdatesOnClassComponentsInDEV DEV 环境下的警告检测

```JS
    // This is split into a separate function so we can mark a fiber with pending
    // work without treating it as a typical update that originates from an event;
    // e.g. retrying a Suspense boundary isn't an update, but it does schedule work
    // on a fiber.
    function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
        // Update the source fiber's expiration time
        if (fiber.expirationTime < expirationTime) {
            fiber.expirationTime = expirationTime;
        }
        let alternate = fiber.alternate;
        if (alternate !== null && alternate.expirationTime < expirationTime) {
            alternate.expirationTime = expirationTime;
        }
        // Walk the parent path to the root and update the child expiration time.
        let node = fiber.return;
        let root = null;
        if (node === null && fiber.tag === HostRoot) {
            root = fiber.stateNode;
        } else {
            while (node !== null) {
            alternate = node.alternate;
            if (node.childExpirationTime < expirationTime) {
                node.childExpirationTime = expirationTime;
                if (
                alternate !== null &&
                alternate.childExpirationTime < expirationTime
                ) {
                alternate.childExpirationTime = expirationTime;
                }
            } else if (
                alternate !== null &&
                alternate.childExpirationTime < expirationTime
            ) {
                alternate.childExpirationTime = expirationTime;
            }
            if (node.return === null && node.tag === HostRoot) {
                root = node.stateNode;
                break;
            }
            node = node.return;
            }
        }

        if (root !== null) {
            // Update the first and last pending expiration times in this root
            const firstPendingTime = root.firstPendingTime;
            if (expirationTime > firstPendingTime) {
            root.firstPendingTime = expirationTime;
            }
            const lastPendingTime = root.lastPendingTime;
            if (lastPendingTime === NoWork || expirationTime < lastPendingTime) {
            root.lastPendingTime = expirationTime;
            }
        }

        return root;
    }
```

- markUpdateTimeFromFiberToRoot 
  - 找到当前Fiber的 root,给更新节点的父节点链上的每个节点的expirationTime设置为这个update的expirationTime，除非他本身时间要小于expirationTime
  - 给更新节点的父节点链上的每个节点的childExpirationTime设置为这个update的expirationTime，除非他本身时间要小于expirationTime

- checkForInterruption DEV环境的检测

```js
    export const enableUserTimingAPI = __DEV__;
    function checkForInterruption(
    fiberThatReceivedUpdate: Fiber,
    updateExpirationTime: ExpirationTime,
    ) {
        if (
            enableUserTimingAPI &&
            workInProgressRoot !== null &&
            updateExpirationTime > renderExpirationTime
        ) {
            interruptedBy = fiberThatReceivedUpdate;
        }
    }
```

- DEV环境执行 recordScheduleUpdate
  
```js
    global.__DEV__ = process.env.NODE_ENV !== 'production';

    global.__DEV__ = NODE_ENV === 'development';

    export const enableUserTimingAPI = __DEV__;

    export function recordScheduleUpdate(): void {
        if (enableUserTimingAPI) {
            if (isCommitting) {
            hasScheduledUpdateInCurrentCommit = true;
            }
            if (
            currentPhase !== null &&
            currentPhase !== 'componentWillMount' &&
            currentPhase !== 'componentWillReceiveProps'
            ) {
            hasScheduledUpdateInCurrentPhase = true;
            }
        }
    }
```

-   TODO: computeExpirationForFiber also reads the priority. Pass the
-    priority as an argument to that function and this one.

```js
    // getCurrentPriorityLevel
    // TODO: Use symbols?
    var ImmediatePriority = 1;
    var UserBlockingPriority = 2;
    var NormalPriority = 3;
    var LowPriority = 4;
    var IdlePriority = 5;

    var currentPriorityLevel = NormalPriority;
    
    function unstable_getCurrentPriorityLevel() {
        return currentPriorityLevel;
    }
```