const {test, expect, beforeEach, describe} = require('@playwright/test')
const {loginWith, createBlog} = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Maik',
                username: 'Maik',
                password: 'Maik'
            }
        })
        await request.post('/api/users', {
            data: {
                name: 'Test',
                username: 'Test',
                password: 'Test'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({page}) => {
        const locator = page.getByText('Log in to application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('login fails with wrong password', async ({page}) => {
            await loginWith(page, 'Maik', 'falsch')

            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

            await expect(page.getByText('Maik logged in')).not.toBeVisible()
        })

        test('user can log in', async ({page}) => {
            await loginWith(page, 'Maik', 'Maik')
            await expect(page.getByText('Maik logged in')).toBeVisible()
        })

        describe('When logged in', () => {
            beforeEach(async ({page}) => {
                await loginWith(page, 'Maik', 'Maik')
            })

            test('a new blog can be created', async ({page}) => {
                await createBlog(page, 'first note', 'author', 'url')
                await page.getByText('first note', { exact: true }).waitFor()
                await createBlog(page, 'second note', 'author', 'url')
                await page.getByText('second note', { exact: true }).waitFor()
                await createBlog(page, 'third note', 'author', 'url')
                await page.getByText('third note', { exact: true }).waitFor()

                await expect(page.getByText('first note', { exact: true })).toBeVisible()
                await expect(page.getByText('second note', { exact: true })).toBeVisible()
                await expect(page.getByText('third note', { exact: true })).toBeVisible()
            })

            test('a new blog can be liked', async ({page}) => {
                await createBlog(page, 'first note', 'Maik', 'url')
                await page.getByText('first note', { exact: true }).waitFor()

                await page.getByRole('button', { name: 'show' }).click()
                await expect(page.getByText('likes 0')).toBeVisible()

                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('likes 1')).toBeVisible()
            })

            test('user who created a blog can delete it', async ({page}) => {
                await createBlog(page, 'first note', 'author', 'url')
                await page.getByText('first note', { exact: true }).waitFor()
                await expect(page.getByText('first note', { exact: true })).toBeVisible()

                page.once('dialog', dialog => dialog.accept())

                await page.getByRole('button', { name: 'show' }).click()
                await page.getByRole('button', { name: 'delete' }).click()

                await expect(page.getByText('first note', { exact: true })).not.toBeVisible()
            })

            test('user cannot see delete button for blog of other user', async ({page}) => {
                await createBlog(page, 'first note', 'author', 'url')
                await page.getByText('first note', { exact: true }).waitFor()
                await expect(page.getByText('first note', { exact: true })).toBeVisible()

                await page.getByRole('button', { name: 'logout' }).click()
                await page.getByText('Log in to application', { exact: true }).waitFor()
                await loginWith(page, 'Test', 'Test')
                await page.getByText('first note', { exact: true }).waitFor()

                await page.locator('span').getByRole('button', { name: 'show' }).click()
                await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
                await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
            })

            test('blogs are ordered by amount of likes', async ({page}) => {

                await createBlog(page, 'first note', 'author', 'url')
                await page.getByText('first note', { exact: true }).waitFor()
                await createBlog(page, 'second note', 'author', 'url')
                await page.getByText('second note', { exact: true }).waitFor()
                await createBlog(page, 'third note', 'author', 'url')
                await page.getByText('third note', { exact: true }).waitFor()
                await page.getByRole('button', { name: 'show' }).click()

                const second = page.locator('.blog').filter({ hasText: 'second note' })
                const third = page.locator('.blog').filter({ hasText: 'third note' })

                await second.getByRole('button', { name: 'like' }).click()
                await expect(second.getByText('likes 1')).toBeVisible()
                await second.getByRole('button', { name: 'like' }).click()
                await expect(second.getByText('likes 2')).toBeVisible()
                await third.getByRole('button', { name: 'like' }).click()
                await expect(third.getByText('likes 1')).toBeVisible()

                const blogs = await page.locator('.blog').all()
                console.log(blogs)
                await expect(blogs[0]).toContainText('second note')
                await expect(blogs[1]).toContainText('third note')
                await expect(blogs[2]).toContainText('first note')
            })
        })
    })
})
