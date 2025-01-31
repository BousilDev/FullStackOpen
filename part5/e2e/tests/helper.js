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
  }
export { loginWith, createBlog }