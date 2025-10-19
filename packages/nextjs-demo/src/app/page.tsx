'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // 在这里设置断点 - 组件挂载
  useEffect(() => {
    console.log('Component mounted')
  }, [])

  // 在这里设置断点 - 监听 count 变化
  useEffect(() => {
    console.log('Count changed:', count)
  }, [count])

  // 在这里设置断点 - 处理点击事件
  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }

  // 在这里设置断点 - API 调用
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      // 在这里设置断点 - 查看返回数据
      setPosts(data)
    } catch (error) {
      // 在这里设置断点 - 错误处理
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Next.js 调试示例</h1>

      <section style={{ margin: '2rem 0' }}>
        <h2>客户端状态调试</h2>
        <p>计数器: {count}</p>
        <button onClick={handleIncrement} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          增加
        </button>
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>API 调用调试</h2>
        <button
          onClick={fetchPosts}
          disabled={loading}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          {loading ? '加载中...' : '获取文章列表'}
        </button>

        {posts.length > 0 && (
          <ul style={{ marginTop: '1rem' }}>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>: {post.body}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ margin: '2rem 0' }}>
        <h2>调试提示</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>在 useState/useEffect 中设置断点观察 React Hooks</li>
          <li>在事件处理函数中设置断点观察用户交互</li>
          <li>在 API 调用代码中设置断点观察网络请求</li>
          <li>使用 React DevTools 查看组件树和状态</li>
        </ul>
      </section>
    </main>
  )
}
