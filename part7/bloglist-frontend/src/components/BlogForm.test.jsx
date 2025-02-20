import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

const testBlog = {
  title: 'TestBlog',
  author: 'Tester',
  url: 'test.com',
  likes: 7,
  user: 'testUser'
}

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const newBlogHandler = vi.fn()

  const { container } = render(<BlogForm handleNewBlog={newBlogHandler} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const user = userEvent.setup()
  const submitButton = screen.getByText('create')
  await user.type(titleInput, testBlog.title)
  await user.type(authorInput, testBlog.author)
  await user.type(urlInput, testBlog.url)

  await user.click(submitButton)

  const mock = newBlogHandler.mock.calls[0][0]

  expect(mock.title).toBe(testBlog.title)
  expect(mock.author).toBe(testBlog.author)
  expect(mock.url).toBe(testBlog.url)
})
