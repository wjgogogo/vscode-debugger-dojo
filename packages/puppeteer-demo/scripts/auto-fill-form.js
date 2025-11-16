import puppeteer from "puppeteer";

// 配置参数
const config = {
  headless: process.env.HEADLESS !== "false",
  url: process.env.URL || "http://localhost:5173",
  // 使用系统 Chrome（macOS）
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
};

// 日志函数
const log = (message) => {
  console.log(`[Puppeteer] ${new Date().toLocaleTimeString()} - ${message}`);
};

// 等待超时
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 自动填写表单
 */
async function autoFillForm() {
  let browser = null;

  try {
    log(`启动浏览器... (headless: ${config.headless})`);

    const launchOptions = {
      headless: config.headless,
      executablePath: config.executablePath,
      args: ["--remote-debugging-port=9222"],
    };

    if (config.userDataDir) {
      launchOptions.userDataDir = config.userDataDir;
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    // 设置视口大小
    await page.setViewport({ width: 1000, height: 750 });

    log(`导航到 ${config.url}`);
    await page.goto(config.url, { waitUntil: "networkidle2" });

    // 给调试器连接足够的时间
    log("等待调试器连接...");
    await delay(1000);

    log("开始填写表单...");

    // 等待表单加载
    await page.waitForSelector("form", { timeout: 5000 });

    // 基本信息
    log("填写基本信息...");
    await page.type("#firstName", "张", { delay: 10 });
    await page.type("#lastName", "三", { delay: 10 });
    await page.type("#email", "zhangsan@example.com", { delay: 10 });
    await page.type("#phone", "13800138000", { delay: 10 });

    // 设置日期输入框（使用 evaluate 直接操作 React）
    await page.evaluate((selector, value) => {
      const input = document.querySelector(selector);
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, "#birthDate", "1990-01-01");

    await page.select("#gender", "male");

    // 工作信息
    log("填写工作信息...");
    await page.select("#experience", "3-5");

    // 设置日期输入框（使用 evaluate 直接操作 React）
    await page.evaluate((selector, value) => {
      const input = document.querySelector(selector);
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, "#startDate", "2020-01-01");

    // 兴趣爱好 - 选择多个复选框
    log("选择兴趣爱好...");
    const interests = ["coding", "design", "music"];
    for (const interest of interests) {
      await page.click(`input[value="${interest}"]`);
      await delay(50); // 每个操作之间的延迟
    }

    log("✓ 表单填写完成！");
    log("浏览器将保持打开状态，方便调试...");
  } catch (error) {
    log(`✗ 错误: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// 运行脚本
autoFillForm().catch((error) => {
  console.error("未捕获的错误:", error);
  process.exit(1);
});
