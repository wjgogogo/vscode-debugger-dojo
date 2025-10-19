import './styles.css'
import { createApp } from './app'

// 在这里设置断点 - 应用入口
console.log('🚀 应用启动...')

// 在这里设置断点 - DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM 已加载')

  const contentElement = document.getElementById('content')

  if (contentElement) {
    // 在这里设置断点 - 渲染应用
    const app = createApp()
    contentElement.innerHTML = app
  }
})

// 在这里设置断点 - 模块热替换
if (module.hot) {
  module.hot.accept('./app', () => {
    console.log('🔄 模块热更新')
  })
}
