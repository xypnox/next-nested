import path from 'path';
import { getPathList, getPostData } from '../../lib/docs';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';

// File path for docs root
const DOCS_ROOT = path.join(process.cwd(), '/docs');

export default function Docs({ postData }) {
  // const content = hydrate(source, { components });

  return (
    <Layout>
      {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        {postData.date && (
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// Define a cache that will map the slug to the actual path.
// This is used to work around the index.mdx issue that I'm having
const pageFileCache = {};

export const getStaticProps = async ({ params }) => {
  // Retrieve full path from a cache. Generate cache if it doesnt exist.
  // id is undefined at index '/', set slugpath as '' instead
  let slugPath;
  if (params.id) {
    slugPath = params.id.join('/');
  } else {
    slugPath = '';
  }
  if (!pageFileCache[slugPath]) {
    await getStaticPaths({});
  }
  const markdownFile = pageFileCache[slugPath];

  // Get postdata for the slug and markdown file
  const postData = await getPostData(slugPath, markdownFile);

  return {
    props: {
      postData,
    },
  };
};

// Get static paths being a wrapper around the getPathList
export const getStaticPaths = async () => {
  let paths = await getPathList(DOCS_ROOT, DOCS_ROOT, pageFileCache);

  return {
    paths,
    fallback: false,
  };
};
