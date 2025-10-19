import express, { Request, Response } from 'express'
import { loggingMiddleware } from './middleware/logging.js'
import { errorHandler } from './middleware/errorHandler.js'
import { userRouter } from './routes/users.js'
import { calculateFibonacci, processData } from './utils/algorithms.js'

const app = express()
const PORT = process.env.PORT || 3000

// 在这里设置断点，观察应用启动过程
console.log('正在初始化 Express 应用...')

// 中间件
app.use(express.json())
app.use(loggingMiddleware)

// 基础路由
app.get('/', (req: Request, res: Response) => {
  // 在这里设置断点，观察请求处理
  console.log('收到根路径请求')
  res.json({
    message: '欢迎使用 Node.js 调试示例',
    tips: [
      '在路由处理函数中设置断点',
      '使用 F10 单步调试',
      '在调试控制台中查看变量',
      '尝试修改变量值',
    ],
  })
})

// 算法调试示例
app.get('/fibonacci/:n', (req: Request, res: Response) => {
  const n = parseInt(req.params.n)

  // 在这里设置条件断点: n > 10
  console.log(`计算斐波那契数列第 ${n} 项`)

  if (isNaN(n) || n < 0) {
    res.status(400).json({ error: '参数必须是非负整数' })
    return
  }

  if (n > 40) {
    res.status(400).json({ error: '参数过大，请输入小于 40 的数字' })
    return
  }

  // 在这里设置断点，单步进入函数
  const result = calculateFibonacci(n)

  res.json({
    n,
    result,
    message: `fibonacci(${n}) = ${result}`,
  })
})

// 数据处理示例
app.post('/process', (req: Request, res: Response) => {
  const { data } = req.body

  // 在这里设置断点，观察请求体数据
  console.log('收到数据处理请求:', data)

  if (!Array.isArray(data)) {
    res.status(400).json({ error: 'data 必须是数组' })
    return
  }

  // 在这里设置断点，观察数据处理过程
  const processed = processData(data)

  res.json({
    original: data,
    processed,
    count: processed.length,
  })
})

// 异步操作示例
app.get('/async/:delay', async (req: Request, res: Response) => {
  const delay = parseInt(req.params.delay)

  // 在这里设置断点，观察异步函数执行
  console.log(`等待 ${delay} 毫秒...`)

  // 在这里设置断点，单步进入 await
  await new Promise((resolve) => setTimeout(resolve, delay))

  console.log('等待完成')

  res.json({
    message: `等待了 ${delay} 毫秒`,
    timestamp: new Date().toISOString(),
  })
})

// 错误处理示例
app.get('/error', (req: Request, res: Response) => {
  // 在这里设置断点，观察错误抛出
  console.log('即将抛出错误...')
  throw new Error('这是一个测试错误')
})

// 用户路由
app.use('/users', userRouter)

// 错误处理中间件
app.use(errorHandler)

// 启动服务器
app.listen(PORT, () => {
  // 在这里设置断点，观察服务器启动
  console.log(`✅ 服务器运行在 http://localhost:${PORT}`)
  console.log('\n可用的路由:')
  console.log(`  GET  /                    - 首页`)
  console.log(`  GET  /fibonacci/:n        - 计算斐波那契数列`)
  console.log(`  POST /process             - 数据处理`)
  console.log(`  GET  /async/:delay        - 异步操作`)
  console.log(`  GET  /error               - 错误处理`)
  console.log(`  GET  /users               - 获取用户列表`)
  console.log(`  GET  /users/:id           - 获取指定用户`)
  console.log('\n💡 在 VSCode 中按 F5 开始调试')
})

export default app
