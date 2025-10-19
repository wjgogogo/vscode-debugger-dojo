/**
 * 异步操作工具 - Vitest 异步调试示例
 */

/**
 * 延迟函数
 */
export function delay(ms: number): Promise<void> {
  // 在这里设置断点
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 模拟异步数据获取
 */
export async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  // 在这里设置断点，观察异步执行
  console.log(`获取用户 ${id}`)

  await delay(100)

  // 在这里设置条件断点: id === 0
  if (id === 0) {
    throw new Error('无效的用户 ID')
  }

  // 在这里设置断点，观察返回值
  return {
    id,
    name: `用户${id}`,
  }
}

/**
 * 批量获取用户
 */
export async function fetchUsers(ids: number[]): Promise<Array<{ id: number; name: string }>> {
  // 在这里设置断点，观察 Promise.all
  console.log('批量获取用户:', ids)

  const promises = ids.map((id) => fetchUser(id))

  // 在这里设置断点，单步进入 await
  return await Promise.all(promises)
}

/**
 * 重试机制
 */
export async function retryFetch<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  // 在这里设置断点，观察重试逻辑
  let lastError: Error | undefined

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`尝试第 ${i + 1} 次`)
      // 在这里设置断点
      return await fn()
    } catch (error) {
      lastError = error as Error
      console.log(`第 ${i + 1} 次失败:`, lastError.message)

      if (i < maxRetries - 1) {
        // 在这里设置断点，观察重试延迟
        await delay(100 * (i + 1))
      }
    }
  }

  throw lastError
}

/**
 * 超时控制
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  // 在这里设置断点，观察 Promise.race
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`操作超时 (${timeoutMs}ms)`))
      }, timeoutMs)
    }),
  ])
}
