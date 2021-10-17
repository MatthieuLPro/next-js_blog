// TODO: Fix linter
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { PostIndexType, getSortedPostsData } from '../lib/posts';
import typographyStyles from '../styles/typographies.module.css';
import utilStyles from '../styles/utils.module.css';
import { TITLE } from '../lib/constants';
import styles from './index.module.css';
import Tag from '../components/atoms/tag';

interface HomeProps {
  allPostsData: Array<PostIndexType>;
}

export default function Home({ allPostsData }: HomeProps) {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <section>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, readTime, categories }) => (
            <Link href={`/${router.locale}/posts/${id}`} key={id}>
              <li className={`${utilStyles.listItem} ${styles.post}`}>
                <a className={styles.postTitle}>{`>> ${title}`}</a>
                <br />
                <small className={typographyStyles.ligthText}>
                  {date} · {readTime} ·{' '}
                  {categories.map((categorie, index) => (
                    <Tag value={categorie} key={categorie + index} />
                  ))}
                </small>
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  const allPostsData = getSortedPostsData(locale || defaultLocale);

  return {
    props: {
      allPostsData,
      messages: { ...require(`../messages/home/${locale}.json`) },
    },
  };
};
