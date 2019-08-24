# computeExpirationForFiber

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

- mode 二进制
- 类型通过逻辑运算判断
  
```JS
    export type TypeOfMode = number;

    export const NoMode = 0b0000;
    export const StrictMode = 0b0001;
    // TODO: Remove BatchedMode and ConcurrentMode by reading from the root
    // tag instead
    export const BatchedMode = 0b0010;
    export const ConcurrentMode = 0b0100;
    export const ProfileMode = 0b1000;

```