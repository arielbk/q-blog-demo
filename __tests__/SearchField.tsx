import { fireEvent, render, screen } from '@testing-library/react';
import SearchField from '../components/SearchField';
import { SearchProvider } from '../hooks/useSearchQuery';

describe('Search field with context', () => {
  beforeEach(() => {
    render(
      <SearchProvider>
        <SearchField />
      </SearchProvider>
    );
  });

  it('starts with an empty input', () => {
    const searchField = screen.getByTestId<HTMLInputElement>('searchfield');
    expect(searchField.value).toBe('');
  });

  it('changes value on user input', async () => {
    const searchField = screen.getByTestId<HTMLInputElement>('searchfield');
    fireEvent.change(searchField, { target: { value: 'New search' } });
    () => expect(searchField.value).toBe('New search');
  });
});
