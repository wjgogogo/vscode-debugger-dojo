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
}
