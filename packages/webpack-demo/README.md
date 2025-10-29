# Webpack 调试示例

这个示例展示了如何在 VSCode 中调试 Webpack 构建过程、配置文件和自定义插件。

## 功能特性

- ✅ 调试 Webpack 配置文件
- ✅ 调试自定义 Plugin
- ✅ 调试 Dev Server
- ✅ Source Map 支持

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：调试 Webpack 构建（推荐）

1. 选择 "Webpack - Build" 配置
2. 在 webpack.config.js 中设置断点
3. 按 F5 启动调试

#### 方式二：调试 Dev Server

1. 选择 "Webpack - Dev Server" 配置
2. 按 F5 启动调试
3. 浏览器自动打开 http://localhost:9000

## 调试配置详解

### Webpack 构建调试

```json
{
  "type": "node",
  "request": "launch",
  "name": "Webpack - Build",
  "program": "${workspaceFolder}/node_modules/.bin/webpack",
  "args": [
    "--config",
    "${workspaceFolder}/packages/webpack-demo/webpack/webpack.config.js",
    "--mode",
    "development"
  ],
  "cwd": "${workspaceFolder}/packages/webpack-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Dev Server 调试

```json
{
  "type": "node",
  "request": "launch",
  "name": "Webpack - Dev Server",
  "program": "${workspaceFolder}/node_modules/.bin/webpack",
  "args": [
    "serve",
    "--config",
    "${workspaceFolder}/packages/webpack-demo/webpack/webpack.config.js",
    "--mode",
    "development"
  ],
  "cwd": "${workspaceFolder}/packages/webpack-demo",
  "console": "integratedTerminal"
}
```
