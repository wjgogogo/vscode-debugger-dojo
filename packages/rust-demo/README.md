# Rust CodeLLDB 调试示例

这个示例展示了如何在 VSCode 中使用 CodeLLDB 扩展调试 Rust 项目，包括调试主程序、所有测试和特定测试。

## 前置条件

### 1. 安装 Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustc --version && cargo --version
```

### 2. 安装 VSCode 扩展

- **rust-analyzer**: Rust 语言支持
- **CodeLLDB**: LLDB 调试器适配器

## 项目结构

```
src/
├── bin/
│   └── hello.rs          # 主程序，展示各种 Rust 类型和操作的调试
└── lib.rs               # 库文件，包含 math 模块和测试
```

### 项目内容

**src/bin/hello.rs** - 主程序示例，包含：
- 基础类型（整数、浮点数、字符串、布尔值）
- 数组、切片、元组
- 字符串操作和 Vector
- 循环、函数调用、递归调用
- 调用库中的 math 模块函数

**src/lib.rs** - 库模块，提供：
- `math::factorial(n)` - 递归计算阶乘（观察递归调用）
- `math::is_prime(n)` - 判断质数（观察循环执行）
- 两个单元测试：`test_factorial` 和 `test_is_prime`

## 快速开始

### 1. 构建项目

```bash
cargo build
```

### 2. 调试方式

按 F5 选择以下配置之一进行调试：

#### 方式一：调试主程序 （Rust - Debug hello）

1. 在 `src/bin/hello.rs` 中设置断点
2. 选择 "Rust - Debug hello" 配置
3. 按 F5 启动调试
4. 程序会在断点处暂停

#### 方式二：调试所有测试（Rust - Debug All Tests）

1. 在 `src/lib.rs` 中的测试函数设置断点
2. 选择 "Rust - Debug All Tests" 配置
3. 按 F5 启动调试
4. 所有测试会依次执行并在断点处暂停

#### 方式三：调试特定测试（Rust - Debug Specific Test）

1. 在 `src/lib.rs` 中的测试函数设置断点
2. 选择 "Rust - Debug Specific Test" 配置
3. 按 F5 启动调试，会提示输入测试函数名
4. 输入测试名称（如 `test_factorial`）
5. 指定测试会执行并在断点处暂停

## 调试配置详解

### 调试主程序配置

```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug hello",
  "cargo": {
    "args": [
      "build",
      "--bin=hello",
      "--package=rust-demo",
      "--manifest-path=${workspaceFolder}/packages/rust-demo/Cargo.toml"
    ],
    "filter": {
      "name": "hello",
      "kind": "bin"
    }
  },
  "args": [],
  "cwd": "${workspaceFolder}/packages/rust-demo",
  "sourceLanguages": ["rust"]
}
```

**配置说明：**
- `type: "lldb"` - 使用 LLDB 调试器
- `cargo.args` - Cargo 构建参数，包含完整的 manifest-path
- `cargo.filter` - 指定要调试的二进制名称和类型
- `sourceLanguages: ["rust"]` - 指定源代码语言为 Rust

### 调试所有测试配置

```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug All Tests",
  "cargo": {
    "args": [
      "test",
      "--no-run",
      "--lib",
      "--package=rust-demo",
      "--manifest-path=${workspaceFolder}/packages/rust-demo/Cargo.toml"
    ]
  },
  "args": ["--nocapture", "--test-threads=1"],
  "cwd": "${workspaceFolder}/packages/rust-demo",
  "sourceLanguages": ["rust"],
  "env": {
    "RUST_BACKTRACE": "short"
  }
}
```

**配置说明：**
- `--no-run` - 仅编译测试，不运行
- `--lib` - 仅编译库的测试
- `args: ["--nocapture", "--test-threads=1"]` - 显示测试输出且单线程执行
- `RUST_BACKTRACE: "short"` - 启用简短的错误堆栈跟踪

### 调试特定测试配置

```json
{
  "type": "lldb",
  "request": "launch",
  "name": "Rust - Debug Specific Test",
  "cargo": {
    "args": [
      "test",
      "--no-run",
      "--lib",
      "--package=rust-demo",
      "--manifest-path=${workspaceFolder}/packages/rust-demo/Cargo.toml"
    ]
  },
  "args": ["${input:rustTestName}", "--nocapture", "--test-threads=1"],
  "cwd": "${workspaceFolder}/packages/rust-demo",
  "sourceLanguages": ["rust"],
  "env": {
    "RUST_BACKTRACE": "short"
  }
}
```

**配置说明：**
- `${input:rustTestName}` - 调试时提示用户输入测试名称
- 支持运行单个测试，可以输入完整的测试函数名

## 调试技巧

### 设置条件断点

在 Rust 代码中通过注释标记推荐的断点位置：

- `// 在这里设置断点，...` - 表示适合设置断点的位置
- `// 在这里设置条件断点: ...` - 表示适合设置条件断点的位置

### 调试输出

- 按 F6 设置前后进行：进入函数、跳过语句、继续执行
- 查看 LLDB Console 和 Rust 程序的标准输出
