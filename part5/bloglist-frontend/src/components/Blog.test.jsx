import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

const testUser = {
  username: 'testUser',
  name: 'testerName',
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

  const { container } = render(<Blog blog={testBlog} handleBlogUpdate={updateHandler} handleBlogRemove={removeHandler} user={testUser} />)

  const title = screen.queryByText(testBlog.title)
  expect(title).toBeDefined()

  const author = screen.queryByText(testBlog.author)
  expect(author).toBeDefined()

  const url = screen.queryByText(testBlog.url)
  expect(url).toBeNull()

  const likesDiv = container.querySelector('.likes')
  expect(likesDiv).toBeNull()
})