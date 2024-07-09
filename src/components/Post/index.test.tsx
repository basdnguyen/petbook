import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Post } from '.';

describe('Post', () => {
  test('should render correctly', () => {
    const mockPost = {
      id: 1,
      content: 'cute pug',
      image_url: 'klasdfja',
      author: {
        id: 123212,
        first_name: 'A',
        last_name: 'B',
      },
      created_at: '2024-07-06T07:58:20.762Z'
    };
    const mockOnDelete = jest.fn();
    render(<Post post={mockPost} onDelete={mockOnDelete} />);

    expect(screen.getByText('July 6, 2024')).toBeVisible();
  })
});