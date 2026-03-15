import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MessageForm from './components/MessageForm';

describe('MessageForm Component', () => {
  it('renders a textarea and a submit button', () => {
    render(<MessageForm onMessagePosted={() => {}} />);
    
    expect(screen.getByPlaceholderText(/What's on your mind/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Post Message/i })).toBeInTheDocument();
  });

  it('submit button is disabled when text is empty', () => {
    render(<MessageForm onMessagePosted={() => {}} />);
    
    const button = screen.getByRole('button', { name: /Post Message/i });
    expect(button).toBeDisabled();
  });
});
