# expirationTime的计算


- 调度之前的expirationTime计算
```JS
    export function requestCurrentTime() {
        if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
            // We're inside React, so it's fine to read the actual time.
            return msToExpirationTime(now());
        }
        // We're not inside React, so we may be in the middle of a browser event.
        if (currentEventTime !== NoWork) {
            // Use the same start time for all updates until we enter React again.
            return currentEventTime;
        }
        // This is the first update since React yielded. Compute a new start time.
        currentEventTime = msToExpirationTime(now());
        return currentEventTime;
    }
    export function updateContainer(
        element: ReactNodeList,
        container: OpaqueRoot,
        parentComponent: ?React$Component<any, any>,
        callback: ?Function,
        ): ExpirationTime {
        const current = container.current; //fiberRoot对应的rootFiber
        const currentTime = requestCurrentTime(); //Date().now() to expiration
        /**
        *   timeoutMs: number,
        *   busyDelayMs?: number,
        *   busyMinDurationMs?: number,
        */
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

- 根据currentTim即当前时间、current=>rootfiber、suspenseConfig=>obj

```JS
    export function computeExpirationForFiber(
            currentTime: ExpirationTime,
            fiber: Fiber,
            suspenseConfig: null | SuspenseConfig,
            ): ExpirationTime {
                const mode = fiber.mode;
                if ((mode & BatchedMode) === NoMode) {
                    return Sync;
                }

                const priorityLevel = getCurrentPriorityLevel();
                if ((mode & ConcurrentMode) === NoMode) {
                    return priorityLevel === ImmediatePriority ? Sync : Batched;
                }

                if ((executionContext & RenderContext) !== NoContext) {
                    // Use whatever time we're already rendering
                    return renderExpirationTime;
                }

                let expirationTime;
                if (suspenseConfig !== null) {
                    // Compute an expiration time based on the Suspense timeout.
                    expirationTime = computeSuspenseExpiration(
                    currentTime,
                    suspenseConfig.timeoutMs | 0 || LOW_PRIORITY_EXPIRATION,
                    );
                } else {
                    // Compute an expiration time based on the Scheduler priority.
                    switch (priorityLevel) {
                    case ImmediatePriority:
                        expirationTime = Sync;
                        break;
                    case UserBlockingPriority:
                        // TODO: Rename this to computeUserBlockingExpiration
                        expirationTime = computeInteractiveExpiration(currentTime);
                        break;
                    case NormalPriority:
                    case LowPriority: // TODO: Handle LowPriority
                        // TODO: Rename this to... something better.
                        expirationTime = computeAsyncExpiration(currentTime);
                        break;
                    case IdlePriority:
                        expirationTime = Never;
                        break;
                    default:
                        invariant(false, 'Expected a valid priority level');
                    }
                }

                // If we're in the middle of rendering a tree, do not update at the same
                // expiration time that is already rendering.
                // TODO: We shouldn't have to do this if the update is on a different root.
                // Refactor computeExpirationForFiber + scheduleUpdate so we have access to
                // the root when we check for this condition.
                if (workInProgressRoot !== null && expirationTime === renderExpirationTime) {
                    // This is a trick to move this update into a separate batch
                    expirationTime -= 1;
                }

                return expirationTime;
            }
```

- 计算expirationTime
- React 中有两种类型的ExpirationTime，一个是Interactive的，另一种是普通的异步。Interactive的比如说是由事件触发的，那么他的响应优先级会比较高因为涉及到交互。
- 在整个计算公式中只有currentTime是变量，也就是当前的时间戳
- eg:   MAGIC_NUMBER_OFFSET -ceiling(MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE,bucketSizeMs / UNIT_SIZE,)
- eg:   
        MAGIC_NUMBER_OFFSET:2
        ceiling(  2-currentTime-5000/10  , 250/10 )
        ceiling(  2-currentTime-500  , 25 )
        ceiling(  -currentTime-498  , 25 )
    =>  (((num / precision) | 0) + 1) * precision; 

- 当前时间加上498然后处以25取整再加1再乘以 25，需要注意的是这里的currentTime是经过msToExpirationTime处理的，也就是((now / 10) | 0) + 2，所以这里的减去2可以无视，而除以 10 取整应该是要抹平 10 毫秒内的误差，当然最终要用来计算时间差的时候会调用expirationTimeToMs恢复回去，但是被取整去掉的 10 毫秒误差肯定是回不去的。

- 简单来说在这里，最终结果是以25为单位向上增加的

```JS
    const UNIT_SIZE = 10
    const MAGIC_NUMBER_OFFSET = 2

    // TODO: This corresponds to Scheduler's NormalPriority, not LowPriority. Update
    // the names to reflect.
    export const LOW_PRIORITY_EXPIRATION = 5000;    
    export const LOW_PRIORITY_BATCH_SIZE = 250;

    //  react-reconciler\src\ReactFiberExpirationTime.js
    export function computeAsyncExpiration(
    currentTime: ExpirationTime,
    ): ExpirationTime {
        return computeExpirationBucket(
            currentTime,
            LOW_PRIORITY_EXPIRATION,
            LOW_PRIORITY_BATCH_SIZE,
        );
    }
    function computeExpirationBucket(
    currentTime,
    expirationInMs,
    bucketSizeMs,
    ): ExpirationTime {
        return (
            MAGIC_NUMBER_OFFSET -
            ceiling(
            MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE,
            bucketSizeMs / UNIT_SIZE,
            )
        );
    }
    // 1 unit of expiration time represents 10ms.
    export function msToExpirationTime(ms: number): ExpirationTime {
    // Always add an offset so that we don't clash with the magic number for NoWork.
    return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
    }

    export function expirationTimeToMs(expirationTime: ExpirationTime): number {
    return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE;
    }

    function ceiling(num: number, precision: number): number {
    return (((num / precision) | 0) + 1) * precision;
    }

    // MAGIC_NUMBER_OFFSET -ceiling(MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE,bucketSizeMs / UNIT_SIZE,)

```


- React 这么设计抹相当于抹平了25ms内计算过期时间的误差，那他为什么要这么做呢？我思考了很久都没有得到答案，直到有一天我盯着代码发呆，看到LOW_PRIORITY_BATCH_SIZE这个字样，bacth，是不是就对应batchedUpdates？再细想了一下，这么做也许是为了让非常相近的两次更新得到相同的expirationTime，然后在一次更新中完成，相当于一个自动的batchedUpdates。
