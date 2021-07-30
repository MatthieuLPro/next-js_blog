import Head from 'next/head'
import styles from './layout.module.css'
import { ImageSize } from '../atoms/imageCircle'
import HeaderWithImage from '../molecules/headerWithImage'
import { SITE_TITLE, NAME } from '../../lib/constants'

interface LayoutProps {
  children: React.ReactNode,
  home: boolean,
}

const IMAGE_PATH: string = '/images/profile.jpg'
const THEME: string = 'okaidia'

export default function Layout ({ children, home }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            SITE_TITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${THEME}.css`}
          rel="stylesheet"
        />
      </Head>
      <HeaderWithImage source={IMAGE_PATH} name={NAME} size={ImageSize.Medium} />
      <main>{children}</main>
    </div>
  )
}
