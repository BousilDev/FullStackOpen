import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

const testUser = {
  username: 'testUser',
  name: 'testerName'
}

const testBlog = {
  title: 'TestBlog',
  author: 'Tester',
  url: 'test.com',
  likes: 7,
  user: testUser
}

test('component displaying a blog renders the blogs title and author, but does not render its URL or number of likes', () => {
  const updateHandler = vi.fn()
  const removeHandler = vi.fn()

  const { container } = render(
    <Blog
      blog={testBlog}
      handleBlogUpdate={updateHandler}
      handleBlogRemove={removeHandler}
      user={testUser}
    />
  )

  const title = screen.queryByText(testBlog.title)
  expect(title).toBeDefined()

  const author = screen.queryByText(testBlog.author)
  expect(author).toBeDefined()

  const url = screen.queryByText(testBlog.url)
  expect(url).toBeNull()

  const likesDiv = container.querySelector('.likes')
  expect(likesDiv).toBeNull()
})

test('blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  const updateHandler = vi.fn()
  const removeHandler = vi.fn()

  const { container } = render(
    <Blog
      blog={testBlog}
      handleBlogUpdate={updateHandler}
      handleBlogRemove={removeHandler}
      user={testUser}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.queryByText(testBlog.url)
  expect(url).toBeDefined()

  const likesDiv = container.querySelector('.likes')
  expect(likesDiv).toBeDefined()
})

test('if the like button is clicked twice, handleBlogUpdate is called twice', async () => {
  const updateHandler = vi.fn()
  const removeHandler = vi.fn()

  render(
    <Blog
      blog={testBlog}
      handleBlogUpdate={updateHandler}
      handleBlogRemove={removeHandler}
      user={testUser}
    />
  )

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)

  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(updateHandler.mock.calls).toHaveLength(2)
})
