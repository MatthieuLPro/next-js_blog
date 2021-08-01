import Layout from '../components/layout'
import Head from 'next/head'
import { PostIndexType, getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import typographyStyles from '../styles/typographies.module.css'
import utilStyles from '../styles/utils.module.css'
import {useTranslations} from 'next-intl'
import { TITLE, NAME } from '../lib/constants'

interface HomeProps {
  allPostsData: Array<PostIndexType>
}

export default function Home({ allPostsData }: HomeProps) {
  const t = useTranslations('Home')

  return (
    <Layout home>
      <Head>
        <title>{ TITLE }</title>
      </Head>
      <section className={typographyStyles.headingMd}>
        <p>{t('description', {
          code: function boldItems(children) {
            return (
              <b>{children}</b>
            )
          },
          name: NAME
        })}</p>
        <p>{t('welcome')}</p>
      </section>
      <section>
        <h2 className={typographyStyles.headingLg}>{t('title')}</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, read_time, categories }) =>
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br/>
              <small className={typographyStyles.ligthText}>
                {date} · {read_time} · {categories.join(' - ')}
              </small>
            </li>
          )}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const allPostsData = getSortedPostsData()
  const { locale } = context

  return {
    props: { 
      allPostsData,
      messages: { ...require(`../messages/home/${locale}.json`) },
    }
  }
}