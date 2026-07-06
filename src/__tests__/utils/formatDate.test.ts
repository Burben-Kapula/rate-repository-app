import formatDate from '../../utils/formatDate';

describe('formatDate', () => {
  it('formats ISO date strings as day.month.year', () => {
    expect(formatDate('2020-05-15T11:59:57.557Z')).toBe('15.5.2020');
  });
});
