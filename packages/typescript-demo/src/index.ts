// TypeScript 独立调试示例

// 在这里设置断点 - 程序入口
console.log('🚀 TypeScript 调试示例启动')

// 接口定义
interface User {
  id: number
  name: string
  email: string
  age?: number
}

// 类型别名
type UserRole = 'admin' | 'user' | 'guest'

// 在这里设置断点 - 泛型函数
function processArray<T>(items: T[], predicate: (item: T) => boolean): T[] {
  console.log(`处理数组，长度: ${items.length}`)

  // 在这里设置断点 - 数组过滤
  const result = items.filter(predicate)

  console.log(`过滤后长度: ${result.length}`)
  return result
}

// 在这里设置断点 - 类定义
class DataProcessor<T> {
  private data: T[] = []

  constructor(initialData?: T[]) {
    // 在这里设置断点 - 构造函数
    if (initialData) {
      this.data = initialData
    }
    console.log('DataProcessor 已创建')
  }

  // 在这里设置断点 - 方法定义
  add(item: T): void {
    console.log('添加项:', item)
    this.data.push(item)
  }

  getAll(): T[] {
    // 在这里设置断点 - 返回数据副本
    return [...this.data]
  }

  find(predicate: (item: T) => boolean): T | undefined {
    // 在这里设置断点 - 查找逻辑
    return this.data.find(predicate)
  }

  map<R>(mapper: (item: T) => R): R[] {
    // 在这里设置断点 - 映射操作
    return this.data.map(mapper)
  }
}

// 在这里设置断点 - 示例数据
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
]

// 在这里设置断点 - 使用泛型函数
console.log('\n=== 测试泛型函数 ===')
const adults = processArray(users, (user) => (user.age ?? 0) >= 18)
console.log('成年用户:', adults)

// 在这里设置断点 - 使用类
console.log('\n=== 测试类 ===')
const processor = new DataProcessor<User>(users)

// 在这里设置断点 - 调用方法
const user = processor.find((u) => u.name === 'Bob')
console.log('找到用户:', user)

// 在这里设置断点 - 使用 map
const names = processor.map((u) => u.name)
console.log('所有用户名:', names)

// 在这里设置断点 - 异步函数
async function fetchData(userId: number): Promise<User | null> {
  console.log(`获取用户 ${userId} 的数据...`)

  // 模拟异步操作
  await new Promise((resolve) => setTimeout(resolve, 100))

  // 在这里设置断点 - 查找用户
  const user = users.find((u) => u.id === userId)

  if (user) {
    console.log('找到用户:', user.name)
    return user
  } else {
    console.log('用户不存在')
    return null
  }
}

// 在这里设置断点 - 调用异步函数
;(async () => {
  console.log('\n=== 测试异步函数 ===')
  const user = await fetchData(2)
  console.log('获取结果:', user)
})()

// 在这里设置断点 - 装饰器（需要启用 experimentalDecorators）
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    // 在这里设置断点 - 方法调用前
    console.log(`调用 ${propertyKey}，参数:`, args)

    const result = originalMethod.apply(this, args)

    // 在这里设置断点 - 方法调用后
    console.log(`${propertyKey} 返回:`, result)

    return result
  }

  return descriptor
}

// 在这里设置断点 - 错误处理
try {
  console.log('\n=== 测试错误处理 ===')

  // 在这里设置断点 - 类型守卫
  function isUser(obj: any): obj is User {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj.id === 'number' &&
      typeof obj.name === 'string' &&
      typeof obj.email === 'string'
    )
  }

  const maybeUser: unknown = { id: 1, name: 'Test' }

  // 在这里设置断点 - 使用类型守卫
  if (isUser(maybeUser)) {
    console.log('有效用户:', maybeUser.name)
  } else {
    console.log('无效用户数据')
  }
} catch (error) {
  // 在这里设置断点 - 异常捕获
  console.error('错误:', error)
}

console.log('\n✅ 程序执行完成')

export { User, UserRole, processArray, DataProcessor, fetchData }
