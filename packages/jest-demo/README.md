# Jest 单测调试示例

这个示例展示了如何在 VSCode 中调试 Jest 测试。

## 调试方式

### 方式一：调试当前文件（推荐）

1. 在 VSCode 中打开任意测试文件（如 `calculator.test.ts`）
2. 在测试代码中设置断点
3. 按 F5 或选择 "Jest - Current File" 配置
4. 调试器会只运行当前文件的测试

### 方式二：调试所有测试

1. 选择 "Jest - All Tests" 配置
2. 按 F5 启动调试
3. 调试器会运行所有测试文件

### 方式三：使用 VSCode Jest 扩展

安装 [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) 扩展后，可以在测试资源管理器中点击调试图标。

## 调试配置详解

### 调试当前文件配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest - Current File",
  "program": "${workspaceFolder}/packages/jest-demo/node_modules/jest/bin/jest.js",
  "args": [
    "${relativeFile}",
    "--config=${workspaceFolder}/packages/jest-demo/jest.config.js",
    "--runInBand",
    "--no-coverage"
  ],
  "cwd": "${workspaceFolder}/packages/jest-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

**配置说明：**
- `program`: Jest 可执行文件路径（需指向 jest.js 而不是 .bin/jest）
- `${relativeFile}`: 当前打开的文件路径
- `--runInBand`: 在单个进程中运行测试（调试必需）
- `--no-coverage`: 跳过覆盖率收集（加快调试速度）
- `console: "integratedTerminal"`: 使用集成终端（可以看到彩色输出）

### 调试所有测试配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest - All Tests",
  "program": "${workspaceFolder}/packages/jest-demo/node_modules/jest/bin/jest.js",
  "args": [
    "--runInBand",
    "--config=${workspaceFolder}/packages/jest-demo/jest.config.js"
  ],
  "cwd": "${workspaceFolder}/packages/jest-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```
