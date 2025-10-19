#!/usr/bin/env node

import puppeteer from 'puppeteer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 在这里设置断点
console.log('📸 启动截图工具...')

// 确保截图目录存在
const screenshotDir = join(__dirname, '../screenshots')
mkdirSync(screenshotDir, { recursive: true })

// 要截图的网站列表
const websites = [
  { name: 'example', url: 'https://example.com' },
  { name: 'github', url: 'https://github.com' },
  { name: 'stackoverflow', url: 'https://stackoverflow.com' },
]

let browser

try {
  // 启动浏览器
  // 在这里设置断点
  // 从环境变量读取配置
  const headless = process.env.HEADLESS !== 'false' // 默认无头模式

  browser = await puppeteer.launch({
    headless, // 无头模式，更快
  })

  console.log('浏览器已启动\n')

  // 遍历网站列表
  for (let i = 0; i < websites.length; i++) {
    const site = websites[i]

    // 在这里设置断点，观察每个网站的处理
    console.log(`[${i + 1}/${websites.length}] 正在截图: ${site.name}`)

    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })

    try {
      // 在这里设置断点，观察页面加载
      await page.goto(site.url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      })

      // 全屏截图
      const fullPath = join(screenshotDir, `${site.name}-full.png`)
      await page.screenshot({
        path: fullPath,
        fullPage: true,
      })

      // 可视区域截图
      const viewportPath = join(screenshotDir, `${site.name}-viewport.png`)
      await page.screenshot({
        path: viewportPath,
        fullPage: false,
      })

      console.log(`  ✅ 已保存: ${site.name}-full.png, ${site.name}-viewport.png`)
    } catch (error) {
      // 在这里设置断点，处理单个网站的错误
      console.error(`  ❌ 失败: ${error.message}`)
    } finally {
      await page.close()
    }
  }

  console.log('\n✅ 所有截图完成')
  console.log('截图保存在:', screenshotDir)
} catch (error) {
  // 在这里设置断点，处理全局错误
  console.error('❌ 错误:', error.message)
} finally {
  if (browser) {
    await browser.close()
  }
}
