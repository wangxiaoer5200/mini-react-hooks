
// 保存状态的数组
const hookStates = []
// 当前索引
let hookIndex = 0

export function useEffect(callback: Function, dependencies: string[]) {
  // 初始调用
  if (!hookStates[hookIndex]) {
    hookStates[hookIndex++] = dependencies
    callback()
  } else {
    // 二次调用
    let lastDependencies = hookStates[hookIndex]
    // 判断依赖项是否和上次相同
    const same = lastDependencies.every((item: string, index: number) => item === dependencies[index])
    /* 
      如果想等，直接 hookIndex++;
      否则，重新赋值并且执行
    */
    if (same) {
      hookIndex++
    } else {
      hookStates[hookIndex++] = dependencies
      callback()
    }
  }
}