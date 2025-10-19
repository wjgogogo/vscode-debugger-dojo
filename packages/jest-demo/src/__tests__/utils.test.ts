import { ArrayUtils, StringUtils } from '../utils.js'

describe('ArrayUtils', () => {
  describe('sum', () => {
    it('应该正确计算数组和', () => {
      // 在这里设置断点
      const result = ArrayUtils.sum([1, 2, 3, 4, 5])
      expect(result).toBe(15)
    })

    it('应该处理空数组', () => {
      const result = ArrayUtils.sum([])
      expect(result).toBe(0)
    })

    it('应该处理负数', () => {
      const result = ArrayUtils.sum([-1, -2, -3])
      expect(result).toBe(-6)
    })
  })

  describe('average', () => {
    it('应该正确计算平均值', () => {
      // 在这里设置断点
      const result = ArrayUtils.average([10, 20, 30])
      expect(result).toBe(20)
    })

    it('应该在空数组时抛出错误', () => {
      // 在这里设置断点，观察异常处理
      expect(() => ArrayUtils.average([])).toThrow('数组不能为空')
    })
  })

  describe('max', () => {
    it('应该找到最大值', () => {
      // 在这里设置断点
      const result = ArrayUtils.max([3, 7, 2, 9, 1])
      expect(result).toBe(9)
    })

    it('应该处理负数', () => {
      const result = ArrayUtils.max([-5, -2, -8])
      expect(result).toBe(-2)
    })
  })

  describe('min', () => {
    it('应该找到最小值', () => {
      // 在这里设置断点
      const result = ArrayUtils.min([3, 7, 2, 9, 1])
      expect(result).toBe(1)
    })
  })

  describe('unique', () => {
    it('应该去除重复元素', () => {
      // 在这里设置断点，观察去重过程
      const result = ArrayUtils.unique([1, 2, 2, 3, 3, 3, 4])
      expect(result).toEqual([1, 2, 3, 4])
    })

    it('应该处理字符串数组', () => {
      const result = ArrayUtils.unique(['a', 'b', 'a', 'c', 'b'])
      expect(result).toEqual(['a', 'b', 'c'])
    })
  })

  describe('chunk', () => {
    it('应该正确分块', () => {
      // 在这里设置断点，观察分块逻辑
      const result = ArrayUtils.chunk([1, 2, 3, 4, 5, 6, 7], 3)
      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]])
    })

    it('应该处理整除情况', () => {
      const result = ArrayUtils.chunk([1, 2, 3, 4], 2)
      expect(result).toEqual([[1, 2], [3, 4]])
    })
  })
})

describe('StringUtils', () => {
  describe('reverse', () => {
    it('应该正确反转字符串', () => {
      // 在这里设置断点
      const result = StringUtils.reverse('hello')
      expect(result).toBe('olleh')
    })

    it('应该处理空字符串', () => {
      const result = StringUtils.reverse('')
      expect(result).toBe('')
    })

    it('应该处理中文', () => {
      const result = StringUtils.reverse('你好世界')
      expect(result).toBe('界世好你')
    })
  })

  describe('isPalindrome', () => {
    it('应该识别回文', () => {
      // 在这里设置断点
      expect(StringUtils.isPalindrome('level')).toBe(true)
      expect(StringUtils.isPalindrome('A man a plan a canal Panama')).toBe(true)
    })

    it('应该识别非回文', () => {
      expect(StringUtils.isPalindrome('hello')).toBe(false)
    })
  })

  describe('countWords', () => {
    it('应该正确统计单词数', () => {
      // 在这里设置断点
      const result = StringUtils.countWords('Hello world from Jest')
      expect(result).toBe(4)
    })

    it('应该处理多个空格', () => {
      const result = StringUtils.countWords('Hello   world')
      expect(result).toBe(2)
    })

    it('应该处理空字符串', () => {
      const result = StringUtils.countWords('')
      expect(result).toBe(0)
    })
  })

  describe('capitalize', () => {
    it('应该首字母大写', () => {
      // 在这里设置断点
      const result = StringUtils.capitalize('hello')
      expect(result).toBe('Hello')
    })

    it('应该处理已大写的字符串', () => {
      const result = StringUtils.capitalize('HELLO')
      expect(result).toBe('Hello')
    })

    it('应该处理空字符串', () => {
      const result = StringUtils.capitalize('')
      expect(result).toBe('')
    })
  })
})
