import { Calculator } from '../calculator.js'

describe('Calculator', () => {
  let calculator: Calculator

  // 在这里设置断点，观察测试初始化
  beforeEach(() => {
    calculator = new Calculator()
    console.log('测试初始化')
  })

  afterEach(() => {
    console.log('测试清理')
  })

  describe('加法测试', () => {
    it('应该正确计算两个正数的和', () => {
      // 在这里设置断点，单步调试测试用例
      console.log('测试: 正数加法')
      const result = calculator.add(2, 3)
      expect(result).toBe(5)
    })

    it('应该正确计算负数的和', () => {
      // 在这里设置断点
      const result = calculator.add(-2, -3)
      expect(result).toBe(-5)
    })

    it('应该正确计算小数的和', () => {
      const result = calculator.add(0.1, 0.2)
      // 在这里设置断点，观察浮点数精度问题
      expect(result).toBeCloseTo(0.3)
    })
  })

  describe('减法测试', () => {
    it('应该正确计算两个数的差', () => {
      // 在这里设置断点
      const result = calculator.subtract(5, 3)
      expect(result).toBe(2)
    })

    it('应该正确处理负数结果', () => {
      const result = calculator.subtract(3, 5)
      expect(result).toBe(-2)
    })
  })

  describe('乘法测试', () => {
    it('应该正确计算两个数的积', () => {
      // 在这里设置断点
      const result = calculator.multiply(4, 5)
      expect(result).toBe(20)
    })

    it('应该正确处理零', () => {
      const result = calculator.multiply(5, 0)
      expect(result).toBe(0)
    })

    it('应该正确处理负数', () => {
      const result = calculator.multiply(-3, 4)
      expect(result).toBe(-12)
    })
  })

  describe('除法测试', () => {
    it('应该正确计算两个数的商', () => {
      // 在这里设置断点
      const result = calculator.divide(10, 2)
      expect(result).toBe(5)
    })

    it('应该正确处理小数结果', () => {
      const result = calculator.divide(10, 3)
      expect(result).toBeCloseTo(3.333, 2)
    })

    it('应该在除数为 0 时抛出错误', () => {
      // 在这里设置断点，观察异常处理
      console.log('测试: 除以零')
      expect(() => calculator.divide(10, 0)).toThrow('除数不能为 0')
    })
  })

  describe('幂运算测试', () => {
    it('应该正确计算幂运算', () => {
      // 在这里设置断点，单步调试循环
      const result = calculator.power(2, 3)
      expect(result).toBe(8)
    })

    it('应该正确处理指数为 0', () => {
      const result = calculator.power(5, 0)
      expect(result).toBe(1)
    })

    it('应该正确处理底数为 0', () => {
      const result = calculator.power(0, 5)
      expect(result).toBe(0)
    })
  })

  describe('历史记录测试', () => {
    it('应该记录所有操作', () => {
      // 在这里设置断点，观察状态变化
      calculator.add(1, 2)
      calculator.subtract(5, 3)
      calculator.multiply(2, 4)

      const history = calculator.getHistory()
      // 在这里设置断点，查看 history 内容
      expect(history).toHaveLength(3)
      expect(history[0]).toBe('1 + 2 = 3')
      expect(history[1]).toBe('5 - 3 = 2')
      expect(history[2]).toBe('2 × 4 = 8')
    })

    it('应该能够清除历史记录', () => {
      calculator.add(1, 2)
      calculator.clearHistory()

      // 在这里设置断点
      const history = calculator.getHistory()
      expect(history).toHaveLength(0)
    })
  })

  describe('边界测试', () => {
    it('应该处理非常大的数', () => {
      // 在这里设置断点
      const result = calculator.add(Number.MAX_SAFE_INTEGER, 1)
      expect(result).toBeGreaterThan(Number.MAX_SAFE_INTEGER)
    })

    it('应该处理非常小的数', () => {
      const result = calculator.add(Number.MIN_SAFE_INTEGER, -1)
      expect(result).toBeLessThan(Number.MIN_SAFE_INTEGER)
    })
  })
})
