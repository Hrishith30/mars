import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mars Visit Application title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Mars Visit Application/i);
  expect(titleElement).toBeInTheDocument();
});
