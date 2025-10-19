/**
 * 计算斐波那契数列（递归版本，适合调试）
 * 在这里设置断点，观察递归调用过程
 */
export function calculateFibonacci(n: number): number {
  // 在这里设置断点，观察每次递归调用
  console.log(`  计算 fibonacci(${n})`)

  if (n <= 1) {
    return n
  }

  // 在这里设置断点，单步进入递归
  const result = calculateFibonacci(n - 1) + calculateFibonacci(n - 2)

  console.log(`  fibonacci(${n}) = ${result}`)
  return result
}

/**
 * 数据处理函数（演示各种调试技巧）
 */
export function processData(data: any[]): any[] {
  // 在这里设置断点，观察数据处理过程
  console.log('开始处理数据，长度:', data.length)

  const processed = data
    .filter((item) => {
      // 在这里设置条件断点: item > 50
      console.log('  过滤项:', item)
      return typeof item === 'number' && item > 0
    })
    .map((item) => {
      // 在这里设置日志断点，输出: 处理项: {item}
      console.log('  处理项:', item)
      return item * 2
    })
    .sort((a, b) => {
      // 在这里设置断点，观察排序过程
      return b - a
    })

  console.log('数据处理完成，结果长度:', processed.length)
  return processed
}

/**
 * 模拟异步数据获取
 */
export async function fetchData(url: string): Promise<any> {
  // 在这里设置断点，观察异步函数
  console.log('开始获取数据:', url)

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 在这里设置断点，观察 await 后的执行
  console.log('数据获取完成')

  return {
    url,
    data: '模拟数据',
    timestamp: Date.now(),
  }
}

/**
 * 递归遍历对象（演示复杂调用栈）
 */
export function deepClone(obj: any, seen = new WeakMap()): any {
  // 在这里设置断点，观察递归深度
  console.log('  克隆对象:', typeof obj)

  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (seen.has(obj)) {
    return seen.get(obj)
  }

  const clone = Array.isArray(obj) ? [] : {}
  seen.set(obj, clone)

  // 在这里设置断点，观察对象遍历
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // @ts-ignore
      clone[key] = deepClone(obj[key], seen)
    }
  }

  return clone
}
