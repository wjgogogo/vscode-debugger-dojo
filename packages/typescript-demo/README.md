# TypeScript 独立调试示例

这个示例展示了如何在 VSCode 中直接调试 TypeScript 文件，无需预编译。

## 功能特性

- ✅ ts-node 调试（传统方案）
- ✅ tsx 调试（推荐，更快）
- ✅ 泛型调试
- ✅ 类和接口调试
- ✅ 异步函数调试
- ✅ 装饰器调试
- ✅ 类型守卫调试
- ✅ Source Map 完整支持

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：使用 tsx 调试（推荐）

tsx 是 ts-node 的现代替代品，启动更快，性能更好。

1. 打开要调试的 TypeScript 文件（如 `src/index.ts`）
2. 设置断点
3. 按 F5 或选择 "TypeScript - Current File (tsx)" 配置
4. 调试器会在断点处暂停

#### 方式二：使用 ts-node 调试

传统的 TypeScript 调试方案。

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

| 参数 | 说明 |
|------|------|
| `program: "${file}"` | 调试当前打开的文件 |
| `runtimeArgs: ["-r", "tsx/cjs"]` | 使用 tsx 加载器，CommonJS 模式 |
| `cwd: "${fileDirname}"` | 工作目录设为文件所在目录 |

**tsx 特点：**
- 基于 esbuild，极快的启动速度
- 自动支持最新的 TypeScript 特性
- 无需配置，开箱即用
- 支持 ESM 和 CommonJS
- 内存占用更少

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

| 参数 | 说明 |
|------|------|
| `runtimeArgs: ["-r", "ts-node/register"]` | 使用 ts-node 加载器 |
| `env.TS_NODE_PROJECT` | 指定 tsconfig.json 路径 |

**ts-node 特点：**
- TypeScript 官方推荐的执行方案
- 完整支持 tsconfig.json 配置
- 类型检查更严格
- 社区生态成熟

### tsx vs ts-node 对比

| 特性 | tsx | ts-node |
|------|-----|---------|
| 启动速度 | 极快 | 较慢 |
| 类型检查 | 不检查（仅转译） | 完整检查 |
| 配置 | 无需配置 | 需要 tsconfig.json |
| ESM 支持 | 原生支持 | 需要配置 |
| 适用场景 | 开发调试 | 生产构建前的验证 |

**推荐：**
- 日常开发和调试：使用 tsx
- 需要严格类型检查：使用 ts-node
- CI/CD 环境：使用预编译后的 JS

## 调试技巧

### 1. 调试泛型函数

```typescript
function processArray<T>(items: T[], predicate: (item: T) => boolean): T[] {
  // 在这里设置断点
  console.log(`处理数组，长度: ${items.length}`)

  // 在这里设置断点 - 观察泛型类型推断
  const result = items.filter(predicate)

  return result
}

// 在这里设置断点 - 观察调用
const numbers = [1, 2, 3, 4, 5]
const evens = processArray(numbers, (n) => n % 2 === 0)
```

**调试要点：**
- 泛型类型 `T` 在运行时会被具体类型替换
- 使用"变量"面板查看 `items` 的实际类型
- 单步进入 `filter` 观察回调函数执行

### 2. 调试类和接口

```typescript
interface User {
  id: number
  name: string
}

class DataProcessor<T> {
  private data: T[] = []

  constructor(initialData?: T[]) {
    // 在这里设置断点 - 观察构造函数参数
    if (initialData) {
      this.data = initialData
    }
  }

  add(item: T): void {
    // 在这里设置断点 - 观察 this 和参数
    this.data.push(item)
  }
}

// 在这里设置断点 - 观察实例化
const processor = new DataProcessor<User>([
  { id: 1, name: 'Alice' }
])
```

**调试要点：**
- 接口在编译后会消失，只在开发时提供类型提示
- 使用"变量"面板查看类实例的私有属性
- 单步进入方法观察 `this` 上下文

### 3. 调试异步函数

```typescript
async function fetchData(id: number): Promise<User | null> {
  console.log(`获取数据 ${id}...`)

  // 在这里设置断点 - 异步操作前
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 在这里设置断点 - 异步操作后
  return { id, name: 'Test User' }
}

// 在这里设置断点
;(async () => {
  const user = await fetchData(1)
  // 在这里设置断点 - 查看返回值
  console.log(user)
})()
```

**调试要点：**
- 在 `await` 前后设置断点观察执行流程
- 异步函数会在 `await` 处暂停
- 使用"调用堆栈"面板查看异步调用链

### 4. 调试类型守卫

```typescript
interface Dog {
  type: 'dog'
  bark(): void
}

interface Cat {
  type: 'cat'
  meow(): void
}

type Animal = Dog | Cat

// 在这里设置断点 - 类型守卫函数
function isDog(animal: Animal): animal is Dog {
  return animal.type === 'dog'
}

function makeSound(animal: Animal) {
  // 在这里设置断点 - 类型收窄前
  if (isDog(animal)) {
    // 在这里设置断点 - TypeScript 知道这里 animal 是 Dog
    animal.bark()
  } else {
    // 在这里设置断点 - TypeScript 知道这里 animal 是 Cat
    animal.meow()
  }
}
```

**调试要点：**
- 类型守卫在运行时是普通函数
- VSCode 会根据类型守卫显示正确的智能提示
- 使用断点观察类型收窄的效果

### 5. 调试装饰器

启用装饰器需要在 tsconfig.json 中设置：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

```typescript
// 在这里设置断点 - 装饰器定义
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    // 在这里设置断点 - 方法调用前
    console.log(`调用 ${propertyKey}`)

    const result = originalMethod.apply(this, args)

    // 在这里设置断点 - 方法调用后
    console.log(`返回:`, result)

    return result
  }

  return descriptor
}

class Calculator {
  @log
  add(a: number, b: number): number {
    // 在这里设置断点 - 原始方法
    return a + b
  }
}

// 在这里设置断点 - 观察装饰器效果
const calc = new Calculator()
const result = calc.add(1, 2)
```

**调试要点：**
- 装饰器在类定义时执行（不是实例化时）
- 装饰器可以修改方法的行为
- 单步调试可以看到装饰器如何包装原始方法

### 6. 调试枚举

```typescript
enum Status {
  Pending = 'pending',
  Active = 'active',
  Completed = 'completed',
}

// 在这里设置断点 - 使用枚举
function updateStatus(status: Status) {
  console.log('状态:', status)

  // 在这里设置断点 - 枚举比较
  if (status === Status.Active) {
    console.log('活跃状态')
  }
}

// 在这里设置断点
updateStatus(Status.Pending)
```

**调试要点：**
- 字符串枚举在运行时保留原始值
- 数字枚举会被编译为双向映射对象
- 使用调试器查看枚举的实际值

### 7. 调试联合类型和交叉类型

```typescript
type Success = {
  success: true
  data: string
}

type Failure = {
  success: false
  error: string
}

// 联合类型
type Result = Success | Failure

// 在这里设置断点 - 处理联合类型
function handleResult(result: Result) {
  // 在这里设置断点 - 类型判断
  if (result.success) {
    // 在这里设置断点 - TypeScript 知道这是 Success
    console.log('数据:', result.data)
  } else {
    // 在这里设置断点 - TypeScript 知道这是 Failure
    console.log('错误:', result.error)
  }
}

// 交叉类型
type WithTimestamp = {
  timestamp: Date
}

type User = {
  name: string
} & WithTimestamp

// 在这里设置断点 - 使用交叉类型
const user: User = {
  name: 'Alice',
  timestamp: new Date(),
}
```

**调试要点：**
- 联合类型需要类型判断才能访问特定属性
- 交叉类型合并了多个类型的属性
- 使用"变量"面板查看对象的完整结构

### 8. 条件断点

右键断点 -> 编辑断点 -> 添加条件：

```typescript
for (let i = 0; i < 100; i++) {
  // 右键断点 -> 条件: i === 50
  processItem(i)
}

// 只在特定类型时中断
function process(value: unknown) {
  // 条件: typeof value === 'string'
  console.log(value)
}
```

### 9. 监视表达式

在"监视"面板中添加：

```typescript
// 监视变量
user.name
user.age ?? 'unknown'

// 监视表达式
users.filter(u => u.age > 18).length

// 监视类型
typeof variable
Array.isArray(data)
```

## 示例代码说明

### src/index.ts

主示例文件，包含：
- `index.ts:17` - 泛型函数定义
- `index.ts:27` - 泛型类定义
- `index.ts:66` - 使用泛型函数
- `index.ts:71` - 使用泛型类
- `index.ts:83` - 异步函数
- `index.ts:106` - 装饰器
- `index.ts:121` - 类型守卫
- `index.ts:126` - 错误处理

## 常见问题

### tsx 和 ts-node 的区别

| 场景 | 推荐工具 |
|------|---------|
| 日常开发调试 | tsx |
| 需要类型检查 | ts-node |
| 快速原型 | tsx |
| CI/CD 验证 | ts-node 或 tsc |

### 断点不生效

1. 确保 Source Map 已启用（tsconfig.json 中 `sourceMap: true`）
2. 确保使用了正确的调试配置
3. 清除 VSCode 缓存：重启 VSCode
4. 检查文件路径是否正确

### 类型信息丢失

TypeScript 类型信息在编译后会丢失：
- 接口和类型别名不存在于运行时
- 泛型类型参数在运行时被擦除
- 装饰器是运行时特性，可以访问

### 无法导入其他模块

确保 tsconfig.json 配置正确：

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "esModuleInterop": true
  }
}
```

### tsx 不支持某些 TypeScript 特性

tsx 基于 esbuild，不支持：
- 类型检查（仅转译）
- 装饰器元数据（`emitDecoratorMetadata`）
- `const enum`（会转换为普通 enum）

如果需要这些特性，使用 ts-node。

## 进阶技巧

### 1. 调试编译选项

创建多个 tsconfig 文件：

```json
// tsconfig.debug.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "inlineSourceMap": false,
    "declaration": false
  }
}
```

在 launch.json 中使用：

```json
{
  "env": {
    "TS_NODE_PROJECT": "${workspaceFolder}/tsconfig.debug.json"
  }
}
```

### 2. 调试路径映射

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

ts-node 会自动处理路径映射，tsx 可能需要额外配置。

### 3. 性能分析

使用 Node.js 的 `--prof` 参数：

```bash
node --prof -r tsx/cjs src/index.ts
```

生成 `isolate-*.log` 文件，使用 `node --prof-process` 分析。

### 4. 内存调试

使用 `--inspect-brk` 参数并启用堆快照：

```json
{
  "runtimeArgs": ["-r", "tsx/cjs", "--inspect-brk"],
  "program": "${file}"
}
```

在 Chrome DevTools 中连接并分析内存。

## 相关资源

- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [tsx GitHub](https://github.com/esbuild-kit/tsx)
- [ts-node GitHub](https://github.com/TypeStrong/ts-node)
- [VSCode TypeScript 调试](https://code.visualstudio.com/docs/typescript/typescript-debugging)
