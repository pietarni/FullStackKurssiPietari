import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, showDeleteButton }) => {
  const [showDetails, setShowDetails] = useState(null)
  const ToggleDetailsButton = () => {
    return (
      <button type="button" onClick={() => setShowDetails(prevState => !prevState)}>
        Show Details
      </button>
    )
  }
  const LikeButton = () => {
    return (
      <button type="button" onClick={() => updateLikes(blog)}>
        Like
      </button>
    )
  }
  const DeleteButton = () => {
    return (
      <button type="button" onClick={() => deleteBlog(blog)}>
        Delete
      </button>
    )
  }
  return(
    <div className='blog'>
      {!showDetails && (
        <>
          {blog.title}  {blog.author}
          <ToggleDetailsButton />
        </>
      )}
      {showDetails &&
      <>
        {blog.title} {blog.author}
        <ToggleDetailsButton />

        <p>{blog.url}</p>
        <p data-testid="likes-count">likes {blog.likes} <LikeButton/></p>
        {
          blog.user && <p>{blog.user.username}</p>
        }
        {showDeleteButton && <DeleteButton/>}
      </>}
    </div>
  )}

export default Blog