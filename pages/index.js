import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

import { getFolderNestedData, getSortedFlatData } from '../lib/docs';
import Link from 'next/link';
import Date from '../components/date';
import NestedList from '../components/nestedList';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allDocsNestedData = await getFolderNestedData('docs');
  const allDocsFlatData = await getSortedFlatData('docs');

  return {
    props: {
      allPostsData,
      allDocsNestedData,
      allDocsFlatData,
    },
  };
}

export default function Home({
  allPostsData,
  allDocsNestedData,
  allDocsFlatData,
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2>NextJS Nested demo</h2>
        <p>
          This is a sample website to demonstrate nested markdown structure
          rendered in next.js.
        </p>
        <p>
          The code for the website can be found at:{' '}
          <a
            href='https://github.com/xypnox/next-nested'
            target='_blank'
            rel='noopener noreferrer'
          >
            @xypnox/next-nested
          </a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <p>The blog is the basic flat normal structure.</p>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Docs</h2>
        <p>
          The Docs are generated in nested manner and have urls in same pattern
          as file structure.
        </p>

        <NestedList dirData={allDocsNestedData}></NestedList>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Docs - Flat</h2>
        <p>
          The Docs can also be displayed in a flattened manner as well but have
          urls in same pattern as file structure. (These have not been sorted by
          date)
        </p>

        <ul className={utilStyles.list}>
          {allDocsFlatData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/docs/${id}`}>
                <a>{title}</a>
              </Link>
              <br />

              {date && (
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
