import { useState, useEffect } from 'react'

interface CounterProps {
  initialCount?: number
}

function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount)
  const [history, setHistory] = useState<number[]>([initialCount])

  // 在这里设置断点，观察副作用的执行
  useEffect(() => {
    console.log('计数器值改变:', count)
    document.title = `计数: ${count}`
  }, [count])

  // 在这里设置断点，观察状态更新过程
  const increment = () => {
    const newCount = count + 1
    console.log('增加计数:', count, '->', newCount)
    setCount(newCount)
    setHistory([...history, newCount])
  }

  const decrement = () => {
    const newCount = count - 1
    console.log('减少计数:', count, '->', newCount)
    setCount(newCount)
    setHistory([...history, newCount])
  }

  const reset = () => {
    console.log('重置计数')
    setCount(initialCount)
    setHistory([initialCount])
  }

  // 条件断点示例：可以设置条件 count > 5
  const multiplyByTwo = () => {
    const newCount = count * 2
    console.log('乘以2:', count, '->', newCount)
    setCount(newCount)
    setHistory([...history, newCount])
  }

  return (
    <div className="counter">
      <div className="counter-display">
        <h3>当前计数: {count}</h3>
      </div>

      <div className="counter-controls">
        <button onClick={decrement}>-1</button>
        <button onClick={increment}>+1</button>
        <button onClick={multiplyByTwo}>×2</button>
        <button onClick={reset}>重置</button>
      </div>

      <div className="counter-history">
        <h4>历史记录:</h4>
        <div className="history-list">
          {history.map((value, index) => (
            <span key={index} className="history-item">
              {value}
              {index < history.length - 1 && ' → '}
            </span>
          ))}
        </div>
      </div>

      <div className="debug-hint">
        <p>💡 在 increment/decrement 函数中设置断点，观察状态更新</p>
        <p>💡 在 useEffect 中设置断点，观察副作用执行时机</p>
        <p>💡 尝试设置条件断点: count {'>'} 5</p>
      </div>
    </div>
  )
}

export default Counter
