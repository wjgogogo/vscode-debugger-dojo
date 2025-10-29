# Next.js 调试示例

这个示例展示了如何在 VSCode 中调试 Next.js 应用（包括客户端、服务端和 API 路由）。

## 功能特性

- ✅ 全栈调试（同时调试前后端）
- ✅ Server Components 调试
- ✅ Client Components 调试
- ✅ API Routes 调试
- ✅ TypeScript 支持

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：全栈调试（推荐）

1. 选择 "Next.js - Full Stack" 配置
2. 按 F5 启动调试
3. 调试器会同时启动服务端和客户端调试

#### 方式二：仅服务端调试

1. 选择 "Next.js - Server" 配置
2. 按 F5 启动调试
3. 手动打开浏览器访问 http://localhost:3000

#### 方式三：附加到客户端

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
- `serverReadyAction`: 服务器启动后自动启动 Chrome 调试

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
