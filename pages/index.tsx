// TODO: Fix linter
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/layout';
import { PostIndexType, getSortedPostsData } from '../lib/posts';
import typographyStyles from '../styles/typographies.module.css';
import utilStyles from '../styles/utils.module.css';
import { TITLE } from '../lib/constants';
import styles from './index.module.css';

interface HomeProps {
  allPostsData: Array<PostIndexType>;
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <section>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, readTime, categories }) => (
            <Link href={`/posts/${id}`} key={id} locale={false}>
              <li className={`${utilStyles.listItem} ${styles.post}`}>
                <a className={styles.postTitle}>{`>> ${title}`}</a>
                <br />
                <small className={typographyStyles.ligthText}>
                  {date} · {readTime} · {categories.join(' - ')}
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
  const allPostsData = getSortedPostsData();
  const { locale } = context;

  return {
    props: {
      allPostsData,
      messages: { ...require(`../messages/home/${locale}.json`) },
    },
  };
};
