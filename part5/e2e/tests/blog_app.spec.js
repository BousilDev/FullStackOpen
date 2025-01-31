const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
        })

        const newBlog = {
            title: "BlogTest",
            author: "TestAuthor",
            url: "testurl.com"
        }

        test('a new blog can be created', async ({ page }) => {
            createBlog(page, newBlog)
            await expect(page.getByText(`${newBlog.title} by ${newBlog.author} added`)).toBeVisible()
            await expect(page.getByText(`${newBlog.title} ${newBlog.author}`).getByRole('button', { name: 'view' })).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            createBlog(page, newBlog)
            await page.getByText(`${newBlog.title} ${newBlog.author}`).getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.locator('.likes').getByText('1')).toBeVisible()
        })
    })
})