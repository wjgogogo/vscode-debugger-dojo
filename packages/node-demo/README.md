# Node.js 调试示例

这个示例展示了如何在 VSCode 中调试 Node.js 应用（Express 服务器）。

## 功能特性

- ✅ TypeScript 支持
- ✅ Express REST API
- ✅ 中间件调试
- ✅ 异步函数调试
- ✅ 错误处理调试
- ✅ Source Map 支持
- ✅ 环境变量配置

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 调试方式

#### 方式一：Launch 模式（推荐）

1. 在 VSCode 中打开调试面板（Ctrl/Cmd + Shift + D）
2. 选择 "Node.js - Launch" 配置
3. 按 F5 启动调试
4. 服务器会在 http://localhost:3000 启动

#### 方式二：Attach 模式

1. 先以调试模式启动服务器：
   ```bash
   pnpm dev:debug
   ```
2. 在 VSCode 中选择 "Node.js - Attach" 配置
3. 按 F5 附加调试器

#### 方式三：Watch 模式

使用 tsx watch 实现热重载：
```bash
pnpm dev
```

## 调试配置详解

### Launch 模式配置

```json
{
  "type": "node",
  "request": "launch",
  "name": "Node.js - Launch",
  "program": "${workspaceFolder}/packages/node-demo/src/index.ts",
  "runtimeArgs": ["-r", "tsx/cjs"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "env": {
    "NODE_ENV": "development",
    "PORT": "3000"
  },
  "sourceMaps": true,
  "skipFiles": ["<node_internals>/**"]
}
```

**配置说明：**
- `type: "node"`: Node.js 调试器
- `request: "launch"`: Launch 模式
- `program`: 入口文件路径
- `runtimeArgs`: 使用 tsx 运行 TypeScript
- `console`: 使用集成终端（可以看到彩色输出）
- `env`: 环境变量
- `sourceMaps`: 启用 Source Map
- `skipFiles`: 跳过 Node.js 内部文件

### Attach 模式配置

```json
{
  "type": "node",
  "request": "attach",
  "name": "Node.js - Attach",
  "port": 9229,
  "restart": true,
  "skipFiles": ["<node_internals>/**"]
}
```

**配置说明：**
- `request: "attach"`: Attach 模式
- `port: 9229`: Node.js 调试端口（默认）
- `restart: true`: 文件修改时自动重启

## API 端点

### 基础路由

- `GET /` - 首页，返回欢迎信息
- `GET /fibonacci/:n` - 计算斐波那契数列第 n 项（调试递归）
- `POST /process` - 数据处理示例（调试数组操作）
- `GET /async/:delay` - 异步操作示例（调试异步代码）
- `GET /error` - 错误处理示例（调试错误捕获）

### 用户管理

- `GET /users` - 获取所有用户（支持 minAge/maxAge 查询参数）
- `GET /users/:id` - 获取指定用户
- `POST /users` - 创建新用户
- `PUT /users/:id` - 更新用户信息
- `DELETE /users/:id` - 删除用户

## 测试示例

### 使用 curl 测试

```bash
# 获取首页
curl http://localhost:3000/

# 计算斐波那契数列
curl http://localhost:3000/fibonacci/10

# 数据处理
curl -X POST http://localhost:3000/process \
  -H "Content-Type: application/json" \
  -d '{"data": [5, -2, 10, 3, -1, 8]}'

# 异步操作
curl http://localhost:3000/async/1000

# 获取用户列表
curl http://localhost:3000/users

# 按年龄过滤
curl "http://localhost:3000/users?minAge=25&maxAge=30"

# 获取指定用户
curl http://localhost:3000/users/1

# 创建用户
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"赵六","email":"zhaoliu@example.com","age":27}'
```

### 使用 VSCode REST Client

安装 REST Client 扩展后，可以使用 `test.http` 文件进行测试。

## 调试技巧

### 1. 断点位置建议

在以下位置尝试设置断点：

- `src/index.ts:10` - 应用初始化
- `src/index.ts:23` - 路由处理函数
- `src/index.ts:38` - 算法调用
- `src/middleware/logging.ts:9` - 中间件执行
- `src/routes/users.ts:24` - 路由逻辑
- `src/utils/algorithms.ts:8` - 递归函数

### 2. 条件断点示例

```javascript
// 在 fibonacci 路由中，只在 n > 10 时中断
n > 10

// 在用户查询中，只在查询特定 ID 时中断
id === 2

// 在数据处理中，只在数组长度 > 5 时中断
data.length > 5
```

### 3. 日志断点

右键断点 → 编辑断点 → 记录消息：
```
收到请求: {req.method} {req.path}
用户 ID: {id}, 姓名: {user.name}
数组长度: {data.length}
```

### 4. 调试异步代码

- 在 `await` 语句上设置断点
- 使用 F11 进入 Promise 内部
- 在调用栈中查看异步调用链

### 5. 调试中间件

- 在多个中间件中设置断点
- 观察执行顺序
- 查看 `req`/`res` 对象的变化

### 6. 错误调试

- 访问 `/error` 端点触发错误
- 在错误处理中间件设置断点
- 查看错误堆栈和上下文

## 高级技巧

### 1. 使用 debugger 语句

```typescript
app.get('/test', (req, res) => {
  debugger; // 自动触发断点
  res.json({ message: 'test' })
})
```

### 2. 监视表达式

在"监视"面板添加：
```javascript
users.length
req.params
req.query
process.env.NODE_ENV
```

### 3. 调试控制台

在断点处可以执行任意代码：
```javascript
// 查看变量
console.log(users)

// 修改变量
users.push({ id: 99, name: 'Test', email: 'test@test.com', age: 20 })

// 执行函数
calculateFibonacci(5)
```

### 4. 环境变量调试

在 launch.json 中配置不同环境：
```json
"env": {
  "NODE_ENV": "development",
  "PORT": "3000",
  "DEBUG": "*"
}
```

### 5. 跳过文件

不想调试某些文件时，在 launch.json 中配置：
```json
"skipFiles": [
  "<node_internals>/**",
  "**/node_modules/**",
  "**/dist/**"
]
```

## 常见问题

### 断点不生效

1. 确保 Source Map 已启用（检查 tsconfig.json）
2. 确保使用了正确的入口文件
3. 清除缓存：`pnpm clean && pnpm build`

### 无法附加到进程

1. 确保进程以 `--inspect` 标志启动
2. 检查端口是否正确（默认 9229）
3. 检查防火墙设置

### 调试器很慢

1. 启用 `skipFiles` 跳过不必要的文件
2. 减少日志输出
3. 使用条件断点而不是频繁的普通断点

## 相关资源

- [Node.js 调试指南](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [VSCode Node.js 调试文档](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- [Express 官方文档](https://expressjs.com/)
