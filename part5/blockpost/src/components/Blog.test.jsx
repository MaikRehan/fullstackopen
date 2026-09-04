import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author, but not url or likes by default', async () => {
    const blog = {
        title: 'Testing blog',
        author: 'Testing author',
        url: 'Testing URL',
        likes: 7,
    }

    const { container } = render(<Blog blog={blog} />)

    const title = await screen.findByText(blog.title)
    const author = await screen.findByText(blog.author)

    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const url = await screen.findByText(blog.url)
    const likes = container.querySelector('.blogLikes')
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
})

test('clicking the show button makes likes and url visible', async () => {

    const blog = {
        title: 'Testing blog',
        author: 'Testing author',
        url: 'Testing URL',
        likes: 7,
    }

    const { container } = render(<Blog blog={blog} />)

    const url = await screen.findByText(blog.url)
    expect(url).not.toBeVisible()
    const likes = container.querySelector('.blogLikes')
    expect (likes).not.toBeVisible()

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
})
