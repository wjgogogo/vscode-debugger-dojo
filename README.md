# VSCode Debugger Dojo

这是一个全面的 VSCode Debugger 调试示例项目，涵盖了各种常见场景的调试配置。

## 项目特色

- ✅ 30+ 调试配置示例，覆盖前端、后端、测试等多种场景
- ✅ 详细的配置说明和调试技巧
- ✅ 每个场景都有独立的 README 和示例代码
- ✅ 支持快捷键 F5 一键调试
- ✅ 完整的 Source Map 支持
- ✅ monorepo 结构，便于管理和学习

## 项目结构

```
vscode-debugger-dojo/
├── packages/
│   ├── vite-react-demo/        # Vite + React 项目调试（Launch & Attach + user-data-dir）
│   ├── nextjs-demo/            # Next.js 全栈调试（客户端 + 服务端 + API Routes）
│   ├── node-demo/              # Node.js / Express 后端调试
│   ├── jest-demo/              # Jest 单测调试
│   ├── vitest-demo/            # Vitest 单测调试
│   ├── npm-script-demo/        # npm script 调试
│   ├── webpack-demo/           # Webpack 构建调试（配置、Plugin、Loader）
│   ├── puppeteer-demo/         # Puppeteer 自动化调试（user-data-dir 保存登录）
│   ├── typescript-demo/        # TypeScript 独立调试（ts-node & tsx）
│   └── rust-demo/              # Rust 项目 codelldb 调试
├── .vscode/
│   ├── launch.json             # 统一的调试配置文件（30+ 配置）
│   ├── tasks.json              # 任务配置
│   └── settings.json           # 工作区设置
├── LAUNCH_CONFIG_REFERENCE.md  # launch.json 配置完整参考
└── DEBUGGING_GUIDE.md          # 调试指南
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 选择你想要调试的场景

在 VSCode 的调试面板（Ctrl/Cmd + Shift + D）中选择对应的调试配置：

#### 快捷调试（按 F5 直接调试当前文件）
- **🚀 Debug Current File - Jest**: 调试当前打开的 Jest 测试文件
- **🚀 Debug Current File - Vitest**: 调试当前打开的 Vitest 测试文件

#### 前端调试
- **Vite React - Launch**: 启动 Vite 开发服务器并调试
- **Vite React - Launch (保存登录状态)**: 使用 userDataDir 保存登录状态
- **Vite React - Attach**: 附加到已运行的 Vite 服务器
- **Next.js - Full Stack**: 同时调试客户端和服务端
- **Next.js - Server**: 仅调试服务端（API Routes + Server Components）
- **Next.js - Attach Client**: 附加到已运行的 Next.js 客户端

#### 后端调试
- **Node.js - Launch**: 启动并调试 Node.js/Express 应用
- **Node.js - Attach**: 附加到已运行的 Node.js 进程

#### 构建工具调试
- **Webpack - Build**: 调试 Webpack 配置和构建过程
- **Webpack - Dev Server**: 调试 Webpack Dev Server 和热更新
- **npm script - Build/Deploy**: 调试 npm 脚本

#### TypeScript 调试
- **TypeScript - Current File (tsx)**: 使用 tsx 调试当前 TS 文件（推荐，更快）
- **TypeScript - Current File (ts-node)**: 使用 ts-node 调试当前 TS 文件

#### 测试调试
- **Jest - Current File**: 调试当前 Jest 测试文件
- **Jest - All Tests**: 调试所有 Jest 测试
- **Vitest - Current File**: 调试当前 Vitest 测试文件
- **Vitest - All Tests**: 调试所有 Vitest 测试

#### 自动化测试调试
- **Puppeteer - Current File**: 调试当前 Puppeteer 脚本
- **Puppeteer - Scrape (有头模式)**: 显示浏览器，保存登录状态
- **Puppeteer - Scrape (无头模式)**: 快速执行，不显示浏览器
- **Puppeteer - Test UI**: UI 自动化测试调试
- **Puppeteer - Screenshot**: 批量截图调试

#### Rust 调试
- **Rust - Debug hello/calculator**: 调试 Rust 二进制程序
- **Rust - Debug Tests**: 调试 Rust 测试

### 3. 设置断点并开始调试

在代码中设置断点（点击行号左侧），然后按 F5 开始调试。

## 各场景详细说明

### 前端调试

#### Vite + React 调试（vite-react-demo）
- **Launch 模式**: 自动启动开发服务器并附加调试器
- **Launch + userDataDir**: 保存 Cookies 和登录状态，支持 React DevTools
- **Attach 模式**: 手动启动服务器后附加调试器
- 完整的 Source Map 支持，可以在 TypeScript/JSX 源码中直接调试
- 支持热更新（HMR）调试

详见：[vite-react-demo/README.md](./packages/vite-react-demo/README.md)

#### Next.js 全栈调试（nextjs-demo）
- **Full Stack 模式**: 同时调试客户端和服务端代码
- **Server 模式**: 仅调试 API Routes 和 Server Components
- **Attach Client**: 附加到已运行的客户端
- 支持 App Router（Next.js 13+）
- 支持 Server Components 和 Client Components 混合调试
- 支持 API Routes 调试
- 支持 Middleware 调试

详见：[nextjs-demo/README.md](./packages/nextjs-demo/README.md)

### 后端调试

#### Node.js / Express 调试（node-demo）
- 支持 TypeScript（使用 tsx）
- 支持环境变量配置
- 支持 Attach 模式（配合 nodemon）
- Express 路由和中间件调试
- 异步函数调试
- 错误处理调试

详见：[node-demo/README.md](./packages/node-demo/README.md)

### 构建工具调试

#### Webpack 调试（webpack-demo）
- 调试 webpack.config.js 配置逻辑
- 调试自定义 Plugin（apply、hooks）
- 调试自定义 Loader
- 调试构建过程（compilation、chunks、assets）
- 调试 Dev Server 和热更新
- Source Map 配置调试

详见：[webpack-demo/README.md](./packages/webpack-demo/README.md)

### TypeScript 调试

#### TypeScript 独立调试（typescript-demo）
- **tsx 模式**（推荐）：极快的启动速度，基于 esbuild
- **ts-node 模式**：完整的类型检查，传统方案
- 调试泛型函数和类
- 调试装饰器
- 调试类型守卫
- 调试异步函数
- 调试联合类型和交叉类型

详见：[typescript-demo/README.md](./packages/typescript-demo/README.md)

### 测试调试

#### Jest 单测调试（jest-demo）
- F5 快捷调试当前测试文件
- 支持调试单个测试文件或所有测试
- 支持调试特定的测试用例（it/test）
- 支持 beforeEach/afterEach 调试
- 支持 Mock 函数调试

详见：[jest-demo/README.md](./packages/jest-demo/README.md)

#### Vitest 单测调试（vitest-demo）
- F5 快捷调试当前测试文件
- 基于 Vite，启动速度极快
- 原生支持 ESM 和 TypeScript
- 与 Jest API 兼容
- 自动检测调试器并禁用并行执行

详见：[vitest-demo/README.md](./packages/vitest-demo/README.md)

### npm script 调试

#### npm script 调试（npm-script-demo）
- 调试 package.json 中的自定义脚本
- 支持复杂的构建流程调试
- 支持多脚本链式调用调试
- 支持 pre/post hooks 调试

详见：[npm-script-demo/README.md](./packages/npm-script-demo/README.md)

### 浏览器自动化调试

#### Puppeteer 调试（puppeteer-demo）
- **有头模式 + userDataDir**: 显示浏览器，保存登录状态和 Cookies
- **无头模式**: 快速执行，适合 CI/CD
- slowMo 慢动作模式方便观察
- 自动打开 DevTools
- 支持网页爬虫调试
- 支持 UI 自动化测试调试
- 支持批量截图调试

详见：[puppeteer-demo/README.md](./packages/puppeteer-demo/README.md)

### 系统编程调试

#### Rust 调试（rust-demo）
- 使用 CodeLLDB 扩展
- 支持断点、条件断点、日志断点
- 支持变量查看、调用栈、监视表达式
- 支持调试二进制程序（bin）
- 支持调试单元测试和集成测试

详见：[rust-demo/README.md](./packages/rust-demo/README.md)

## 常用调试技巧

### 断点类型

1. **普通断点**: 点击行号左侧
2. **条件断点**: 右键断点 → 编辑断点 → 添加条件
3. **日志断点**: 不中断执行，只输出日志
4. **函数断点**: 在特定函数入口处中断

### 调试面板功能

- **Variables**: 查看当前作用域的变量
- **Watch**: 监视特定表达式的值
- **Call Stack**: 查看函数调用栈
- **Breakpoints**: 管理所有断点
- **Debug Console**: 在当前上下文执行代码

### 调试控制

- **F5**: 继续执行
- **F10**: 单步跳过（Step Over）
- **F11**: 单步进入（Step Into）
- **Shift + F11**: 单步跳出（Step Out）
- **Ctrl/Cmd + Shift + F5**: 重启调试
- **Shift + F5**: 停止调试

## 文档资源

### 核心文档
- **[LAUNCH_CONFIG_REFERENCE.md](./LAUNCH_CONFIG_REFERENCE.md)**: launch.json 配置完整参考，包含所有 30+ 配置的详细说明
- **[DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)**: 调试指南，包含最佳实践和常见问题解决方案
- **[.vscode/launch.json](./.vscode/launch.json)**: 统一的调试配置文件，包含详细注释

### 各场景文档
每个 packages 子目录都有独立的 README.md，包含：
- 场景详细说明
- 配置参数解析
- 调试技巧和要点
- 常见问题解决
- 进阶技巧

## 核心概念

### Launch vs Attach

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| Launch | 由调试器启动程序 | 从零开始调试 |
| Attach | 附加到已运行的进程 | 服务已启动，随时附加调试 |

### Source Map

Source Map 是调试编译后代码的关键：
- TypeScript → JavaScript
- JSX → JavaScript
- Minified → Original
- Webpack Bundle → Source Files

确保配置文件中启用 Source Map：
```json
// tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true
  }
}

// vite.config.ts / webpack.config.js
{
  build: {
    sourcemap: true
  }
}
```

### userDataDir（Chrome）

保存浏览器状态的目录，包含：
- Cookies 和登录 Session
- LocalStorage / SessionStorage
- 浏览器扩展（如 React DevTools）
- 浏览器设置和主题

适用于：
- Vite React 调试（保存登录状态）
- Puppeteer 爬虫（避免重复登录）
- 需要特定浏览器扩展的调试

### 环境变量配置

三种方式设置环境变量：

1. **launch.json 中直接设置**
```json
{
  "env": {
    "NODE_ENV": "development",
    "DEBUG": "true"
  }
}
```

2. **.env 文件**
```json
{
  "envFile": "${workspaceFolder}/.env"
}
```

3. **Puppeteer 环境变量模式**
```json
{
  "env": {
    "HEADLESS": "false",
    "SLOWMO": "100"
  }
}
```

## 依赖环境

- Node.js >= 18
- pnpm >= 8
- VSCode >= 1.80
- Rust（仅 rust-demo 需要）

## VSCode 扩展推荐

- **Debugger for Chrome**: Chrome 调试
- **JavaScript Debugger**: 内置 JS/TS 调试器
- **CodeLLDB**: Rust 调试
- **Jest**: Jest 测试支持
- **Vitest**: Vitest 测试支持

## 许可证

MIT
