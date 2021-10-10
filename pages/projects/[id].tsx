// TODO: Fix linter
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Layout from '../../components/layout';
import {
  ProjectShowType,
  getAllProjectIds,
  getProjectData,
} from '../../lib/projects';

import styles from './[id].module.css';

interface ProjectProps {
  projectData: ProjectShowType;
}

export default function Post({ projectData }: ProjectProps) {
  const t = useTranslations('Projects');

  return (
    <Layout>
      <Head>
        <title>{projectData.title}</title>
      </Head>
      <article>
        <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
      </article>
      <div className={styles.backToHome}>
        <Link href="/">
          <a>{t('backToRoot')}</a>
        </Link>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  const projectData = await getProjectData(
    context.params?.id as string,
    locale || defaultLocale
  );

  return {
    props: {
      projectData,
      messages: { ...require(`../../messages/posts/${locale}.json`) },
    },
  };
};
