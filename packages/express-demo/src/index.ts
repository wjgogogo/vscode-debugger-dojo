import type { Request, Response } from "express";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());

// 基础路由
app.get("/", (req: Request, res: Response) => {
  console.log("收到根路径请求");
  res.json({
    message: "欢迎使用 Express 调试示例",
    tips: [
      "在路由处理函数中设置断点",
      "使用 F10 单步调试",
      "在调试控制台中查看变量",
    ],
  });
});

// POST 路由示例 - 演示请求体调试
app.post("/echo", (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: "缺少 message 参数" });
    return;
  }

  console.log("收到 echo 请求:", message);

  res.json({
    echo: message,
    received: new Date().toISOString(),
  });
});

// 异步操作示例 - 演示 async/await 调试
app.get("/delay/:ms", async (req: Request, res: Response) => {
  const delay = parseInt(req.params.ms);

  if (isNaN(delay) || delay < 0) {
    res.status(400).json({ error: "参数必须是非负整数" });
    return;
  }

  console.log(`等待 ${delay} 毫秒...`);

  await new Promise((resolve) => setTimeout(resolve, delay));

  console.log("等待完成");

  res.json({
    waited: delay,
    timestamp: new Date().toISOString(),
  });
});

// 错误处理示例 - 演示错误捕获调试
app.get("/error", (req: Request, res: Response) => {
  console.log("即将抛出错误...");
  throw new Error("这是一个测试错误");
});

// 错误处理中间件
app.use((err: any, req: Request, res: Response) => {
  console.error("捕获错误:", err.message);
  res.status(500).json({
    error: err.message,
    message: "服务器发生错误",
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ Express 服务器运行在 http://localhost:${PORT}`);
  console.log("\n可用的路由:");
  console.log(`  GET  /              - 首页`);
  console.log(`  POST /echo          - 回显请求体`);
  console.log(`  GET  /delay/:ms     - 异步等待`);
  console.log(`  GET  /error         - 错误处理`);
  console.log("\n💡 在 VSCode 中按 F5 开始调试");
});

export default app;
