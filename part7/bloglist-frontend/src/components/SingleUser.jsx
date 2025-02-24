import { Ul, Li } from '../styled'

const SingleUser = ({ user }) => {
  if (!user) {
    return <p>no user found</p>
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <Ul>
        {user.blogs.map((blog) => (
          <Li key={blog.id}>{blog.title}</Li>
        ))}
      </Ul>
    </div>
  )
}

export default SingleUser
