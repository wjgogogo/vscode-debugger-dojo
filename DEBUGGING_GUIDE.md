# VSCode Debugger 完整指南

这是一份全面的 VSCode 调试指南，涵盖了所有常见场景。

## 目录

1. [基础概念](#基础概念)
2. [调试配置](#调试配置)
3. [各场景调试](#各场景调试)
4. [调试技巧](#调试技巧)
5. [常见问题](#常见问题)

## 基础概念

### 调试器类型

VSCode 支持多种调试器：

- **node**: Node.js 调试器（用于 JavaScript/TypeScript）
- **chrome**: Chrome 调试器（用于前端应用）
- **lldb**: LLDB 调试器（用于 Rust、C++等）

### 调试模式

#### Launch 模式

调试器启动程序并附加：

```json
{
  "type": "node",
  "request": "launch",
  "program": "${file}"
}
```

**优点：**
- 自动启动程序
- 配置简单
- 适合大多数场景

#### Attach 模式

调试器附加到已运行的程序：

```json
{
  "type": "node",
  "request": "attach",
  "port": 9229
}
```

**优点：**
- 不会重启程序
- 适合调试长时间运行的服务
- 可以附加到远程进程

### launch.json 结构

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "调试器类型",
      "request": "launch 或 attach",
      "name": "配置名称",
      // 其他配置...
    }
  ]
}
```

### 常用配置项

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `type` | 调试器类型 | `"node"`, `"chrome"`, `"lldb"` |
| `request` | 调试模式 | `"launch"`, `"attach"` |
| `name` | 配置名称 | `"Debug Program"` |
| `program` | 程序入口 | `"${file}"` |
| `args` | 命令行参数 | `["--port", "3000"]` |
| `env` | 环境变量 | `{"NODE_ENV": "dev"}` |
| `cwd` | 工作目录 | `"${workspaceFolder}"` |
| `sourceMaps` | 启用 Source Map | `true` |
| `skipFiles` | 跳过的文件 | `["<node_internals>/**"]` |

## 调试配置

### VSCode 变量

可以在配置中使用的变量：

| 变量 | 说明 |
|------|------|
| `${workspaceFolder}` | 工作区根目录 |
| `${file}` | 当前打开的文件 |
| `${relativeFile}` | 相对于工作区的文件路径 |
| `${fileBasename}` | 文件名（含扩展名）|
| `${fileDirname}` | 文件所在目录 |
| `${fileExtname}` | 文件扩展名 |
| `${cwd}` | 当前工作目录 |
| `${env:VAR}` | 环境变量 |

### 配置继承

可以从其他配置继承：

```json
{
  "configurations": [
    {
      "name": "Base Config",
      "type": "node",
      "request": "launch"
    },
    {
      "name": "Extended Config",
      "extends": "Base Config",
      "program": "${file}"
    }
  ]
}
```

### 复合配置

同时启动多个调试配置：

```json
{
  "compounds": [
    {
      "name": "Full Stack",
      "configurations": [
        "Node.js - Launch",
        "Vite React - Launch"
      ]
    }
  ]
}
```

## 各场景调试

### Vite + React

**Launch 模式：**
```json
{
  "type": "chrome",
  "request": "launch",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}",
  "preLaunchTask": "npm: dev"
}
```

**Attach 模式：**
```json
{
  "type": "chrome",
  "request": "attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}"
}
```

### Node.js + Express

**基础配置：**
```json
{
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/src/index.ts",
  "runtimeArgs": ["-r", "tsx/cjs"]
}
```

**使用 nodemon：**
```json
{
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "nodemon",
  "program": "${workspaceFolder}/src/index.ts",
  "restart": true
}
```

### Jest 测试

**调试当前文件：**
```json
{
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": [
    "${relativeFile}",
    "--runInBand"
  ]
}
```

**调试特定测试：**
```json
{
  "args": [
    "--testNamePattern=测试名称",
    "--runInBand"
  ]
}
```

### Vitest 测试

**调试当前文件：**
```json
{
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": [
    "vitest",
    "run",
    "${relativeFile}"
  ]
}
```

### npm scripts

**直接调试脚本：**
```json
{
  "type": "node",
  "request": "launch",
  "program": "${file}"
}
```

**通过 npm 调试：**
```json
{
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "build"]
}
```

### Puppeteer

**基础配置：**
```json
{
  "type": "node",
  "request": "launch",
  "program": "${file}",
  "console": "integratedTerminal"
}
```

**建议设置：**
```javascript
puppeteer.launch({
  headless: false,  // 显示浏览器
  slowMo: 100,      // 慢动作
  devtools: true    // 打开 DevTools
})
```

### Next.js

**全栈调试（推荐）：**
```json
{
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["next", "dev"],
  "serverReadyAction": {
    "pattern": "started server on .+, url: (https?://.+)",
    "uriFormat": "%s",
    "action": "debugWithChrome"
  }
}
```

**仅服务端调试：**
```json
{
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["next", "dev"]
}
```

**调试要点：**
- Server Components 在服务端执行，使用 Node.js 调试器
- Client Components 在浏览器执行，使用 Chrome 调试器
- API Routes 在服务端执行
- console.log 在 Server Components 中输出到终端
- console.log 在 Client Components 中输出到浏览器控制台

### Webpack

**调试构建过程：**
```json
{
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/webpack",
  "args": [
    "--config",
    "webpack.config.js",
    "--mode",
    "development"
  ]
}
```

**调试 Dev Server：**
```json
{
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/webpack",
  "args": [
    "serve",
    "--config",
    "webpack.config.js"
  ]
}
```

**调试要点：**
- 在 webpack.config.js 中设置断点观察配置加载
- 在 Plugin 的 apply 方法中设置断点
- 在 Hook 回调中设置断点观察编译过程
- 使用 compilation.assets 查看生成的文件

### TypeScript 独立调试

**使用 tsx（推荐）：**
```json
{
  "type": "node",
  "request": "launch",
  "program": "${file}",
  "runtimeArgs": ["-r", "tsx/cjs"]
}
```

**使用 ts-node：**
```json
{
  "type": "node",
  "request": "launch",
  "program": "${file}",
  "runtimeArgs": ["-r", "ts-node/register"],
  "env": {
    "TS_NODE_PROJECT": "${workspaceFolder}/tsconfig.json"
  }
}
```

**tsx vs ts-node：**
- tsx: 启动快，不做类型检查，基于 esbuild
- ts-node: 完整类型检查，启动较慢
- 日常调试推荐 tsx，CI/CD 推荐 ts-node

**调试要点：**
- 泛型类型在运行时被擦除，调试时看不到类型参数
- 接口和类型别名不存在于运行时
- 装饰器是运行时特性，可以设置断点

### Rust

**调试二进制：**
```json
{
  "type": "lldb",
  "request": "launch",
  "cargo": {
    "args": ["build", "--bin=hello"]
  }
}
```

**调试测试：**
```json
{
  "type": "lldb",
  "request": "launch",
  "cargo": {
    "args": ["test", "--no-run"]
  }
}
```

## 调试技巧

### 断点类型

#### 1. 普通断点

点击行号左侧设置断点。

#### 2. 条件断点

右键断点 → 编辑断点 → 添加条件：
```javascript
count > 10
user.name === 'admin'
items.length === 0
```

#### 3. 日志断点

不中断执行，只输出日志：
```
当前值: {variable}
用户: {user.name}, 年龄: {user.age}
```

#### 4. 函数断点

调试面板 → 断点 → + → 输入函数名

### 调试控制

| 快捷键 | 操作 | 说明 |
|--------|------|------|
| F5 | 继续 | 运行到下一个断点 |
| F10 | 单步跳过 | 不进入函数内部 |
| F11 | 单步进入 | 进入函数内部 |
| Shift+F11 | 单步跳出 | 跳出当前函数 |
| Ctrl+Shift+F5 | 重启 | 重新开始调试 |
| Shift+F5 | 停止 | 停止调试 |

### 调试面板

#### Variables（变量）

查看当前作用域的所有变量：
- 局部变量
- 全局变量
- 闭包变量

#### Watch（监视）

添加表达式实时监视：
```javascript
user.name
items.length
calculateTotal()
```

#### Call Stack（调用栈）

查看函数调用链，可以：
- 点击栈帧跳转到对应代码
- 查看每个栈帧的变量

#### Breakpoints（断点）

管理所有断点：
- 启用/禁用断点
- 删除断点
- 查看断点条件

#### Debug Console（调试控制台）

在当前上下文执行代码：
```javascript
// 查看变量
console.log(user)

// 修改变量
user.name = 'test'

// 执行函数
calculate(10, 20)

// 查看表达式
items.filter(i => i.price > 100)
```

### 调试技巧

#### 1. 使用 debugger 语句

```javascript
function process(data) {
  debugger; // 自动触发断点
  return data.map(x => x * 2)
}
```

#### 2. 条件日志

结合条件断点和日志断点：
```javascript
// 条件: count > 10
// 日志: 大数值: {count}
```

#### 3. 异常断点

调试面板 → 断点 → 勾选"未捕获的异常"

#### 4. 跳过文件

```json
{
  "skipFiles": [
    "<node_internals>/**",
    "**/node_modules/**",
    "**/dist/**"
  ]
}
```

#### 5. Source Map

确保启用 Source Map：

**TypeScript:**
```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

**Vite:**
```javascript
export default {
  build: {
    sourcemap: true
  }
}
```

#### 6. 环境变量

```json
{
  "env": {
    "NODE_ENV": "development",
    "DEBUG": "*",
    "LOG_LEVEL": "debug"
  }
}
```

#### 7. 调试多个进程

使用复合配置：
```json
{
  "compounds": [
    {
      "name": "前后端",
      "configurations": ["后端", "前端"]
    }
  ]
}
```

## 常见问题

### 断点不生效

**可能原因：**
1. Source Map 未启用
2. 代码已被压缩/混淆
3. 路径映射不正确

**解决方案：**
1. 检查 `sourceMap: true`
2. 使用 Debug 构建
3. 检查 `webRoot` / `cwd` 配置

### 找不到模块

**可能原因：**
1. 路径不正确
2. 依赖未安装
3. TypeScript 路径映射

**解决方案：**
```json
{
  "cwd": "${workspaceFolder}",
  "runtimeArgs": ["-r", "tsconfig-paths/register"]
}
```

### 调试很慢

**优化方案：**
1. 启用 `skipFiles`
2. 禁用不必要的断点
3. 使用条件断点而不是频繁的普通断点

### Source Map 问题

**检查清单：**
- [ ] `sourceMap: true` 已设置
- [ ] Source Map 文件已生成
- [ ] 路径映射正确
- [ ] 未使用 `eval` source map

### 环境变量不生效

**确保：**
1. 在 launch.json 中设置 `env`
2. 或使用 `.env` 文件 + `dotenv`
3. 检查变量名是否正确

### Chrome 无法附加

**检查：**
1. Chrome 是否以调试模式启动
2. 端口是否正确（默认 9222）
3. 是否有其他调试器占用

### Rust 调试无法启动

**检查：**
1. CodeLLDB 扩展已安装
2. 使用 Debug 构建（不是 --release）
3. Cargo.toml 配置正确

## 高级主题

### 远程调试

```json
{
  "type": "node",
  "request": "attach",
  "address": "192.168.1.100",
  "port": 9229
}
```

### Docker 调试

```json
{
  "type": "node",
  "request": "attach",
  "port": 9229,
  "localRoot": "${workspaceFolder}",
  "remoteRoot": "/app"
}
```

### 性能分析

使用 Chrome DevTools 的 Performance 面板。

### 内存调试

使用 Chrome DevTools 的 Memory 面板。

## 资源链接

- [VSCode 调试文档](https://code.visualstudio.com/docs/editor/debugging)
- [Node.js 调试指南](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools/)
- [LLDB 文档](https://lldb.llvm.org/)

## 快速参考

### 调试流程

1. 设置断点
2. 选择调试配置
3. 按 F5 启动调试
4. 使用 F10/F11 单步调试
5. 在 Variables 面板查看变量
6. 在 Debug Console 执行代码
7. 修复问题并重启

### 常用快捷键

| 操作 | Windows/Linux | macOS |
|------|---------------|-------|
| 开始调试 | F5 | F5 |
| 单步跳过 | F10 | F10 |
| 单步进入 | F11 | F11 |
| 单步跳出 | Shift+F11 | Shift+F11 |
| 停止调试 | Shift+F5 | Shift+F5 |
| 重启调试 | Ctrl+Shift+F5 | Cmd+Shift+F5 |
| 切换断点 | F9 | F9 |

### 最佳实践

1. **使用有意义的配置名称**
2. **善用条件断点**
3. **启用 Source Map**
4. **配置 skipFiles**
5. **使用 Watch 监视关键变量**
6. **善用 Debug Console**
7. **记录调试步骤**
8. **版本控制 launch.json**

---

祝你调试愉快！如有问题，请查阅各子包的 README 文档。
