import { BlogStyle } from '../styled'

const Blog = ({ blog }) => {
  return (
    <BlogStyle data-testid="blogElement">
      <a href={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </a>
    </BlogStyle>
  )
}

export default Blog
