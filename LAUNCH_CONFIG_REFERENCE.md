# VSCode Launch.json 配置完整参考

本文档详细解释项目中所有 launch.json 配置的参数和使用场景。

## 目录

- [Jest 调试配置](#jest-调试配置)
- [Vitest 调试配置](#vitest-调试配置)
- [Vite + React 调试配置](#vite--react-调试配置)
- [Next.js 调试配置](#nextjs-调试配置)
- [Webpack 调试配置](#webpack-调试配置)
- [TypeScript 调试配置](#typescript-调试配置)
- [Express 调试配置](#express-调试配置)
- [npm script 调试配置](#npm-script-调试配置)
- [Puppeteer 调试配置](#puppeteer-调试配置)
- [Rust 调试配置](#rust-调试配置)
- [VSCode 变量参考](#vscode-变量参考)
- [常用配置参数说明](#常用配置参数说明)

---

## Jest 调试配置

### Jest - Current File

**用途**: 调试当前打开的 Jest 测试文件。

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
  "internalConsoleOptions": "neverOpen",
  "presentation": {
    "group": "01. Jest",
    "order": 1
  }
}
```

**参数说明**:

| 参数 | 说明 |
|------|------|
| `program` | Jest CLI 的绝对路径 |
| `args` | 传递给 Jest 的参数数组 |
| `${relativeFile}` | 相对于 `cwd` 的文件路径 |
| `--config` | 指定 Jest 配置文件的完整路径 |
| `--runInBand` | 串行运行测试（调试必需） |
| `--no-coverage` | 禁用代码覆盖率收集，加快调试 |
| `cwd` | 工作目录，影响相对路径的解析 |
| `presentation.group` | 调试配置分组名称 |
| `presentation.order` | 同组配置中的显示顺序 |

**使用场景**:
- 打开任意 `.test.ts` 或 `.test.js` 文件
- 快速调试单个测试文件

---

### Jest - All Tests

**用途**: 调试所有 Jest 测试。

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
  "internalConsoleOptions": "neverOpen",
  "presentation": {
    "group": "01. Jest",
    "order": 2
  }
}
```

**使用场景**:
- 调试整个测试套件
- 排查测试之间的相互影响

---

## Vite + React 调试配置

### Vite React - Launch

**用途**: 启动新的 Chrome 实例并自动打开应用进行调试。

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

**参数说明**:

| 参数 | 说明 |
|------|------|
| `type: "chrome"` | 使用 Chrome/Edge 调试器 |
| `request: "launch"` | 启动新的浏览器实例 |
| `url` | 应用的访问地址 |
| `webRoot` | 项目根目录，用于映射源码路径 |
| `sourceMaps: true` | 启用 Source Map 支持，映射编译后的代码到源码 |
| `preLaunchTask` | 启动调试前执行的任务（定义在 tasks.json 中） |
| `runtimeArgs` | Chrome 启动参数 |
| `--auto-open-devtools-for-tabs` | 自动打开 DevTools |

**使用场景**:
- 从零开始启动调试会话
- 需要干净的浏览器环境
- 开发服务器未启动时

**工作流程**:
1. 执行 preLaunchTask（启动 Vite dev server）
2. 等待服务器就绪
3. 启动 Chrome 并访问 url
4. 自动打开 DevTools
5. 建立调试连接

**注意事项**:
- 每次启动都是全新的浏览器会话，不保存数据
- preLaunchTask 必须在 tasks.json 中定义
- 端口号需要与 Vite 配置保持一致

---

### Vite React - Launch (自定义用户信息)

**用途**: 启动 Chrome 调试时保存登录状态、Cookies 和浏览器扩展。

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch (自定义用户信息)",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "preLaunchTask": "vite-react: dev",
  "serverReadyAction": {
    "pattern": "Local:.*",
    "action": "openExternally"
  },
  "userDataDir": "${workspaceFolder}/packages/vite-react-demo/.chrome-data",
  "runtimeArgs": ["--auto-open-devtools-for-tabs"],
  "postDebugTask": "kill-vite-react-dev"
}
```

**新增参数**:

| 参数 | 说明 |
|------|------|
| `userDataDir` | Chrome 用户数据目录，保存所有浏览器状态 |

**userDataDir 保存的内容**:
- Cookies 和登录 Session
- LocalStorage 和 SessionStorage
- IndexedDB 数据
- 浏览器扩展（如 React DevTools）
- 浏览器设置和主题
- 浏览历史和书签

**使用场景**:
1. **调试需要登录的应用**
   - 首次调试时在浏览器中登录
   - 登录信息保存到 .chrome-data 目录
   - 后续调试自动恢复登录状态

2. **保持开发环境一致**
   - 浏览器扩展保持启用
   - DevTools 设置保持不变
   - 主题和外观一致

3. **多账号调试**
   ```json
   // 不同账号使用不同的 userDataDir
   "userDataDir": "${workspaceFolder}/.chrome-data-admin"
   "userDataDir": "${workspaceFolder}/.chrome-data-user"
   ```

**最佳实践**:
- 将 userDataDir 添加到 .gitignore
- 定期清理 userDataDir（可能会很大）
- 不要在多个调试会话中共享同一个 userDataDir

---

### Vite React - Attach

**用途**: 附加到已运行的 Chrome 实例进行调试。

```json
{
  "type": "chrome",
  "request": "attach",
  "name": "Vite React - Attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "sourceMaps": true
}
```

**参数说明**:

| 参数 | 说明 |
|------|------|
| `request: "attach"` | 附加到现有进程，而不是启动新进程 |
| `port: 9222` | Chrome 远程调试端口 |

**使用前提**:

需要以调试模式启动 Chrome：

```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Windows
chrome.exe --remote-debugging-port=9222

# Linux
google-chrome --remote-debugging-port=9222
```

**Launch vs Attach 对比**:

| 特性 | Launch | Attach |
|------|--------|--------|
| 启动方式 | 自动启动新 Chrome 实例 | 附加到已运行的 Chrome |
| 浏览器数据 | 默认不保存（除非使用 userDataDir） | 使用当前浏览器的数据 |
| 扩展 | 默认禁用（除非使用 userDataDir） | 使用已安装的扩展 |
| 灵活性 | 低，每次都是新会话 | 高，可以随时附加/分离 |
| 适用场景 | 开发调试 | 已有浏览器会话，或需要特定扩展 |

---

## Vitest 调试配置

### Vitest - Current File

**用途**: 调试当前打开的 Vitest 测试文件。

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
  "skipFiles": ["<node_internals>/**"],
  "presentation": {
    "group": "02. Vitest",
    "order": 1
  }
}
```

**参数说明**:
- `runtimeExecutable: "pnpm"`: 使用 pnpm 作为运行时
- `runtimeArgs`: pnpm 的参数
  - `vitest`: vitest 命令
  - `run`: 单次运行模式
  - `${file}`: 当前文件路径
- Vitest 会自动检测调试器并禁用并行执行

---

### Vitest - All Tests

**用途**: 调试所有 Vitest 测试。

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
  "skipFiles": ["<node_internals>/**"],
  "presentation": {
    "group": "02. Vitest",
    "order": 2
  }
}
```

---

### Vitest - Watch Mode

**用途**: Vitest 监视模式，文件变化时自动重新运行测试。

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
  "skipFiles": ["<node_internals>/**"],
  "presentation": {
    "group": "02. Vitest",
    "order": 3
  }
}
```

**参数说明**:
- `pnpm vitest`: 默认启动 watch 模式
- 适合持续开发和调试

---

## Express 调试配置

### Express - Launch

**用途**: 启动并调试 Express 服务器。

```json
{
  "type": "node",
  "request": "launch",
  "name": "Express - Launch",
  "program": "${workspaceFolder}/packages/express-demo/src/index.ts",
  "runtimeArgs": ["-r", "tsx/cjs"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
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
  },
  "presentation": {
    "group": "07. Express",
    "order": 1
  }
}
```

**参数说明**:

| 参数 | 说明 |
|------|------|
| `program` | 要调试的入口文件（TypeScript） |
| `runtimeArgs` | Node.js 启动参数 |
| `-r tsx/cjs` | 使用 tsx 加载器支持 TypeScript（推荐，速度快） |
| `env` | 环境变量对象 |
| `NODE_ENV` | Node.js 环境模式（development/production） |
| `PORT` | 应用端口号 |
| `serverReadyAction` | 检测服务器启动后自动打开浏览器 |

**TypeScript 支持方案对比**:

| 方案 | 优点 | 缺点 |
|------|------|------|
| `-r tsx/cjs` | 无需编译，极快 | 无完整类型检查 |
| `-r ts-node/register` | 完整类型检查 | 较慢 |
| 预编译 | 运行速度快 | 需要编译步骤 |

---

### Express - Attach

**用途**: 附加到已运行的 Express 进程（通常配合 nodemon 使用）。

```json
{
  "type": "node",
  "request": "attach",
  "name": "Express - Attach",
  "port": 9229,
  "restart": true,
  "skipFiles": ["<node_internals>/**"],
  "presentation": {
    "group": "07. Express",
    "order": 2
  }
}
```

**参数说明**:

| 参数                | 说明                         |
| ------------------- | ---------------------------- |
| `request: "attach"` | 附加到已运行的进程           |
| `port: 9229`        | Node.js 调试协议默认端口     |
| `restart: true`     | 进程重启时自动重新附加调试器 |

**使用步骤**:
1. 在 package.json 中配置脚本：`"start:inspect": "nodemon --inspect src/index.ts"`
2. 终端运行：`pnpm start:inspect`
3. VSCode 选择 "Express - Attach" 并按 F5

**使用场景**:
- Express/Koa 等 Web 框架调试
- API 服务器调试
- 命令行工具调试
- TypeScript 项目调试

---

### Node.js - Attach

**用途**: 附加到已运行的 Node.js 进程。

```json
{
  "type": "node",
  "request": "attach",
  "name": "Node.js - Attach",
  "port": 9229,
  "restart": true,
  "skipFiles": ["<node_internals>/**"]
}
```

**参数说明**:

| 参数 | 说明 |
|------|------|
| `port: 9229` | Node.js 默认调试端口 |
| `restart: true` | 进程重启时自动重新附加 |

**使用前提**:

启动 Node.js 时开启调试模式：

```bash
# 标准调试模式
node --inspect index.js

# 调试模式并立即暂停
node --inspect-brk index.js

# 自定义端口
node --inspect=0.0.0.0:9229 index.js
```

**配合 nodemon 使用**:

```json
// package.json
{
  "scripts": {
    "dev": "nodemon --inspect src/index.ts"
  }
}
```

然后使用 Attach 配置连接，`restart: true` 会在 nodemon 重启时自动重新连接。

---

## Jest 调试配置

### Jest - Current File

**用途**: 调试当前打开的测试文件（与项目配置绑定）。

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest - Current File",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
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

**参数说明**:

| 参数 | 说明 |
|------|------|
| `${relativeFile}` | 相对于 cwd 的文件路径 |
| `--config=...` | 指定 Jest 配置文件路径 |
| `cwd` | 工作目录，影响相对路径解析 |

**${file} vs ${relativeFile}**:

| 变量 | 值示例 | 用途 |
|------|--------|------|
| `${file}` | `/Users/name/project/src/test.ts` | 绝对路径，通用 |
| `${relativeFile}` | `src/test.ts` | 相对路径，依赖 cwd |
| `${fileBasename}` | `test.ts` | 文件名，用于日志 |

**快捷配置 vs 项目配置**:

| 配置 | 🚀 Debug Current File - Jest | Jest - Current File |
|------|------------------------------|---------------------|
| cwd | 工作区根目录 | 具体项目目录 |
| config | 自动查找 | 明确指定 |
| 适用场景 | 快速调试 | 特定项目配置 |

---

### Jest - All Tests

**用途**: 运行并调试所有测试。

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest - All Tests",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": [
    "--runInBand",
    "--config=${workspaceFolder}/packages/jest-demo/jest.config.js"
  ],
  "cwd": "${workspaceFolder}/packages/jest-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

**使用场景**:
- 调试测试套件整体行为
- 排查测试之间的相互影响
- 验证全局 setup/teardown

**性能注意事项**:
- 使用 `--runInBand` 会很慢
- 建议先用 Current File 定位问题
- 可以添加 `--testNamePattern` 过滤测试

---

## Vitest 调试配置

### Vitest - Current File

**用途**: 调试当前 Vitest 测试文件。

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

**参数说明**:

| 参数 | 说明 |
|------|------|
| `vitest` | 直接调用 vitest 命令（通过 pnpm） |
| `run` | 单次运行模式（非 watch） |

**Vitest 特点**:
- 基于 Vite，启动快
- 原生支持 ESM
- 默认并行执行（调试时自动串行）
- 与 Jest API 兼容

---

### Vitest - All Tests

**用途**: 运行所有 Vitest 测试。

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

**调试模式下的差异**:
- Vitest 检测到调试器时自动禁用并行
- 不需要显式传递串行参数
- 保留完整的错误堆栈信息

---

## npm script 调试配置

### npm script - Run Script File

**用途**: 直接运行当前脚本文件。

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

**参数说明**:

| 参数 | 说明 |
|------|------|
| `program: "${file}"` | 直接执行当前文件 |
| `cwd: "${fileDirname}/.."` | 工作目录设为文件所在目录的父目录 |
| `${fileDirname}` | 当前文件所在目录的绝对路径 |

**使用场景**:
- 调试 scripts/ 目录下的构建脚本
- 调试自定义工具脚本
- 不通过 npm run 直接执行

**cwd 设置原因**:
```
packages/npm-script-demo/
├── scripts/
│   └── build.js  ← 当前文件
└── package.json  ← 需要访问这里
```

如果 cwd 是 `scripts/`，读取 package.json 会失败。

---

### npm script - Build / Build Production / Deploy

**用途**: 调试 npm scripts 定义的构建和部署流程。

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

**参数说明**:

| 参数 | 说明 |
|------|------|
| `runtimeExecutable: "npm"` | 使用 npm 作为运行时 |
| `runtimeArgs: ["run", "build"]` | 相当于 `npm run build` |

**调试 npm scripts 的价值**:
- 复杂构建流程可能调用多个脚本
- 可以在任何脚本中设置断点
- 查看脚本之间如何传递数据
- 排查构建失败原因

**package.json 示例**:
```json
{
  "scripts": {
    "build": "node scripts/build.js",
    "build:prod": "cross-env NODE_ENV=production npm run build",
    "deploy": "npm run build:prod && node scripts/deploy.js"
  }
}
```

调试 deploy 时，可以进入 build.js 和 deploy.js 的代码。

---

## Puppeteer 调试配置

### Puppeteer - Current File

**用途**: 调试当前打开的 Puppeteer 脚本。

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Current File",
  "program": "${file}",
  "cwd": "${workspaceFolder}/packages/puppeteer-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "env": {
    "USER_DATA_DIR": "${workspaceFolder}/packages/puppeteer-demo/user-data",
    "HEADLESS": "false",
    "SLOWMO": "100"
  }
}
```

**环境变量说明**:

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `USER_DATA_DIR` | `./user-data` | Chrome 用户数据目录 |
| `HEADLESS` | `false` | 是否无头模式 |
| `SLOWMO` | `100` | 操作延迟（毫秒） |
| `DEVTOOLS` | `false` | 是否自动打开 DevTools |

**在脚本中使用**:

```javascript
const browser = await puppeteer.launch({
  userDataDir: process.env.USER_DATA_DIR || './user-data',
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOWMO || '100'),
  devtools: process.env.DEVTOOLS === 'true',
})
```

---

### Puppeteer - Scrape (有头模式 + user-data-dir)

**用途**: 调试爬虫脚本，显示浏览器，保存登录状态。

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Scrape (有头模式 + user-data-dir)",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/scrape.js",
  "cwd": "${workspaceFolder}/packages/puppeteer-demo",
  "console": "integratedTerminal",
  "env": {
    "USER_DATA_DIR": "${workspaceFolder}/packages/puppeteer-demo/user-data",
    "HEADLESS": "false",
    "SLOWMO": "100",
    "DEVTOOLS": "true"
  }
}
```

**配置特点**:
- `HEADLESS: "false"` - 显示浏览器，方便观察
- `SLOWMO: "100"` - 每个操作延迟 100ms，方便跟踪
- `DEVTOOLS: "true"` - 自动打开 DevTools
- `USER_DATA_DIR` - 保存 Cookies，保持登录

**使用场景**:
- 调试需要登录的网站爬虫
- 观察自动化操作过程
- 排查选择器问题
- 验证页面交互逻辑

---

### Puppeteer - Scrape (无头模式)

**用途**: 快速运行爬虫，不显示浏览器。

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Scrape (无头模式)",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/scrape.js",
  "cwd": "${workspaceFolder}/packages/puppeteer-demo",
  "console": "integratedTerminal",
  "env": {
    "HEADLESS": "true"
  }
}
```

**配置特点**:
- `HEADLESS: "true"` - 无头模式
- 不设置 USER_DATA_DIR - 不保存数据
- 不设置 SLOWMO - 最快速度执行

**使用场景**:
- CI/CD 环境
- 批量处理任务
- 性能测试
- 不需要人工观察的场景

**有头 vs 无头模式对比**:

| 特性 | 有头模式 | 无头模式 |
|------|---------|---------|
| 速度 | 较慢 | 快 |
| 资源占用 | 高 | 低 |
| 可见性 | 可以看到浏览器 | 不可见 |
| 调试 | 容易 | 困难 |
| 适用场景 | 开发调试 | 生产运行 |

---

### Puppeteer - Test UI (保存登录状态)

**用途**: 调试 UI 自动化测试，保存登录状态。

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Test UI (保存登录状态)",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/test-ui.js",
  "cwd": "${workspaceFolder}/packages/puppeteer-demo",
  "console": "integratedTerminal",
  "env": {
    "USER_DATA_DIR": "${workspaceFolder}/packages/puppeteer-demo/user-data",
    "HEADLESS": "false",
    "SLOWMO": "50"
  }
}
```

**与爬虫配置的差异**:
- `SLOWMO: "50"` - 更快的速度（UI 测试通常更快）
- 不需要 DEVTOOLS - UI 测试更关注结果

---

### Puppeteer - Screenshot (快速模式)

**用途**: 批量截图，无头模式快速执行。

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Screenshot (快速模式)",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/screenshot.js",
  "cwd": "${workspaceFolder}/packages/puppeteer-demo",
  "console": "integratedTerminal",
  "env": {
    "HEADLESS": "true"
  }
}
```

**使用场景**:
- 网站监控（定期截图）
- 视觉回归测试
- 生成预览图
- 批量截图任务

---

## Rust 调试配置

### Rust - Debug hello / calculator

**用途**: 调试 Rust 二进制程序。

```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug hello",
  "cargo": {
    "args": [
      "build",
      "--bin=hello",
      "--package=rust-demo"
    ],
    "filter": {
      "name": "hello",
      "kind": "bin"
    }
  },
  "args": [],
  "cwd": "${workspaceFolder}/packages/rust-demo"
}
```

**参数说明**:

| 参数 | 说明 |
|------|------|
| `type: "lldb"` | 使用 LLDB 调试器（需要安装 CodeLLDB 扩展） |
| `cargo.args` | 传递给 cargo build 的参数 |
| `--bin=hello` | 构建名为 hello 的二进制 |
| `--package=rust-demo` | 指定包名 |
| `cargo.filter` | 过滤要调试的目标 |
| `filter.name` | 目标名称 |
| `filter.kind` | 目标类型（bin/lib/test） |
| `args` | 传递给程序的命令行参数 |

**Cargo.toml 结构**:

```toml
[[bin]]
name = "hello"
path = "src/bin/hello.rs"

[[bin]]
name = "calculator"
path = "src/bin/calculator.rs"
```

**调试流程**:
1. 执行 cargo build 构建调试版本
2. 定位生成的可执行文件
3. 启动 LLDB 并加载程序
4. 设置断点并开始调试

---

### Rust - Debug Tests

**用途**: 调试 Rust 单元测试和集成测试。

```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug Tests",
  "cargo": {
    "args": [
      "test",
      "--no-run",
      "--package=rust-demo"
    ],
    "filter": {
      "name": "rust-demo",
      "kind": "lib"
    }
  },
  "args": [],
  "cwd": "${workspaceFolder}/packages/rust-demo"
}
```

**参数说明**:

| 参数 | 说明 |
|------|------|
| `cargo.args[1]` | `test` - 构建测试 |
| `--no-run` | 只构建，不运行测试 |
| `filter.kind: "lib"` | 调试库测试 |

**Rust 测试类型**:

| 类型 | 位置 | kind |
|------|------|------|
| 单元测试 | `src/*.rs` 中的 `#[test]` | lib |
| 集成测试 | `tests/*.rs` | test |
| 文档测试 | 文档注释中的 ` ```rust ` | - |

**调试特定测试**:

```json
"args": ["test_name", "--exact"]
```

- `test_name` - 测试函数名
- `--exact` - 精确匹配

---

## VSCode 变量参考

VSCode 提供了多个内置变量，可以在 launch.json 中使用：

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `${workspaceFolder}` | 当前工作区根目录 | `/Users/name/project` |
| `${workspaceFolderBasename}` | 工作区目录名 | `project` |
| `${file}` | 当前打开文件的绝对路径 | `/Users/name/project/src/test.ts` |
| `${fileBasename}` | 当前文件名 | `test.ts` |
| `${fileBasenameNoExtension}` | 不含扩展名的文件名 | `test` |
| `${fileDirname}` | 当前文件所在目录 | `/Users/name/project/src` |
| `${fileExtname}` | 当前文件扩展名 | `.ts` |
| `${relativeFile}` | 相对于 workspaceFolder 的文件路径 | `src/test.ts` |
| `${relativeFileDirname}` | 相对于 workspaceFolder 的目录路径 | `src` |
| `${cwd}` | 启动时的工作目录 | - |
| `${lineNumber}` | 当前光标所在行号 | `42` |
| `${selectedText}` | 当前选中的文本 | - |
| `${execPath}` | VSCode 可执行文件路径 | - |
| `${env:NAME}` | 环境变量 NAME 的值 | `${env:HOME}` |
| `${config:NAME}` | VSCode 设置 NAME 的值 | `${config:editor.fontSize}` |

**使用示例**:

```json
{
  "program": "${workspaceFolder}/src/index.ts",
  "args": ["--file", "${relativeFile}"],
  "cwd": "${fileDirname}",
  "env": {
    "HOME": "${env:HOME}",
    "PROJECT": "${workspaceFolderBasename}"
  }
}
```

---

## 常用配置参数说明

### 通用参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `type` | string | 调试器类型：node, chrome, lldb, python 等 |
| `request` | string | launch（启动）或 attach（附加） |
| `name` | string | 配置显示名称 |
| `preLaunchTask` | string | 启动前执行的任务（定义在 tasks.json） |
| `postDebugTask` | string | 调试结束后执行的任务 |
| `internalConsoleOptions` | string | 调试控制台行为：neverOpen, openOnSessionStart, openOnFirstSessionStart |

### Node.js 调试参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `program` | string | 入口文件路径 |
| `args` | string[] | 传递给程序的参数 |
| `cwd` | string | 工作目录 |
| `runtimeExecutable` | string | Node.js 可执行文件路径或命令（如 npm, pnpm） |
| `runtimeArgs` | string[] | 传递给 runtimeExecutable 的参数 |
| `env` | object | 环境变量 |
| `envFile` | string | .env 文件路径 |
| `console` | string | 输出位置：internalConsole, integratedTerminal, externalTerminal |
| `sourceMaps` | boolean | 是否启用 Source Map |
| `outFiles` | string[] | 编译输出文件的 glob 模式 |
| `skipFiles` | string[] | 调试时跳过的文件模式 |
| `outputCapture` | string | 输出捕获方式：console, std |
| `restart` | boolean | 进程退出时是否自动重启 |
| `timeout` | number | 附加超时时间（毫秒） |
| `stopOnEntry` | boolean | 是否在入口处暂停 |
| `localRoot` | string | 本地源码根目录（远程调试） |
| `remoteRoot` | string | 远程源码根目录（远程调试） |

### Chrome 调试参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | string | 要打开的 URL |
| `webRoot` | string | Web 应用根目录 |
| `sourceMaps` | boolean | 是否启用 Source Map |
| `sourceMapPathOverrides` | object | Source Map 路径映射规则 |
| `userDataDir` | string | Chrome 用户数据目录 |
| `runtimeExecutable` | string | Chrome 可执行文件路径 |
| `runtimeArgs` | string[] | Chrome 启动参数 |
| `port` | number | 远程调试端口（attach 模式） |
| `timeout` | number | 附加超时时间（毫秒） |
| `disableNetworkCache` | boolean | 禁用网络缓存 |
| `urlFilter` | string | URL 过滤器（attach 模式） |
| `file` | string | 本地 HTML 文件路径（替代 url） |

### LLDB (Rust) 调试参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `cargo` | object | Cargo 构建配置 |
| `cargo.args` | string[] | cargo 命令参数 |
| `cargo.filter` | object | 目标过滤器 |
| `args` | string[] | 传递给程序的参数 |
| `cwd` | string | 工作目录 |
| `env` | object | 环境变量 |
| `terminal` | string | 终端类型：integrated, external, console |
| `sourceLanguages` | string[] | 源语言：rust, cpp, c |
| `expressions` | string | 表达式求值器：simple, python, native |

### 常用 skipFiles 模式

```json
{
  "skipFiles": [
    "<node_internals>/**",           // Node.js 内部模块
    "${workspaceFolder}/node_modules/**", // 所有依赖
    "!${workspaceFolder}/node_modules/my-lib/**" // 除了 my-lib
  ]
}
```

### 常用 Chrome runtimeArgs

```json
{
  "runtimeArgs": [
    "--auto-open-devtools-for-tabs",  // 自动打开 DevTools
    "--disable-web-security",         // 禁用同源策略（仅开发）
    "--disable-gpu",                  // 禁用 GPU 加速
    "--no-sandbox",                   // 禁用沙箱（仅 CI/CD）
    "--disable-extensions",           // 禁用扩展
    "--incognito",                    // 无痕模式
    "--start-maximized",              // 最大化启动
    "--window-size=1920,1080"         // 窗口大小
  ]
}
```

---

## 最佳实践

### 1. 配置命名规范

```
[项目/工具] - [功能] ([可选特性])

示例：
- Vite React - Launch
- Puppeteer - Scrape (有头模式)
- 🚀 Debug Current File - Jest
```

### 2. 使用 emoji 标记常用配置

```json
{
  "name": "🚀 Debug Current File - Jest",  // 最常用
  "name": "⚡️ Quick Test",                 // 快速执行
  "name": "🔍 Debug with Logging"          // 详细日志
}
```

### 3. 环境变量管理

**方案 1：launch.json 中定义**
```json
{
  "env": {
    "NODE_ENV": "development"
  }
}
```

**方案 2：.env 文件**
```json
{
  "envFile": "${workspaceFolder}/.env"
}
```

**方案 3：系统环境变量**
```json
{
  "env": {
    "PATH": "${env:PATH}:/custom/path"
  }
}
```

### 4. 多项目配置

使用 `cwd` 和变量实现复用：

```json
{
  "configurations": [
    {
      "name": "Debug Project A",
      "cwd": "${workspaceFolder}/packages/project-a"
    },
    {
      "name": "Debug Project B",
      "cwd": "${workspaceFolder}/packages/project-b"
    }
  ]
}
```

### 5. 条件断点和日志断点

在 launch.json 中无法直接配置，但可以通过代码实现：

```javascript
// 条件断点的代码等价
if (count > 5) {
  debugger // 手动断点
}

// 日志断点的代码等价
console.log(`count: ${count}`)
```

---

## 故障排查

### 调试无法启动

1. **检查路径**：确保所有路径使用绝对路径或正确的 VSCode 变量
2. **检查依赖**：运行 `pnpm install` 确保依赖安装完整
3. **检查端口**：确保端口未被占用
4. **查看输出**：在"调试控制台"查看详细错误信息

### 断点不生效

1. **Source Map**：确保 `sourceMaps: true` 且项目配置正确生成 Source Map
2. **路径映射**：检查 `webRoot` 是否正确
3. **文件未加载**：在调试控制台运行 `.scripts` 查看已加载文件
4. **skipFiles**：确保断点文件不在 skipFiles 列表中

### Attach 失败

1. **进程未启动**：确保目标进程已启动并开启调试模式
2. **端口不匹配**：检查配置的端口与实际进程端口一致
3. **防火墙**：检查防火墙是否阻止连接

### Chrome 调试问题

1. **端口冲突**：确保 Chrome 调试端口（9222）未被占用
2. **Source Map**：检查 Vite/Webpack 配置的 sourcemap 选项
3. **缓存问题**：使用 `disableNetworkCache: true` 或手动清除缓存

---

## 参考资源

- [VSCode 调试文档](https://code.visualstudio.com/docs/editor/debugging)
- [VSCode Launch.json 属性](https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes)
- [VSCode 变量参考](https://code.visualstudio.com/docs/editor/variables-reference)
- [Node.js 调试指南](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [CodeLLDB 扩展](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)
