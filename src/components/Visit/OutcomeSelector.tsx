import React, {
  forwardRef,
  ForwardedRef,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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

export interface OutcomeSelectorProps {
  onSelect: (value: VisitOutcome) => void;
}

interface OutcomeItem {
  id: number;
  title: VisitOutcome;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}

const OUTCOMES: OutcomeItem[] = [
  {
    id: 1,
    title: 'Interested',
    description: 'Customer is ready to continue.',
    icon: 'checkmark-circle',
    color: '#16A34A',
  },
  {
    id: 2,
    title: 'Follow-up Required',
    description: 'Customer requested another meeting.',
    icon: 'calendar-outline',
    color: '#F59E0B',
  },
  {
    id: 3,
    title: 'Decision Pending',
    description: 'Customer needs time to decide.',
    icon: 'time-outline',
    color: '#2563EB',
  },
  {
    id: 4,
    title: 'Not Interested',
    description: 'Customer rejected the proposal.',
    icon: 'close-circle',
    color: '#EF4444',
  },
  {
    id: 5,
    title: 'Shop Closed',
    description: 'Shop was closed during visit.',
    icon: 'lock-closed',
    color: '#64748B',
  },
];

const OutcomeSelector = forwardRef(function OutcomeSelector(
  { onSelect }: OutcomeSelectorProps,
  ref: ForwardedRef<BottomSheet>,
) {

  const sheetRef = useRef<BottomSheet>(null);

  useImperativeHandle(
    ref,
    () => sheetRef.current as BottomSheet,
  );

  const snapPoints = useMemo(
    () => ['65%'],
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

  const handleSelect = (item: OutcomeItem) => {

    onSelect(item.title);

    sheetRef.current?.close();

  };

  const OutcomeRow = ({
    item,
  }: {
    item: OutcomeItem;
  }) => (

    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.row}
      onPress={() => handleSelect(item)}>

      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${item.color}20`,
          },
        ]}>

        <Ionicons
          name={item.icon}
          size={28}
          color={item.color}
        />

      </View>

      <View style={styles.content}>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#94A3B8"
      />

    </TouchableOpacity>

  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.background}>

      <BottomSheetView style={styles.container}>

      <View style={styles.header}>
  <View style={styles.headerLeft}>
    <View style={styles.headerIcon}>
      <Ionicons
        name="clipboard-outline"
        size={22}
        color="#0936B0"
      />
    </View>

    <View>
      <Text style={styles.headerTitle}>
        Visit Outcome
      </Text>

      <Text style={styles.headerSubtitle}>
        Select the result of this visit
      </Text>
    </View>
  </View>

  <TouchableOpacity
    style={styles.closeButton}
    onPress={() => sheetRef.current?.close()}>
    <Ionicons
      name="close"
      size={22}
      color="#64748B"
    />
  </TouchableOpacity>
</View>

        {OUTCOMES.map(item => (
          <OutcomeRow
            key={item.id}
            item={item}
          />
        ))}

      </BottomSheetView>

    </BottomSheet>
  );

});

export default React.memo(OutcomeSelector);

const styles = StyleSheet.create({

  background: {

    backgroundColor: '#FFFFFF',

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,

  },

  headerContent: {
    flex: 1,
    marginLeft: 10,

  },

  headerTitle: {

    fontSize: 22,

    fontWeight: '700',

    color: '#111827',
  },

  headerSubtitle: {

    marginTop: 4,

    fontSize: 14,

    color: '#64748B',

    lineHeight: 20,
  },
  CrossButton:{
   flexDirection:'row-reverse',
  },

  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 16,
},

headerLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},

headerIcon: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: '#EEF4FF',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

headerTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#111827',
},

headerSubtitle: {
  marginTop: 2,
  fontSize: 13,
  color: '#64748B',
},

closeButton: {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: '#F3F4F6',
  justifyContent: 'center',
  alignItems: 'center',
},

  row: {

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 16,

    marginBottom: 14,

    borderWidth: 1,

    borderColor: '#E5E7EB',

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 6,

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

    marginHorizontal: 14,
  },

  title: {

    fontSize: 16,

    fontWeight: '700',

    color: '#111827',
  },

  description: {

    marginTop: 4,

    fontSize: 13,

    color: '#64748B',

    lineHeight: 18,
  },

});