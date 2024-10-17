import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('Creating a blog through blog form - returns correct values', async () => {
    const mockHandler = vi.fn();
  
    render(<BlogForm handleCreateBlog={mockHandler} />);
    
    const inputTitle = screen.getByPlaceholderText('input title');
    const inputAuthor = screen.getByPlaceholderText('input author');
    const inputURL = screen.getByPlaceholderText('input url');
  
    const createButton = screen.getByText('create');

    await userEvent.type(inputTitle, 'mattinen');
    await userEvent.type(inputAuthor, 'mattinen2');
    await userEvent.type(inputURL, 'mattinen3');

    await userEvent.click(createButton);
  
    expect(mockHandler.mock.calls).toHaveLength(1);

    const [{ title, author, url }] = mockHandler.mock.calls[0];
    
    expect(title).toBe('mattinen');
    expect(author).toBe('mattinen2');
    expect(url).toBe('mattinen3');
})
