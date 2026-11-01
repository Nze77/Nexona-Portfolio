import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '../../components/ArticleView'
import { BLOG_POSTS, getPost } from '../../data/blogs'
import { buildBlogMetadata } from '../../lib/blogSeo'

// Every post is known at build time; anything else is a 404, not a render.
export const dynamicParams = false

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const post = getPost((await params).slug)
    return post ? buildBlogMetadata(post) : {}
}

export default async function BlogPostPage({ params }: Params) {
    const post = getPost((await params).slug)
    if (!post) notFound()
    return <ArticleView post={post} />
}
