# npm script 调试示例

这个示例展示了如何在 VSCode 中调试 npm scripts（构建脚本、部署脚本等）。

## 功能特性

- ✅ 调试自定义构建脚本
- ✅ 调试部署脚本
- ✅ 支持环境变量
- ✅ 支持脚本链

## 调试方式

### 方式一：直接调试脚本文件

1. 打开要调试的脚本文件（如 `scripts/build.js`）
2. 设置断点
3. 选择 "npm script - Run Script File" 配置
4. 按 F5 启动调试

### 方式二：通过 npm 命令调试

1. 选择 "npm script - Build" 配置
2. 按 F5 启动调试
3. 调试器会运行 `npm run build`

### 方式三：使用 NPM Scripts 面板

在 VSCode 侧边栏打开 "NPM SCRIPTS" 面板，右键选择 "Debug"。

## 调试配置详解

### 直接调试脚本文件

```json
{
  "type": "node",
  "request": "launch",
  "name": "npm script - Run Script File",
  "program": "${file}",
  "cwd": "${fileDirname}/..",
  "console": "integratedTerminal"
}
```

### 通过 npm 调试

```json
{
  "type": "node",
  "request": "launch",
  "name": "npm script - Build",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "build"],
  "cwd": "${workspaceFolder}/packages/npm-script-demo",
  "console": "integratedTerminal",
  "skipFiles": ["<node_internals>/**"]
}
```

### 调试生产构建

```json
{
  "type": "node",
  "request": "launch",
  "name": "npm script - Build Production",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "build:prod"],
  "cwd": "${workspaceFolder}/packages/npm-script-demo",
  "console": "integratedTerminal"
}
```
