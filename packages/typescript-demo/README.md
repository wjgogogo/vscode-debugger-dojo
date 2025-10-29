# TypeScript 独立调试示例

这个示例展示了如何在 VSCode 中直接调试 TypeScript 文件，无需预编译。

## 功能特性

- ✅ ts-node 调试（传统方案）
- ✅ tsx 调试（推荐，更快）
- ✅ 泛型调试
- ✅ 异步函数调试
- ✅ Source Map 支持

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：使用 tsx 调试（推荐）

1. 打开要调试的 TypeScript 文件（如 `src/index.ts`）
2. 设置断点
3. 按 F5 或选择 "TypeScript - Current File (tsx)" 配置
4. 调试器会在断点处暂停

#### 方式二：使用 ts-node 调试

1. 打开要调试的 TypeScript 文件
2. 设置断点
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
