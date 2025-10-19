#!/usr/bin/env node

import { existsSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 在这里设置断点
console.log('🚀 开始部署...')

const dist = join(__dirname, '../dist')

// 检查构建产物是否存在
// 在这里设置断点，观察检查过程
if (!existsSync(dist)) {
  console.error('❌ 构建产物不存在，请先运行 build')
  process.exit(1)
}

// 读取文件列表
// 在这里设置断点，观察文件遍历
const files = readdirSync(dist)
console.log('\n📦 待部署文件:')

let totalSize = 0
for (const file of files) {
  const filePath = join(dist, file)
  const stats = statSync(filePath)
  // 在这里设置断点，查看文件信息
  console.log(`  - ${file} (${stats.size} bytes)`)
  totalSize += stats.size
}

console.log('\n总大小:', totalSize, 'bytes')

// 模拟部署过程
console.log('\n上传文件到服务器...')

// 在这里设置断点，观察上传进度
for (let i = 0; i < files.length; i++) {
  const file = files[i]
  // 模拟上传延迟
  await new Promise((resolve) => setTimeout(resolve, 100))
  console.log(`  [${i + 1}/${files.length}] 上传 ${file}`)
}

console.log('\n✅ 部署完成!')

// 在这里设置断点，查看部署结果
const deployInfo = {
  time: new Date().toISOString(),
  files: files.length,
  size: totalSize,
}

console.log('\n部署信息:', deployInfo)
