import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import FeatherIcon from '@react-native-vector-icons/feather';
import { colors, spacing, typography, radius } from '../../color/Colurs';

export type DropdownOption = { label: string; value: string };

type Props = {
  label: string;
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
  multiSelect?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  containerStyle?: ViewStyle;
  loading?: boolean;
};

/**
 * Modal-based select field. Supports single select (Role, State, Sub-area...)
 * and multi select (Major Services) via the `multiSelect` prop.
 */
export default function CustomDropdown({
  label,
  options,
  value,
  onChange,
  error,
  multiSelect = false,
  disabled = false,
  searchable = false,
  containerStyle,
  loading = false,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  const selectedValues: string[] = Array.isArray(value) ? value : value ? [value] : [];

  const displayText = useMemo(() => {
    if (selectedValues.length === 0) return '';
    const labels = options
      .filter((o) => selectedValues.includes(o.value))
      .map((o) => o.label);
    return labels.join(', ');
  }, [selectedValues, options]);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  }, [options, query]);

  const handleSelect = (item: DropdownOption) => {
    if (multiSelect) {
      const exists = selectedValues.includes(item.value);
      const next = exists
        ? selectedValues.filter((v) => v !== item.value)
        : [...selectedValues, item.value];
      onChange(next);
    } else {
      onChange(item.value);
      setVisible(false);
      setQuery('');
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={disabled}
        onPress={() => setVisible(true)}
        style={styles.fieldRow}
      >
        <View style={styles.inputWrapper}>
          {!!displayText && <Text style={styles.floatingLabel}>{label}</Text>}
          <Text
            numberOfLines={1}
            style={[
              styles.value,
              !displayText && styles.placeholder,
              disabled && styles.disabledText,
            ]}
          >
            {displayText || label}
          </Text>
          <View
            style={[
              styles.underline,
              { borderBottomColor: error ? colors.error : colors.border },
            ]}
          />
        </View>
        <FeatherIcon
          name={loading ? 'loader' : 'chevron-down'}
          size={20}
          color={disabled ? colors.textPlaceholder : colors.textLabel}
          style={styles.chevron}
        />
      </TouchableOpacity>
      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setVisible(false)} hitSlop={10}>
                <FeatherIcon name="x" size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {searchable && (
              <View style={styles.searchBox}>
                <FeatherIcon name="search" size={16} color={colors.textLabel} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search..."
                  placeholderTextColor={colors.textPlaceholder}
                  style={styles.searchInput}
                />
              </View>
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              style={{ maxHeight: 360 }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => {
                const isSelected = selectedValues.includes(item.value);
                return (
                  <TouchableOpacity style={styles.optionRow} onPress={() => handleSelect(item)}>
                    <Text style={styles.optionText}>{item.label}</Text>
                    {isSelected && (
                      <FeatherIcon name="check" size={18} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No options found</Text>
              }
            />

            {multiSelect && (
              <TouchableOpacity style={styles.doneButton} onPress={() => setVisible(false)}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
  },
  floatingLabel: {
    fontSize: 12,
    color: colors.textLabel,
    fontWeight: '500',
    marginBottom: 2,
  },
  value: {
    fontSize: typography.input,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
  placeholder: {
    color: colors.textLabel,
    fontWeight: '400',
  },
  disabledText: {
    color: colors.textPlaceholder,
  },
  underline: {
    borderBottomWidth: 1.5,
  },
  chevron: {
    marginLeft: spacing.sm,
    marginBottom: spacing.sm,
  },
  errorText: {
    marginTop: 4,
    fontSize: typography.helper,
    color: colors.error,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    maxHeight: '75%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sheetTitle: {
    fontSize: typography.title,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    paddingVertical: 10,
    color: colors.textPrimary,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textLabel,
    paddingVertical: spacing.lg,
  },
  doneButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});