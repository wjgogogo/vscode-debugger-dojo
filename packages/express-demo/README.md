# Express 调试示例

这个示例展示了如何在 VSCode 中调试 Express 服务器。

## 调试方式

### 方式一：Launch 模式（推荐）

1. 在 VSCode 中打开调试面板（Ctrl/Cmd + Shift + D）
2. 选择 "Express - Launch" 配置
3. 按 F5 启动调试
4. 服务器会在 http://localhost:3000 启动，浏览器会自动打开

### 方式二：Attach 模式

1. 在终端运行：`pnpm start:inspect`
2. 选择 "Express - Attach" 配置
3. 按 F5 附加调试器

## 调试配置详解

### Express - Launch

```json
{
  "type": "node",
  "request": "launch",
  "name": "Express - Launch",
  "program": "${workspaceFolder}/packages/express-demo/src/index.ts",
  "runtimeArgs": ["-r", "tsx/cjs"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "cwd": "${workspaceFolder}/packages/express-demo",
  "env": {
    "NODE_ENV": "development",
    "PORT": "3000"
  },
  "skipFiles": ["<node_internals>/**"],
  "serverReadyAction": {
    "pattern": "(http://localhost:\\d+)",
    "uriFormat": "%s",
    "action": "openExternally"
  }
}
```

**配置说明：**
- `type: "node"` - 使用 Node.js 调试器
- `program` - TypeScript 入口文件路径
- `runtimeArgs: ["-r", "tsx/cjs"]` - 使用 tsx 运行 TypeScript 文件
- `cwd` - 工作目录，用于正确解析 node_modules 中的模块
- `console: "integratedTerminal"` - 在集成终端显示输出
- `env` - 环境变量（NODE_ENV 和 PORT）
- `skipFiles` - 跳过 Node.js 内部文件加快调试
- `serverReadyAction` - 当服务器启动时自动打开浏览器

### Express - Attach

```json
{
  "type": "node",
  "request": "attach",
  "name": "Express - Attach",
  "port": 9229,
  "restart": true,
  "skipFiles": ["<node_internals>/**"]
}
```

**配置说明：**
- `request: "attach"` - 附加到已运行的进程
- `port: 9229` - Node.js 调试协议默认端口
- `restart: true` - 程序变化时自动重启调试器
