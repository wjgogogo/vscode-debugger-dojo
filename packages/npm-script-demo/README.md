# npm script 调试示例

这个示例展示了如何在 VSCode 中调试 npm scripts（构建脚本、部署脚本等）。

## 功能特性

- ✅ 调试自定义构建脚本
- ✅ 调试部署脚本
- ✅ 调试清理脚本
- ✅ 支持环境变量
- ✅ 支持复杂的脚本链

## 可用脚本

```bash
# 构建（开发模式）
pnpm build

# 构建（生产模式）
pnpm build:prod

# 清理构建产物
pnpm clean

# 部署（先构建再部署）
pnpm deploy
```

## 调试方式

### 方式一：直接调试脚本文件

1. 打开要调试的脚本文件（如 `scripts/build.js`）
2. 设置断点
3. 选择 "npm script - Run Script File" 配置
4. 按 F5 启动调试

### 方式二：通过 npm 命令调试

1. 选择 "npm script - Build" 配置
2. 按 F5 启动调试
3. 调试器会运行 `npm run build` 并附加

### 方式三：使用 NPM Scripts 面板

1. 在 VSCode 侧边栏打开 "NPM SCRIPTS" 面板
2. 右键点击要调试的脚本
3. 选择 "Debug"

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

**使用场景：** 直接运行和调试脚本文件，不通过 npm。

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

**使用场景：** 通过 npm run 命令调试，可以捕获 npm 的生命周期钩子。

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

**使用场景：** 调试生产环境构建，会设置 NODE_ENV=production。

## 脚本说明

### build.js - 构建脚本

模拟一个简单的构建过程：
- 读取源文件
- 转换代码（添加注释）
- 压缩代码（生产环境）
- 生成 sourcemap
- 输出构建统计

**调试要点：**
- `build.js:10` - 构建开始
- `build.js:23` - 目录创建
- `build.js:35` - 文件读取
- `build.js:54` - 代码压缩
- `build.js:68` - 文件写入

### clean.js - 清理脚本

删除构建产物：
- 检查目录是否存在
- 递归删除目录
- 错误处理

**调试要点：**
- `clean.js:10` - 开始清理
- `clean.js:16` - 目录检查
- `clean.js:21` - 删除操作

### deploy.js - 部署脚本

模拟部署过程：
- 检查构建产物
- 读取文件列表
- 计算总大小
- 模拟上传过程

**调试要点：**
- `deploy.js:11` - 开始部署
- `deploy.js:22` - 文件遍历
- `deploy.js:38` - 上传进度

## 调试技巧

### 1. 调试环境变量

在 launch.json 中设置环境变量：

```json
{
  "env": {
    "NODE_ENV": "production",
    "DEBUG": "*"
  }
}
```

在脚本中访问：
```javascript
console.log('环境:', process.env.NODE_ENV)
```

### 2. 调试命令行参数

传递参数给脚本：

```json
{
  "args": ["--verbose", "--output=./build"]
}
```

在脚本中接收：
```javascript
const args = process.argv.slice(2)
console.log('参数:', args)
```

### 3. 调试脚本链

调试 `npm run deploy`（会先运行 build:prod）：

```json
{
  "name": "npm script - Deploy",
  "runtimeArgs": ["run", "deploy"]
}
```

在两个脚本中都可以设置断点。

### 4. 条件断点

```javascript
// 只在生产环境时中断
process.env.NODE_ENV === 'production'

// 只在处理特定文件时中断
file.endsWith('.js')

// 只在文件大小超过阈值时中断
totalSize > 1000000
```

### 5. 日志断点

不中断执行，只输出日志：
```
正在处理文件: {file}
当前进度: {i + 1}/{files.length}
总大小: {totalSize} bytes
```

### 6. 调试文件操作

```javascript
import { readFileSync } from 'fs'

// 在这里设置断点
const content = readFileSync('file.txt', 'utf-8')

// 在调试控制台查看内容
console.log(content)
```

### 7. 调试异步脚本

```javascript
async function deploy() {
  // 在这里设置断点
  for (const file of files) {
    // 在这里设置断点，观察异步执行
    await uploadFile(file)
  }
}
```

## 实用场景

### 调试 Webpack 配置

```javascript
// webpack.config.js
export default {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  // 在这里设置断点，调试配置生成
}
```

### 调试 Vite 插件

```javascript
// vite-plugin-custom.js
export default function customPlugin() {
  return {
    name: 'custom-plugin',
    transform(code, id) {
      // 在这里设置断点，调试代码转换
      return code
    }
  }
}
```

### 调试代码生成器

```javascript
// generate.js
function generateComponent(name) {
  // 在这里设置断点，调试模板生成
  const template = `
    export function ${name}() {
      return <div>${name}</div>
    }
  `
  return template
}
```

### 调试数据库迁移

```javascript
// migrate.js
async function migrate() {
  // 在这里设置断点，调试迁移逻辑
  const migrations = await getMigrations()

  for (const migration of migrations) {
    // 在这里设置断点，观察每个迁移
    await runMigration(migration)
  }
}
```

## 常见问题

### 脚本权限问题

如果脚本无法执行：
```bash
chmod +x scripts/*.js
```

### Source Map 不生效

确保脚本顶部有正确的 shebang：
```javascript
#!/usr/bin/env node
```

### 路径问题

使用 `__dirname` 获取正确的路径：
```javascript
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```

### npm 脚本无法调试

尝试：
1. 使用 `node` 而不是 `npm` 直接运行脚本
2. 检查 `runtimeExecutable` 配置
3. 清除 npm 缓存：`npm cache clean --force`

## 进阶技巧

### 1. 调试 pre/post 钩子

```json
{
  "scripts": {
    "prebuild": "node scripts/pre-build.js",
    "build": "node scripts/build.js",
    "postbuild": "node scripts/post-build.js"
  }
}
```

### 2. 调试并行脚本

```json
{
  "scripts": {
    "build": "npm-run-all --parallel build:*",
    "build:js": "node scripts/build-js.js",
    "build:css": "node scripts/build-css.js"
  }
}
```

### 3. 使用 nodemon 调试

```json
{
  "scripts": {
    "dev": "nodemon scripts/watch.js"
  }
}
```

## 相关资源

- [Node.js 调试指南](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [npm scripts 文档](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [VSCode 调试文档](https://code.visualstudio.com/docs/editor/debugging)
