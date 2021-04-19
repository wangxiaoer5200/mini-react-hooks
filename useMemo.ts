
const hookStates = []
let hookIndex = 0

export function useMemo(factory: Function, dependencies: string[]) {
  // 如果首次
  if (!hookStates[hookIndex]) {
    const result = factory()
    hookStates[hookIndex++] = [result, dependencies]
    return result
  } else {
    /**
     * 非首次，判断每一个dependency
     * 如果存在一个不等，则重新调用结果
     */
    const [lastResult, lastDependencies] = hookStates[hookIndex]

    const same = lastDependencies.every((item, index) => item === dependencies[index])

    if (same) {
      hookIndex++
      return lastResult
    } else {
      const result = factory()
      hookStates[hookIndex++] = [result, dependencies]
      return result
    }
  }
}