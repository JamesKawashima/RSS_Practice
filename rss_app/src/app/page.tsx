import Image from "next/image";
import generateRssFeed from "../utils/rss";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  generateRssFeed(allPosts);
  return {
    props: { allPosts },
  };
};

