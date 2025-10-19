import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 在这里设置断点，观察错误处理
  console.error('捕获到错误:', err.message)
  console.error('错误堆栈:', err.stack)

  res.status(500).json({
    error: err.message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  })
}
