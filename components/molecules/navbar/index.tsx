import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './navbar.module.css';

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/">
          <a>{t('blog')}</a>
        </Link>
        <Link href="/projects">
          <a>{t('project')}</a>
        </Link>
      </nav>
    </>
  );
}
