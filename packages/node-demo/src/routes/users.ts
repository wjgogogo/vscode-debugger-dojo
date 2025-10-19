import express, { Request, Response } from 'express'

export const userRouter = express.Router()

interface User {
  id: number
  name: string
  email: string
  age: number
}

// 模拟数据库
const users: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', age: 25 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 30 },
  { id: 3, name: '王五', email: 'wangwu@example.com', age: 28 },
]

// 获取所有用户
userRouter.get('/', (req: Request, res: Response) => {
  // 在这里设置断点，观察路由处理
  console.log('获取所有用户')

  // 支持查询参数过滤
  const { minAge, maxAge } = req.query

  let filteredUsers = users

  // 在这里设置断点，观察过滤逻辑
  if (minAge) {
    const min = parseInt(minAge as string)
    filteredUsers = filteredUsers.filter((user) => user.age >= min)
  }

  if (maxAge) {
    const max = parseInt(maxAge as string)
    filteredUsers = filteredUsers.filter((user) => user.age <= max)
  }

  res.json({
    users: filteredUsers,
    total: filteredUsers.length,
  })
})

// 获取指定用户
userRouter.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  // 在这里设置条件断点: id === 2
  console.log(`查找用户 ID: ${id}`)

  const user = users.find((u) => u.id === id)

  if (!user) {
    res.status(404).json({ error: '用户不存在' })
    return
  }

  res.json(user)
})

// 创建用户
userRouter.post('/', (req: Request, res: Response) => {
  const { name, email, age } = req.body

  // 在这里设置断点，观察数据验证
  console.log('创建新用户:', { name, email, age })

  if (!name || !email || !age) {
    res.status(400).json({ error: '缺少必填字段' })
    return
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    age,
  }

  users.push(newUser)

  res.status(201).json(newUser)
})

// 更新用户
userRouter.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { name, email, age } = req.body

  // 在这里设置断点，观察更新逻辑
  console.log(`更新用户 ID: ${id}`)

  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    res.status(404).json({ error: '用户不存在' })
    return
  }

  // 在这里设置断点，观察对象更新
  if (name) users[userIndex].name = name
  if (email) users[userIndex].email = email
  if (age) users[userIndex].age = age

  res.json(users[userIndex])
})

// 删除用户
userRouter.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  // 在这里设置断点，观察删除操作
  console.log(`删除用户 ID: ${id}`)

  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    res.status(404).json({ error: '用户不存在' })
    return
  }

  const deletedUser = users.splice(userIndex, 1)[0]

  res.json({
    message: '用户已删除',
    user: deletedUser,
  })
})
