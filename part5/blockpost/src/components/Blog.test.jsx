import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import BlogView from './BlogView'

const blog = {
    id: '1',
    title: 'Testing blog',
    author: 'Testing author',
    url: 'test-url.com',
    likes: 7,
    user: { username: 'creator', name: 'Blog Creator' },
}

const creator = { username: 'creator', name: 'Blog Creator' }
const otherUser = { username: 'other', name: 'Other User' }

const showDeleteButton = user => b =>
    user !== null && b.user.username === user.username

const renderBlogView = (user, handlers = {}) =>
    render(
        <MemoryRouter initialEntries={['/blogs/1']}>
            <Routes>
                <Route path="/blogs/:id" element={
                                              <BlogView
                                                 blogs={[blog]}
                                                 user={user}
                                                 addLikeToBlog={handlers.addLikeToBlog ?? vi.fn()}
                                                 deleteBlog={handlers.deleteBlog ?? vi.fn()}
                                                 showDeleteButton={showDeleteButton(user)}
                                             />
                                         }/>
            </Routes>
        </MemoryRouter>
    )

test('shows blog details and no buttons to an unauthenticated user', () => {
    renderBlogView(null)

    expect(screen.getByText(`${blog.title} — ${blog.author}`)).toBeVisible()
    expect(screen.getByText(blog.url)).toBeVisible()
    expect(screen.getByText('likes 7')).toBeVisible()

    expect(screen.queryByRole('button', { name: 'like' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'delete' })).toBeNull()
})

test('shows only the like button to a logged-in user who is not the creator', () => {
    renderBlogView(otherUser)

    expect(screen.getByText('likes 7')).toBeVisible()
    expect(screen.getByRole('button', { name: 'like' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'delete' })).toBeNull()
})

test('shows the delete button to the creator of the blog', async () => {
    const addLikeToBlog = vi.fn()
    renderBlogView(creator, { addLikeToBlog })

    expect(screen.getByRole('button', { name: 'like' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'delete' })).toBeVisible()

    const testUser = userEvent.setup()
    await testUser.click(screen.getByRole('button', { name: 'like' }))
    expect(addLikeToBlog.mock.calls).toHaveLength(1)
})