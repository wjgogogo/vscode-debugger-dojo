use rust_demo::math;

fn main() {
    // 在这里设置断点，观察程序开始执行
    println!("🦀 Rust CodeLLDB 调试示例\n");

    // 基础类型调试
    let x = 42;
    let y = 3.14;
    let name = "Rust";
    let is_awesome = true;

    // 在这里设置断点，查看变量值
    println!("整数: {}", x);
    println!("浮点数: {}", y);
    println!("字符串: {}", name);
    println!("布尔值: {}", is_awesome);

    // 数组和切片
    let arr = [1, 2, 3, 4, 5];
    let slice = &arr[1..4];

    // 在这里设置断点，查看数组和切片
    println!("\n数组: {:?}", arr);
    println!("切片: {:?}", slice);

    // 元组
    let tuple = (1, "hello", 3.14);

    // 在这里设置断点，查看元组
    println!("\n元组: {:?}", tuple);
    println!("元组第一个元素: {}", tuple.0);

    // 字符串操作
    let s1 = String::from("Hello");
    let s2 = String::from("World");
    let s3 = format!("{} {}", s1, s2);

    // 在这里设置断点，查看字符串
    println!("\n字符串拼接: {}", s3);

    // Vector
    let mut vec = Vec::new();
    vec.push(1);
    vec.push(2);
    vec.push(3);

    // 在这里设置断点，查看 Vec 内容
    println!("\nVector: {:?}", vec);

    // 循环
    println!("\n循环输出:");
    // 在这里设置断点，观察循环执行
    for i in 1..=5 {
        println!("  i = {}", i);
    }

    // 函数调用
    println!("\n函数调用:");

    // 在这里设置断点，单步进入函数
    let result = add(10, 20);
    println!("10 + 20 = {}", result);

    // 递归调用
    println!("\n递归调用:");
    // 在这里设置断点，观察递归
    let fact = math::factorial(5);
    println!("5! = {}", fact);

    // 质数判断
    println!("\n质数判断:");
    let primes = [2, 3, 5, 7, 11, 13];
    // 在这里设置断点，观察数组遍历
    for n in primes {
        let is_p = math::is_prime(n);
        println!("  {} 是质数: {}", n, is_p);
    }

    println!("\n✨ 程序执行完成");
}

/// 简单的加法函数
/// 在这里设置断点，观察函数参数
fn add(a: i32, b: i32) -> i32 {
    println!("  add({}, {})", a, b);
    // 在这里设置断点，查看返回值
    a + b
}
