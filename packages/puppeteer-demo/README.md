# Puppeteer 自动化调试示例

这个示例展示了如何在 VSCode 中调试 Puppeteer 自动化脚本，包括爬虫、UI 测试和批量截图。

## 功能特性

- ✅ 网页爬虫调试
- ✅ UI 自动化测试调试
- ✅ 批量截图调试
- ✅ 登录状态保存（user-data-dir）
- ✅ 有头/无头模式切换

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：调试当前脚本文件

1. 打开要调试的脚本（如 `scripts/scrape.js`）
2. 设置断点
3. 按 F5 或选择 "Puppeteer - Current File" 配置
4. 调试器会启动浏览器并在断点处暂停

#### 方式二：调试特定脚本

选择对应的调试配置：
- "Puppeteer - Scrape": 调试爬虫脚本
- "Puppeteer - Test UI": 调试 UI 测试
- "Puppeteer - Screenshot": 调试截图脚本

## 调试配置详解

### 基础配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Scrape",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/scrape.js",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### 有头模式 + user-data-dir 配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Scrape (有头模式 + user-data-dir)",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/scrape.js",
  "console": "integratedTerminal",
  "env": {
    "USER_DATA_DIR": "${workspaceFolder}/packages/puppeteer-demo/user-data",
    "HEADLESS": "false",
    "SLOWMO": "100",
    "DEVTOOLS": "true"
  }
}
```

### 无头模式配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Scrape (无头模式)",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/scrape.js",
  "console": "integratedTerminal",
  "env": {
    "HEADLESS": "true"
  }
}
```
