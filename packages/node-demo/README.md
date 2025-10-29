# Node.js 调试示例

这个示例展示了如何在 VSCode 中调试 Node.js 应用（Express 服务器）。

## 功能特性

- ✅ TypeScript 支持
- ✅ Express REST API
- ✅ 异步函数调试
- ✅ 错误处理调试
- ✅ Source Map 支持

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：Launch 模式（推荐）

1. 在 VSCode 中打开调试面板（Ctrl/Cmd + Shift + D）
2. 选择 "Node.js - Launch" 配置
3. 按 F5 启动调试
4. 服务器会在 http://localhost:3000 启动

#### 方式二：Attach 模式

1. 先启动服务器：`pnpm dev`
2. 选择 "Node.js - Attach" 配置
3. 按 F5 附加调试器

## 调试配置详解

### Launch 模式配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Node.js - Launch",
  "program": "${workspaceFolder}/packages/node-demo/src/index.ts",
  "runtimeArgs": ["-r", "tsx/cjs"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "env": {
    "NODE_ENV": "development",
    "PORT": "3000"
  },
  "sourceMaps": true,
  "skipFiles": ["<node_internals>/**"]
}
```

**配置说明：**
- `program`: 入口文件路径
- `runtimeArgs`: 使用 tsx 运行 TypeScript
- `env`: 环境变量
- `sourceMaps`: 启用 Source Map

### Attach 模式配置

```json
{
  "type": "node",
  "request": "attach",
  "name": "Node.js - Attach",
  "port": 9229,
  "restart": true,
  "skipFiles": ["<node_internals>/**"]
}
```
