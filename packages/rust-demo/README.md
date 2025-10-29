# Rust CodeLLDB 调试示例

这个示例展示了如何在 VSCode 中使用 CodeLLDB 扩展调试 Rust 项目。

## 前置条件

### 1. 安装 Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustc --version && cargo --version
```

### 2. 安装 VSCode 扩展

- **rust-analyzer**: Rust 语言支持
- **CodeLLDB**: LLDB 调试器适配器

## 快速开始

### 1. 构建项目

```bash
cargo build
```

### 2. 调试方式

#### 方式一：调试主程序

1. 打开 `src/bin/hello.rs`
2. 设置断点
3. 按 F5 或选择 "Rust - Debug hello" 配置
4. 程序会在断点处暂停

#### 方式二：调试测试

1. 打开 `src/lib.rs`
2. 在测试函数中设置断点
3. 选择 "Rust - Debug Tests" 配置
4. 按 F5 启动调试

#### 方式三：调试特定二进制

选择对应的调试配置：
- "Rust - Debug hello": 调试 hello 程序
- "Rust - Debug calculator": 调试 calculator 程序

## 调试配置详解

### 调试程序配置

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
