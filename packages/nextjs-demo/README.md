# Next.js 调试示例

这个示例展示了如何在 VSCode 中调试 Next.js 应用（包括客户端、服务端和 API 路由）。

## 调试方式

### 方式一：全栈调试 - debugWithChrome（推荐）

1. 选择 "Next.js - Full Stack" 配置
2. 按 F5 启动调试
3. 调试器会自动启动 Next.js 服务器并打开 Chrome 进行全栈调试

### 方式二：全栈调试 - startDebugging

1. 选择 "Next.js - Server with startDebugging" 配置
2. 按 F5 启动调试
3. 服务器就绪后会自动启动客户端调试会话

### 方式三：全栈调试 - Compound

1. 选择 "Next.js - Full Stack (Compound)" 配置
2. 按 F5 启动调试
3. 同时启动服务器和客户端两个独立的调试会话

### 方式四：仅服务端调试

1. 选择 "Next.js - Server" 配置
2. 按 F5 启动调试
3. 手动打开浏览器访问 http://localhost:3000

## 调试配置详解

### 方式一：debugWithChrome 配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Next.js - Full Stack",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["next", "dev"],
  "serverReadyAction": {
    "pattern": "Local:\\s+(https?://.+)",
    "action": "debugWithChrome",
    "uriFormat": "%s",
    "webRoot": "${workspaceFolder}/packages/nextjs-demo"
  },
  "cwd": "${workspaceFolder}/packages/nextjs-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**配置说明：**
- `serverReadyAction`: 服务器启动后自动使用 `debugWithChrome` 启动浏览器调试
- `pattern`: 匹配 Next.js 输出的服务器地址（使用 `\s+` 匹配多个空格）
- `webRoot`: 指定 Web 根目录，确保源码映射正确

### 方式二：startDebugging 配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Next.js - Server with startDebugging",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["next", "dev"],
  "serverReadyAction": {
    "pattern": "Local:\\s+(https?://.+)",
    "action": "startDebugging",
    "name": "Next.js - Client Launch"
  },
  "cwd": "${workspaceFolder}/packages/nextjs-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**配合的客户端配置：**

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Next.js - Client Launch",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/packages/nextjs-demo"
}
```

**配置说明：**
- `action: "startDebugging"`: 服务器就绪后自动启动另一个调试配置
- `name`: 指定要启动的客户端配置名称
- 客户端使用 `launch` 模式自动启动浏览器

### 方式三：Compound 配置

```json
{
  "compounds": [
    {
      "name": "Next.js - Full Stack (Compound)",
      "configurations": ["Next.js - Server", "Next.js - Client Launch"],
      "stopAll": true
    }
  ]
}
```

**配置说明：**
- `configurations`: 同时启动的配置列表
- `stopAll: true`: 停止调试时同时停止所有会话
- 适合需要独立控制服务器和客户端调试会话的场景

### 方式四：服务端调试配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Next.js - Server",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["next", "dev"],
  "cwd": "${workspaceFolder}/packages/nextjs-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**配置说明：**
- 仅启动 Node.js 服务器调试
- 适合只需要调试服务端代码的场景

## 三种全栈调试方式的区别

| 方式            | 优点                     | 缺点                       | 适用场景                   |
| --------------- | ------------------------ | -------------------------- | -------------------------- |
| debugWithChrome | 配置简单，一键启动       | 调试会话合并，控制粒度较粗 | 日常开发，快速调试         |
| startDebugging  | 自动化程度高，会话独立   | 配置稍复杂，需要两个配置   | 需要独立控制服务器和客户端 |
| Compound        | 完全手动控制，灵活性最高 | 需要手动管理多个会话       | 复杂调试场景，需要精细控制 |

## 参考资料

- [VSCode Debugging Next.js](https://github.com/microsoft/vscode-recipes/tree/main/Next-js)
