import { NextRequest, NextResponse } from 'next/server'

// 模拟数据
const mockPosts = [
  { id: 1, title: '如何调试 Next.js', body: '使用 VSCode 调试器可以轻松调试 Next.js 应用' },
  { id: 2, title: 'API Routes 调试', body: '在 API 路由中设置断点，观察请求和响应' },
  { id: 3, title: 'Server Components', body: 'Next.js 13+ 支持 Server Components，调试方式不同' },
]

// 在这里设置断点 - GET 请求处理
export async function GET(request: NextRequest) {
  console.log('API called: GET /api/posts')

  // 模拟数据库查询延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  // 在这里设置断点 - 查看查询参数
  const searchParams = request.nextUrl.searchParams
  const limit = searchParams.get('limit')

  // 在这里设置断点 - 数据处理
  const posts = limit ? mockPosts.slice(0, Number(limit)) : mockPosts

  // 在这里设置断点 - 返回响应
  return NextResponse.json(posts, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 在这里设置断点 - POST 请求处理
export async function POST(request: NextRequest) {
  console.log('API called: POST /api/posts')

  try {
    // 在这里设置断点 - 解析请求体
    const body = await request.json()

    // 在这里设置断点 - 验证数据
    if (!body.title || !body.body) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 })
    }

    // 在这里设置断点 - 创建新记录
    const newPost = {
      id: mockPosts.length + 1,
      title: body.title,
      body: body.body,
    }

    mockPosts.push(newPost)

    // 在这里设置断点 - 返回成功响应
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    // 在这里设置断点 - 错误处理
    console.error('Error processing POST request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
