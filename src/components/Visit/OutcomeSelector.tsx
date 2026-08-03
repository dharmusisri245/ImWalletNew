import React, {
  forwardRef,
  useMemo,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import Ionicons from '@react-native-vector-icons/ionicons';

export type VisitOutcome =
  | 'Interested'
  | 'Follow-up Required'
  | 'Decision Pending'
  | 'Not Interested'
  | 'Shop Closed';

interface OutcomeSelectorProps {
  onSelect: (value: VisitOutcome) => void;
}

interface OutcomeItem {
  id: number;
  title: VisitOutcome;
  subtitle: string;
  icon: string;
  color: string;
}

const outcomes: OutcomeItem[] = [
  {
    id: 1,
    title: 'Interested',
    subtitle: 'Customer is ready to proceed.',
    icon: 'checkmark-circle',
    color: '#16A34A',
  },
  {
    id: 2,
    title: 'Follow-up Required',
    subtitle: 'Customer requested another visit.',
    icon: 'calendar-outline',
    color: '#F59E0B',
  },
  {
    id: 3,
    title: 'Decision Pending',
    subtitle: 'Customer needs more time.',
    icon: 'time-outline',
    color: '#2563EB',
  },
  {
    id: 4,
    title: 'Not Interested',
    subtitle: 'Customer rejected the proposal.',
    icon: 'close-circle',
    color: '#EF4444',
  },
  {
    id: 5,
    title: 'Shop Closed',
    subtitle: 'Shop was closed during visit.',
    icon: 'lock-closed',
    color: '#6B7280',
  },
];

const OutcomeSelector = forwardRef<BottomSheet, OutcomeSelectorProps>(
  ({ onSelect }, ref) => {

    const snapPoints = useMemo(
      () => ['68%'],
      [],
    );

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.45}
        />
      ),
      [],
    );

    const OutcomeRow = ({
      item,
    }: {
      item: OutcomeItem;
    }) => (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.row}
        onPress={() => {

          onSelect(item.title);

          if (
            ref &&
            typeof ref !== 'function' &&
            ref.current
          ) {
            ref.current.close();
          }
        }>

        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: `${item.color}20`,
            },
          ]}>

          <Ionicons
            name={item.icon as any}
            size={26}
            color={item.color}
          />

        </View>

        <View style={styles.content}>

          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.subtitle}>
            {item.subtitle}
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#9CA3AF"
        />

      </TouchableOpacity>
    );
        return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.sheetBackground}>

        <BottomSheetView style={styles.container}>

          <View style={styles.header}>

            <Ionicons
              name="clipboard-outline"
              size={26}
              color="#0936B0"
            />

            <Text style={styles.headerTitle}>
              Select Visit Outcome
            </Text>

          </View>

          <Text style={styles.headerSubtitle}>
            Choose the final outcome of this shop visit.
          </Text>

          {outcomes.map(item => (
            <OutcomeRow
              key={item.id}
              item={item}
            />
          ))}

        </BottomSheetView>

      </BottomSheet>
    );
  },
);

export default React.memo(OutcomeSelector);

const styles = StyleSheet.create({

  sheetBackground: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#FFFFFF',
  },

  indicator: {
    width: 70,
    height: 5,
    backgroundColor: '#CBD5E1',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  headerTitle: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  headerSubtitle: {
    marginTop: 8,
    marginBottom: 22,
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 22,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 18,

    marginBottom: 14,

    borderWidth: 1,
    borderColor: '#E5E7EB',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,

    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginHorizontal: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: '#6B7280',
  },

});