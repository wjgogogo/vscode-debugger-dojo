#!/usr/bin/env node

import puppeteer from 'puppeteer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 在这里设置断点
console.log('🧪 启动 UI 测试...')

// 从环境变量读取配置（launch.json 中设置）
const config = {
  userDataDir: process.env.USER_DATA_DIR || join(__dirname, '../user-data'),
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOWMO || '50'),
}

let browser, page

try {
  // 启动浏览器
  // 在这里设置断点
  browser = await puppeteer.launch({
    headless: config.headless,
    slowMo: config.slowMo,
    userDataDir: config.userDataDir,
  })

  page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })

  // 测试表单
  console.log('\n测试表单功能...')

  // 访问示例表单页面
  await page.goto('https://httpbin.org/forms/post')

  // 填写表单
  // 在这里设置断点，观察表单填写
  console.log('填写表单...')

  await page.type('input[name="custname"]', '张三')
  await page.type('input[name="custtel"]', '13800138000')
  await page.type('input[name="custemail"]', 'zhangsan@example.com')

  // 选择选项
  // 在这里设置断点，观察选择操作
  await page.select('select[name="size"]', 'medium')

  // 选择 radio
  await page.click('input[value="bacon"]')

  // 选择 checkbox
  await page.click('input[value="cheese"]')

  // 填写文本域
  await page.type('textarea[name="comments"]', '这是一个测试评论')

  // 截图（提交前）
  await page.screenshot({
    path: join(__dirname, '../screenshots/form-before.png'),
  })

  console.log('表单填写完成')

  // 提交表单
  // 在这里设置断点，观察表单提交
  console.log('提交表单...')
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
    page.click('button[type="submit"]'),
  ])

  console.log('✅ 表单提交成功')

  // 截图（提交后）
  await page.screenshot({
    path: join(__dirname, '../screenshots/form-after.png'),
  })

  // 验证结果
  // 在这里设置断点，观察结果验证
  const content = await page.content()
  const success = content.includes('custname')

  console.log('验证结果:', success ? '✅ 通过' : '❌ 失败')

  // 测试搜索功能
  console.log('\n测试搜索功能...')

  await page.goto('https://www.npmjs.com/')

  // 在这里设置断点，观察搜索操作
  await page.type('input[type="search"]', 'puppeteer')
  await page.keyboard.press('Enter')

  // 等待搜索结果
  await page.waitForSelector('.ef4d8c83', { timeout: 10000 })

  // 获取搜索结果
  // 在这里设置断点，查看搜索结果
  const results = await page.evaluate(() => {
    const items = document.querySelectorAll('.ef4d8c83')
    return Array.from(items).slice(0, 5).map((item) => {
      const title = item.querySelector('h3')?.textContent
      return title
    })
  })

  console.log('搜索结果:')
  results.forEach((result, i) => {
    console.log(`  ${i + 1}. ${result}`)
  })

  console.log('\n✅ UI 测试完成')
} catch (error) {
  // 在这里设置断点，调试错误
  console.error('❌ 测试失败:', error.message)
  console.error(error.stack)

  // 出错时截图
  if (page) {
    await page.screenshot({
      path: join(__dirname, '../screenshots/error.png'),
    })
  }
} finally {
  if (browser) {
    await browser.close()
  }
}
