import Link from 'next/link';
import styles from './navbar.module.css';
import { useTranslations } from 'next-intl';

export default function Navbar({}) {
  const t = useTranslations('Navbar');

  return (
    <>
      <nav className={styles.navbar}>
        <Link href='/'>
          <a>{t('blog')}</a>
        </Link>
        <Link href='/projects'>
          <a>{t('project')}</a>
        </Link>
      </nav>
    </>
  );
};