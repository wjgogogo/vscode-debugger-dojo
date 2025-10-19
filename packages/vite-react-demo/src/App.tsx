import { useState } from 'react'
import Counter from './components/Counter'
import './App.css'

function App() {
  const [message, setMessage] = useState('欢迎使用 VSCode Debugger!')

  // 在这里设置断点，观察状态变化
  const handleMessageChange = (newMessage: string) => {
    console.log('消息即将改变:', newMessage)
    setMessage(newMessage)
    console.log('消息已改变')
  }

  // 一个带有复杂逻辑的函数，方便调试
  const calculateFibonacci = (n: number): number => {
    // 在这里设置断点，单步调试递归过程
    if (n <= 1) {
      return n
    }
    const result = calculateFibonacci(n - 1) + calculateFibonacci(n - 2)
    console.log(`fibonacci(${n}) = ${result}`)
    return result
  }

  const handleCalculate = () => {
    const result = calculateFibonacci(8)
    alert(`斐波那契数列第8项: ${result}`)
  }

  return (
    <div className="App">
      <h1>Vite + React 调试示例</h1>

      <div className="card">
        <h2>{message}</h2>
        <button onClick={() => handleMessageChange('消息已更新! 🎉')}>
          更新消息
        </button>
      </div>

      <div className="card">
        <h2>计数器组件</h2>
        <Counter />
      </div>

      <div className="card">
        <h2>算法调试示例</h2>
        <button onClick={handleCalculate}>
          计算斐波那契数列
        </button>
        <p className="hint">
          提示: 在 calculateFibonacci 函数中设置断点，观察递归调用过程
        </p>
      </div>

      <div className="debug-tips">
        <h3>调试技巧:</h3>
        <ul>
          <li>在代码行号左侧点击设置断点</li>
          <li>按 F5 启动调试（Launch 模式）</li>
          <li>或先运行 <code>pnpm dev</code>，然后附加调试器（Attach 模式）</li>
          <li>使用 F10 单步跳过，F11 单步进入</li>
          <li>在调试控制台中可以执行任意 JavaScript 代码</li>
          <li>右键断点可以设置条件断点和日志断点</li>
        </ul>
      </div>
    </div>
  )
}

export default App
