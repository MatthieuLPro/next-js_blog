import { useTranslations } from 'next-intl';
import styles from './tag.module.css';

interface TagProps {
  value: string;
}

export default function Tag({ value }: TagProps) {
  const t = useTranslations('Tag');

  return <span className={`${styles.tag} ${styles[value]}`}>{t(value)}</span>;
}
