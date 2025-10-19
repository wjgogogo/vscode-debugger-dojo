import { describe, it, expect, vi } from 'vitest'
import { delay, fetchUser, fetchUsers, retryFetch, withTimeout } from '../async'

describe('Async Utils', () => {
  describe('delay', () => {
    it('应该延迟指定时间', async () => {
      // 在这里设置断点
      const start = Date.now()
      await delay(100)
      const elapsed = Date.now() - start

      // 允许 50ms 的误差
      expect(elapsed).toBeGreaterThanOrEqual(50)
    })
  })

  describe('fetchUser', () => {
    it('应该成功获取用户', async () => {
      // 在这里设置断点，单步调试异步函数
      const user = await fetchUser(1)

      // 在这里设置断点，查看返回值
      expect(user).toEqual({
        id: 1,
        name: '用户1',
      })
    })

    it('应该在无效 ID 时抛出错误', async () => {
      // 在这里设置断点，观察异步异常
      await expect(fetchUser(0)).rejects.toThrow('无效的用户 ID')
    })
  })

  describe('fetchUsers', () => {
    it('应该批量获取用户', async () => {
      // 在这里设置断点
      const users = await fetchUsers([1, 2, 3])

      // 在这里设置断点，查看结果
      expect(users).toHaveLength(3)
      expect(users[0]).toEqual({ id: 1, name: '用户1' })
      expect(users[1]).toEqual({ id: 2, name: '用户2' })
      expect(users[2]).toEqual({ id: 3, name: '用户3' })
    })

    it('应该处理空数组', async () => {
      const users = await fetchUsers([])
      expect(users).toEqual([])
    })
  })

  describe('retryFetch', () => {
    it('应该在首次成功时不重试', async () => {
      // 在这里设置断点
      const fn = vi.fn(async () => 'success')

      const result = await retryFetch(fn, 3)

      // 在这里设置断点，查看调用次数
      expect(result).toBe('success')
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('应该在失败后重试', async () => {
      // 在这里设置断点，观察重试逻辑
      let attempts = 0
      const fn = vi.fn(async () => {
        attempts++
        if (attempts < 3) {
          throw new Error('失败')
        }
        return 'success'
      })

      const result = await retryFetch(fn, 3)

      // 在这里设置断点
      expect(result).toBe('success')
      expect(fn).toHaveBeenCalledTimes(3)
    })

    it('应该在所有重试失败后抛出错误', async () => {
      // 在这里设置断点
      const fn = vi.fn(async () => {
        throw new Error('始终失败')
      })

      // 在这里设置断点，观察异常处理
      await expect(retryFetch(fn, 3)).rejects.toThrow('始终失败')
      expect(fn).toHaveBeenCalledTimes(3)
    })
  })

  describe('withTimeout', () => {
    it('应该在超时前返回结果', async () => {
      // 在这里设置断点
      const promise = delay(50).then(() => 'success')

      const result = await withTimeout(promise, 200)

      expect(result).toBe('success')
    })

    it('应该在超时后抛出错误', async () => {
      // 在这里设置断点，观察超时处理
      const promise = delay(200).then(() => 'success')

      // 在这里设置断点
      await expect(withTimeout(promise, 50)).rejects.toThrow('操作超时')
    })
  })
})
