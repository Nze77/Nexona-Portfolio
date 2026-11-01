import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '../../components/ArticleView'
import { BLOG_POSTS, getPost } from '../../data/blogs'
import { buildBlogMetadata } from '../../lib/blogSeo'

// Every post is known at build time; anything else is a 404, not a render.
export const dynamicParams = false

// Posts with a root-level `path` are served there instead, never at
// /blogs/<slug> — one URL per article, no duplicate to canonicalise.
const BLOG_ROUTE_POSTS = BLOG_POSTS.filter((post) => !post.path)

export function generateStaticParams() {
    return BLOG_ROUTE_POSTS.map((post) => ({ slug: post.slug }))
}

type Params = { params: Promise<{ slug: string }> }

function findPost(slug: string) {
    const post = getPost(slug)
    return post && !post.path ? post : undefined
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const post = findPost((await params).slug)
    return post ? buildBlogMetadata(post) : {}
}

export default async function BlogPostPage({ params }: Params) {
    const post = findPost((await params).slug)
    if (!post) notFound()
    return <ArticleView post={post} />
}
