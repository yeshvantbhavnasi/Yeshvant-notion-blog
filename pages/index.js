import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Yeshvant Bhavnasi blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav class="nav">
        <div class="nav__left">
            <a href="/">home</a>
        </div>
        <div class="nav__right">
            <a target="_blank" href="https://www.youtube.com/channel/UCUAQrUfucbv8VQTRyL3wZvg/featured"
                class="link-medium">youtube</a>
            <a target="_blank" href="https://medium.com/@yeshvantbhavnas" class="link-medium">medium</a>
            <a target="_blank" href="https://twitter.com/yeshvantbhavnas" class="link-medium">twitter</a>
            </div>
        </nav>
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 class="title">Yeshvant Bhavnasi</h1>
        </header>
         <p>
            List of projects I am working on, research, about system design and software engineering and thoughts
          </p>
        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
