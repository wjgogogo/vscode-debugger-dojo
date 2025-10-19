import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { factorial, isPrime, fibonacci, gcd, lcm, combination } from '../math'

describe('Math Utils', () => {
  // 在这里设置断点，观察测试初始化
  beforeEach(() => {
    console.log('测试开始')
  })

  afterEach(() => {
    console.log('测试结束')
  })

  describe('factorial', () => {
    it('应该正确计算阶乘', () => {
      // 在这里设置断点
      expect(factorial(0)).toBe(1)
      expect(factorial(1)).toBe(1)
      expect(factorial(5)).toBe(120)
      expect(factorial(10)).toBe(3628800)
    })

    it('应该在负数时抛出错误', () => {
      // 在这里设置断点，观察异常处理
      expect(() => factorial(-1)).toThrow('阶乘不支持负数')
    })
  })

  describe('isPrime', () => {
    it('应该正确识别质数', () => {
      // 在这里设置断点
      expect(isPrime(2)).toBe(true)
      expect(isPrime(3)).toBe(true)
      expect(isPrime(5)).toBe(true)
      expect(isPrime(7)).toBe(true)
      expect(isPrime(11)).toBe(true)
      expect(isPrime(13)).toBe(true)
    })

    it('应该正确识别非质数', () => {
      // 在这里设置断点
      expect(isPrime(0)).toBe(false)
      expect(isPrime(1)).toBe(false)
      expect(isPrime(4)).toBe(false)
      expect(isPrime(6)).toBe(false)
      expect(isPrime(8)).toBe(false)
      expect(isPrime(9)).toBe(false)
    })

    it('应该处理大质数', () => {
      // 在这里设置条件断点，观察性能
      expect(isPrime(97)).toBe(true)
      expect(isPrime(100)).toBe(false)
    })
  })

  describe('fibonacci', () => {
    it('应该生成正确的斐波那契数列', () => {
      // 在这里设置断点
      expect(fibonacci(0)).toEqual([])
      expect(fibonacci(1)).toEqual([0])
      expect(fibonacci(2)).toEqual([0, 1])
      expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3])
      expect(fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34])
    })

    it('应该处理边界情况', () => {
      expect(fibonacci(-1)).toEqual([])
      expect(fibonacci(1)).toEqual([0])
    })
  })

  describe('gcd', () => {
    it('应该正确计算最大公约数', () => {
      // 在这里设置断点，观察递归
      expect(gcd(12, 8)).toBe(4)
      expect(gcd(48, 18)).toBe(6)
      expect(gcd(100, 50)).toBe(50)
    })

    it('应该处理互质数', () => {
      // 互质数的最大公约数为 1
      expect(gcd(7, 13)).toBe(1)
      expect(gcd(17, 19)).toBe(1)
    })

    it('应该处理相同的数', () => {
      expect(gcd(42, 42)).toBe(42)
    })
  })

  describe('lcm', () => {
    it('应该正确计算最小公倍数', () => {
      // 在这里设置断点
      expect(lcm(4, 6)).toBe(12)
      expect(lcm(12, 18)).toBe(36)
      expect(lcm(21, 6)).toBe(42)
    })

    it('应该处理互质数', () => {
      // 互质数的最小公倍数为两数之积
      expect(lcm(7, 13)).toBe(91)
    })
  })

  describe('combination', () => {
    it('应该正确计算组合数', () => {
      // 在这里设置断点
      expect(combination(5, 0)).toBe(1)
      expect(combination(5, 1)).toBe(5)
      expect(combination(5, 2)).toBe(10)
      expect(combination(5, 3)).toBe(10)
      expect(combination(5, 5)).toBe(1)
    })

    it('应该处理 k > n 的情况', () => {
      expect(combination(3, 5)).toBe(0)
    })

    it('应该处理较大的数', () => {
      // 在这里设置断点，观察计算过程
      expect(combination(10, 5)).toBe(252)
      expect(combination(20, 10)).toBe(184756)
    })
  })
})
