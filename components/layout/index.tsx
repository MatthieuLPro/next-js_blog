import Head from 'next/head'
import styles from './layout.module.css'
import typographyStyles from '../../styles/typographies.module.css'
import Link from 'next/link'
import ImageCircle from '../atoms/imageCircle'
import { ImageSize } from '../atoms/imageCircle'
import { useTranslations } from 'next-intl'
import {useRouter} from 'next/dist/client/router';

interface LayoutProps {
  children: React.ReactNode,
  home: boolean,
}

const name = "Dagon"
export const siteTitle = "Dev from R'lyeh"

export default function Layout ({ children, home }: LayoutProps) {
  const t = useTranslations('Layout')

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
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {profileImage(home)}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>{t('backToRoot')}</a>
          </Link>
        </div>
      )}
    </div>
  )
}

const profileImage = (isHome: boolean) => {
  return (
    isHome ? (
      <>
        <ImageCircle src={"/images/profile.jpg"} name={name} size={ImageSize.Medium} />
        <h1 className={typographyStyles.heading2Xl}>{name}</h1>
      </>
    ) : (
      <>
        <Link href="/">
          <a>
            <ImageCircle src={"/images/profile.jpg"} name={name} size={ImageSize.Small} />
          </a>
        </Link>
        <h2 className={typographyStyles.headingLg}>
          <Link href="/">
            <a className={typographyStyles.colorInherit}>{name}</a>
          </Link>
        </h2>
      </>
    )
  )
}