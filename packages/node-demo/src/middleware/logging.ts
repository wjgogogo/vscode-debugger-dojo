import { Request, Response, NextFunction } from 'express'

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now()

  // 在这里设置断点，观察中间件执行顺序
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)

  // 记录请求完成时间
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
    )
  })

  next()
}
