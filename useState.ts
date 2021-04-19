import ReactDOM from 'react-dom';

type InitState = string | number | boolean | Function

interface Hook {
  state: null | InitState;
  dispatch: null | Function;
  next: null | Hook;
}

const Dispatcher = (() => {
  // 判断当前是注册阶段还是更新阶段
  let isMount = true
  // 链表第一个节点
  let firstWorkInProgressHook: Hook | null = null
  // 链表节点
  let workInProgressHook: Hook | null = null

  // 注册阶段
  function mountWorkInProgressHook() {
    // 每次执行都是新的hook
    const hook: Hook = {
      state: null,
      dispatch: null,
      next: null
    }
    if (!firstWorkInProgressHook) {
      firstWorkInProgressHook = workInProgressHook = hook
    } else {
      workInProgressHook!.next = hook
      // workInProgressHook = hook
    }
    return hook
  }

  // 更新阶段
  function updateWorkInProgressHook() {
    // console.log(workInProgressHook)
    // debugger
    let curHook = workInProgressHook
    workInProgressHook = workInProgressHook!.next
    return curHook
  }

  // useState
  function useState(initialState: InitState) {
    let hook: Hook
    // 如果是注册阶段
    if (isMount) {
      hook = mountWorkInProgressHook()!
      hook.state = initialState
    } else {
      // 更新阶段
      hook = updateWorkInProgressHook()!
    }

    hook.dispatch = function (newState: InitState) {
      hook.state = newState
      workInProgressHook = firstWorkInProgressHook
      isMount = false

      // re-render
      scheduleWork()
    }.bind(hook)

    // 返回值和修改值的函数
    return [hook.state, hook.dispatch]
  }

  return {
    useState
  }
})()

function Counter() {
  let [count, setCount] = Dispatcher.useState(1);
  let [age, setAge] = Dispatcher.useState(10);
  return (
    <>
    <p>Clicked { count } times < /p>
      < button onClick = {() => (setCount as Function)((count as number) + 1)
}> Add count < /button>
  < p > Age is { age } </p>
    < button onClick = {() => (setAge as Function)((age as number) + 1)}> Add age < /button>
      < />
  );
}

// do render
function scheduleWork() {
  ReactDOM.render(<Counter />, document.getElementById('root'))
}

scheduleWork()
