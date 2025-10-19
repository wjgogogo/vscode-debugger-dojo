#!/usr/bin/env node

import puppeteer from 'puppeteer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 在这里设置断点，观察爬虫初始化
console.log('🚀 启动网页爬虫...')

// 从环境变量读取配置（launch.json 中设置）
// 或使用默认值
const config = {
  // 使用 user-data-dir 保存登录状态和插件
  userDataDir: process.env.USER_DATA_DIR || join(__dirname, '../user-data'),
  headless: process.env.HEADLESS === 'true', // 从环境变量读取
  slowMo: parseInt(process.env.SLOWMO || '100'), // 慢动作，方便观察
  devtools: process.env.DEVTOOLS === 'true', // 自动打开开发者工具
}

// 在这里设置断点，查看配置
console.log('配置:', config)

// 启动浏览器
let browser, page

try {
  // 在这里设置断点，观察浏览器启动
  console.log('正在启动浏览器...')

  browser = await puppeteer.launch({
    headless: config.headless,
    slowMo: config.slowMo,
    devtools: config.devtools,
    userDataDir: config.userDataDir,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      // 保留窗口大小
      '--window-size=1920,1080',
    ],
  })

  console.log('✅ 浏览器已启动')

  // 创建新页面
  // 在这里设置断点，观察页面创建
  page = await browser.newPage()
  console.log('✅ 创建新页面')

  // 设置视口大小
  await page.setViewport({ width: 1920, height: 1080 })

  // 设置用户代理（模拟真实浏览器）
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  )

  // 访问网页
  const url = 'https://example.com'
  console.log('访问网页:', url)

  // 在这里设置断点，观察页面导航
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  })

  console.log('✅ 页面加载完成')

  // 等待特定元素
  // 在这里设置断点，观察元素等待
  console.log('等待页面元素...')
  await page.waitForSelector('h1')

  // 提取页面标题
  // 在这里设置断点，观察数据提取
  const title = await page.evaluate(() => {
    return document.querySelector('h1')?.textContent
  })

  console.log('页面标题:', title)

  // 提取所有链接
  // 在这里设置断点，观察批量提取
  const links = await page.evaluate(() => {
    const anchors = document.querySelectorAll('a')
    return Array.from(anchors).map((a) => ({
      text: a.textContent?.trim(),
      href: a.href,
    }))
  })

  console.log('\n找到的链接:')
  // 在这里设置断点，查看提取的数据
  links.forEach((link, index) => {
    console.log(`  ${index + 1}. ${link.text} -> ${link.href}`)
  })

  // 模拟用户交互
  console.log('\n模拟用户交互...')

  // 点击第一个链接
  if (links.length > 0) {
    // 在这里设置断点，观察点击操作
    console.log('点击第一个链接...')
    await page.click('a')

    // 等待导航完成
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
    console.log('✅ 导航完成')

    // 返回上一页
    await page.goBack()
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
  }

  // 截图
  const screenshotPath = join(__dirname, '../screenshots/scrape-result.png')
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  })
  console.log('\n✅ 截图已保存:', screenshotPath)

  // 在这里设置断点，查看最终结果
  const result = {
    url,
    title,
    linksCount: links.length,
    screenshot: screenshotPath,
  }

  console.log('\n爬取结果:', result)
} catch (error) {
  // 在这里设置断点，调试错误
  console.error('❌ 错误:', error.message)
  console.error(error.stack)
} finally {
  // 关闭浏览器
  if (browser) {
    // 在这里设置断点，观察清理过程
    console.log('\n关闭浏览器...')
    await browser.close()
    console.log('✅ 浏览器已关闭')
  }
}

console.log('\n✨ 爬虫执行完成')
