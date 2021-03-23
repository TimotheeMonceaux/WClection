import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

test('renders Hello, World!', () => {
  render(<App />);
  const linkElement = screen.getByText("Hello, World!");
  expect(linkElement).toBeInTheDocument();
});
