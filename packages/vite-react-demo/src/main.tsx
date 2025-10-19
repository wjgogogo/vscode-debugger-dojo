import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 在这里设置断点可以调试应用初始化过程
console.log('应用开始初始化...')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log('应用初始化完成')
