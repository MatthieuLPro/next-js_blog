// TODO: Fix linter
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Layout from '../components/layout';
import { ProjectIndexType, getSortedProjectsData } from '../lib/projects';
import typographyStyles from '../styles/typographies.module.css';
import { TITLE, NAME } from '../lib/constants';
import styles from './projects.module.css';

interface ProjectsProps {
  allProjectsData: Array<ProjectIndexType>;
}

export default function Projects({ allProjectsData }: ProjectsProps) {
  const t = useTranslations('Home');

  return (
    <Layout>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <section className={typographyStyles.headingMd}>
        <p>
          {t('description', {
            code: function boldItems(children) {
              return <b>{children}</b>;
            },
            name: NAME,
          })}
        </p>
      </section>
      <section className={styles.projects}>
        {allProjectsData.map(({ id, title, categories, logo }) => (
          <div className={styles.project} key={id}>
            <Link href={`/projects/${id}`}>
              <a>
                <img
                  src={`../images/projects/` + logo}
                  title="Tres bon ratio entre actions basiques et strategiques"
                  alt="Tres bon ratio entre actions basiques et strategiques"
                />  
              </a>
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allProjectsData = getSortedProjectsData();
  const { locale } = context;

  return {
    props: {
      allProjectsData,
      messages: { ...require(`../messages/home/${locale}.json`) },
    },
  };
};
