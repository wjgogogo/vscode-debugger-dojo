// Server Component 示例

async function getData() {
  // 在这里设置断点 - 服务端数据获取
  console.log("Fetching data on server...");

  // 模拟 API 调用
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "这是从服务端获取的数据",
    timestamp: new Date().toISOString(),
    serverInfo: {
      nodeVersion: process.version,
      platform: process.platform,
    },
  };
}

export default async function ServerPage() {
  // 在这里设置断点 - Server Component 渲染
  const data = await getData();
  // 在这里设置断点 - 查看数据
  console.log("Server component rendering with data:", data);

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Server Component 调试示例</h1>

      <section style={{ margin: "2rem 0" }}>
        <h2>服务端数据</h2>
        <pre
          style={{
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </section>

      <section style={{ margin: "2rem 0" }}>
        <h2>调试要点</h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li>Server Components 在服务端执行，可以直接访问后端资源</li>
          <li>在 getData 函数中设置断点观察数据获取过程</li>
          <li>console.log 会输出到 VSCode 终端，而不是浏览器控制台</li>
          <li>可以访问 Node.js API（如 process.version）</li>
        </ul>
      </section>

      <section style={{ margin: "2rem 0" }}>
        <a href="/" style={{ color: "#0070f3" }}>
          返回首页
        </a>
      </section>
    </main>
  );
}
