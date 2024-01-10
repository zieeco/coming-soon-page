import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Comming Soon Page',
  description: 'arkodeon website under construction',
}

interface Props {
  children: React.ReactNode
}

const RootLayout = ({children}: Props) => (
  <html lang="en">
    <body className="">{children}</body>
  </html>
)

export default RootLayout;
