import ArticleView from '../components/ArticleView'
import { getPost } from '../data/blogs'
import { buildBlogMetadata } from '../lib/blogSeo'

// Root-level DMS cost guide. Content in
// app/data/blogs/distributor-management-system-cost-in-india.ts; every figure
// in app/data/dmsCost.ts.
const post = getPost('distributor-management-system-cost-in-india')
if (!post?.path) throw new Error('DMS cost guide missing from BLOG_POSTS, or its `path` is unset.')

export const metadata = buildBlogMetadata(post)

export default function DmsCostPage() {
    return <ArticleView post={post!} />
}
