import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface FollowUpTimePickerProps {
  value: string;
  onChange: (time: string) => void;

  startHour?: number;
  endHour?: number;
  intervalMinutes?: number;

  placeholder?: string;
}

const FollowUpTimePicker: React.FC<FollowUpTimePickerProps> = ({
  value,
  onChange,
  startHour = 9,
  endHour = 20,
  intervalMinutes = 30,
  placeholder = 'Select Follow-up Time',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const timeSlots = useMemo(() => {
    const slots: string[] = [];

    const startMinutes = startHour * 60;
    const endMinutes = endHour * 60;

    for (
      let totalMinutes = startMinutes;
      totalMinutes <= endMinutes;
      totalMinutes += intervalMinutes
    ) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      const date = new Date();

      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);
      date.setMilliseconds(0);

      const formattedTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      slots.push(formattedTime);
    }

    return slots;
  }, [startHour, endHour, intervalMinutes]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelectTime = (time: string) => {
    onChange(time);

    // Automatically close after selecting
    setIsOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* Time Input */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.input}
        onPress={handleToggle}>
        <View style={styles.inputContent}>
          <Ionicons
            name="time-outline"
            size={21}
            color="#2563EB"
          />

          <Text
            numberOfLines={1}
            style={[
              styles.inputText,
              !value && styles.placeholderText,
            ]}>
            {value || placeholder}
          </Text>

          <Ionicons
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#64748B"
          />
        </View>
      </TouchableOpacity>

      {/* Inline Time Picker */}
      {isOpen && (
        <View style={styles.inlinePicker}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons
                name="time-outline"
                size={20}
                color="#2563EB"
              />

              <Text style={styles.title}>
                Select Follow-up Time
              </Text>
            </View>

            {value ? (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>
                  {value}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Time Slots */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeList}>
            {timeSlots.map(time => {
              const selected = value === time;

              return (
                <TouchableOpacity
                  key={time}
                  activeOpacity={0.75}
                  style={[
                    styles.timeChip,
                    selected && styles.selectedTimeChip,
                  ]}
                  onPress={() => handleSelectTime(time)}>
                  <Text
                    style={[
                      styles.timeChipText,
                      selected &&
                        styles.selectedTimeChipText,
                    ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default React.memo(FollowUpTimePicker);
1
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom:15
  },
  
  input: {
    height: 56,

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 16,

    paddingHorizontal: 16,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
  },

  inputContent: {
    width: '100%',
    height: '100%',

    flexDirection: 'row',
    alignItems: 'center',
  },

  inputText: {
    flex: 1,

    marginLeft: 12,
    marginRight: 8,

    fontSize: 15,
    fontWeight: '500',

    color: '#111827',

    includeFontPadding: false,
  },

  placeholderText: {
    color: '#94A3B8',
  },

  inlinePicker: {
    marginTop: 8,
    marginBottom: 4,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 16,

    paddingVertical: 12,

    elevation: 2,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 14,

    marginBottom: 10,
  },

  headerLeft: {
    flexDirection: 'row',

    alignItems: 'center',

    flexShrink: 1,
  },

  title: {
    marginLeft: 8,

    fontSize: 14,
    fontWeight: '700',

    color: '#111827',

    flexShrink: 1,
  },

  selectedBadge: {
    marginLeft: 8,

    paddingHorizontal: 9,
    paddingVertical: 5,

    borderRadius: 8,

    backgroundColor: '#EFF6FF',
  },

  selectedBadgeText: {
    fontSize: 12,
    fontWeight: '700',

    color: '#2563EB',
  },

  timeList: {
    paddingHorizontal: 12,
  },

  timeChip: {
    height: 40,

    minWidth: 82,

    paddingHorizontal: 14,

    marginRight: 8,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#E2E8F0',

    backgroundColor: '#F8FAFC',

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedTimeChip: {
    backgroundColor: '#2563EB',

    borderColor: '#2563EB',
  },

  timeChipText: {
    fontSize: 13,

    fontWeight: '600',

    color: '#475569',
  },

  selectedTimeChipText: {
    color: '#FFFFFF',
  },
});