// TODO: Fix linter
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import Head from 'next/head';
import { GetStaticProps } from 'next';
// import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout';
import { ProjectIndexType, getSortedProjectsData } from '../lib/projects';
import { TITLE } from '../lib/constants';
import styles from './projects.module.css';

interface ProjectsProps {
  allProjectsData: Array<ProjectIndexType>;
}

export default function Projects({ allProjectsData }: ProjectsProps) {
  return (
    <Layout>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <section className={styles.projects}>
        {allProjectsData.map(({ id, title, logo }) => (
          <div className={styles.project} key={id}>
            {/* To remove when projects markdown are ready */}
            {/* <Link href={`/projects/${id}`}>
              <a> */}
            <Image
              src={`/images/projects/${logo}`}
              title={title}
              alt={title}
              className={styles.projectImage}
              width={800}
              height={150}
            />
            <div className={styles.overlay}>
              <div className={styles.projectTitle}>{title}</div>
            </div>
            {/* </a>
            </Link> */}
          </div>
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  const allProjectsData = getSortedProjectsData(locale || defaultLocale);

  return {
    props: {
      allProjectsData,
      messages: { ...require(`../messages/home/${locale}.json`) },
    },
  };
};
