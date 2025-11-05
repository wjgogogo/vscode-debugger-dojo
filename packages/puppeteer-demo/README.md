# Puppeteer 调试演示

演示如何在 VSCode 中调试 Puppeteer 自动化脚本。

## VSCode 调试配置

### 1. Puppeteer - Auto Fill Form

```json
{
  "type": "node",
  "request": "launch",
  "name": "Puppeteer - Auto Fill Form",
  "program": "${workspaceFolder}/packages/puppeteer-demo/scripts/auto-fill-form.js",
  "env": {
    "HEADLESS": "false"
  },
  "preLaunchTask": "puppeteer-demo: start-server",
  "postDebugTask": "kill-puppeteer-demo-dev"
}
```

**功能：**
- 自动启动 Vite 开发服务器（preLaunchTask）
- 以有界面模式启动 Chrome（`HEADLESS=false`）
- 执行自动填表脚本
- 调试结束后自动清理服务器进程（postDebugTask）

**使用方法：**
1. 按 F5 选择 "Puppeteer - Auto Fill Form"
2. VSCode 自动启动 Vite 服务器
3. Puppeteer 启动 Chrome 并打开调试端口 9222
4. 脚本自动填写表单
5. 浏览器保持打开状态，方便手动检查

### 2. Puppeteer - Chrome Attach

```json
{
  "type": "chrome",
  "request": "attach",
  "name": "Puppeteer - Chrome Attach",
  "port": 9222,
  "urlFilter": "http://localhost:5173/*",
  "webRoot": "${workspaceFolder}/packages/puppeteer-demo"
}
```

**功能：**
- 附加到 Puppeteer 启动的 Chrome 浏览器（端口 9222）
- 只附加到本地开发页面（urlFilter）
- 可以调试浏览器中的前端代码

**使用方法：**
1. 先运行 "Puppeteer - Auto Fill Form"
2. 然后运行 "Puppeteer - Chrome Attach"
3. 现在可以同时调试 Node.js 和浏览器代码

### 3. Puppeteer - Full Stack（推荐）

```json
{
  "name": "Puppeteer - Full Stack",
  "configurations": [
    "Puppeteer - Auto Fill Form",
    "Puppeteer - Chrome Attach"
  ],
  "stopAll": true
}
```

**功能：**
- 一键启动 Node.js 和 Chrome 调试
- 同时调试 Puppeteer 脚本和浏览器页面
- 停止时自动清理所有调试会话

**使用方法：**
1. 按 F5 选择 "Puppeteer - Full Stack"
2. 自动启动开发服务器、Puppeteer 脚本和 Chrome 调试器
3. 可以在 Node.js 代码和浏览器代码中设置断点

## Puppeteer 与 Chrome 调试

### 启动配置

Puppeteer 通过以下配置启动 Chrome：

```javascript
const launchOptions = {
  headless: config.headless,           // false = 显示浏览器窗口
  executablePath: config.executablePath, // Chrome 可执行文件路径
  args: ["--remote-debugging-port=9222"] // 开启远程调试端口
};

browser = await puppeteer.launch(launchOptions);
```

### Chrome 路径配置

**macOS：**
```javascript
executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

**Linux：**
```javascript
executablePath: "/usr/bin/google-chrome"
// 或 "/snap/bin/chromium"
```

**Windows：**
```javascript
executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
```

### 调试端口说明

- `--remote-debugging-port=9222` 开启 Chrome 远程调试协议
- VSCode Chrome 调试器通过此端口连接到浏览器
- `urlFilter` 过滤附加的页面，避免附加到其他标签页

## 常见问题

### Chrome 找不到

**问题：** `Could not find Chrome (ver. xxx)`

**解决方案：**
1. 检查系统是否安装了 Chrome
2. 在脚本中配置正确的 `executablePath`
3. 或安装 Puppeteer 官方 Chrome：`npx puppeteer browsers install chrome`

### 调试器无法连接

**问题：** Chrome 调试器连接失败

**检查项：**
- Puppeteer 是否成功启动 Chrome（查看终端日志）
- 端口 9222 是否被占用（`lsof -i:9222`）
- Chrome 是否开启了远程调试端口
