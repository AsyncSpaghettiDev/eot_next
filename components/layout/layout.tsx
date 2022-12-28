import { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './header'

interface Props {
  children: ReactNode
  title?: string
  showUser?: boolean
  showBack?: boolean
}

export const Layout = ({ children, title, showUser = false, showBack = true }: Props) => {
  return (
    <>
      <Head>
        <title>{title ? `EatOnTime - ${title}` : 'EatOnTime'}</title>
      </Head>

      <Header showUser={showUser} showBack={showBack} />

      <main>
        {children}
      </main>

    </>
  )
}
