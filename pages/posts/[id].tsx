import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { PostShowType } from "../../lib/posts";
import typographiesStyles from "../../styles/typographies.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostData } from "../../lib/posts";
import styles from "./[id].module.css";
import { useTranslations } from "next-intl";

interface PostProps {
  postData: PostShowType;
}

export default function Post({ postData }: PostProps) {
  const t = useTranslations("Posts");

  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={typographiesStyles.headingXl}>{postData.title}</h1>
        <div className={typographiesStyles.lightText}>
          {postData.date} · {postData.read_time} ·{" "}
          {postData.categories.join(" - ")}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <div className={styles.backToHome}>
        <Link href="/">
          <a>{t("backToRoot")}</a>
        </Link>
      </div>
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
