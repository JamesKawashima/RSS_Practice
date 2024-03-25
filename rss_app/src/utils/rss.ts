import fs from "fs";
import { title } from "process";
import RSS from "rss";

export default async function generateRssFeed(allPosts: {title: string, excerpt: string, slug: string, author: string, date: string}[]){
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
        feed.item({
            title: post.title,
            description: post.excerpt,
            url: `${site_url}/posts/${post.slug}`,
            author: post.author,
            date: post.date,
        });
    });

    fs.writeFileSync("/rss.xml", feed.xml({ indent: true }));
}