import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export type PostIndexType = {
  id: string,
  title: string,
  date: string,
  categories: string[],
  read_time: string,
  display_rank: number
}

export type PostShowType = {
  id: string,
  title: string,
  date: string,
  categories: string[],
  read_time: string,
  contentHtml: string
}

const postsDirectory: string = path.join(process.cwd(), 'resources')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const { title, date, categories, read_time, display_rank } = matterResult.data;

    return {
      id,
      title,
      date,
      categories,
      read_time,
      display_rank,
    }
  })

  return allPostsData.sort(({ display_rank: a }, { display_rank: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export const getPostData = async (id: string) => {
  const fullPath: string = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}