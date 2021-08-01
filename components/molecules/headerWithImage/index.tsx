import Link from 'next/link';
import ImageCircle, { ImageSize } from '../../atoms/imageCircle';

import typographyStyles from '../../../styles/typographies.module.css';
import styles from './header.module.css';

interface HeaderWithImageProps {
  source: string;
  name: string;
  size: ImageSize;
}

export default function HeaderWithImage({
  source,
  name,
  size,
}: HeaderWithImageProps) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <ImageCircle src={source} name={name} size={size} />
        </a>
      </Link>
      <h1 className={typographyStyles.heading2Xl}>{name}</h1>
    </header>
  );
}
