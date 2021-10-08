// TODO: Fix linter
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Layout from '../../components/layout';
import { PostShowType, getAllPostIds, getPostData } from '../../lib/posts';
import typographiesStyles from '../../styles/typographies.module.css';
import Tag from '../../components/atoms/tag';

import styles from './[id].module.css';

interface PostProps {
  postData: PostShowType;
}

export default function Post({ postData }: PostProps) {
  const t = useTranslations('Posts');

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={typographiesStyles.headingXl}>{postData.title}</h1>
        <div className={typographiesStyles.lightText}>
          {postData.date} · {postData.readTime} ·{' '}
          {postData.categories.map((category) => (
            <Tag value={category} />
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <Link href="/">
        <div className={styles.backToHome}>
          <a className={styles.backToHomeText}>{t('backToRoot')}</a>
        </div>
      </Link>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postData = await getPostData(context.params?.id as string);
  const { locale } = context;

  return {
    props: {
      postData,
      messages: { ...require(`../../messages/posts/${locale}.json`) },
    },
  };
};
