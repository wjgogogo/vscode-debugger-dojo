# Vitest 单测调试示例

这个示例展示了如何在 VSCode 中调试 Vitest 测试。

## 调试方式

### 方式一：调试当前文件（推荐）

1. 在 VSCode 中打开任意测试文件（如 `math.test.ts`）
2. 在测试代码中设置断点
3. 按 F5 或选择 "Vitest - Current File" 配置
4. 调试器会只运行当前文件的测试

### 方式二：调试所有测试

1. 选择 "Vitest - All Tests" 配置
2. 按 F5 启动调试
3. 调试器会运行所有测试文件

### 方式三：使用 Vitest VSCode 扩展

安装 [Vitest 扩展](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer) 后，可以在测试资源管理器中点击调试图标。

## 调试配置详解

### 调试当前文件配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest - Current File",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": [
    "vitest",
    "run",
    "${relativeFile}"
  ],
  "cwd": "${workspaceFolder}/packages/vitest-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

**配置说明：**
- `runtimeExecutable: "pnpm"`: 使用 pnpm 运行
- `${relativeFile}`: 当前打开的文件路径
- `run`: 运行模式（非 watch）

### 调试所有测试配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest - All Tests",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": [
    "vitest",
    "run"
  ],
  "cwd": "${workspaceFolder}/packages/vitest-demo",
  "console": "integratedTerminal"
}
```
