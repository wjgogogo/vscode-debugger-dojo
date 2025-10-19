use rust_demo::data_structures::Stack;
use rust_demo::math;
use std::io::{self, Write};

fn main() {
    println!("🧮 Rust 计算器调试示例\n");

    loop {
        // 在这里设置断点，观察主循环
        print_menu();

        print!("\n请选择操作 (输入数字): ");
        io::stdout().flush().unwrap();

        let mut choice = String::new();
        io::stdin()
            .read_line(&mut choice)
            .expect("读取输入失败");

        // 在这里设置断点，查看用户输入
        let choice = choice.trim();

        match choice {
            "1" => {
                // 在这里设置断点，观察阶乘计算
                print!("输入一个数字: ");
                io::stdout().flush().unwrap();

                let mut input = String::new();
                io::stdin().read_line(&mut input).expect("读取失败");

                if let Ok(n) = input.trim().parse::<u64>() {
                    // 在这里设置断点，单步进入函数
                    let result = math::factorial(n);
                    println!("\n结果: {}! = {}", n, result);
                } else {
                    println!("无效的输入");
                }
            }
            "2" => {
                // 在这里设置断点，观察质数判断
                print!("输入一个数字: ");
                io::stdout().flush().unwrap();

                let mut input = String::new();
                io::stdin().read_line(&mut input).expect("读取失败");

                if let Ok(n) = input.trim().parse::<u64>() {
                    let is_p = math::is_prime(n);
                    println!("\n结果: {} {}", n, if is_p { "是质数" } else { "不是质数" });
                } else {
                    println!("无效的输入");
                }
            }
            "3" => {
                // 在这里设置断点，观察斐波那契数列生成
                print!("输入数列长度: ");
                io::stdout().flush().unwrap();

                let mut input = String::new();
                io::stdin().read_line(&mut input).expect("读取失败");

                if let Ok(n) = input.trim().parse::<usize>() {
                    let result = math::fibonacci(n);
                    println!("\n结果: {:?}", result);
                } else {
                    println!("无效的输入");
                }
            }
            "4" => {
                // 在这里设置断点，观察最大公约数计算
                print!("输入两个数字 (用空格分隔): ");
                io::stdout().flush().unwrap();

                let mut input = String::new();
                io::stdin().read_line(&mut input).expect("读取失败");

                let nums: Vec<u64> = input
                    .trim()
                    .split_whitespace()
                    .filter_map(|s| s.parse().ok())
                    .collect();

                if nums.len() == 2 {
                    let result = math::gcd(nums[0], nums[1]);
                    println!("\n结果: gcd({}, {}) = {}", nums[0], nums[1], result);
                } else {
                    println!("需要输入两个数字");
                }
            }
            "5" => {
                // 在这里设置断点，观察栈操作
                demo_stack();
            }
            "0" => {
                println!("\n再见!");
                break;
            }
            _ => {
                println!("无效的选择");
            }
        }

        println!();
    }
}

/// 打印菜单
fn print_menu() {
    println!("=" .repeat(40));
    println!("1. 计算阶乘");
    println!("2. 判断质数");
    println!("3. 生成斐波那契数列");
    println!("4. 计算最大公约数");
    println!("5. 栈操作演示");
    println!("0. 退出");
    println!("=".repeat(40));
}

/// 演示栈操作
fn demo_stack() {
    // 在这里设置断点
    println!("\n栈操作演示:");

    let mut stack: Stack<i32> = Stack::new();

    println!("\n1. 压入元素 10, 20, 30");
    // 在这里设置断点，观察压栈
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.print();

    println!("\n2. 查看栈顶");
    // 在这里设置断点，查看栈顶
    if let Some(top) = stack.peek() {
        println!("栈顶元素: {}", top);
    }

    println!("\n3. 弹出一个元素");
    // 在这里设置断点，观察出栈
    if let Some(item) = stack.pop() {
        println!("弹出: {}", item);
    }
    stack.print();

    println!("\n4. 再压入元素 40, 50");
    stack.push(40);
    stack.push(50);
    stack.print();

    println!("\n5. 弹出所有元素");
    // 在这里设置断点，观察循环出栈
    while !stack.is_empty() {
        if let Some(item) = stack.pop() {
            println!("弹出: {}", item);
        }
    }

    println!("\n栈是否为空: {}", stack.is_empty());
}
