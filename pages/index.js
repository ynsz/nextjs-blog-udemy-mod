import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout, { siteTitle } from "@/components/Layout";

import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import { getPostData } from "@/lib/post";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostData(); // id, title, date, thumbnailのデータ
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>私はNextjsエンジニアです/好きなフレームワークはNext.jsです</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
