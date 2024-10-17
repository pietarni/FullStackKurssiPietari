import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('by default: renders title and author, not url and likes', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    id: '5a422aa71b54a676234d17f8'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    blog.title
  )
  expect(div).toHaveTextContent(
    blog.author
  )
  const url = screen.queryByText(blog.url)
  expect(url).toBeNull()
  const likes = screen.queryByText("likes")
  expect(likes).toBeNull()
})


test('Show detail button reveals url and likes', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    id: '5a422aa71b54a676234d17f8'
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('Show Details')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    blog.title
  )
  expect(div).toHaveTextContent(
    blog.author
  )
  expect(div).toHaveTextContent(
    blog.url
  )
  expect(div).toHaveTextContent(
    "likes"
  )
})


test('Blog can be liked multiple times', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    id: '5a422aa71b54a676234d17f8'
  }
  
  const mockHandler = vi.fn()
  const { container } = render(<Blog blog = {blog} updateLikes = {mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Show Details')
  await user.click(button)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})