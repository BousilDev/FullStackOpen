const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                username: 'Tester100',
                name: 'jouni',
                password: 'sillisalaatti'
            }
        })
        await request.post('http://localhost:3001/api/users', {
            data: {
                username: 'Samppa',
                name: 'sami',
                password: 'salaatti'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Log in to application')).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'Tester100', 'sillisalaatti')
            await expect(page.getByText('jouni logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'Test', 'silli')
            await expect(page.getByText('jouni logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'Tester100', 'sillisalaatti')
            await createBlog(page, newBlog)
        })

        const newBlog = {
            title: "BlogTest",
            author: "TestAuthor",
            url: "testurl.com"
        }

        const newBlog2 = {
            title: "BlogTest2",
            author: "TestAuthor2",
            url: "testurl2.com"
        }

        test('a new blog can be created', async ({ page }) => {
            await expect(page.getByText(`${newBlog.title} by ${newBlog.author} added`)).toBeVisible()
            await expect(page.getByText(`${newBlog.title} ${newBlog.author}`).getByRole('button', { name: 'view' })).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await likeBlog(page, newBlog)
            const div = await page.getByText(`${newBlog.title} ${newBlog.author}`)
            await div.getByRole('button', { name: 'view' }).click()
            await expect(page.locator('.likes').getByText('1')).toBeVisible()
        })

        test('added blog can be deleted by the adder', async ({ page }) => {
            await page.getByText(`${newBlog.title} ${newBlog.author}`).getByRole('button', { name: 'view' }).click()
            page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button', { name: 'remove' }).click()
            await expect(page.getByText(`${newBlog.title} ${newBlog.author}`).getByRole('button', { name: 'view' })).not.toBeVisible()
        })

        test('only the user who added the blog sees the remove button', async ({ page }) => {
            await page.getByText(`${newBlog.title} ${newBlog.author}`).getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'Samppa', 'salaatti')
            await page.getByText(`${newBlog.title} ${newBlog.author}`).getByRole('button', { name: 'view' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test('blogs are correctly listed by likes', async ({ page }) => {
            await createBlog(page, newBlog2)
            const likesA = 3
            const likesB = 5
            const moreLikes = likesA > likesB ? likesA : likesB
            const lessLikes = likesA > likesB ? likesB : likesA
            for (let i = 0; i < likesA; i++) {
                await likeBlog(page, newBlog)
            }
            for (let i = 0; i < likesB; i++) {
                await likeBlog(page, newBlog2)
            }
            let blogs = await page.getByTestId('blogElement')
            for (let a = 0; a < 2; a++) {
            await blogs.nth(a).getByRole('button',  { name: 'view' }).click()
            await blogs.nth(a).getByRole('button',  { name: 'hide' }).waitFor()
            }
            await expect((await blogs.nth(0).locator('.likes').textContent()).charAt(0)).toBe(`${moreLikes}`)
            await expect((await blogs.nth(1).locator('.likes').textContent()).charAt(0)).toBe(`${lessLikes}`)
        })
    })
})