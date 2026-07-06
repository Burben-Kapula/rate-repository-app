import { Picker } from '@react-native-picker/picker';
import { StyleSheet, TextInput, View } from 'react-native';

import Text from './Text';
import { REPOSITORY_ORDER_OPTIONS } from '../constants/repositoryOrder';
import { RepositoryOrderOption } from '../types/repository';
import theme from '../theme';

interface RepositoryListHeaderProps {
  order: RepositoryOrderOption;
  onOrderChange: (order: RepositoryOrderOption) => void;
  search: string;
  onSearchChange: (text: string) => void;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    gap: 12,
  },
  pickerContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: 12,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
  },
});

const RepositoryListHeader = ({
  order,
  onOrderChange,
  search,
  onSearchChange,
}: RepositoryListHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold">Order by:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={order.label}
          onValueChange={(value) => {
            const selected = REPOSITORY_ORDER_OPTIONS.find(
              (option) => option.label === value,
            );
            if (selected) {
              onOrderChange(selected);
            }
          }}
        >
          {REPOSITORY_ORDER_OPTIONS.map((option) => (
            <Picker.Item
              key={option.label}
              label={option.label}
              value={option.label}
            />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Filter repositories..."
        placeholderTextColor={theme.colors.textSecondary}
        value={search}
        onChangeText={onSearchChange}
      />
    </View>
  );
};

export default RepositoryListHeader;
