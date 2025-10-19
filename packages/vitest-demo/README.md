# Vitest 单测调试示例

这个示例展示了如何在 VSCode 中调试 Vitest 测试。Vitest 是一个由 Vite 驱动的极速测试框架。

## 功能特性

- ✅ TypeScript 支持
- ✅ 极速测试执行
- ✅ ESM 原生支持
- ✅ Watch 模式热更新
- ✅ 调试单个测试文件
- ✅ UI 界面（可选）
- ✅ 覆盖率报告

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 运行测试

```bash
# 运行所有测试
pnpm test

# Watch 模式（推荐开发时使用）
pnpm test:watch

# UI 界面模式
pnpm test:ui

# 生成覆盖率报告
pnpm test:coverage
```

### 3. 调试方式

#### 方式一：调试当前文件（推荐）

1. 在 VSCode 中打开任意测试文件（如 `math.test.ts`）
2. 在测试代码中设置断点
3. 按 F5 或选择 "Vitest - Current File" 配置
4. 调试器会只运行当前文件的测试

#### 方式二：调试所有测试

1. 选择 "Vitest - All Tests" 配置
2. 按 F5 启动调试
3. 调试器会运行所有测试文件

#### 方式三：使用 Vitest VSCode 扩展

安装 [Vitest 扩展](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer) 后：
- 在测试资源管理器中查看所有测试
- 点击测试旁的调试图标
- 实时查看测试结果

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
- `${relativeFile}`: 当前打开的文件
- `run`: 运行模式（非 watch）
- 调试模式下自动启用 Source Map

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

## 测试用例说明

### Math 测试（同步函数）

测试数学工具函数：
- **factorial**: 阶乘计算（递归调试）
- **isPrime**: 质数判断（循环调试）
- **fibonacci**: 斐波那契数列（数组构建调试）
- **gcd**: 最大公约数（递归算法调试）
- **lcm**: 最小公倍数
- **combination**: 组合数计算

### Async 测试（异步函数）

测试异步操作：
- **delay**: 延迟函数
- **fetchUser**: 模拟 API 调用（异步调试）
- **fetchUsers**: 批量请求（Promise.all 调试）
- **retryFetch**: 重试机制（错误处理调试）
- **withTimeout**: 超时控制（Promise.race 调试）

## 调试技巧

### 1. 断点位置建议

**数学函数测试：**
- `src/__tests__/math.test.ts:22` - 测试用例
- `src/math.ts:8` - 阶乘递归
- `src/math.ts:29` - 质数判断循环
- `src/math.ts:47` - 斐波那契数组构建

**异步函数测试：**
- `src/__tests__/async.test.ts:13` - 异步测试用例
- `src/async.ts:17` - 异步函数入口
- `src/async.ts:44` - Promise.all
- `src/async.ts:58` - 重试逻辑

### 2. 调试同步代码

```typescript
it('调试同步函数', () => {
  // 在这里设置断点
  const result = factorial(5)

  // 单步进入 (F11) 进入函数内部
  // 单步跳过 (F10) 跳过函数执行
  // 单步跳出 (Shift+F11) 跳出当前函数

  expect(result).toBe(120)
})
```

### 3. 调试异步代码

```typescript
it('调试异步函数', async () => {
  // 在这里设置断点
  const promise = fetchUser(1)

  // 在 await 处设置断点，观察 Promise 状态
  const user = await promise

  // 在这里设置断点，查看结果
  expect(user.id).toBe(1)
})
```

### 4. 调试递归函数

```typescript
it('调试递归', () => {
  // 在递归函数内部设置断点
  // 使用调用栈面板查看递归深度
  // 可以在任意递归层级之间跳转
  const result = factorial(5)
  expect(result).toBe(120)
})
```

### 5. 条件断点

```typescript
// 只在 n > 10 时中断
n > 10

// 只在特定用户 ID 时中断
id === 1

// 只在重试第 3 次时中断
i === 2
```

### 6. 日志断点

右键断点 → 编辑断点 → 记录消息：
```
递归层级: n={n}
用户 ID: {id}
重试次数: {i + 1}
```

### 7. 调试 Mock 函数

```typescript
it('调试 Mock', async () => {
  const fn = vi.fn(async () => 'success')

  // 在这里设置断点
  await retryFetch(fn, 3)

  // 在这里设置断点，查看 Mock 信息
  console.log('调用次数:', fn.mock.calls.length)
  console.log('调用参数:', fn.mock.calls)
  console.log('返回值:', fn.mock.results)
})
```

## Vitest vs Jest

| 特性 | Vitest | Jest |
|------|--------|------|
| 速度 | 极快（Vite + ESM） | 较快 |
| ESM 支持 | 原生支持 | 需要配置 |
| 配置 | 简单 | 复杂 |
| API | 兼容 Jest | - |
| 调试 | 简单 | 需要配置 |
| UI | 内置 | 需要插件 |

## 调试控制台技巧

在调试暂停时，可以在调试控制台执行：

```javascript
// 查看变量
console.log(result)

// 执行表达式
factorial(10)

// 查看 Mock 信息
fn.mock.calls

// 修改变量（测试不同场景）
n = 100
```

## Watch 模式调试

在 watch 模式下，Vitest 会监听文件变化并自动重新运行测试：

```bash
# 启动 watch 模式
pnpm test:watch

# 在另一个终端附加调试器
# 使用 "Vitest - Attach" 配置
```

## UI 模式

Vitest UI 提供了图形界面：

```bash
pnpm test:ui
```

在浏览器中打开 `http://localhost:51204/__vitest__/`，可以：
- 可视化查看测试结果
- 查看测试覆盖率
- 查看测试执行时间
- 过滤和搜索测试

## 覆盖率调试

生成覆盖率报告后：

```bash
pnpm test:coverage
```

打开 `coverage/index.html` 查看：
- 绿色：已覆盖
- 红色：未覆盖
- 黄色：部分覆盖

在未覆盖的代码处设置断点，编写测试用例来覆盖它们。

## 常见问题

### 断点不生效

1. 确保使用 `vitest run` 而不是 `vitest`（watch 模式）
2. 清除缓存：删除 `node_modules/.vitest` 目录
3. 重启 VSCode

### 测试执行很慢

1. 使用 `--no-coverage` 跳过覆盖率
2. 只运行当前文件而不是所有测试
3. 减少测试文件中的 `console.log`

### Source Map 问题

Vitest 自动启用 Source Map，如果遇到问题：
1. 检查 tsconfig.json 中的 `sourceMap: true`
2. 清除缓存
3. 检查 vitest.config.ts 配置

## VSCode 扩展推荐

- **Vitest**: 官方 Vitest 扩展
- **Vitest Runner**: 在编辑器中运行和调试测试
- **Coverage Gutters**: 显示覆盖率信息

## Vitest 特性

### 快照测试

```typescript
it('快照测试', () => {
  const user = { id: 1, name: 'Test' }
  expect(user).toMatchSnapshot()
})
```

### 并发测试

```typescript
describe.concurrent('并发测试', () => {
  it.concurrent('测试1', async () => {
    // 这些测试会并行运行
  })

  it.concurrent('测试2', async () => {
    // 更快的测试执行
  })
})
```

### 类型测试

```typescript
import { expectTypeOf } from 'vitest'

it('类型测试', () => {
  expectTypeOf({ a: 1 }).toMatchTypeOf<{ a: number }>()
})
```

## 相关资源

- [Vitest 官方文档](https://vitest.dev/)
- [Vitest GitHub](https://github.com/vitest-dev/vitest)
- [VSCode Vitest 扩展](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)
