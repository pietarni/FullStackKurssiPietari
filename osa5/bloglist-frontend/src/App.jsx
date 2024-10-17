import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import './index.css'

const App = () => {


  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {

    if (infoMessage !== null) {
      const timer = setTimeout(() => {
        setInfoMessage(null)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [infoMessage])


  useEffect(() => {

    if (errorMessage !== null) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])


  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setInfoMessage('Logged in!')
    } catch (exception) {
      setErrorMessage('wrong credentials')
    }
  }

  const addBlog = async (blogObject) => {
    try {

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setInfoMessage(`Added blog ${returnedBlog.title}`)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      const statusText = exception.response?.statusText || exception.message

      setErrorMessage(statusText)

      if (statusText === 'Unauthorized') {
        logout()
      }
    }
  }

  const deleteBlog = async (blogObject) => {
    const confirmed = window.confirm(`Are you sure you want to delete the blog "${blogObject.title}"?`)

    if (!confirmed) {
      return
    }
    try {
      const response = await blogService.deleteBlog(blogObject)

      if (response.status === 200 || response.status === 204) {
        setInfoMessage(`Deleted Blog ${blogObject.title}`)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      } else {
        throw new Error(`Failed to delete blog: ${response}`)
      }
    } catch (exception) {
      const statusText = exception.response?.statusText || exception.message

      setErrorMessage(statusText)

      if (statusText === 'Unauthorized') {
        logout()
      }
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      blogObject.likes = blogObject.likes +1
      const returnedBlog = await blogService.updateLikes(blogObject)


      setInfoMessage(`Updated likes for blog ${returnedBlog.title}`)
    } catch (exception) {
      const statusText = exception.response?.statusText || exception.message

      setErrorMessage(statusText)

      if (statusText === 'Unauthorized') {
        logout()
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  const logoutButton = () => (
    <button
      type="button"
      onClick={() =>
      {logout()
      }}
    >
      Logout
    </button>
  )

  const blogsList = () => (

    blogs.sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={likeBlog} deleteBlog={deleteBlog} showDeleteButton = {blog.user && blog.user.username === user.username}/>
      )
  )

  const blogFormRef = useRef()

  return (
    <div>
      <Notification message={infoMessage} />
      <ErrorMessage message={errorMessage} />
      <h2>blogs</h2>

      {!user && loginForm()}
      {user && <div>
        <p>{user.username} logged in {logoutButton()}</p>

        <Togglable buttonLabel="add blog" ref={blogFormRef}>
          <BlogForm
            handleCreateBlog = {addBlog}
          />
        </Togglable>
        {blogsList()}
      </div>}


    </div>
  )
}

export default App