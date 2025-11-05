# npm script 调试示例

这个示例展示了如何在 VSCode 中调试 npm scripts。

## 调试方式

### 方式一：通过 npm 命令调试（Node 调试器）

1. 选择 "npm script - Start" 配置
2. 按 F5 启动调试
3. 调试器会运行 `npm start`

### 方式二：在终端中运行 npm 脚本

1. 选择 "npm script - Start (Terminal)" 配置
2. 按 F5 启动调试
3. 在集成终端中运行 `npm start`

## 调试配置详解

### Node 调试器运行 npm 脚本

```json
{
  "type": "node",
  "request": "launch",
  "name": "npm script - Start",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run-script", "start"],
  "cwd": "${workspaceFolder}/packages/npm-script-demo",
  "console": "integratedTerminal",
  "skipFiles": ["<node_internals>/**"]
}
```

**配置说明：**

- `runtimeExecutable: "npm"`: 使用 npm 运行脚本
- `runtimeArgs: ["run-script", "start"]`: 运行 npm start 脚本
- `console: "integratedTerminal"`: 输出到集成终端

### 在终端中运行 npm 脚本

```json
{
  "type": "node-terminal",
  "name": "npm script - Start (Terminal)",
  "request": "launch",
  "command": "npm start",
  "cwd": "${workspaceFolder}/packages/npm-script-demo"
}
```

**配置说明：**

- `type: "node-terminal"`: 在终端中运行
- `command: "npm start"`: 执行的命令
