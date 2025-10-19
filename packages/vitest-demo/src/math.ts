/**
 * 数学工具库 - Vitest 调试示例
 */

/**
 * 计算阶乘
 */
export function factorial(n: number): number {
  // 在这里设置断点，观察递归
  console.log(`计算 factorial(${n})`)

  if (n < 0) {
    throw new Error('阶乘不支持负数')
  }

  if (n === 0 || n === 1) {
    return 1
  }

  // 在这里设置断点，单步调试递归
  return n * factorial(n - 1)
}

/**
 * 判断是否为质数
 */
export function isPrime(n: number): boolean {
  // 在这里设置条件断点: n > 100
  console.log(`检查 ${n} 是否为质数`)

  if (n <= 1) return false
  if (n <= 3) return true
  if (n % 2 === 0 || n % 3 === 0) return false

  // 在这里设置断点，观察循环
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false
    }
  }

  return true
}

/**
 * 生成斐波那契数列
 */
export function fibonacci(n: number): number[] {
  // 在这里设置断点
  console.log(`生成前 ${n} 个斐波那契数`)

  if (n <= 0) return []
  if (n === 1) return [0]

  const result = [0, 1]

  // 在这里设置断点，观察数组构建
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2])
  }

  return result
}

/**
 * 最大公约数（辗转相除法）
 */
export function gcd(a: number, b: number): number {
  // 在这里设置断点，观察递归
  console.log(`计算 gcd(${a}, ${b})`)

  if (b === 0) {
    return a
  }

  return gcd(b, a % b)
}

/**
 * 最小公倍数
 */
export function lcm(a: number, b: number): number {
  // 在这里设置断点
  return (a * b) / gcd(a, b)
}

/**
 * 计算组合数 C(n, k)
 */
export function combination(n: number, k: number): number {
  // 在这里设置断点
  if (k > n) return 0
  if (k === 0 || k === n) return 1

  // 优化：C(n, k) = C(n, n-k)
  if (k > n - k) {
    k = n - k
  }

  let result = 1
  // 在这里设置断点，观察计算过程
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1)
  }

  return result
}
