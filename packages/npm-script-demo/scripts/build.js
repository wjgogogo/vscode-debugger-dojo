#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 在这里设置断点，观察构建过程开始
console.log('🚀 开始构建...')
console.log('环境:', process.env.NODE_ENV || 'development')

// 配置
const config = {
  entry: join(__dirname, '../src/index.js'),
  output: join(__dirname, '../dist'),
  minify: process.env.NODE_ENV === 'production',
  sourcemap: true,
}

// 在这里设置断点，查看配置
console.log('配置:', config)

// 创建输出目录
try {
  // 在这里设置断点，观察目录创建
  mkdirSync(config.output, { recursive: true })
  console.log('✅ 创建输出目录:', config.output)
} catch (error) {
  // 在这里设置断点，调试错误
  console.error('❌ 创建目录失败:', error.message)
  process.exit(1)
}

// 读取源文件
let content
try {
  // 在这里设置断点，观察文件读取
  content = readFileSync(config.entry, 'utf-8')
  console.log('✅ 读取源文件:', config.entry)
  console.log('文件大小:', content.length, '字符')
} catch (error) {
  // 在这里设置断点
  console.error('❌ 读取文件失败:', error.message)
  process.exit(1)
}

// 转换代码（示例：添加注释）
// 在这里设置断点，观察代码转换
const transformed = `/**
 * 构建时间: ${new Date().toISOString()}
 * 环境: ${process.env.NODE_ENV || 'development'}
 */

${content}
`

// 压缩代码（如果是生产环境）
let output = transformed
if (config.minify) {
  // 在这里设置断点，观察压缩过程
  console.log('🗜️  压缩代码...')
  // 简单的压缩示例：移除多余空格和换行
  output = output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(' ')
  console.log('压缩后大小:', output.length, '字符')
}

// 写入输出文件
const outputFile = join(config.output, 'bundle.js')
try {
  // 在这里设置断点，观察文件写入
  writeFileSync(outputFile, output, 'utf-8')
  console.log('✅ 写入输出文件:', outputFile)
} catch (error) {
  // 在这里设置断点
  console.error('❌ 写入文件失败:', error.message)
  process.exit(1)
}

// 生成 sourcemap（如果需要）
if (config.sourcemap) {
  // 在这里设置断点，观察 sourcemap 生成
  const sourcemap = {
    version: 3,
    file: 'bundle.js',
    sources: [config.entry],
    names: [],
    mappings: '',
  }

  const sourcemapFile = join(config.output, 'bundle.js.map')
  writeFileSync(sourcemapFile, JSON.stringify(sourcemap, null, 2), 'utf-8')
  console.log('✅ 生成 sourcemap:', sourcemapFile)
}

// 显示构建统计
// 在这里设置断点，查看构建统计
const stats = {
  inputSize: content.length,
  outputSize: output.length,
  compression: ((1 - output.length / content.length) * 100).toFixed(2) + '%',
  time: Date.now(),
}

console.log('\n📊 构建统计:')
console.log('  输入大小:', stats.inputSize, '字符')
console.log('  输出大小:', stats.outputSize, '字符')
console.log('  压缩率:', stats.compression)

console.log('\n✨ 构建完成!')
