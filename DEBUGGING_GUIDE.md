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

**Launch 模式（标准）：**
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "preLaunchTask": "vite-react: dev",
  "serverReadyAction": {
    "pattern": "Local:.*",
    "action": "openExternally"
  },
  "runtimeArgs": ["--auto-open-devtools-for-tabs"],
  "postDebugTask": "kill-vite-react-dev"
}
```

**Launch 模式（保存登录状态）：**
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch (自定义用户信息)",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "preLaunchTask": "vite-react: dev",
  "userDataDir": "${workspaceFolder}/packages/vite-react-demo/.chrome-data",
  "serverReadyAction": {
    "pattern": "Local:.*",
    "action": "openExternally"
  },
  "runtimeArgs": ["--auto-open-devtools-for-tabs"],
  "postDebugTask": "kill-vite-react-dev"
}
```

**Attach 模式：**
```json
{
  "type": "chrome",
  "request": "attach",
  "name": "Vite React - Attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}/packages/vite-react-demo"
}
```

**关键参数说明：**
- `preLaunchTask`: 启动调试前执行的任务（通常启动开发服务器）
- `postDebugTask`: 调试结束后执行的任务（通常清理进程）
- `serverReadyAction`: 检测服务器就绪后自动打开浏览器
- `userDataDir`: 保存 Chrome 用户数据（Cookies、扩展、设置等）
- `--auto-open-devtools-for-tabs`: 自动打开 DevTools

### Express

**Launch 模式（推荐）：**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Express - Launch",
  "program": "${workspaceFolder}/packages/express-demo/src/index.ts",
  "runtimeArgs": ["-r", "tsx/cjs"],
  "console": "integratedTerminal",
  "cwd": "${workspaceFolder}/packages/express-demo",
  "env": {
    "NODE_ENV": "development",
    "PORT": "3000"
  },
  "skipFiles": ["<node_internals>/**"],
  "serverReadyAction": {
    "pattern": "(http://localhost:\\d+)",
    "uriFormat": "%s",
    "action": "openExternally"
  }
}
```

**Attach 模式（配合 nodemon）：**
```json
{
  "type": "node",
  "request": "attach",
  "name": "Express - Attach",
  "port": 9229,
  "restart": true,
  "skipFiles": ["<node_internals>/**"]
}
```

**使用 Attach 模式的步骤：**
1. 在 package.json 中配置 `"start:inspect": "nodemon --inspect src/index.ts"`
2. 终端运行 `pnpm start:inspect`
3. VSCode 选择 "Express - Attach" 配置并按 F5

**关键参数说明：**
- `runtimeArgs: ["-r", "tsx/cjs"]`: 使用 tsx 运行 TypeScript 文件（推荐，速度快）
- `serverReadyAction`: 检测服务器启动后自动打开浏览器
- `restart: true`: 程序文件改变时自动重启调试器（Attach 模式）
- `env`: 设置环境变量

### Jest 测试

**调试当前文件：**
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

**调试所有测试：**
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
  "console": "integratedTerminal"
}
```

**关键参数说明：**
- `--runInBand`: 串行运行测试（不使用多进程），调试必需，会降低速度
- `--no-coverage`: 禁用代码覆盖率收集，加快调试速度
- `--config`: 明确指定 Jest 配置文件路径
- `cwd`: 工作目录，影响相对路径的解析

### Vitest 测试

**调试当前文件：**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest - Current File",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["vitest", "run", "${file}"],
  "cwd": "${workspaceFolder}/packages/vitest-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**调试所有测试：**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest - All Tests",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["vitest", "run"],
  "cwd": "${workspaceFolder}/packages/vitest-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**Watch 模式（自动重新运行）：**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest - Watch Mode",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["vitest"],
  "cwd": "${workspaceFolder}/packages/vitest-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**关键参数说明：**
- `pnpm vitest run`: 单次运行模式（调试模式）
- `pnpm vitest`: watch 模式，文件变化时自动重新运行
- Vitest 会自动检测调试器并禁用并行执行
- `runtimeExecutable: "pnpm"`: 通过 pnpm 调用 vitest 命令

### npm scripts

**通过 npm 运行脚本：**
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

**在集成终端中运行脚本（node-terminal）：**
```json
{
  "type": "node-terminal",
  "name": "npm script - Start (Terminal)",
  "request": "launch",
  "command": "npm start",
  "cwd": "${workspaceFolder}/packages/npm-script-demo"
}
```

**关键参数说明：**
- `runtimeExecutable: "npm"`: 使用 npm 作为运行时
- `runtimeArgs: ["run-script", "start"]`: 相当于 `npm run-script start`
- `type: "node-terminal"`: 在集成终端中运行（不是调试模式）
- `--config`: 指定脚本配置文件路径

### Puppeteer

**自动填表脚本调试：**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Auto Fill Form",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/auto-fill-form.js",
  "cwd": "${workspaceFolder}/packages/puppeteer-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
  "env": {
    "HEADLESS": "false"
  },
  "preLaunchTask": "puppeteer-demo: start-server",
  "postDebugTask": "kill-puppeteer-demo-dev"
}
```

**Chrome 浏览器调试（附加）：**
```json
{
  "type": "chrome",
  "request": "attach",
  "name": "Puppeteer - Chrome Attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}/packages/puppeteer-demo",
  "urlFilter": "http://localhost:5173/*",
  "skipFiles": ["<node_internals>/**", "**/node_modules/**"]
}
```

**Full Stack Compound：**
```json
{
  "name": "Puppeteer - Full Stack",
  "configurations": [
    "Puppeteer - Auto Fill Form",
    "Puppeteer - Chrome Attach"
  ],
  "stopAll": true
}
```

**关键参数说明：**
- `HEADLESS=false`: 显示浏览器窗口（非无头模式）
- `--remote-debugging-port=9222`: Chrome 远程调试端口
- `preLaunchTask`: 启动前自动启动开发服务器
- `postDebugTask`: 调试结束后自动清理进程
- `urlFilter`: 只附加到特定 URL 的标签页

### Next.js

**全栈调试方式一：debugWithChrome（推荐）**
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

**全栈调试方式二：startDebugging（自动启动）**
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

配合客户端配置：
```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Next.js - Client Launch",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/packages/nextjs-demo"
}
```

**全栈调试方式三：Compound（完全控制）**
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

**仅服务端调试：**
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

**三种方式对比：**

| 方式            | 优点                     | 缺点                       | 适用场景                   |
| --------------- | ------------------------ | -------------------------- | -------------------------- |
| debugWithChrome | 配置简单，自动启动浏览器 | 调试会话合并，控制粒度较粗 | 日常开发，快速全栈调试     |
| startDebugging  | 自动化程度高，会话独立   | 配置稍复杂，需要两个配置   | 需要独立控制服务器和客户端 |
| Compound        | 完全手动控制，灵活性最高 | 需要手动管理多个会话       | 复杂调试场景，需要精细控制 |

**关键要点：**
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
  "name": "Webpack - Build",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["run", "build:dev"],
  "cwd": "${workspaceFolder}/packages/webpack-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**调试 Dev Server 并在浏览器中调试：**
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
  "postDebugTask": "kill-webpack-serve"
}
```

**调试要点：**
- 在 webpack.config.js 中设置断点观察配置加载
- 在 Plugin 的 apply 方法中设置断点
- 在 Hook 回调中设置断点观察编译过程
- 使用 compilation.assets 查看生成的文件
- 在浏览器中调试打包后的代码

### TypeScript 独立调试

**使用 tsx（推荐，启动快）：**
```json
{
  "type": "node",
  "request": "launch",
  "name": "TypeScript - Current File (tsx)",
  "program": "${file}",
  "runtimeArgs": ["-r", "tsx/cjs"],
  "cwd": "${workspaceFolder}/packages/typescript-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"]
}
```

**使用 ts-node（完整类型检查）：**
```json
{
  "type": "node",
  "request": "launch",
  "name": "TypeScript - Current File (ts-node)",
  "program": "${file}",
  "runtimeArgs": ["-r", "ts-node/register"],
  "cwd": "${workspaceFolder}/packages/typescript-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "skipFiles": ["<node_internals>/**"],
  "env": {
    "TS_NODE_PROJECT": "${workspaceFolder}/packages/typescript-demo/tsconfig.json"
  }
}
```

**tsx vs ts-node 对比：**

| 特性     | tsx                  | ts-node          |
| -------- | -------------------- | ---------------- |
| 启动速度 | 极快（基于 esbuild） | 较慢             |
| 类型检查 | 无                   | 完整             |
| 适用场景 | 日常调试开发         | CI/CD 和严格检查 |
| 推荐度   | ⭐⭐⭐⭐⭐                | ⭐⭐⭐              |

**调试要点：**
- 泛型类型在运行时被擦除，调试时看不到类型参数
- 接口和类型别名不存在于运行时
- 装饰器是运行时特性，可以设置断点
- 可以在 Debug Console 中直接执行 TypeScript 代码

### Rust

**调试二进制程序：**
```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug hello",
  "cargo": {
    "args": [
      "build",
      "--bin=hello",
      "--package=rust-demo",
      "--manifest-path=${workspaceFolder}/packages/rust-demo/Cargo.toml"
    ],
    "filter": {
      "name": "hello",
      "kind": "bin"
    }
  },
  "args": [],
  "cwd": "${workspaceFolder}/packages/rust-demo",
  "sourceLanguages": ["rust"]
}
```

**调试所有单元和集成测试：**
```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug All Tests",
  "cargo": {
    "args": [
      "test",
      "--no-run",
      "--lib",
      "--package=rust-demo",
      "--manifest-path=${workspaceFolder}/packages/rust-demo/Cargo.toml"
    ]
  },
  "args": ["--nocapture", "--test-threads=1"],
  "cwd": "${workspaceFolder}/packages/rust-demo",
  "sourceLanguages": ["rust"],
  "env": {
    "RUST_BACKTRACE": "short"
  }
}
```

**调试特定测试：**
```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug Specific Test",
  "cargo": {
    "args": [
      "test",
      "--no-run",
      "--lib",
      "--package=rust-demo",
      "--manifest-path=${workspaceFolder}/packages/rust-demo/Cargo.toml"
    ]
  },
  "args": ["${input:rustTestName}", "--nocapture", "--test-threads=1"],
  "cwd": "${workspaceFolder}/packages/rust-demo",
  "sourceLanguages": ["rust"],
  "env": {
    "RUST_BACKTRACE": "short"
  }
}
```

**关键参数说明：**
- `type: "lldb"`: 使用 LLDB 调试器（需要安装 CodeLLDB 扩展）
- `--bin=hello`: 调试指定名称的二进制程序
- `--no-run`: 编译但不运行测试
- `--test-threads=1`: 单线程运行测试（便于调试）
- `--nocapture`: 显示 println! 的输出
- `RUST_BACKTRACE=short`: 显示简短的堆栈跟踪
- `${input:rustTestName}`: 允许用户输入测试函数名

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
