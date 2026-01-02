import React from 'react'
import './styles.css'
import { Roboto_Mono } from 'next/font/google'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'Task Management App',
  description: 'A blank template using Payload in a Next.js app.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={`${robotoMono.className} bg-black text-white`}>{children}</body>
    </html>
  )
}
