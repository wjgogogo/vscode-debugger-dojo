# Puppeteer 自动化调试示例

这个示例展示了如何在 VSCode 中调试 Puppeteer 自动化脚本，包括使用 user-data-dir 保存登录状态和插件。

## 功能特性

- ✅ 网页爬虫调试
- ✅ UI 自动化测试调试
- ✅ 批量截图调试
- ✅ user-data-dir 配置（保存登录状态）
- ✅ 有头/无头模式切换
- ✅ slowMo 慢动作模式
- ✅ 自动打开 DevTools

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 运行脚本

```bash
# 网页爬虫
pnpm scrape

# UI 测试
pnpm test

# 批量截图
pnpm screenshot
```

### 3. 调试方式

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

### 环境变量配置（推荐）

通过 launch.json 中的 `env` 字段传递配置参数：

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

**支持的环境变量：**

| 变量 | 说明 | 默认值 | 示例 |
|------|------|--------|------|
| `USER_DATA_DIR` | 用户数据目录路径 | `./user-data` | `/path/to/user-data` |
| `HEADLESS` | 是否无头模式 | `false` | `"true"` / `"false"` |
| `SLOWMO` | 操作延迟（毫秒） | `100` | `"50"` / `"200"` |
| `DEVTOOLS` | 自动打开 DevTools | `false` | `"true"` / `"false"` |

**预设配置：**

项目已提供多种预设配置，可以直接使用：

1. **有头模式 + user-data-dir**：显示浏览器，保存登录状态
2. **无头模式**：快速执行，不显示浏览器
3. **保存登录状态**：自动恢复之前的登录会话
4. **快速模式**：无头 + 无延迟，最快速度执行

在脚本中读取环境变量：

```javascript
const config = {
  userDataDir: process.env.USER_DATA_DIR || './user-data',
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOWMO || '100'),
  devtools: process.env.DEVTOOLS === 'true',
}
```

### 有头模式调试（推荐）

```javascript
const browser = await puppeteer.launch({
  headless: false, // 显示浏览器窗口
  slowMo: 100, // 每个操作延迟 100ms，方便观察
  devtools: true, // 自动打开 DevTools
})
```

**优点：**
- 可以看到浏览器操作过程
- 可以使用 Chrome DevTools 调试页面
- 方便排查页面问题

### 无头模式调试

```javascript
const browser = await puppeteer.launch({
  headless: true, // 无头模式
})
```

**优点：**
- 更快的执行速度
- 适合 CI/CD 环境
- 节省资源

### user-data-dir 配置

```javascript
const browser = await puppeteer.launch({
  userDataDir: './user-data', // 保存用户数据的目录
})
```

**作用：**
- 保存 Cookies（保持登录状态）
- 保存浏览器设置
- 保存扩展程序
- 保存浏览历史

**使用场景：**
- 需要登录的网站爬虫
- 需要保持会话的测试
- 使用特定扩展的自动化

## 脚本说明

### scrape.js - 网页爬虫

演示基本的爬虫功能：
- 启动浏览器并访问网页
- 等待页面加载完成
- 提取页面数据（标题、链接）
- 模拟用户交互（点击）
- 截图保存

**调试要点：**
- `scrape.js:18` - 浏览器配置
- `scrape.js:28` - 浏览器启动
- `scrape.js:50` - 页面导航
- `scrape.js:66` - 数据提取
- `scrape.js:80` - 用户交互

### test-ui.js - UI 自动化测试

演示 UI 测试场景：
- 表单填写和提交
- 搜索功能测试
- 结果验证
- 截图对比

**调试要点：**
- `test-ui.js:40` - 表单填写
- `test-ui.js:64` - 表单提交
- `test-ui.js:86` - 搜索操作
- `test-ui.js:98` - 结果提取

### screenshot.js - 批量截图

演示批量处理：
- 遍历网站列表
- 全屏截图
- 可视区域截图
- 错误处理

**调试要点：**
- `screenshot.js:35` - 网站遍历
- `screenshot.js:44` - 页面加载
- `screenshot.js:50` - 截图操作

## 调试技巧

### 1. 断点调试 Puppeteer API

```javascript
// 在这里设置断点，观察浏览器启动
const browser = await puppeteer.launch({ headless: false })

// 在这里设置断点，观察页面创建
const page = await browser.newPage()

// 在这里设置断点，观察页面导航
await page.goto('https://example.com')

// 在这里设置断点，观察元素等待
await page.waitForSelector('.content')

// 在这里设置断点，观察数据提取
const data = await page.evaluate(() => {
  return document.title
})
```

### 2. 调试页面交互

```javascript
// 点击元素
// 在这里设置断点，观察点击操作
await page.click('button')

// 输入文本
// 在这里设置断点，观察输入过程
await page.type('input', '测试文本', { delay: 100 })

// 选择下拉框
await page.select('select', 'value')

// 键盘操作
await page.keyboard.press('Enter')
```

### 3. 调试 evaluate 函数

```javascript
// 在页面上下文中执行代码
const result = await page.evaluate(() => {
  // 在这里设置断点（需要在浏览器 DevTools 中）
  const title = document.querySelector('h1')
  return title?.textContent
})

// 在这里设置断点，查看返回值
console.log('结果:', result)
```

### 4. 调试异步操作

```javascript
// 等待导航
// 在这里设置断点
await page.waitForNavigation({
  waitUntil: 'networkidle2',
  timeout: 30000,
})

// 等待元素
await page.waitForSelector('.content', {
  visible: true,
  timeout: 5000,
})

// 等待函数
await page.waitForFunction(() => {
  return document.querySelectorAll('.item').length > 10
})
```

### 5. 条件断点

```javascript
// 只在特定网站时中断
site.name === 'github'

// 只在出错时中断
error !== null

// 只在找到特定元素时中断
links.length > 10
```

### 6. 日志断点

记录消息而不中断：
```
正在处理网站: {site.name}
找到链接数: {links.length}
当前 URL: {page.url()}
```

## 实用场景

### 1. 调试登录流程

```javascript
// 在这里设置断点
await page.goto('https://example.com/login')

// 填写登录表单
await page.type('#username', 'user')
await page.type('#password', 'pass')

// 在这里设置断点，观察提交前状态
await page.click('#login-button')

// 等待登录完成
await page.waitForNavigation()

// 在这里设置断点，验证登录是否成功
const isLoggedIn = await page.evaluate(() => {
  return document.querySelector('.user-menu') !== null
})
```

### 2. 调试无限滚动

```javascript
// 在这里设置断点
let previousHeight = 0
let currentHeight = await page.evaluate(() => document.body.scrollHeight)

while (currentHeight > previousHeight) {
  // 在这里设置断点，观察滚动过程
  previousHeight = currentHeight

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })

  await page.waitForTimeout(1000)

  currentHeight = await page.evaluate(() => document.body.scrollHeight)
  console.log('当前高度:', currentHeight)
}
```

### 3. 调试文件下载

```javascript
// 设置下载路径
const downloadPath = join(__dirname, '../downloads')

// 在这里设置断点
await page._client.send('Page.setDownloadBehavior', {
  behavior: 'allow',
  downloadPath,
})

// 触发下载
await page.click('a[download]')

// 等待下载完成
await page.waitForTimeout(2000)
```

### 4. 调试 iframe

```javascript
// 在这里设置断点
const frameHandle = await page.$('iframe')
const frame = await frameHandle.contentFrame()

// 在 iframe 中操作
// 在这里设置断点
await frame.waitForSelector('.content')
const content = await frame.$eval('.content', (el) => el.textContent)
```

## user-data-dir 使用技巧

### 首次登录

1. 以有头模式运行脚本
2. 在浏览器中手动登录网站
3. 登录信息会保存到 user-data 目录
4. 再次运行时会自动恢复登录状态

### 多账号管理

```javascript
// 账号 1
const browser1 = await puppeteer.launch({
  userDataDir: './user-data-account1',
})

// 账号 2
const browser2 = await puppeteer.launch({
  userDataDir: './user-data-account2',
})
```

### 清除缓存

删除 user-data 目录即可清除所有数据：
```bash
rm -rf user-data
```

## 常见问题

### 浏览器无法启动

1. 检查 Puppeteer 是否正确安装
2. 手动下载 Chromium：`npx puppeteer browsers install chrome`
3. 指定可执行文件路径：
   ```javascript
   puppeteer.launch({
     executablePath: '/path/to/chrome',
   })
   ```

### 元素找不到

1. 增加等待时间
2. 使用 `waitForSelector`
3. 检查元素是否在 iframe 中
4. 使用浏览器 DevTools 验证选择器

### 页面加载超时

```javascript
await page.goto(url, {
  waitUntil: 'domcontentloaded', // 更快的加载策略
  timeout: 60000, // 增加超时时间
})
```

### user-data-dir 冲突

确保同一时间只有一个浏览器实例使用同一个 user-data-dir。

## 进阶技巧

### 1. 拦截请求

```javascript
await page.setRequestInterception(true)

page.on('request', (request) => {
  // 在这里设置断点，观察请求
  if (request.resourceType() === 'image') {
    request.abort() // 阻止图片加载
  } else {
    request.continue()
  }
})
```

### 2. 监听控制台

```javascript
page.on('console', (msg) => {
  // 在这里设置断点，查看页面日志
  console.log('页面日志:', msg.text())
})
```

### 3. 监听网络

```javascript
page.on('response', (response) => {
  // 在这里设置断点，查看响应
  if (response.url().includes('/api/')) {
    console.log('API 响应:', response.status())
  }
})
```

### 4. 性能追踪

```javascript
await page.tracing.start({
  path: 'trace.json',
  screenshots: true,
})

// 执行操作...

await page.tracing.stop()
```

## 相关资源

- [Puppeteer 官方文档](https://pptr.dev/)
- [Puppeteer API 文档](https://pptr.dev/api)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Puppeteer 示例](https://github.com/puppeteer/puppeteer/tree/main/examples)
