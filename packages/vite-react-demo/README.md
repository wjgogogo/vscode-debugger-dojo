# Vite + React 调试示例

这个示例展示了如何在 VSCode 中调试 Vite + React 应用。

## 功能特性

- ✅ TypeScript 支持
- ✅ React 18 + Hooks
- ✅ Source Map 完整支持
- ✅ Launch 模式（自动启动）
- ✅ Attach 模式（附加到运行中的进程）
- ✅ 热更新（HMR）调试

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：Launch 模式（推荐）

1. 在 VSCode 中打开调试面板（Ctrl/Cmd + Shift + D）
2. 选择 "Vite React - Launch" 配置
3. 按 F5 启动调试
4. 调试器会自动启动开发服务器并打开 Chrome

#### 方式二：Attach 模式

1. 先手动启动开发服务器：
   ```bash
   pnpm dev
   ```
2. 在 VSCode 中选择 "Vite React - Attach" 配置
3. 按 F5 附加调试器

#### 方式三：保存登录状态（Launch + user-data-dir）

1. 在 VSCode 中选择 "Vite React - Launch (保存登录状态)" 配置
2. 按 F5 启动调试
3. 在浏览器中登录需要的网站
4. 下次调试时会自动恢复登录状态

**适用场景：**
- 需要登录的应用调试
- 需要保存 Cookie/LocalStorage 的调试
- 需要保留浏览器扩展的调试

## 调试配置详解

### Launch 模式配置

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "sourceMaps": true,
  "preLaunchTask": "vite-react: dev",
  "runtimeArgs": [
    "--auto-open-devtools-for-tabs"
  ]
}
```

**配置说明：**
- `type: "chrome"`: 使用 Chrome 调试器
- `request: "launch"`: Launch 模式，会启动新的浏览器实例
- `url`: 应用的 URL 地址
- `webRoot`: 项目根目录，用于映射源码
- `sourceMaps: true`: 启用 Source Map 支持
- `preLaunchTask`: 启动前先运行的任务（启动 dev server）
- `runtimeArgs`: Chrome 启动参数，这里自动打开开发者工具

### Attach 模式配置

```json
{
  "type": "chrome",
  "request": "attach",
  "name": "Vite React - Attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "sourceMaps": true
}
```

**配置说明：**
- `request: "attach"`: Attach 模式，附加到已运行的浏览器
- `port: 9222`: Chrome 远程调试端口

使用 Attach 模式需要以调试模式启动 Chrome：
```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Windows
chrome.exe --remote-debugging-port=9222

# Linux
google-chrome --remote-debugging-port=9222
```

### Launch + user-data-dir 配置

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Vite React - Launch (保存登录状态)",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/packages/vite-react-demo",
  "sourceMaps": true,
  "preLaunchTask": "vite-react: dev",
  "userDataDir": "${workspaceFolder}/packages/vite-react-demo/.chrome-data",
  "runtimeArgs": [
    "--auto-open-devtools-for-tabs"
  ]
}
```

**配置说明：**
- `userDataDir`: Chrome 用户数据目录，用于保存：
  - 登录状态和 Cookies
  - LocalStorage 和 SessionStorage
  - 浏览器扩展和设置
  - 浏览历史和书签

**使用场景：**

1. **调试需要登录的应用**
   - 首次调试时在浏览器中登录
   - 登录信息自动保存到 `.chrome-data` 目录
   - 后续调试自动恢复登录状态

2. **保持开发环境一致**
   - 浏览器扩展保持启用（如 React DevTools）
   - 开发者工具设置保持不变
   - 主题和外观设置保持一致

3. **多账号调试**
   - 为不同账号创建不同的 userDataDir
   - 在不同配置间快速切换
   ```json
   "userDataDir": "${workspaceFolder}/.chrome-data-admin",
   "userDataDir": "${workspaceFolder}/.chrome-data-user"
   ```

**注意事项：**
- `.chrome-data` 目录已添加到 `.gitignore`，不会提交到版本控制
- 首次启动可能较慢，因为需要初始化用户数据目录
- 如需清除数据，删除 `.chrome-data` 目录即可

## 调试技巧

### 1. 设置断点

在以下位置尝试设置断点：
- `src/main.tsx:6` - 应用初始化
- `src/App.tsx:10` - 状态更新函数
- `src/App.tsx:17` - 递归函数调试
- `src/components/Counter.tsx:14` - useEffect 副作用
- `src/components/Counter.tsx:19` - 事件处理函数

### 2. 条件断点

右键点击断点，选择"编辑断点"，可以添加条件：
```javascript
count > 5  // 只在 count 大于 5 时中断
```

### 3. 日志断点

右键点击断点，选择"编辑断点"，选择"记录消息"：
```
计数器值: {count}
```
这样不会中断执行，只会在控制台输出日志。

### 4. 调试控制台

在调试暂停时，可以在调试控制台中执行代码：
```javascript
// 查看变量
count
history

// 修改状态
setCount(100)

// 执行函数
calculateFibonacci(10)
```

### 5. 查看调用栈

在"调用堆栈"面板中可以看到函数调用链，点击可以跳转到对应位置。

### 6. 监视表达式

在"监视"面板中添加表达式，实时查看值的变化：
```javascript
count
history.length
message
```

## 常见问题

### 断点不生效

1. 确保启用了 Source Map（检查 vite.config.ts）
2. 清除浏览器缓存
3. 重启调试会话

### 无法附加到浏览器

1. 确保 Chrome 以调试模式启动
2. 检查端口 9222 是否被占用
3. 尝试使用 Launch 模式

### 代码修改后断点位置错乱

这是 HMR 热更新的正常现象，重新启动调试会话即可。

## 进阶技巧

### 1. 使用 debugger 语句

在代码中直接写 `debugger;` 会自动触发断点：
```typescript
const increment = () => {
  debugger; // 执行到这里会自动暂停
  setCount(count + 1)
}
```

### 2. 性能分析

在 Chrome DevTools 的 Performance 面板中可以进行性能分析。

### 3. React DevTools

安装 React DevTools 扩展，可以查看组件树和 Props/State。

## 相关资源

- [Vite 官方文档](https://vitejs.dev/)
- [React 官方文档](https://react.dev/)
- [VSCode 调试文档](https://code.visualstudio.com/docs/editor/debugging)
