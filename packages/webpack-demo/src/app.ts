// 在这里设置断点 - 模块加载
console.log('📦 加载 app 模块')

interface Message {
  id: number
  text: string
  timestamp: Date
}

// 在这里设置断点 - 数据初始化
const messages: Message[] = [
  { id: 1, text: '欢迎使用 Webpack 调试示例', timestamp: new Date() },
  { id: 2, text: '在代码中设置断点观察执行流程', timestamp: new Date() },
  { id: 3, text: '使用 F10 单步调试', timestamp: new Date() },
]

// 在这里设置断点 - 函数定义
export function createApp(): string {
  console.log('🎨 创建应用界面')

  // 在这里设置断点 - 遍历消息
  const messageList = messages
    .map((msg) => {
      // 在这里设置断点 - 处理每条消息
      return `
        <div class="message">
          <span class="message-id">#${msg.id}</span>
          <span class="message-text">${msg.text}</span>
          <span class="message-time">${msg.timestamp.toLocaleTimeString()}</span>
        </div>
      `
    })
    .join('')

  // 在这里设置断点 - 返回 HTML
  return `
    <div class="app-container">
      <h2>消息列表</h2>
      <div class="messages">
        ${messageList}
      </div>
      <div class="info">
        <p>调试提示：</p>
        <ul>
          <li>在 webpack.config.js 中设置断点调试 Webpack 配置</li>
          <li>在 src/index.ts 中设置断点调试应用入口</li>
          <li>在 src/app.ts 中设置断点调试业务逻辑</li>
          <li>使用 F5 启动调试会话</li>
        </ul>
      </div>
    </div>
  `
}

// 在这里设置断点 - 工具函数
export function formatMessage(msg: Message): string {
  return `[${msg.id}] ${msg.text} (${msg.timestamp.toISOString()})`
}
