import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';

export type ConversationFilterType =
  | 'all'
  | 'tier1'
  | 'tier2'
  | 'tier3'
  | 'ai'
  | 'human'
  | 'urgent';

interface ConversationFilterProps {
  selected: ConversationFilterType;
  onChange: (
    filter: ConversationFilterType,
  ) => void;

  searchText?: string;

  onSearchChange?: (
    text: string,
  ) => void;

  onMicPress?: () => void;

  onScannerPress?: () => void;
}

const filters: {
  key: ConversationFilterType;
  label: string;
}[] = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: 'tier1',
    label: 'Tier 1',
  },
  {
    key: 'tier2',
    label: 'Tier 2',
  },
  {
    key: 'tier3',
    label: 'Tier 3',
  },
  {
    key: 'ai',
    label: 'AI',
  },
  {
    key: 'human',
    label: 'Human',
  },
  {
    key: 'urgent',
    label: 'Urgent',
  },
];

const ConversationFilter: React.FC<
  ConversationFilterProps
> = ({
  selected,
  onChange,
  searchText = '',
  onSearchChange,
  onMicPress,
  onScannerPress,
}) => {
  return (
    <View style={styles.container}>

      {/* =================================================
          SEARCH BAR
      ================================================= */}

      <View style={styles.searchContainer}>

        <Feather
          name="search"
          size={19}
          color="#64748B"
        />

        <TextInput
          value={searchText}
          onChangeText={
            onSearchChange
          }
          placeholder="Search conversations..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          returnKeyType="search"
        />

        {/* MIC */}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onMicPress}
          style={styles.iconButton}>

          <Feather
            name="mic"
            size={19}
            color="#475569"
          />

        </TouchableOpacity>

        {/* SCANNER */}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onScannerPress}
          style={styles.iconButton}>

          <Feather
            name="maximize"
            size={19}
            color="#475569"
          />

        </TouchableOpacity>

      </View>

      {/* =================================================
          FILTERS
      ================================================= */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.filterContent
        }>

        {filters.map(filter => {

          const isSelected =
            selected === filter.key;

          return (
            <TouchableOpacity
              key={filter.key}
              activeOpacity={0.8}
              onPress={() =>
                onChange(filter.key)
              }
              style={[
                styles.filterButton,
                isSelected &&
                  styles.selectedFilterButton,
              ]}>

              <Text
                style={[
                  styles.filterText,
                  isSelected &&
                    styles.selectedFilterText,
                ]}>

                {filter.label}

              </Text>

            </TouchableOpacity>
          );
        })}

      </ScrollView>

    </View>
  );
};

export default ConversationFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FC',
  },

  /* =====================================================
     SEARCH
  ===================================================== */

  searchContainer: {
    height: 48,

    marginHorizontal: 16,
    marginTop: 12,

    paddingHorizontal: 13,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 14,

    borderWidth: 1,
    borderColor: '#E5E7EB',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  searchInput: {
    flex: 1,

    height: 48,

    marginLeft: 9,

    paddingVertical: 0,

    fontSize: 13,

    color: '#111827',
  },

  iconButton: {
    width: 34,
    height: 34,

    borderRadius: 17,

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 2,
  },

  /* =====================================================
     FILTER
  ===================================================== */

  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  filterButton: {
    height: 36,

    paddingHorizontal: 16,

    borderRadius: 18,

    marginRight: 8,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  selectedFilterButton: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },

  filterText: {
    fontSize: 12,

    fontWeight: '600',

    color: '#64748B',
  },

  selectedFilterText: {
    color: '#FFFFFF',
  },
});