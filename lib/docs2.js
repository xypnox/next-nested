import fs from 'fs-extra';
import path from 'path';

import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

// Recursivly scan the documentation folder. This includes any extra resolution magic
// such as index.mdx acting as the folder index
export async function getPathList(folder, ogPath, pageFileCache) {
  return (
    await Promise.all(
      (await fs.readdir(folder)).map(async (file) => {
        const joined = path.join(folder, file);

        //  Call recursively if a directory
        if ((await fs.stat(joined)).isDirectory()) {
          return getPathList(joined, ogPath, pageFileCache);
        }

        // If a content markdown is found
        if (joined.endsWith('.md')) {
          let alteredPath = joined
            .slice(folder.length + 1)
            .replace(/\.md$/, '')
            .replace(/\index$/, '');

          // In recursive depths, add folder name and trim any stray '/'
          if (folder !== ogPath) {
            alteredPath = folder.replace(ogPath, '') + '/' + alteredPath;
          }
          alteredPath = trimChar(alteredPath, '/');

          pageFileCache[alteredPath] = joined;
          return {
            params: {
              id: alteredPath.split('/'),
            },
          };
        } else {
          return null;
        }
      })
    )
  )
    .flat()
    .filter((x) => !!x);
}

export async function getPostData(id, fullPath) {
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export async function getSortedNestedData(folder) {
  let fullFolderPath = path.join(process.cwd(), '/' + folder);
  // Get file names under /posts
  const pageFileCache = {};
  const paths = await getPathList(
    fullFolderPath,
    fullFolderPath,
    pageFileCache
  );

  const allPostsData = paths
    .map((p) => p.params.id.join('/'))
    .map((fileName) => {
      const id = fileName;

      // Read markdown file as string
      const fullPath = pageFileCache[id];
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

var escapeRegExp = function (strToEscape) {
  // Escape special characters for use in a regular expression
  return strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

var trimChar = function (origString, charToTrim) {
  charToTrim = escapeRegExp(charToTrim);
  var regEx = new RegExp('^[' + charToTrim + ']+|[' + charToTrim + ']+$', 'g');
  return origString.replace(regEx, '');
};
