# Vite + React 调试示例

这个示例展示了如何在 VSCode 中调试 Vite + React 应用。

## 功能特性

- ✅ TypeScript 支持
- ✅ React 18 + Hooks
- ✅ Source Map 支持
- ✅ Launch 和 Attach 两种调试模式

## 调试方式

### 方式一：Launch 模式（推荐）

1. 在 VSCode 中打开调试面板（Ctrl/Cmd + Shift + D）
2. 选择 "Vite React - Launch" 配置
3. 按 F5 启动调试
4. 调试器会自动启动开发服务器并打开 Chrome

### 方式二：Attach 模式

**前置条件：**
1. 先启动开发服务器：`pnpm dev`
2. 用调试模式启动 Chrome：
   ```bash
   # macOS
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
     --remote-debugging-port=9222 http://localhost:5173

   # Linux
   google-chrome --remote-debugging-port=9222 http://localhost:5173
   ```
3. 在 VSCode 中选择 "Vite React - Attach" 配置
4. 按 F5 附加调试器

### 方式三：保存登录状态

选择 "Vite React - Launch (自定义用户信息)" 配置，会自动保存 Chrome 用户数据（包括登录状态）。

## 调试配置详解

### Launch 模式配置

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "preLaunchTask": "vite-react: dev",
  "serverReadyAction": {
    "pattern": "Local:.*",
    "action": "openExternally"
  },
  "runtimeArgs": ["--auto-open-devtools-for-tabs"],
  "postDebugTask": "kill-vite-react-dev"
}
```

**配置说明：**
- `preLaunchTask`: 自动启动 Vite 开发服务器
- `serverReadyAction`: 检测到服务器就绪日志后自动打开浏览器
- `postDebugTask`: 调试结束后自动关闭 dev server

### Attach 模式配置

```json
{
  "type": "chrome",
  "request": "attach",
  "name": "Vite React - Attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}/packages/vite-react-demo"
}
```

**配置说明：**
- 连接到已运行的 Chrome 调试端口（9222）
- 需要预先用 `--remote-debugging-port=9222` 启动 Chrome

### 保存登录状态配置

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch (自定义用户信息)",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "preLaunchTask": "vite-react: dev",
  "userDataDir": "${workspaceFolder}/packages/vite-react-demo/.chrome-data",
  "serverReadyAction": {
    "pattern": "Local:.*",
    "action": "openExternally"
  },
  "runtimeArgs": ["--auto-open-devtools-for-tabs"],
  "postDebugTask": "kill-vite-react-dev"
}
```

**配置说明：**
- `userDataDir`: 指定 Chrome 用户数据目录，保存登录状态和扩展设置
