import { FormHeading } from '../FormHeading';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('FormHeading', () => {
  it('renders the title and description', () => {
    render(<FormHeading title="Welcome to SlotFlow" description="Manage your services easily" />);

    expect(screen.getByText('Welcome to SlotFlow')).toBeInTheDocument();

    expect(screen.getByText('Manage your services easily')).toBeInTheDocument();
  });
});
