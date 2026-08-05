import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';
import AppHeader from '../../components/AppHeader';


const FILTERS = [
  'Today',
  'Yesterday',
  'This Week',
  'This Month',
];

const VISITS = [

  {
    id: '1',
    shopName: 'ABC Electronics',
    owner: 'Rajesh Kumar',
    address: 'Sector 62, Noida',
    visitStartTime: '10:10 AM',
    visitEndTime: '10:35 AM',
    visitDuration: '25 Min',
    visitStatus: 'Completed',
    leadStatus: 'Interested',
    priority: 'High',
  },

  {
    id: '2',
    shopName: 'Sharma Medical',
    owner: 'Ankit Sharma',
    address: 'Sector 18, Noida',
    visitStartTime: '10:10 AM',
    visitEndTime: '10:35 AM',
    visitDuration: '25 Min',
    visitStatus: 'Completed',
    leadStatus: 'Follow-up',
    priority: 'Medium',
  },

  {
    id: '3',
    shopName: 'Gupta Traders',
    owner: 'Sanjay Gupta',
    address: 'Sector 15, Noida',
    visitStartTime: '10:10 AM',
    visitEndTime: '10:35 AM',
    visitDuration: '25 Min',
    visitStatus: 'Completed',
    leadStatus: 'Not Interested',
    priority: 'Low',
  },

];

const VisitHistoryScreen = ({ navigation }: any) => {

  const [selectedFilter, setSelectedFilter] =
    useState('Today');

  const [search, setSearch] =
    useState('');

  const visitData = useMemo(() => {

    return VISITS.filter(item => {

      return (
        item.shopName
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        item.owner
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    });

  }, [search]);

  const totalVisits = VISITS.length;

  const interested = VISITS.filter(
    i => i.leadStatus === 'Interested',
  ).length;

  const followUps = VISITS.filter(
    i => i.leadStatus === 'Follow-up',
  ).length;

  return (

    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      <AppHeader
        title="Visit History"
        subtitle="Today's Shop Visits"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* Search */}

        <View style={styles.searchContainer}>

          <Ionicons
            name="search-outline"
            size={22}
            color="#64748B"
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search Shop or Owner"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />

        </View>

        {/* Summary */}

        <View style={styles.summaryContainer}>

          <View style={styles.summaryCard}>

            <Ionicons
              name="storefront-outline"
              size={28}
              color="#2563EB"
            />

            <Text style={styles.summaryCount}>
              {totalVisits}
            </Text>

            <Text style={styles.summaryLabel}>
              Total Visits
            </Text>

          </View>

          <View style={styles.summaryCard}>

            <Ionicons
              name="checkmark-circle-outline"
              size={28}
              color="#16A34A"
            />

            <Text style={styles.summaryCount}>
              {interested}
            </Text>

            <Text style={styles.summaryLabel}>
              Interested
            </Text>

          </View>

          <View style={styles.summaryCard}>

            <Ionicons
              name="time-outline"
              size={28}
              color="#F59E0B"
            />

            <Text style={styles.summaryCount}>
              {followUps}
            </Text>

            <Text style={styles.summaryLabel}>
              Follow-up
            </Text>

          </View>

        </View>

        {/* Filter */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>

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
        {/* Visit History List */}

        {visitData.map(item => (

          <View
            key={item.id}
            style={styles.visitCard}>

            {/* Header */}

            <View style={styles.cardHeader}>

              <View style={{ flex: 1 }}>

                <Text style={styles.shopName}>
                  {item.shopName}
                </Text>

                <Text style={styles.ownerName}>
                  Owner : {item.owner}
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
                            : '#15803D',
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

            {/* Check In */}

            <View style={styles.infoRow}>

              <Ionicons
                name="log-in-outline"
                size={18}
                color="#16A34A"
              />

              <Text style={styles.infoText}>
                Visit Start Time : {item.visitStartTime}
              </Text>

            </View>

            {/* Check Out */}

            <View style={styles.infoRow}>

              <Ionicons
                name="log-out-outline"
                size={18}
                color="#DC2626"
              />

              <Text style={styles.infoText}>
                Visit End Time : {item.visitEndTime}
              </Text>

            </View>

            {/* Duration */}

            <View style={styles.infoRow}>

              <Ionicons
                name="time-outline"
                size={18}
                color="#2563EB"
              />

              <Text style={styles.infoText}>
                Visit Duration : {item.visitDuration}
              </Text>

            </View>

            {/* Visit Status */}

            <View style={styles.statusRow}>

              <View>

                <Text style={styles.statusLabel}>
                  Visit Status
                </Text>

                <View
                  style={styles.completedBadge}>

                  <Text
                    style={styles.completedText}>

                    {item.visitStatus}

                  </Text>

                </View>

              </View>

              <View>

                <Text style={styles.statusLabel}>
                  Lead Status
                </Text>

                <View
                  style={[
                    styles.leadBadge,

                    {
                      backgroundColor:
                        item.leadStatus ===
                          'Interested'
                          ? '#DCFCE7'
                          : item.leadStatus ===
                            'Follow-up'
                            ? '#DBEAFE'
                            : '#FEE2E2',
                    },
                  ]}>

                  <Text
                    style={[
                      styles.leadText,

                      {
                        color:
                          item.leadStatus ===
                            'Interested'
                            ? '#15803D'
                            : item.leadStatus ===
                              'Follow-up'
                              ? '#2563EB'
                              : '#DC2626',
                      },
                    ]}>

                    {item.leadStatus}

                  </Text>

                </View>

              </View>

            </View>

            {/* Divider */}

            <View style={styles.divider} />

            {/* Footer */}

            <View style={styles.footer}>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.routeButton}>

                <Ionicons
                  name="map-outline"
                  size={18}
                  color="#2563EB"
                />

                <Text
                  style={styles.routeText}>

                  Route

                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.detailsButton}
                onPress={() =>
                  navigation.navigate(
                    'LeadDetails',
                    {
                      visit: item,
                    },
                  )
                }>

                <Ionicons
                  name="eye-outline"
                  size={20}
                  color="#FFFFFF"
                />

                <Text
                  style={styles.detailsText}>

                  View Details

                </Text>

              </TouchableOpacity>

            </View>

          </View>

        ))}
        {/* Empty State */}

        {visitData.length === 0 && (

          <View style={styles.emptyContainer}>

            <Ionicons
              name="receipt-outline"
              size={90}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No Visit History Found
            </Text>

            <Text style={styles.emptySubtitle}>
              Your completed shop visits will appear here.
            </Text>

          </View>

        )}

      </ScrollView>

      {/* Floating Action Button */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() => console.log('Open Filters')}>

        <Ionicons
          name="options-outline"
          size={28}
          color="#FFFFFF"
        />

      </TouchableOpacity>

    </SafeAreaView>

  );

};

export default VisitHistoryScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  /* Search */

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 18,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    height: 52,
    marginLeft: 10,
    fontSize: 15,
    color: '#111827',
  },

  /* Summary */

  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 18,
    elevation: 3,
  },

  summaryCount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },

  summaryLabel: {
    marginTop: 6,
    color: '#64748B',
    fontSize: 13,
  },

  /* Filter */

  filterContainer: {
    marginBottom: 20,
  },

  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
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

  /* Card */

  visitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    elevation: 3,
  },

  cardHeader: {
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
    fontSize: 12,
    fontWeight: '700',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  infoText: {
    marginLeft: 10,
    color: '#374151',
    fontSize: 14,
    flex: 1,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  statusLabel: {
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  completedBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  completedText: {
    color: '#15803D',
    fontWeight: '700',
    fontSize: 12,
  },

  leadBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  leadText: {
    fontWeight: '700',
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 18,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeButton: {
    width: 90,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  routeText: {
    marginLeft: 6,
    color: '#2563EB',
    fontWeight: '700',
  },

  detailsButton: {
    flex: 1,
    marginLeft: 12,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#0936B0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  detailsText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  /* Empty */

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
    paddingHorizontal: 40,
  },

  /* Floating Button */

  fab: {
    position: 'absolute',
    right: 22,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0936B0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

});