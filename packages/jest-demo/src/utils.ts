/**
 * 数组工具函数
 */
export class ArrayUtils {
  /**
   * 数组求和
   */
  static sum(numbers: number[]): number {
    // 在这里设置断点，观察 reduce 执行过程
    return numbers.reduce((acc, num) => {
      console.log(`累加: ${acc} + ${num}`)
      return acc + num
    }, 0)
  }

  /**
   * 数组平均值
   */
  static average(numbers: number[]): number {
    // 在这里设置条件断点: numbers.length === 0
    if (numbers.length === 0) {
      throw new Error('数组不能为空')
    }
    const sum = this.sum(numbers)
    return sum / numbers.length
  }

  /**
   * 查找最大值
   */
  static max(numbers: number[]): number {
    // 在这里设置断点
    if (numbers.length === 0) {
      throw new Error('数组不能为空')
    }
    return Math.max(...numbers)
  }

  /**
   * 查找最小值
   */
  static min(numbers: number[]): number {
    // 在这里设置断点
    if (numbers.length === 0) {
      throw new Error('数组不能为空')
    }
    return Math.min(...numbers)
  }

  /**
   * 数组去重
   */
  static unique<T>(array: T[]): T[] {
    // 在这里设置断点，观察 Set 去重
    return [...new Set(array)]
  }

  /**
   * 数组分块
   */
  static chunk<T>(array: T[], size: number): T[][] {
    // 在这里设置断点，观察分块逻辑
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }
}

/**
 * 字符串工具函数
 */
export class StringUtils {
  /**
   * 反转字符串
   */
  static reverse(str: string): string {
    // 在这里设置断点
    return str.split('').reverse().join('')
  }

  /**
   * 判断是否为回文
   */
  static isPalindrome(str: string): boolean {
    // 在这里设置断点，观察比较过程
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '')
    const reversed = this.reverse(cleaned)
    return cleaned === reversed
  }

  /**
   * 统计单词数
   */
  static countWords(str: string): number {
    // 在这里设置断点
    const words = str.trim().split(/\s+/)
    return words.filter((word) => word.length > 0).length
  }

  /**
   * 首字母大写
   */
  static capitalize(str: string): string {
    // 在这里设置断点
    if (str.length === 0) return str
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
}
