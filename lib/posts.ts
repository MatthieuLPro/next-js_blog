// TODO: fix linter
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

export type PostIndexType = {
  id: string;
  title: string;
  date: string;
  categories: string[];
  readTime: string;
  displayRank: number;
};

export type PostShowType = {
  id: string;
  title: string;
  date: string;
  categories: string[];
  readTime: string;
  contentHtml: string;
};

const postsDirectory = (locale: string) =>
  path.join(process.cwd(), `resources/blog/${locale}`);

export function getSortedPostsData(locale: string | undefined) {
  const fileNames = fs.readdirSync(postsDirectory(locale || ''));
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory(locale || ''), fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const { title, date, categories, readTime, displayRank } =
      matterResult.data;

    return {
      id,
      title,
      date,
      categories,
      readTime,
      displayRank,
    };
  });

  return allPostsData.sort(({ displayRank: a }, { displayRank: b }) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });
}

export function getAllPostIds(locales: string[]) {
  const paths: { params: { id: string }; locale: string }[] = [];

  Object.values(locales).forEach((locale) => {
    const fileNames = fs.readdirSync(postsDirectory(locale));
    Object.values(fileNames).forEach((fileName) => {
      paths.push({
        params: { id: fileName.replace(/\.md$/, '') },
        locale,
      });
    });
  });
  return paths;
}

export const getPostData = async (id: string, locale: string | undefined) => {
  const fullPath: string = path.join(postsDirectory(locale || ''), `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .use(require('remark-prism'))
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};
