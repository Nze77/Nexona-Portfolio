import ArticleView from '../components/ArticleView'
import { getPost } from '../data/blogs'
import { buildBlogMetadata } from '../lib/blogSeo'

// Root-level cost guide. Content, metadata, schema, sitemap and llms.txt all
// come from app/data/blogs/business-app-development-cost-in-india.ts.
const post = getPost('business-app-development-cost-in-india')
if (!post?.path) throw new Error('Cost guide post missing from BLOG_POSTS, or its `path` is unset.')

export const metadata = buildBlogMetadata(post)

export default function BusinessAppCostPage() {
    return <ArticleView post={post!} />
}
