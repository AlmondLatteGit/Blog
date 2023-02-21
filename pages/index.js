import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Layout, { siteTitle } from "../components/Layout"
import utilStyles from "../styles/utils.module.css"
import styles from "../styles/Home.module.css"
import Link from 'next/link'
import { getPostsData } from '@/lib/post'
const inter = Inter({ subsets: ['latin'] })

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, thumbnail

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
      <section className={utilStyles.heddingMd}>
        <p>
          Almond Latteのブログです。普段はセキュリティ系や競技プログラミングを行っています。
        </p>
      </section >

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📃AlmondLatte</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
             <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage}></img> 
             </Link>
             <Link href={`/posts/${id}`}>
               <div className={utilStyles.boldText}>{`${title}`}</div>
              </Link>
             <small className={utilStyles.lightText}>{`${date}`}</small>
              <br />
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
