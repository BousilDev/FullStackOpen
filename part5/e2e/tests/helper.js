const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
const createBlog = async (page, content) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByTestId('title-input').fill(content.title)
    await page.getByTestId('author-input').fill(content.author)
    await page.getByTestId('url-input').fill(content.url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByRole('button', { name: 'cancel' }).click()
    await page.getByText(`${content.title} ${content.author}`).waitFor()
  }

const likeBlog = async (page, { title, author }) => {
    const div = await page.getByText(`${title} ${author}`)
    await div.getByRole('button', { name: 'view' }).click()
    await div.getByRole('button', { name: 'like' }).click()
    await div.getByRole('button', { name: 'hide' }).click()
    await div.getByRole('button', { name: 'view'}).waitFor()
}
export { loginWith, createBlog, likeBlog }