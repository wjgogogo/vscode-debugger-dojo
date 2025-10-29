# Vite + React 调试示例

这个示例展示了如何在 VSCode 中调试 Vite + React 应用。

## 功能特性

- ✅ TypeScript 支持
- ✅ React 18 + Hooks
- ✅ Source Map 支持
- ✅ Launch 和 Attach 模式

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：Launch 模式（推荐）

1. 在 VSCode 中打开调试面板（Ctrl/Cmd + Shift + D）
2. 选择 "Vite React - Launch" 配置
3. 按 F5 启动调试
4. 调试器会自动启动开发服务器并打开 Chrome

#### 方式二：Attach 模式

1. 先启动开发服务器：`pnpm dev`
2. 选择 "Vite React - Attach" 配置
3. 按 F5 附加调试器

#### 方式三：保存登录状态

选择 "Vite React - Launch (保存登录状态)" 配置，自动恢复登录会话。

## 调试配置详解

### Launch 模式配置

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "sourceMaps": true,
  "preLaunchTask": "vite-react: dev",
  "runtimeArgs": [
    "--auto-open-devtools-for-tabs"
  ]
}
```

### Attach 模式配置

```json
{
  "type": "chrome",
  "request": "attach",
  "name": "Vite React - Attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "sourceMaps": true
}
```

### 保存登录状态配置

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch (保存登录状态)",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "sourceMaps": true,
  "preLaunchTask": "vite-react: dev",
  "userDataDir": "${workspaceFolder}/packages/vite-react-demo/.chrome-data"
}
```
