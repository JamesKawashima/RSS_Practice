import { Author } from "./Author";


export type Post = {
    slug: string;
    title: string;
    date: string
    coverImage: string;
    author: string;
    excerpt: string;
    content: string;
}