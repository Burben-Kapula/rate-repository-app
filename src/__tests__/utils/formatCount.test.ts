import formatCount from '../../utils/formatCount';

describe('formatCount', () => {
  it('returns the count as a string when below 1000', () => {
    expect(formatCount(69)).toBe('69');
    expect(formatCount(999)).toBe('999');
  });

  it('formats counts of 1000 or more with one decimal and k suffix', () => {
    expect(formatCount(1000)).toBe('1.0k');
    expect(formatCount(1619)).toBe('1.6k');
    expect(formatCount(8439)).toBe('8.4k');
    expect(formatCount(21856)).toBe('21.9k');
  });
});
