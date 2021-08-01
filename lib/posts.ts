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

const postsDirectory: string = path.join(process.cwd(), 'resources');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
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

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export const getPostData = async (id: string) => {
  const fullPath: string = path.join(postsDirectory, `${id}.md`);
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
