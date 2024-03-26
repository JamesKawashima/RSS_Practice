import { Post } from "@/interfaces/Post";
import fs from "fs";
import { title } from "process";
import RSS from "rss";
import { AuthorsToString } from "./parsing";

export default async function generateRssFeed(allPosts: Post[]){
    console.log("generating rss feed");
    const site_url = 
        process.env.NODE_ENV === "production"
            ? "https://rss.tanzanet.ca"
            : "http://localhost:3000";

    const feedOptions = {
        title: "Blog posts | RSS Feed",
        description: "Welcome to this blog posts!",
        site_url: site_url,
        feed_url: `${site_url}/rss.xml`,
        image_url: `${site_url}/logo.jpg`,
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}`,
    };

    const feed = new RSS(feedOptions);

    allPosts.map((post) => {
        // console.log(JSON.stringify(post.slug));
        feed.item({
            title: post.title,
            description: post.excerpt,
            url: `${site_url}/posts/${post.slug}`,
            author: post.author,
            date: post.date,
        });
    });

    fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}