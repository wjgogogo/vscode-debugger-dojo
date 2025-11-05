# TypeScript 独立调试示例

这个示例展示了如何在 VSCode 中直接调试 TypeScript 文件，无需预编译。

## 调试方式

### 方式一：使用 tsx 调试（推荐）

1. 打开要调试的 TypeScript 文件（如 `src/index.ts`）
2. 在代码中设置断点
3. 按 F5 或选择 "TypeScript - Current File (tsx)" 配置
4. 调试器会在断点处暂停

### 方式二：使用 ts-node 调试

1. 打开要调试的 TypeScript 文件
2. 在代码中设置断点
3. 选择 "TypeScript - Current File (ts-node)" 配置
4. 按 F5 启动调试

## 调试配置详解

### tsx 配置（推荐）

```json
{
  "type": "node",
  "request": "launch",
  "name": "TypeScript - Current File (tsx)",
  "program": "${file}",
  "runtimeArgs": ["-r", "tsx/cjs"],
  "cwd": "${fileDirname}",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**配置说明：**
- `program: "${file}"`: 调试当前打开的文件
- `runtimeArgs: ["-r", "tsx/cjs"]`: 使用 tsx 加载器
- `cwd: "${fileDirname}"`: 工作目录设为文件所在目录
- `console: "integratedTerminal"`: 使用集成终端显示输出

### ts-node 配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "TypeScript - Current File (ts-node)",
  "program": "${file}",
  "runtimeArgs": ["-r", "ts-node/register"],
  "cwd": "${fileDirname}",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"],
  "env": {
    "TS_NODE_PROJECT": "${workspaceFolder}/packages/typescript-demo/tsconfig.json"
  }
}
```

**配置说明：**
- `runtimeArgs: ["-r", "ts-node/register"]`: 使用 ts-node 加载器
- `TS_NODE_PROJECT`: 指定 tsconfig.json 路径
