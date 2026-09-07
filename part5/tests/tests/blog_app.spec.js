const {test, expect, beforeEach, describe} = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Maik',
                username: 'Maik',
                password: 'Maik'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('Log in to application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('login fails with wrong password', async ({ page }) => {
            await loginWith(page, 'Maik', 'falsch')

            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

            await expect(page.getByText('Maik logged in')).not.toBeVisible()
        })

        test('user can log in', async ({ page }) => {
            await loginWith(page, 'Maik', 'Maik')
            await expect(page.getByText('Maik logged in')).toBeVisible()
        })

        describe('When logged in', () => {
            beforeEach(async ({ page }) => {
                // ...
            })

            test('a new blog can be created', async ({ page }) => {
                // ...
            })
        })
    })
})