/// 数学工具库
pub mod math {
    /// 计算阶乘
    /// 在这里设置断点，观察递归
    pub fn factorial(n: u64) -> u64 {
        // 在这里设置断点，查看参数
        println!("计算 factorial({})", n);

        if n == 0 || n == 1 {
            return 1;
        }

        // 在这里设置断点，观察递归调用
        n * factorial(n - 1)
    }

    /// 判断是否为质数
    /// 在这里设置断点，观察循环
    pub fn is_prime(n: u64) -> bool {
        // 在这里设置条件断点: n > 100
        println!("检查 {} 是否为质数", n);

        if n <= 1 {
            return false;
        }
        if n <= 3 {
            return true;
        }
        if n % 2 == 0 || n % 3 == 0 {
            return false;
        }

        // 在这里设置断点，观察循环过程
        let mut i = 5;
        while i * i <= n {
            if n % i == 0 || n % (i + 2) == 0 {
                return false;
            }
            i += 6;
        }

        true
    }

    /// 生成斐波那契数列
    /// 在这里设置断点，观察 Vec 的构建
    pub fn fibonacci(n: usize) -> Vec<u64> {
        println!("生成前 {} 个斐波那契数", n);

        if n == 0 {
            return vec![];
        }
        if n == 1 {
            return vec![0];
        }

        let mut result = vec![0, 1];

        // 在这里设置断点，观察 Vec 的增长
        for i in 2..n {
            let next = result[i - 1] + result[i - 2];
            result.push(next);
        }

        result
    }

    /// 计算最大公约数（辗转相除法）
    /// 在这里设置断点，观察递归算法
    pub fn gcd(a: u64, b: u64) -> u64 {
        println!("计算 gcd({}, {})", a, b);

        if b == 0 {
            a
        } else {
            // 在这里设置断点
            gcd(b, a % b)
        }
    }
}

/// 数据结构
pub mod data_structures {
    use std::fmt::Display;

    /// 栈结构
    #[derive(Debug)]
    pub struct Stack<T> {
        items: Vec<T>,
    }

    impl<T> Stack<T> {
        /// 创建新栈
        pub fn new() -> Self {
            // 在这里设置断点
            Stack { items: Vec::new() }
        }

        /// 压栈
        /// 在这里设置断点，观察栈的变化
        pub fn push(&mut self, item: T) {
            println!("压栈");
            self.items.push(item);
        }

        /// 出栈
        /// 在这里设置断点，观察出栈操作
        pub fn pop(&mut self) -> Option<T> {
            println!("出栈");
            self.items.pop()
        }

        /// 查看栈顶
        pub fn peek(&self) -> Option<&T> {
            self.items.last()
        }

        /// 判断栈是否为空
        pub fn is_empty(&self) -> bool {
            self.items.is_empty()
        }

        /// 获取栈的大小
        pub fn len(&self) -> usize {
            self.items.len()
        }
    }

    impl<T: Display> Stack<T> {
        /// 打印栈内容
        /// 在这里设置断点，查看栈的状态
        pub fn print(&self) {
            println!("栈内容 (共 {} 个元素):", self.items.len());
            for (i, item) in self.items.iter().enumerate() {
                println!("  [{}]: {}", i, item);
            }
        }
    }
}

/// 字符串工具
pub mod string_utils {
    /// 反转字符串
    /// 在这里设置断点，观察字符串操作
    pub fn reverse(s: &str) -> String {
        println!("反转字符串: {}", s);
        s.chars().rev().collect()
    }

    /// 判断是否为回文
    /// 在这里设置断点，观察比较过程
    pub fn is_palindrome(s: &str) -> bool {
        let cleaned: String = s
            .chars()
            .filter(|c| c.is_alphanumeric())
            .map(|c| c.to_lowercase().next().unwrap())
            .collect();

        // 在这里设置断点，查看处理后的字符串
        let reversed = reverse(&cleaned);
        cleaned == reversed
    }

    /// 统计单词数
    pub fn count_words(s: &str) -> usize {
        // 在这里设置断点
        s.split_whitespace().count()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_factorial() {
        // 在这里设置断点，调试测试用例
        assert_eq!(math::factorial(0), 1);
        assert_eq!(math::factorial(5), 120);
    }

    #[test]
    fn test_is_prime() {
        // 在这里设置断点
        assert!(math::is_prime(2));
        assert!(math::is_prime(7));
        assert!(!math::is_prime(4));
    }

    #[test]
    fn test_fibonacci() {
        // 在这里设置断点
        let result = math::fibonacci(5);
        assert_eq!(result, vec![0, 1, 1, 2, 3]);
    }

    #[test]
    fn test_stack() {
        // 在这里设置断点，观察栈操作
        let mut stack = data_structures::Stack::new();
        stack.push(1);
        stack.push(2);
        stack.push(3);

        assert_eq!(stack.len(), 3);
        assert_eq!(stack.pop(), Some(3));
        assert_eq!(stack.pop(), Some(2));
    }
}
