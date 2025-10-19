# Next.js 调试示例

这个示例展示了如何在 VSCode 中调试 Next.js 应用，包括客户端、服务端和 API 路由调试。

## 功能特性

- ✅ 客户端调试（Chrome DevTools）
- ✅ 服务端调试（Node.js）
- ✅ API Routes 调试
- ✅ Server Components 调试
- ✅ Client Components 调试
- ✅ 全栈调试（同时调试前后端）
- ✅ TypeScript 支持

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：全栈调试（推荐）

同时调试客户端和服务端代码。

1. 在 VSCode 中打开调试面板（Ctrl/Cmd + Shift + D）
2. 选择 "Next.js - Full Stack" 配置
3. 按 F5 启动调试
4. 调试器会同时启动服务端和客户端调试

#### 方式二：仅服务端调试

只调试 Next.js 服务端代码（包括 API Routes 和 Server Components）。

1. 选择 "Next.js - Server" 配置
2. 按 F5 启动调试
3. 手动打开浏览器访问 http://localhost:3000

#### 方式三：附加到客户端

服务端已启动时，附加浏览器调试器。

1. 先启动开发服务器：`pnpm dev`
2. 选择 "Next.js - Attach Client" 配置
3. 按 F5 附加调试器

## 调试配置详解

### 全栈调试配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Next.js - Full Stack",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["next", "dev"],
  "serverReadyAction": {
    "pattern": "started server on .+, url: (https?://.+)",
    "uriFormat": "%s",
    "action": "debugWithChrome"
  },
  "cwd": "${workspaceFolder}/packages/nextjs-demo"
}
```

**配置说明：**

| 参数 | 说明 |
|------|------|
| `runtimeExecutable: "pnpm"` | 使用 pnpm 启动 Next.js |
| `runtimeArgs: ["next", "dev"]` | 相当于 `pnpm next dev` |
| `serverReadyAction` | 服务器就绪后的自动操作 |
| `pattern` | 匹配服务器启动日志的正则表达式 |
| `uriFormat: "%s"` | URL 格式，%s 替换为匹配到的 URL |
| `action: "debugWithChrome"` | 自动启动 Chrome 调试 |

**工作流程：**

1. 启动 Next.js dev server（Node.js 调试模式）
2. 监听服务器启动日志
3. 检测到 "started server on..." 日志后
4. 提取 URL（http://localhost:3000）
5. 自动启动 Chrome 并连接调试器

### 服务端调试配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Next.js - Server",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["next", "dev"],
  "cwd": "${workspaceFolder}/packages/nextjs-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

**适用场景：**
- 调试 API Routes
- 调试 Server Components
- 调试服务端数据获取
- 调试 getServerSideProps/getStaticProps

### 客户端调试配置

```json
{
  "type": "chrome",
  "request": "attach",
  "name": "Next.js - Attach Client",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/packages/nextjs-demo",
  "sourceMaps": true
}
```

**适用场景：**
- 调试 Client Components
- 调试浏览器端逻辑
- 调试 React Hooks
- 调试用户交互

## 调试技巧

### 1. 调试 Client Components

```tsx
'use client'

export default function ClientComponent() {
  // 在这里设置断点 - 客户端代码
  const handleClick = () => {
    console.log('Button clicked')  // 输出到浏览器控制台
  }

  return <button onClick={handleClick}>Click me</button>
}
```

**要点：**
- 使用 `'use client'` 标记客户端组件
- console.log 输出到浏览器控制台
- 可以访问浏览器 API（window, document）
- 需要 Chrome 调试器

### 2. 调试 Server Components

```tsx
// 默认就是 Server Component

async function getData() {
  // 在这里设置断点 - 服务端代码
  const data = await fetch('https://api.example.com/data')
  return data.json()
}

export default async function ServerComponent() {
  const data = await getData()
  console.log(data)  // 输出到 VSCode 终端

  return <div>{JSON.stringify(data)}</div>
}
```

**要点：**
- 不需要 `'use client'` 标记
- console.log 输出到 VSCode 终端（服务端）
- 可以直接访问数据库和文件系统
- 需要 Node.js 调试器

### 3. 调试 API Routes

```tsx
// app/api/users/route.ts
export async function GET(request: Request) {
  // 在这里设置断点 - API 请求处理
  const searchParams = new URL(request.url).searchParams
  const id = searchParams.get('id')

  // 在这里设置断点 - 数据库查询
  const user = await db.user.findUnique({ where: { id } })

  // 在这里设置断点 - 返回响应
  return Response.json(user)
}
```

**要点：**
- API Routes 在服务端执行
- 使用 Node.js 调试器
- 可以设置断点观察请求和响应
- console.log 输出到 VSCode 终端

### 4. 调试全栈交互

**客户端代码（src/app/page.tsx）：**
```tsx
'use client'

export default function Page() {
  const fetchData = async () => {
    // 在这里设置断点 - 客户端发起请求
    const response = await fetch('/api/users?id=1')
    const data = await response.json()
    // 在这里设置断点 - 处理响应
    console.log(data)
  }

  return <button onClick={fetchData}>Fetch</button>
}
```

**服务端代码（src/app/api/users/route.ts）：**
```tsx
export async function GET(request: Request) {
  // 在这里设置断点 - 服务端接收请求
  const searchParams = new URL(request.url).searchParams
  const id = searchParams.get('id')
  // 在这里设置断点 - 返回响应
  return Response.json({ id, name: 'John' })
}
```

**调试流程：**
1. 使用 "Next.js - Full Stack" 配置启动调试
2. 在客户端代码设置断点
3. 在服务端 API 代码设置断点
4. 点击按钮触发请求
5. 先中断在客户端断点
6. 按 F5 继续，然后中断在服务端断点
7. 按 F5 继续，返回客户端断点

### 5. 调试环境变量

```tsx
// next.config.js
console.log('Environment:', process.env.NODE_ENV)

// API Route
export async function GET() {
  // 在这里设置断点 - 查看环境变量
  console.log('API Key:', process.env.API_KEY)
  return Response.json({ ok: true })
}
```

**配置环境变量：**

创建 `.env.local` 文件：
```env
API_KEY=your-api-key
DATABASE_URL=your-database-url
```

在 launch.json 中覆盖：
```json
{
  "env": {
    "NODE_ENV": "development",
    "DEBUG": "true"
  }
}
```

### 6. 条件断点

右键点击断点，选择"编辑断点"，添加条件：

```typescript
// 只在特定用户 ID 时中断
request.nextUrl.searchParams.get('id') === '123'

// 只在错误时中断
error !== null

// 只在数组长度超过 10 时中断
data.length > 10
```

### 7. 日志断点

右键点击断点，选择"编辑断点"，选择"记录消息"：

```
用户 ID: {id}
请求路径: {request.url}
数据长度: {data.length}
```

不会中断执行，只输出日志。

## 示例页面说明

### 主页 (/)

演示客户端组件调试：
- `src/app/page.tsx:10` - 组件挂载
- `src/app/page.tsx:15` - 状态变化监听
- `src/app/page.tsx:20` - 事件处理
- `src/app/page.tsx:25` - API 调用

### Server Component (/server)

演示服务端组件调试：
- `src/app/server/page.tsx:4` - 数据获取函数
- `src/app/server/page.tsx:14` - 组件渲染
- 查看服务端日志输出

### API Routes

演示 API 路由调试：
- `src/app/api/posts/route.ts:12` - GET 请求处理
- `src/app/api/posts/route.ts:30` - POST 请求处理
- `src/app/api/posts/route.ts:35` - 请求体解析
- `src/app/api/posts/route.ts:52` - 错误处理

## 常见问题

### 调试时页面无响应

1. 确保使用了正确的调试配置
2. 检查端口 3000 是否被占用
3. 清除 .next 目录：`rm -rf .next`
4. 重启调试会话

### 断点不生效

**客户端断点：**
1. 确保使用了 Chrome 调试器
2. 确保组件标记了 `'use client'`
3. 检查 Source Map 是否生成
4. 刷新浏览器页面

**服务端断点：**
1. 确保使用了 Node.js 调试器
2. 确保代码在服务端执行
3. 检查文件路径是否正确
4. 重启 dev server

### Source Map 问题

确保 `next.config.js` 包含：

```javascript
const nextConfig = {
  // 开发模式下自动启用 Source Map
  reactStrictMode: true,
}
```

### API 路由调试不生效

1. 确保使用 Node.js 调试器（不是 Chrome）
2. 确保服务器在调试模式下运行
3. 检查 API 路径是否正确
4. 查看 VSCode 终端输出

### 同时调试前后端不工作

1. 使用 "Next.js - Full Stack" 配置
2. 确保 serverReadyAction 配置正确
3. 检查服务器启动日志格式
4. 手动启动 Chrome 调试作为备选方案

## 进阶技巧

### 1. 调试中间件

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 在这里设置断点 - 请求拦截
  console.log('Middleware:', request.url)

  // 在这里设置断点 - 重定向逻辑
  if (request.nextUrl.pathname === '/old-path') {
    return NextResponse.redirect(new URL('/new-path', request.url))
  }

  return NextResponse.next()
}
```

### 2. 调试 Server Actions

```tsx
'use server'

export async function createPost(formData: FormData) {
  // 在这里设置断点 - Server Action
  const title = formData.get('title')
  const body = formData.get('body')

  // 在这里设置断点 - 数据库操作
  const post = await db.post.create({
    data: { title, body },
  })

  return post
}
```

### 3. 调试数据获取

```tsx
// 静态生成
export async function generateStaticParams() {
  // 在这里设置断点 - 构建时执行
  const posts = await getAllPosts()
  return posts.map((post) => ({ id: post.id }))
}

// 服务端渲染
export async function generateMetadata({ params }) {
  // 在这里设置断点 - 每次请求执行
  const post = await getPost(params.id)
  return { title: post.title }
}
```

### 4. 性能分析

使用 Chrome DevTools 的 Performance 面板进行性能分析：

1. 启动全栈调试
2. 打开 Chrome DevTools
3. 切换到 Performance 面板
4. 点击 Record 按钮
5. 执行操作
6. 停止录制并分析

## 相关资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Next.js 调试文档](https://nextjs.org/docs/advanced-features/debugging)
- [VSCode 调试文档](https://code.visualstudio.com/docs/editor/debugging)
- [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools/)
