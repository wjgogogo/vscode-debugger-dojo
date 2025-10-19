export const metadata = {
  title: 'Next.js 调试示例',
  description: 'VSCode Next.js 调试演示',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
