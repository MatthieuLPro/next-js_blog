import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './navbar.module.css';
import typographiesStyles from '../../../styles/typographies.module.css';

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <>
      <p>{t('indication')}</p>
      <nav className={styles.navbar}>
        <Link href="/">
          <a
            className={`${styles.navbarItem} ${styles.navbarItemBlog} ${typographiesStyles.headingMd}`}
          >
            {`>> ${t('blog')}`}
          </a>
        </Link>
        <Link href="/projects">
          <a
            className={`${styles.navbarItem} ${styles.navbarItemProject} ${typographiesStyles.headingMd}`}
          >
            {`${t('project')} <<`}
          </a>
        </Link>
      </nav>
    </>
  );
}
