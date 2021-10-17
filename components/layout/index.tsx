import Head from 'next/head';
import styles from './layout.module.css';
import { ImageSize } from '../atoms/imageCircle';
import HeaderWithImage from '../molecules/headerWithImage';
import {
  WEBSITE_TITLE,
  DESCRIPTION,
  WEBSITE_URL,
  NAME,
} from '../../lib/constants';
import Navbar from '../molecules/navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const IMAGE_PATH = '/images/profile.jpg';
const THEME = 'okaidia';

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={WEBSITE_TITLE} />
        <meta
          name="og:description"
          property="og:description"
          content={DESCRIPTION}
        />
        <meta property="og:site_name" content={WEBSITE_TITLE} />
        <meta property="og:url" content={WEBSITE_URL} />
        <meta property="og:image" content={IMAGE_PATH} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={WEBSITE_TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:site" content={WEBSITE_TITLE} />
        <meta name="twitter:creator" content={NAME} />

        <link
          href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${THEME}.css`}
          rel="stylesheet"
        />
      </Head>
      <HeaderWithImage
        source={IMAGE_PATH}
        name={WEBSITE_TITLE}
        size={ImageSize.Medium}
      />
      <Navbar />
      <hr style={{ margin: '20px' }} />
      <main>{children}</main>
    </div>
  );
}
