# Webpack 调试示例

这个示例展示了如何在 VSCode 中调试 Webpack 构建过程、配置文件和自定义插件。

## 功能特性

- ✅ 调试 Webpack 配置文件
- ✅ 调试自定义 Plugin
- ✅ 调试自定义 Loader
- ✅ 调试构建过程
- ✅ 调试生成的代码
- ✅ TypeScript 支持
- ✅ Source Map 完整支持

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：调试 Webpack 构建（推荐）

调试 webpack.config.js 和整个构建过程。

1. 在 VSCode 中打开调试面板（Ctrl/Cmd + Shift + D）
2. 选择 "Webpack - Build" 配置
3. 在 webpack.config.js 中设置断点
4. 按 F5 启动调试
5. 调试器会在断点处暂停

#### 方式二：调试 Dev Server

调试 webpack-dev-server 和热更新。

1. 选择 "Webpack - Dev Server" 配置
2. 按 F5 启动调试
3. 浏览器自动打开 http://localhost:9000
4. 修改源代码观察热更新

#### 方式三：调试生成的代码

调试编译后的浏览器代码。

1. 先运行 "Webpack - Build" 生成文件
2. 选择 "Webpack - Debug App" 配置
3. 按 F5 启动 Chrome 调试
4. 在 src/ 目录的源文件中设置断点

## 调试配置详解

### Webpack 构建调试

```json
{
  "type": "node",
  "request": "launch",
  "name": "Webpack - Build",
  "program": "${workspaceFolder}/node_modules/.bin/webpack",
  "args": [
    "--config",
    "${workspaceFolder}/packages/webpack-demo/webpack/webpack.config.js",
    "--mode",
    "development"
  ],
  "cwd": "${workspaceFolder}/packages/webpack-demo",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

**配置说明：**

| 参数 | 说明 |
|------|------|
| `program` | Webpack CLI 的路径 |
| `args` | 传递给 Webpack 的参数 |
| `--config` | 指定配置文件路径 |
| `--mode development` | 开发模式，生成详细的 Source Map |

**使用场景：**
- 调试 webpack.config.js 配置逻辑
- 调试自定义 Plugin 的 apply 方法
- 调试 Loader 的处理逻辑
- 查看编译过程中的中间状态
- 排查构建错误

### Dev Server 调试

```json
{
  "type": "node",
  "request": "launch",
  "name": "Webpack - Dev Server",
  "program": "${workspaceFolder}/node_modules/.bin/webpack",
  "args": [
    "serve",
    "--config",
    "${workspaceFolder}/packages/webpack-demo/webpack/webpack.config.js",
    "--mode",
    "development"
  ],
  "cwd": "${workspaceFolder}/packages/webpack-demo",
  "console": "integratedTerminal"
}
```

**与 Build 的区别：**
- 使用 `serve` 参数启动 dev server
- 支持热更新（HMR）
- 不会输出文件到磁盘
- 适合开发调试

## 调试技巧

### 1. 调试 Webpack 配置函数

```javascript
// webpack.config.js
module.exports = (env, argv) => {
  // 在这里设置断点 - 查看环境变量和参数
  console.log('Environment:', env)
  console.log('Mode:', argv.mode)

  const config = {
    // 在这里设置断点 - 查看配置对象
    entry: './src/index.ts',
    // ...
  }

  // 在这里设置断点 - 返回前检查最终配置
  return config
}
```

**调试要点：**
- `env` - 通过 `--env` 传递的环境变量
- `argv.mode` - development 或 production
- 配置对象的每个属性都可以设置断点观察

### 2. 调试自定义 Plugin

```javascript
class CustomPlugin {
  apply(compiler) {
    // 在这里设置断点 - Plugin 注册时执行
    console.log('Plugin 已注册')

    compiler.hooks.compilation.tap('CustomPlugin', (compilation) => {
      // 在这里设置断点 - 每次编译开始
      console.log('开始编译')
    })

    compiler.hooks.emit.tapAsync('CustomPlugin', (compilation, callback) => {
      // 在这里设置断点 - 生成文件前
      console.log('准备输出文件')

      // 在这里设置断点 - 遍历所有生成的资源
      Object.keys(compilation.assets).forEach((filename) => {
        console.log(`文件: ${filename}`)
      })

      callback()
    })

    compiler.hooks.done.tap('CustomPlugin', (stats) => {
      // 在这里设置断点 - 编译完成
      console.log('编译完成')
    })
  }
}
```

**常用 Compiler Hooks：**

| Hook | 时机 | 用途 |
|------|------|------|
| `beforeRun` | 开始编译前 | 准备工作 |
| `run` | 开始编译 | 读取记录 |
| `compilation` | 创建 compilation 对象 | 注册 compilation hooks |
| `emit` | 输出文件前 | 修改输出内容 |
| `done` | 编译完成 | 生成报告 |

### 3. 调试自定义 Loader

创建 `webpack/custom-loader.js`：

```javascript
module.exports = function (source) {
  // 在这里设置断点 - Loader 处理每个文件
  console.log('处理文件:', this.resourcePath)

  // 在这里设置断点 - 查看源代码内容
  console.log('源代码长度:', source.length)

  // 在这里设置断点 - 转换逻辑
  const transformed = source.replace(/console\.log/g, 'console.debug')

  // 在这里设置断点 - 返回转换后的代码
  return transformed
}
```

在 webpack.config.js 中使用：

```javascript
module: {
  rules: [
    {
      test: /\.ts$/,
      use: [
        'ts-loader',
        // 在这里设置断点 - Loader 配置
        path.resolve(__dirname, 'custom-loader.js'),
      ],
    },
  ]
}
```

**Loader 上下文对象：**

| 属性 | 说明 |
|------|------|
| `this.resourcePath` | 正在处理的文件路径 |
| `this.context` | 文件所在目录 |
| `this.data` | Loader 之间共享的数据 |
| `this.callback` | 返回多个值的回调函数 |
| `this.async` | 获取异步回调函数 |

### 4. 调试编译过程

在 webpack.config.js 的 Plugin 中：

```javascript
compiler.hooks.compilation.tap('DebugPlugin', (compilation) => {
  compilation.hooks.buildModule.tap('DebugPlugin', (module) => {
    // 在这里设置断点 - 构建每个模块
    console.log('构建模块:', module.resource)
  })

  compilation.hooks.seal.tap('DebugPlugin', () => {
    // 在这里设置断点 - 封闭模块树
    console.log('模块树已构建')
  })

  compilation.hooks.optimize.tap('DebugPlugin', () => {
    // 在这里设置断点 - 优化阶段
    console.log('开始优化')
  })
})
```

### 5. 查看 Compilation 对象

在 Plugin 的 emit hook 中：

```javascript
compiler.hooks.emit.tapAsync('DebugPlugin', (compilation, callback) => {
  // 在这里设置断点
  console.log('=== Compilation 信息 ===')

  // 查看所有模块
  console.log('模块数量:', compilation.modules.size)
  compilation.modules.forEach((module) => {
    console.log('  -', module.resource)
  })

  // 查看所有 chunks
  console.log('Chunk 数量:', compilation.chunks.size)
  compilation.chunks.forEach((chunk) => {
    console.log('  -', chunk.name, chunk.files)
  })

  // 查看所有资源
  console.log('资源列表:', Object.keys(compilation.assets))

  callback()
})
```

### 6. 调试 Source Map 生成

```javascript
// webpack.config.js
module.exports = {
  // 在这里设置断点 - Source Map 配置
  devtool: 'source-map', // 或 'eval-source-map', 'inline-source-map'

  // ...其他配置
}
```

**devtool 选项对比：**

| 值 | 构建速度 | 重构建速度 | 生产环境 | 质量 |
|----|---------|-----------|---------|------|
| `eval` | 最快 | 最快 | 否 | 生成的代码 |
| `eval-source-map` | 慢 | 快 | 否 | 原始代码 |
| `source-map` | 最慢 | 最慢 | 是 | 原始代码 |
| `inline-source-map` | 最慢 | 最慢 | 否 | 原始代码 |

### 7. 条件断点

在 webpack.config.js 中使用条件断点：

```javascript
compilation.assets.forEach((filename) => {
  // 右键断点 -> 编辑断点 -> 添加条件
  // 条件: filename.endsWith('.js')
  console.log('JS 文件:', filename)
})
```

### 8. 日志断点

右键断点 -> 编辑断点 -> 记录消息：

```
正在处理模块: {module.resource}
文件大小: {source.length}
编译耗时: {stats.endTime - stats.startTime}ms
```

## 示例代码说明

### webpack.config.js

Webpack 配置文件，包含：
- `webpack.config.js:5` - 配置加载
- `webpack.config.js:9` - 自定义 Plugin 类定义
- `webpack.config.js:35` - 配置函数导出
- `webpack.config.js:50` - entry/output 配置
- `webpack.config.js:57` - module.rules 配置
- `webpack.config.js:71` - plugins 配置

### src/index.ts

应用入口文件：
- `src/index.ts:5` - 应用启动
- `src/index.ts:8` - DOM 加载
- `src/index.ts:14` - 渲染应用
- `src/index.ts:20` - 热更新处理

### src/app.ts

业务逻辑文件：
- `src/app.ts:11` - 数据初始化
- `src/app.ts:18` - 创建应用函数
- `src/app.ts:23` - 遍历消息
- `src/app.ts:52` - 工具函数

## 常见问题

### 调试时 Webpack 构建失败

1. 检查 Node.js 版本是否兼容
2. 清除缓存：`rm -rf node_modules/.cache`
3. 重新安装依赖：`pnpm install`
4. 查看终端错误信息

### 断点不生效

1. **配置文件断点**：确保使用 Node.js 调试器
2. **源代码断点**：确保 Source Map 已生成且路径正确
3. 检查 `devtool` 配置
4. 重新构建项目

### Source Map 路径不正确

在 webpack.config.js 中添加：

```javascript
output: {
  devtoolModuleFilenameTemplate: (info) => {
    // 在这里设置断点 - 自定义 Source Map 路径
    return `webpack:///${info.resourcePath}`
  }
}
```

### Plugin 断点不生效

1. 确保 Plugin 已注册到 plugins 数组
2. 检查 Hook 名称是否正确
3. 使用 `tap` 而不是 `tapAsync`（除非需要异步）
4. 查看 Webpack 版本是否兼容

### 调试 Loader 时找不到文件

1. 检查 Loader 的 test 正则表达式
2. 确认文件路径在 include 范围内
3. 查看 Loader 执行顺序（从右到左）
4. 使用绝对路径引用 Loader

## 进阶技巧

### 1. 调试 Tree Shaking

```javascript
// webpack.config.js
optimization: {
  usedExports: true,
  minimize: false, // 关闭压缩，方便查看
}

// 在 Plugin 中观察哪些代码被标记为未使用
compiler.hooks.compilation.tap('TreeShakingDebug', (compilation) => {
  compilation.hooks.optimizeModules.tap('TreeShakingDebug', (modules) => {
    // 在这里设置断点
    modules.forEach((module) => {
      if (module.usedExports) {
        console.log('模块:', module.resource)
        console.log('使用的导出:', module.usedExports)
      }
    })
  })
})
```

### 2. 调试代码分割

```javascript
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: 10,
      },
    },
  },
}

// 在 Plugin 中观察 chunk 生成
compiler.hooks.emit.tap('SplitChunksDebug', (compilation) => {
  // 在这里设置断点
  compilation.chunks.forEach((chunk) => {
    console.log('Chunk:', chunk.name)
    console.log('模块:', [...chunk.modulesIterable].map((m) => m.resource))
  })
})
```

### 3. 调试缓存

```javascript
// webpack.config.js
cache: {
  type: 'filesystem',
  cacheDirectory: path.resolve(__dirname, '../.webpack-cache'),
}

// 在 Plugin 中观察缓存命中情况
compiler.hooks.compilation.tap('CacheDebug', (compilation) => {
  compilation.hooks.stillValidModule.tap('CacheDebug', (module) => {
    // 在这里设置断点 - 模块从缓存加载
    console.log('缓存命中:', module.resource)
  })
})
```

### 4. 性能分析

使用 `speed-measure-webpack-plugin`：

```javascript
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
  // 在这里设置断点 - 查看性能数据
  // ...webpack 配置
})
```

## 相关资源

- [Webpack 官方文档](https://webpack.js.org/)
- [Webpack Plugin API](https://webpack.js.org/api/plugins/)
- [Webpack Loader API](https://webpack.js.org/api/loaders/)
- [Writing a Plugin](https://webpack.js.org/contribute/writing-a-plugin/)
- [Writing a Loader](https://webpack.js.org/contribute/writing-a-loader/)
