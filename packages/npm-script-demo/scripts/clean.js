#!/usr/bin/env node

import { rmSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 在这里设置断点
console.log('🧹 清理构建产物...')

const dist = join(__dirname, '../dist')

// 在这里设置断点，观察目录检查
if (existsSync(dist)) {
  console.log('删除目录:', dist)

  try {
    // 在这里设置断点，观察删除过程
    rmSync(dist, { recursive: true, force: true })
    console.log('✅ 清理完成')
  } catch (error) {
    // 在这里设置断点，调试错误
    console.error('❌ 清理失败:', error.message)
    process.exit(1)
  }
} else {
  console.log('目录不存在，无需清理')
}
