# Jest 单测调试示例

这个示例展示了如何在 VSCode 中调试 Jest 测试。

## 功能特性

- ✅ TypeScript 支持
- ✅ ESM 模块支持
- ✅ 调试单个测试文件
- ✅ 调试特定测试用例
- ✅ 覆盖率报告
- ✅ Watch 模式

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 运行测试

```bash
# 运行所有测试
pnpm test

# Watch 模式
pnpm test:watch

# 生成覆盖率报告
pnpm test:coverage
```

### 3. 调试方式

#### 方式一：调试当前文件（推荐）

1. 在 VSCode 中打开任意测试文件（如 `calculator.test.ts`）
2. 在测试代码中设置断点
3. 按 F5 或选择 "Jest - Current File" 配置
4. 调试器会只运行当前文件的测试

#### 方式二：调试所有测试

1. 选择 "Jest - All Tests" 配置
2. 按 F5 启动调试
3. 调试器会运行所有测试文件

#### 方式三：使用 VSCode Jest 扩展

安装 [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) 扩展后，可以：
- 点击测试用例上方的 "Debug" 按钮
- 右键测试用例选择 "Debug Jest"

## 调试配置详解

### 调试当前文件配置

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

**配置说明：**
- `program`: Jest 可执行文件路径
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

### 调试特定测试用例

可以使用 `--testNamePattern` 参数：
```json
{
  "args": [
    "--testNamePattern=应该正确计算两个正数的和",
    "--runInBand"
  ]
}
```

## 调试技巧

### 1. 断点位置建议

在以下位置尝试设置断点：

**测试文件：**
- `src/__tests__/calculator.test.ts:10` - beforeEach 钩子
- `src/__tests__/calculator.test.ts:19` - 测试用例内部
- `src/__tests__/calculator.test.ts:81` - 异常测试

**源代码：**
- `src/calculator.ts:13` - 加法实现
- `src/calculator.ts:42` - 除以零检查
- `src/utils.ts:9` - reduce 累加过程

### 2. 条件断点

在测试中使用条件断点，只在特定条件下中断：

```javascript
// 只在除数为 0 时中断
b === 0

// 只在数组为空时中断
numbers.length === 0

// 只在特定测试用例时中断
expect.getState().currentTestName.includes('正数加法')
```

### 3. 日志断点

右键断点 → 编辑断点 → 记录消息：
```
测试: {expect.getState().currentTestName}
参数 a={a}, b={b}
结果: {result}
```

### 4. 调试测试生命周期

```typescript
describe('测试套件', () => {
  beforeAll(() => {
    // 在这里设置断点，观察套件初始化
    console.log('套件开始')
  })

  beforeEach(() => {
    // 在这里设置断点，观察每个测试前的准备
    console.log('测试准备')
  })

  it('测试用例', () => {
    // 在这里设置断点
  })

  afterEach(() => {
    // 在这里设置断点，观察测试清理
    console.log('测试清理')
  })

  afterAll(() => {
    // 在这里设置断点
    console.log('套件结束')
  })
})
```

### 5. 调试异步测试

```typescript
it('异步测试', async () => {
  // 在这里设置断点
  const promise = someAsyncFunction()

  // 在这里设置断点，单步进入 await
  const result = await promise

  // 在这里设置断点，观察结果
  expect(result).toBe('expected')
})
```

### 6. 调试 Mock 函数

```typescript
it('测试 Mock', () => {
  const mockFn = jest.fn((x) => x * 2)

  // 在这里设置断点
  const result = mockFn(5)

  // 在这里设置断点，查看 mock 调用信息
  expect(mockFn).toHaveBeenCalledWith(5)
  expect(result).toBe(10)
})
```

## 测试用例说明

### Calculator 测试

测试计算器类的各种操作：
- 基础运算（加减乘除）
- 幂运算
- 异常处理（除以零）
- 历史记录管理
- 边界情况

### Utils 测试

测试工具函数：
- 数组操作（求和、平均值、最大最小值）
- 数组去重和分块
- 字符串操作（反转、回文、单词统计）
- 字符串格式化

## 常用调试场景

### 1. 调试失败的测试

```typescript
it('这个测试会失败', () => {
  // 在这里设置断点，找出为什么测试失败
  const result = calculator.add(1, 2)
  expect(result).toBe(4) // 错误的期望值
})
```

### 2. 调试复杂的断言

```typescript
it('调试复杂断言', () => {
  const obj = { a: 1, b: { c: 2 } }

  // 在这里设置断点，查看对象结构
  expect(obj).toMatchObject({
    a: 1,
    b: { c: 2 }
  })
})
```

### 3. 调试测试超时

```typescript
it('超时测试', async () => {
  // 在这里设置断点，找出为什么超时
  await new Promise((resolve) => {
    // 忘记调用 resolve
  })
}, 5000) // 5秒超时
```

## 调试控制台技巧

在调试暂停时，可以在调试控制台执行：

```javascript
// 查看测试状态
expect.getState()

// 查看 Mock 调用记录
mockFn.mock.calls

// 手动运行断言
expect(result).toBe(expected)

// 修改变量
result = 100
```

## 覆盖率调试

运行覆盖率后，VSCode 会显示：
- 绿色：已覆盖的代码
- 红色：未覆盖的代码
- 黄色：部分覆盖的分支

在未覆盖的代码处设置断点，编写新的测试用例来覆盖它。

## 常见问题

### 断点不生效

1. 确保使用 `--runInBand` 参数
2. 确保 Source Map 已启用（检查 tsconfig.json）
3. 清除 Jest 缓存：`jest --clearCache`

### 调试很慢

1. 使用 `--no-coverage` 跳过覆盖率
2. 只调试当前文件而不是所有测试
3. 使用 `--maxWorkers=1` 限制并发

### 无法调试 ESM 模块

确保：
1. package.json 中设置 `"type": "module"`
2. jest.config.js 配置了 `extensionsToTreatAsEsm`
3. 使用 `node --experimental-vm-modules` 运行

## VSCode 扩展推荐

- **Jest**: Orta 的 Jest 扩展，提供内联测试结果
- **Jest Runner**: 在测试文件中添加 Run/Debug 按钮
- **Coverage Gutters**: 显示覆盖率信息

## 相关资源

- [Jest 官方文档](https://jestjs.io/)
- [VSCode Jest 调试文档](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- [Jest ESM 支持](https://jestjs.io/docs/ecmascript-modules)
