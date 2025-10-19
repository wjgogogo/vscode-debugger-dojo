# Rust CodeLLDB 调试示例

这个示例展示了如何在 VSCode 中使用 CodeLLDB 扩展调试 Rust 项目。

## 前置条件

### 1. 安装 Rust

```bash
# macOS / Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 验证安装
rustc --version
cargo --version
```

### 2. 安装 VSCode 扩展

- **rust-analyzer**: Rust 语言支持
- **CodeLLDB**: LLDB 调试器适配器

## 快速开始

### 1. 构建项目

```bash
# 构建
cargo build

# 构建发布版本
cargo build --release
```

### 2. 运行程序

```bash
# 运行 hello 二进制
cargo run --bin hello

# 运行 calculator 二进制
cargo run --bin calculator
```

### 3. 运行测试

```bash
# 运行所有测试
cargo test

# 运行特定测试
cargo test test_factorial
```

## 调试方式

### 方式一：调试主程序

1. 打开 `src/bin/hello.rs`
2. 设置断点
3. 按 F5 或选择 "Rust - Debug hello" 配置
4. 程序会在断点处暂停

### 方式二：调试测试

1. 打开 `src/lib.rs`
2. 在测试函数中设置断点
3. 选择 "Rust - Debug Tests" 配置
4. 按 F5 启动调试

### 方式三：调试特定二进制

选择对应的调试配置：
- "Rust - Debug hello": 调试 hello 程序
- "Rust - Debug calculator": 调试 calculator 程序

## 调试配置详解

### 基础配置

```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug hello",
  "cargo": {
    "args": [
      "build",
      "--bin=hello",
      "--package=rust-demo"
    ],
    "filter": {
      "name": "hello",
      "kind": "bin"
    }
  },
  "args": [],
  "cwd": "${workspaceFolder}/packages/rust-demo"
}
```

**配置说明：**
- `type: "lldb"`: 使用 LLDB 调试器
- `cargo.args`: Cargo 构建参数
- `cargo.filter`: 指定要调试的二进制
- `args`: 程序命令行参数
- `cwd`: 工作目录

### 调试测试配置

```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug Tests",
  "cargo": {
    "args": [
      "test",
      "--no-run",
      "--package=rust-demo"
    ],
    "filter": {
      "name": "rust-demo",
      "kind": "lib"
    }
  },
  "args": [],
  "cwd": "${workspaceFolder}/packages/rust-demo"
}
```

**配置说明：**
- `cargo test --no-run`: 只构建测试，不运行
- CodeLLDB 会找到测试可执行文件并调试

### 传递命令行参数

```json
{
  "args": ["arg1", "arg2"]
}
```

### 设置环境变量

```json
{
  "env": {
    "RUST_LOG": "debug",
    "MY_VAR": "value"
  }
}
```

## 项目结构

### src/lib.rs

包含库代码：
- **math 模块**: 数学函数（阶乘、质数、斐波那契、最大公约数）
- **data_structures 模块**: 数据结构（栈）
- **string_utils 模块**: 字符串工具
- **tests 模块**: 单元测试

### src/bin/hello.rs

简单的演示程序，展示：
- 基础类型调试
- 数组和切片
- 字符串操作
- 函数调用
- 递归调用

### src/bin/calculator.rs

交互式计算器，展示：
- 用户输入处理
- 模式匹配
- 错误处理
- 模块使用

## 调试技巧

### 1. 设置断点

在代码行号左侧点击设置断点，或者在代码中标记的位置设置：

```rust
fn factorial(n: u64) -> u64 {
    // 在这里设置断点
    println!("计算 factorial({})", n);

    if n == 0 || n == 1 {
        return 1;
    }

    // 在这里设置断点，观察递归
    n * factorial(n - 1)
}
```

### 2. 查看变量

在调试暂停时：
- **Variables 面板**: 查看局部变量
- **Watch 面板**: 添加监视表达式
- **鼠标悬停**: 快速查看变量值

### 3. 调试控制

- **F5**: 继续执行
- **F10**: 单步跳过（Step Over）
- **F11**: 单步进入（Step Into）
- **Shift+F11**: 单步跳出（Step Out）
- **Ctrl+Shift+F5**: 重启调试

### 4. 条件断点

右键断点 → 编辑断点 → 添加条件：

```rust
// 只在 n > 10 时中断
n > 10

// 只在特定情况时中断
is_prime && n > 100

// 命中次数
hit_count > 5
```

### 5. 日志断点

不中断执行，只输出日志：
```
计算 factorial({n})
n = {n}, result = {result}
```

### 6. 查看复杂数据结构

```rust
// Vec
let vec = vec![1, 2, 3];
// 在 Variables 面板展开查看

// HashMap
let mut map = HashMap::new();
map.insert("key", "value");
// 可以查看内部结构

// 自定义结构体
#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
}
// 可以查看字段值
```

### 7. 调用栈

在 Call Stack 面板中：
- 查看函数调用链
- 点击栈帧跳转到对应代码
- 查看每个栈帧的变量

### 8. 调试递归函数

```rust
fn factorial(n: u64) -> u64 {
    // 在这里设置断点
    if n == 0 || n == 1 {
        return 1;
    }
    n * factorial(n - 1)
}
```

在调用栈中可以看到递归深度和每层的参数值。

### 9. 调试测试

```rust
#[test]
fn test_factorial() {
    // 在这里设置断点
    assert_eq!(factorial(5), 120);
}
```

使用 "Rust - Debug Tests" 配置调试测试。

### 10. LLDB 命令

在 Debug Console 中可以直接使用 LLDB 命令：

```lldb
# 打印变量
p n

# 打印带类型
p/t n

# 查看内存
x/16xb &n

# 查看寄存器
register read

# 反汇编
disassemble
```

## 实用场景

### 1. 调试所有权和借用

```rust
fn test_ownership() {
    let s1 = String::from("hello");
    // 在这里设置断点，s1 有效

    let s2 = s1;
    // 在这里设置断点，s1 已失效，s2 有效

    // println!("{}", s1); // 编译错误
    println!("{}", s2);
}
```

### 2. 调试生命周期

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // 在这里设置断点，查看引用
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

### 3. 调试 Option 和 Result

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    // 在这里设置断点
    if b == 0 {
        Err(String::from("除数不能为 0"))
    } else {
        Ok(a / b)
    }
}

// 使用时调试
match divide(10, 0) {
    Ok(result) => {
        // 在这里设置断点
        println!("结果: {}", result);
    }
    Err(e) => {
        // 在这里设置断点
        println!("错误: {}", e);
    }
}
```

### 4. 调试迭代器

```rust
let numbers = vec![1, 2, 3, 4, 5];

// 在这里设置断点，观察迭代器链
let result: Vec<_> = numbers
    .iter()
    .map(|x| x * 2)
    .filter(|x| x > &5)
    .collect();
```

### 5. 调试闭包

```rust
let x = 10;

// 在这里设置断点
let add_x = |y| {
    // 在这里设置断点，查看捕获的变量
    x + y
};

let result = add_x(5);
```

## 常见问题

### 断点不生效

1. 确保使用 Debug 构建（`cargo build` 而不是 `cargo build --release`）
2. 检查 Cargo.toml 中的 debug 配置：
   ```toml
   [profile.dev]
   debug = true
   ```

### 变量显示为 `<optimized out>`

使用 Debug 构建，或在 Cargo.toml 中禁用优化：
```toml
[profile.dev]
opt-level = 0
```

### CodeLLDB 无法启动

1. 检查扩展是否正确安装
2. 重启 VSCode
3. 检查 LLDB 是否安装：`lldb --version`

### 找不到二进制文件

确保：
1. 项目已构建：`cargo build`
2. `cargo.filter` 配置正确
3. 检查 `target/debug` 目录

## 进阶技巧

### 1. 自定义显示格式

在 launch.json 中配置：
```json
{
  "sourceLanguages": ["rust"],
  "preLaunchTask": "cargo-build"
}
```

### 2. 使用 rust-gdb / rust-lldb

命令行调试：
```bash
# 构建
cargo build

# 使用 rust-lldb 调试
rust-lldb target/debug/hello

# LLDB 命令
(lldb) b main
(lldb) r
(lldb) n
(lldb) s
(lldb) c
(lldb) q
```

### 3. 性能分析

使用 CodeLLDB 的性能分析功能：
```json
{
  "sourceMap": {
    "/rustc/*": null
  }
}
```

### 4. 远程调试

配置远程调试：
```json
{
  "type": "lldb",
  "request": "custom",
  "targetCreateCommands": [
    "target create ${workspaceFolder}/target/debug/hello"
  ],
  "processCreateCommands": [
    "gdb-remote localhost:12345"
  ]
}
```

## 相关资源

- [Rust 官方文档](https://doc.rust-lang.org/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [CodeLLDB 文档](https://github.com/vadimcn/vscode-lldb/blob/master/MANUAL.md)
- [LLDB 命令参考](https://lldb.llvm.org/use/map.html)
- [rust-analyzer 文档](https://rust-analyzer.github.io/)
