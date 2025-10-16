import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';

const mockPost = {
  id: 'test-post-1',
  title: 'Test Post Title',
  excerpt: 'Test post excerpt',
  content: 'Test post content',
  date: '2025-10-17',
  author: 'Test Author',
  image: '/test-image.jpg',
  tags: ['test', 'blog'],
};

describe('BlogPostCard', () => {
  it('renders blog post information correctly', () => {
    render(
      <MemoryRouter>
        <BlogPostCard post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument();
    expect(screen.getByText(mockPost.author)).toBeInTheDocument();
    expect(screen.getByAltText(mockPost.title)).toHaveAttribute('src', mockPost.image);
  });

  it('navigates to post page on click', () => {
    render(
      <MemoryRouter>
        <BlogPostCard post={mockPost} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/blog/${mockPost.id}`);
  });
});