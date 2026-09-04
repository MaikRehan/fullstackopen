import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> calls event handler with props on create blog submit', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<NewBlogForm createBlog={ createBlog } />)

    const inputTitle = screen.getByLabelText('title')
    const inputAuthor = screen.getByLabelText('author')
    const inputUrl = screen.getByLabelText('url')
    const sendButton = screen.getByText('save')

    await user.type(inputTitle, 'testing a form...')
    await user.type(inputAuthor, 'testing author')
    await user.type(inputUrl, 'test-url.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('test-url.com')

})