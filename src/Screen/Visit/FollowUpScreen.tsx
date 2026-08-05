import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';
import AppHeader from '../../components/AppHeader';


const FILTERS = [
  'Today',
  'Tomorrow',
  'This Week',
  'Completed',
];

const FOLLOW_UPS = [

  {
    id: '1',
    shopName: 'ABC Electronics',
    ownerName: 'Rajesh Kumar',
    mobile: '9876543210',
    address: 'Sector 62, Noida',
    priority: 'High',
    status: 'Pending',
    followUpDate: 'Today',
    followUpTime: '11:30 AM',
    reason: 'Customer requested POS machine demo.',
  },

  {
    id: '2',
    shopName: 'Sharma Medical',
    ownerName: 'Ankit Sharma',
    mobile: '9876543211',
    address: 'Sector 18, Noida',
    priority: 'Medium',
    status: 'Pending',
    followUpDate: 'Today',
    followUpTime: '03:00 PM',
    reason: 'Owner was busy during previous visit.',
  },

  {
    id: '3',
    shopName: 'Gupta Traders',
    ownerName: 'Sanjay Gupta',
    mobile: '9876543212',
    address: 'Sector 15, Noida',
    priority: 'Low',
    status: 'Scheduled',
    followUpDate: 'Tomorrow',
    followUpTime: '12:00 PM',
    reason: 'Customer asked to visit tomorrow.',
  },

  {
    id: '4',
    shopName: 'Maa Durga Store',
    ownerName: 'Rakesh Verma',
    mobile: '9876543213',
    address: 'Sector 76, Noida',
    priority: 'High',
    status: 'Completed',
    followUpDate: 'Completed',
    followUpTime: '10:00 AM',
    reason: 'Lead successfully converted.',
  },

];

const FollowUpScreen = ({ navigation }: any) => {

  const [selectedFilter, setSelectedFilter] =
    useState('Today');

  const filteredData = useMemo(() => {

    if (selectedFilter === 'This Week') {
      return FOLLOW_UPS;
    }

    if (selectedFilter === 'Completed') {
      return FOLLOW_UPS.filter(
        item => item.status === 'Completed',
      );
    }

    return FOLLOW_UPS.filter(
      item => item.followUpDate === selectedFilter,
    );

  }, [selectedFilter]);

  const total = FOLLOW_UPS.length;

  const pending = FOLLOW_UPS.filter(
    item => item.status === 'Pending',
  ).length;

  const completed = FOLLOW_UPS.filter(
    item => item.status === 'Completed',
  ).length;

  return (

    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      <AppHeader
        title="Follow Ups"
        subtitle="Scheduled Customer Visits"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* Summary */}

        <View style={styles.summaryContainer}>

          <View style={styles.summaryCard}>

            <Ionicons
              name="calendar-outline"
              size={28}
              color="#2563EB"
            />

            <Text style={styles.summaryCount}>
              {total}
            </Text>

            <Text style={styles.summaryLabel}>
              Total
            </Text>

          </View>

          <View style={styles.summaryCard}>

            <Ionicons
              name="time-outline"
              size={28}
              color="#F59E0B"
            />

            <Text style={styles.summaryCount}>
              {pending}
            </Text>

            <Text style={styles.summaryLabel}>
              Pending
            </Text>

          </View>

          <View style={styles.summaryCard}>

            <Ionicons
              name="checkmark-circle-outline"
              size={28}
              color="#16A34A"
            />

            <Text style={styles.summaryCount}>
              {completed}
            </Text>

            <Text style={styles.summaryLabel}>
              Completed
            </Text>

          </View>

        </View>

        {/* Filter */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}>

          {FILTERS.map(filter => (

            <TouchableOpacity
              key={filter}
              activeOpacity={0.85}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterChip,
                selectedFilter === filter &&
                  styles.activeFilterChip,
              ]}>

              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter &&
                    styles.activeFilterText,
                ]}>

                {filter}

              </Text>

            </TouchableOpacity>

          ))}

        </ScrollView>

                {/* Follow Up List */}

        {filteredData.map(item => (

          <View
            key={item.id}
            style={styles.followCard}>

            {/* Top Row */}

            <View style={styles.cardTop}>

              <View style={{ flex: 1 }}>

                <Text style={styles.shopName}>
                  {item.shopName}
                </Text>

                <Text style={styles.ownerName}>
                  Owner : {item.ownerName}
                </Text>

              </View>

              <View
                style={[
                  styles.priorityBadge,
                  {
                    backgroundColor:
                      item.priority === 'High'
                        ? '#FEE2E2'
                        : item.priority === 'Medium'
                        ? '#FEF3C7'
                        : '#DCFCE7',
                  },
                ]}>

                <Text
                  style={[
                    styles.priorityText,
                    {
                      color:
                        item.priority === 'High'
                          ? '#DC2626'
                          : item.priority === 'Medium'
                          ? '#D97706'
                          : '#16A34A',
                    },
                  ]}>

                  {item.priority}

                </Text>

              </View>

            </View>

            {/* Address */}

            <View style={styles.infoRow}>

              <Ionicons
                name="location-outline"
                size={18}
                color="#64748B"
              />

              <Text style={styles.infoText}>
                {item.address}
              </Text>

            </View>

            {/* Mobile */}

            <View style={styles.infoRow}>

              <Ionicons
                name="call-outline"
                size={18}
                color="#64748B"
              />

              <Text style={styles.infoText}>
                {item.mobile}
              </Text>

            </View>

            {/* Date */}

            <View style={styles.infoRow}>

              <Ionicons
                name="calendar-outline"
                size={18}
                color="#64748B"
              />

              <Text style={styles.infoText}>
                {item.followUpDate}
              </Text>

              <Ionicons
                name="time-outline"
                size={18}
                color="#64748B"
                style={{ marginLeft: 18 }}
              />

              <Text style={styles.infoText}>
                {item.followUpTime}
              </Text>

            </View>

            {/* Reason */}

            <View style={styles.reasonContainer}>

              <Text style={styles.reasonTitle}>
                Follow-up Reason
              </Text>

              <Text style={styles.reasonText}>
                {item.reason}
              </Text>

            </View>

            {/* Status */}

            <View style={styles.statusRow}>

              <Text style={styles.statusLabel}>
                Status
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      item.status === 'Completed'
                        ? '#DCFCE7'
                        : '#DBEAFE',
                  },
                ]}>

                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        item.status === 'Completed'
                          ? '#15803D'
                          : '#2563EB',
                    },
                  ]}>

                  {item.status}

                </Text>

              </View>

            </View>

            {/* Buttons */}

            <View style={styles.buttonRow}>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.visitButton}
                onPress={() =>
                  navigation.navigate(
                    'ShopVisit',
                    {
                      followUp: item,
                    },
                  )
                }>

                <Ionicons
                  name="walk-outline"
                  size={20}
                  color="#FFFFFF"
                />

                <Text style={styles.visitButtonText}>
                  Start Visit
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.callButton}>

                <Ionicons
                  name="call-outline"
                  size={20}
                  color="#2563EB"
                />

              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.rescheduleButton}>

                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#F59E0B"
                />

              </TouchableOpacity>

            </View>
          </View>

        ))}
                {/* Empty State */}

        {filteredData.length === 0 && (

          <View style={styles.emptyContainer}>

            <Ionicons
              name="calendar-clear-outline"
              size={80}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No Follow Ups Found
            </Text>

            <Text style={styles.emptySubtitle}>
              There are no scheduled follow-ups for this filter.
            </Text>

          </View>

        )}

      </ScrollView>

      {/* Floating Add Follow Up Button */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() =>
          navigation.navigate('LeadDetails')
        }>

        <Ionicons
          name="add"
          size={30}
          color="#FFFFFF"
        />

      </TouchableOpacity>

    </SafeAreaView>

  );

};

export default FollowUpScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  summaryCard: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  summaryCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },

  summaryLabel: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 13,
  },

  filterScroll: {
    marginBottom: 18,
  },

  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
  },

  activeFilterChip: {
    backgroundColor: '#0936B0',
  },

  filterText: {
    color: '#374151',
    fontWeight: '600',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  followCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shopName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  ownerName: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 14,
  },

  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  priorityText: {
    fontWeight: '700',
    fontSize: 12,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  infoText: {
    marginLeft: 8,
    color: '#374151',
    fontSize: 14,
  },

  reasonContainer: {
    marginTop: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },

  reasonTitle: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  reasonText: {
    color: '#64748B',
    lineHeight: 22,
  },

  statusRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusLabel: {
    fontWeight: '700',
    color: '#111827',
  },

  statusBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  statusText: {
    fontWeight: '700',
    fontSize: 12,
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 18,
    alignItems: 'center',
  },

  visitButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#0936B0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  visitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 8,
  },

  callButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  rescheduleButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  emptySubtitle: {
    marginTop: 10,
    textAlign: 'center',
    color: '#64748B',
    lineHeight: 22,
    paddingHorizontal: 30,
  },

  fab: {
    position: 'absolute',
    right: 22,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

});