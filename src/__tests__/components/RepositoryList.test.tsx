import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';
import { REPOSITORY_ORDER_OPTIONS } from '../../constants/repositoryOrder';
import { mockRepositories } from '../../fixtures/repositories';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const { getAllByTestId } = await render(
        <RepositoryListContainer
          repositories={mockRepositories}
          onEndReach={jest.fn()}
          order={REPOSITORY_ORDER_OPTIONS[0]}
          onOrderChange={jest.fn()}
          search=""
          onSearchChange={jest.fn()}
          onRepositoryPress={jest.fn()}
        />,
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(firstRepositoryItem).toHaveTextContent(/jaredpalmer\/formik/);
      expect(firstRepositoryItem).toHaveTextContent(
        /Build forms in React, without the tears/,
      );
      expect(firstRepositoryItem).toHaveTextContent(/TypeScript/);
      expect(firstRepositoryItem).toHaveTextContent(/1\.6k/);
      expect(firstRepositoryItem).toHaveTextContent(/21\.9k/);
      expect(firstRepositoryItem).toHaveTextContent(/88/);
      expect(firstRepositoryItem).toHaveTextContent(/3/);

      expect(secondRepositoryItem).toHaveTextContent(
        /async-library\/react-async/,
      );
      expect(secondRepositoryItem).toHaveTextContent(
        /Flexible promise-based React data loader/,
      );
      expect(secondRepositoryItem).toHaveTextContent(/JavaScript/);
      expect(secondRepositoryItem).toHaveTextContent(/69/);
      expect(secondRepositoryItem).toHaveTextContent(/1\.8k/);
      expect(secondRepositoryItem).toHaveTextContent(/72/);
    });
  });
});
