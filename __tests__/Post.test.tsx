import { render, screen, within } from '@testing-library/react';
import Post from '../pages/post/[id]';
import { mockPosts } from '../__mocks__/blog';

// unknown paths should be handled by NextJS -> 404 page

describe('Post details page with post', () => {
  const mockPost = mockPosts[0];

  beforeEach(() => render(<Post post={mockPost} />));

  it('displays the correct title', () => {
    const title = screen.getByTestId('post-title');
    expect(title.textContent).toBe(mockPost.title);
  });

  it('displays the correct post author', () => {
    const author = screen.getByTestId('post-author');
    expect(author.textContent).toContain(mockPost.user.name);
  });

  it('displays all comments correctly', () => {
    const comments = screen.getAllByTestId('post-comment');
    comments.forEach((comment, i) => {
      const author = within(comment).getByTestId('post-commentauthor');
      expect(author.textContent).toContain(mockPost.comments[i].email);
      const name = within(comment).getByTestId('post-commentname');
      expect(name.textContent).toBe(mockPost.comments[i].name);
      const body = within(comment).getByTestId('post-commentbody');
      expect(body.textContent).toBe(mockPost.comments[i].body);
    });
  });
});
