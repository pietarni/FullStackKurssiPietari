import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleCreateBlog
}) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')
  }

  return(
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
                title
          <input
            data-testid='blogTitle'
            value={blogTitle}
            name="title"
            onChange={event => setBlogTitle(event.target.value)}
            placeholder='input title'
          />
        </div>
        <div>
                author
          <input
            data-testid='blogAuthor'
            value={blogAuthor}
            name="author"
            onChange={event => setBlogAuthor(event.target.value)}
            placeholder='input author'
          />
        </div>
        <div>
                url
          <input
            data-testid='blogURL'
            value={blogURL}
            name="url"
            onChange={event => setBlogURL(event.target.value)}
            placeholder='input url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}
export default BlogForm