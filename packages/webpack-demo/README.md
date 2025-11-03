# Webpack 调试示例

这个示例展示了如何在 VSCode 中调试 Webpack 构建过程和 Dev Server。

## 调试方式

### 方式一：调试构建（推荐）

1. 选择 "Webpack - Build" 配置
2. 在 webpack.config.js 中设置断点
3. 按 F5 启动调试

### 方式二：调试 Dev Server（浏览器）

1. 选择 "Webpack - Launch Chrome" 配置
2. 按 F5 启动调试
3. Chrome 浏览器自动打开 http://localhost:9000

## 调试配置详解

### Webpack - Build

```json
{
  "type": "node",
  "request": "launch",
  "name": "Webpack - Build",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["run", "build:dev"],
  "cwd": "${workspaceFolder}/packages/webpack-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"],
  "presentation": {
    "group": "05. Webpack",
    "order": 1
  }
}
```

**配置说明：**
- `type: "node"` - 使用 Node.js 调试器
- `runtimeExecutable: "pnpm"` - 使用 pnpm 作为运行时
- `runtimeArgs: ["run", "build:dev"]` - 运行 npm script 中的 build:dev 任务
- `cwd` - 工作目录设置为 webpack-demo 包目录
- `console: "integratedTerminal"` - 在 VS Code 集成终端显示输出（支持彩色）
- `skipFiles: ["<node_internals>/**"]` - 跳过 Node.js 内部文件加快调试速度

### Webpack - Launch Chrome

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Webpack - Launch Chrome",
  "url": "http://localhost:9000",
  "webRoot": "${workspaceFolder}/packages/webpack-demo",
  "preLaunchTask": "webpack: serve",
  "serverReadyAction": {
    "pattern": "webpack.*compiled",
    "action": "openExternally"
  },
  "runtimeArgs": ["--auto-open-devtools-for-tabs"],
  "postDebugTask": "kill-webpack-serve",
  "presentation": {
    "group": "05. Webpack",
    "order": 2
  }
}
```

**配置说明：**
- `type: "chrome"` - 使用 Chrome 浏览器调试
- `url: "http://localhost:9000"` - Dev Server 地址
- `webRoot` - 项目根目录，用于 source map 映射
- `preLaunchTask: "webpack: serve"` - 启动前先执行 webpack serve 任务
- `serverReadyAction` - 监听 webpack 编译完成的输出，自动打开浏览器
  - `pattern: "webpack.*compiled"` - 匹配编译完成的输出信号
  - `action: "openExternally"` - 在默认浏览器打开 URL
- `runtimeArgs: ["--auto-open-devtools-for-tabs"]` - Chrome 自动打开开发者工具
- `postDebugTask: "kill-webpack-serve"` - 调试结束后清理 webpack serve 进程
