import Layout from '../../components/layout'
import Head from 'next/head'
import { PostType } from '../../lib/posts'
import typographiesStyles from '../../styles/typographies.module.css'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'

interface PostProps {
  postData: PostType
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={typographiesStyles.headingXl}>{postData.title}</h1>
        <div className={typographiesStyles.lightText}>
          {postData.date}
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}