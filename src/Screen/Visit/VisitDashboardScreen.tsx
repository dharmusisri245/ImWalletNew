import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation } from '@react-navigation/native';

// import CompanyHeader from '../../components/Common/CompanyHeader';

import VisitSummaryCard from '../../components/Visit/VisitSummaryCard';
import TargetCard from '../../components/Visit/TargetCard';
import LeadStatusCard from '../../components/Visit/LeadStatusCard';
import VisitCard from '../../components/Visit/VisitCard';
import EmptyVisit from '../../components/Visit/EmptyVisit';
import AppHeader from '../../components/AppHeader';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import AttendanceCard from '../../components/Dashboard/AttendanceCard';

const VisitDashboardScreen = () => {
    const [checkedIn, setCheckedIn] = useState(false);
     const [summary, setSummary] = useState({
        checkInTime: '',
        checkOutTime: '',
        workingHours: '00h 00m',
      })
    

//   const navigation = useNavigation<any>();
const navigation = {
  navigate: (...args: any[]) =>
    console.log('Navigate:', args),
};

  const summary1 = {
    visited: 12,
    remaining: 8,
    interested: 5,
    followUp: 3,
  };

  const target = {
    target: 20,
    completed: 12,
  };

  const leadStatus = {
    interested: 5,
    followUp: 3,
    decisionPending: 2,
    notInterested: 1,
    shopClosed: 1,
  };

  const visits = [
    {
      id: '1',
      shopName: 'ABC Electronics',
      ownerName: 'Rajesh Kumar',
      mobile: '+91 9876543210',
      address: 'Sector 62, Noida',
      visitTime: '10:15 AM',
      status: 'Interested',
    },
    {
      id: '2',
      shopName: 'Gupta Traders',
      ownerName: 'Dharmendra',
      mobile: '+91 9876543211',
      address: 'Sector 63, Noida',
      visitTime: '11:40 AM',
      status: 'Follow-up',
    },
    {
      id: '3',
      shopName: 'Royal Mobile',
      ownerName: 'Rakesh Singh',
      mobile: '+91 9876543212',
      address: 'Sector 18, Noida',
      visitTime: '01:05 PM',
      status: 'Decision Pending',
    },
  ];

  const handleStartVisit = () => {
    navigation.navigate('ShopVisitScreen');
  };

  const handleVisitHistory = () => {
    navigation.navigate('VisitHistoryScreen');
  };

  const handleVisitDetails = (item: any) => {
    navigation.navigate(
      'LeadDetailsScreen',
      {
        visit: item,
      },
    );
  };

  return (

    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      <AppHeader
        title="Visit Dashboard"
        subtitle="Lead Generation"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* <View style={styles.welcomeContainer}>

          <Text style={styles.greeting}>
            Good Morning 👋
          </Text>

          <Text style={styles.employeeName}>
            Dharmendra Gupta
          </Text>

          <Text style={styles.date}>
            Monday, 03 August 2026
          </Text>

        </View> */}
{/* <DashboardHeader/> */}
<AttendanceCard
          status={
            checkedIn
              ? 'Checked In'
              : summary.checkOutTime
                ? 'Checked Out'
                : 'Not Checked In'
          }
          checkInTime={summary.checkInTime}
          checkOutTime={summary.checkOutTime}
          workingHours={summary.workingHours}
          onCheckIn={() =>
            navigation.navigate('AttendanceScreen' as never)
          }

          onCheckOut={() =>
            navigation.navigate('AttendanceScreen' as never)
          }
        />
        <VisitSummaryCard
          visited={summary1.visited}
          remaining={summary1.remaining}
          interested={summary1.interested}
          followUp={summary1.followUp}
        />

        <View style={styles.spacing} />

        <TargetCard
          target={target.target}
          completed={target.completed}
        />

        <View style={styles.spacing} />

        <LeadStatusCard
          interested={leadStatus.interested}
          followUp={leadStatus.followUp}
          decisionPending={leadStatus.decisionPending}
          notInterested={leadStatus.notInterested}
          shopClosed={leadStatus.shopClosed}
        />

        <View style={styles.spacing} />

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.startButton}
          onPress={handleStartVisit}>

          <Ionicons
            name="add-circle"
            color="#FFFFFF"
            size={24}
          />

          <Text style={styles.startButtonText}>
            Start New Visit
          </Text>

        </TouchableOpacity>

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Today's Visits
          </Text>

          <TouchableOpacity
            onPress={handleVisitHistory}>
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>

        </View>
                {visits.length > 0 ? (

          visits.map(item => (

            <VisitCard
              key={item.id}
              shopName={item.shopName}
              ownerName={item.ownerName}
              mobile={item.mobile}
              address={item.address}
              visitTime={item.visitTime}
              status={item.status as any}
              onPress={() => handleVisitDetails(item)}
            />

          ))

        ) : (

          <EmptyVisit
            title="No Visits Today"
            message="Tap the button below to start your first visit."
            buttonTitle="Start Visit"
            onPress={handleStartVisit}
          />

        )}

        <View style={styles.bottomSpacing} />

      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={handleStartVisit}>

        <Ionicons
          name="add"
          size={34}
          color="#FFFFFF"
        />

      </TouchableOpacity>

    </SafeAreaView>

  );
};

export default VisitDashboardScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    paddingTop: 0,
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  welcomeContainer: {
    marginBottom: 20,
  },

  greeting: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },

  employeeName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },

  date: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },

  spacing: {
    height: 18,
  },

  startButton: {
    marginTop: 5,

    height: 56,

    backgroundColor: '#0936B0',

    borderRadius: 18,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    shadowColor: '#0936B0',

    shadowOpacity: 0.30,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  startButtonText: {
    marginLeft: 10,

    color: '#FFFFFF',

    fontWeight: '700',

    fontSize: 17,
  },

  sectionHeader: {

    marginTop: 24,

    marginBottom: 16,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  sectionTitle: {

    fontSize: 20,

    fontWeight: '700',

    color: '#111827',
  },

  viewAll: {

    color: '#0936B0',

    fontWeight: '700',

    fontSize: 15,
  },

  bottomSpacing: {
    height: 70,
  },

  fab: {

    position: 'absolute',

    right: 22,

    bottom: 28,

    width: 62,

    height: 62,

    borderRadius: 31,

    backgroundColor: '#0936B0',

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#0936B0',

    shadowOpacity: 0.35,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

});