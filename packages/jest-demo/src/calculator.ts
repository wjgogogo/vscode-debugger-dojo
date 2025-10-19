/**
 * 计算器类 - 用于演示 Jest 测试和调试
 */
export class Calculator {
  private history: string[] = []

  /**
   * 加法
   */
  add(a: number, b: number): number {
    // 在这里设置断点，调试加法逻辑
    const result = a + b
    this.history.push(`${a} + ${b} = ${result}`)
    return result
  }

  /**
   * 减法
   */
  subtract(a: number, b: number): number {
    // 在这里设置断点
    const result = a - b
    this.history.push(`${a} - ${b} = ${result}`)
    return result
  }

  /**
   * 乘法
   */
  multiply(a: number, b: number): number {
    // 在这里设置断点
    const result = a * b
    this.history.push(`${a} × ${b} = ${result}`)
    return result
  }

  /**
   * 除法
   */
  divide(a: number, b: number): number {
    // 在这里设置条件断点: b === 0
    if (b === 0) {
      throw new Error('除数不能为 0')
    }
    const result = a / b
    this.history.push(`${a} ÷ ${b} = ${result}`)
    return result
  }

  /**
   * 幂运算
   */
  power(base: number, exponent: number): number {
    // 在这里设置断点，观察递归或循环
    let result = 1
    for (let i = 0; i < exponent; i++) {
      result *= base
    }
    this.history.push(`${base}^${exponent} = ${result}`)
    return result
  }

  /**
   * 获取历史记录
   */
  getHistory(): string[] {
    return [...this.history]
  }

  /**
   * 清除历史记录
   */
  clearHistory(): void {
    this.history = []
  }
}
