import { render, screen } from '@testing-library/react';

import BookList from './components/BookList';

test('renders book list correctly', () => {
  render(<BookList />);
  const bookElement = screen.getByText(/Book List/i);
  expect(bookElement).toBeInTheDocument();
});