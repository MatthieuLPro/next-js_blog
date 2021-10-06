// TODO: fix linter
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

export type ProjectIndexType = {
  id: string;
  title: string;
  categories: string[];
  displayRank: number;
  logo: string;
};

export type ProjectShowType = {
  id: string;
  title: string;
  categories: string[];
  startDate: string;
  endDate: string;
  status: string;
  engine: string;
  contentHtml: string;
};

const projectsDirectory: string = path.join(process.cwd(), 'resources/project');

export function getSortedProjectsData() {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const { title, categories, displayRank, logo } =
      matterResult.data;

    return {
      id,
      title,
      categories,
      displayRank,
      logo,
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

export function getAllProjectIds() {
  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export const getProjectData = async (id: string) => {
  const fullPath: string = path.join(projectsDirectory, `${id}.md`);
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
