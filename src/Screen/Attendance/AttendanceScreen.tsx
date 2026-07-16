import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PermissionService from '../../services/PermissionService';
import CameraCaptureModal, { CaptureResult } from '../../components/Cameracapturemodal';

type Mode = 'check-in' | 'check-out';

const TODAY_LABEL = new Date().toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

// const MAROON = '#7A2020';
const MAROON = '#901010';


const AttendanceScreen = () => {
  const [activeMode, setActiveMode] = useState<Mode>('check-in');
  const [checkedIn, setCheckedIn] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const openCaptureFlow = async () => {
    const { camera, location } = await PermissionService.requestCheckInPermissions();

    if (!camera || !location) {
      Alert.alert(
        'Permissions required',
        'Camera and location access are required to mark attendance.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => PermissionService.openAppSettings() },
        ],
      );
      return;
    }

    setCameraVisible(true);
  };

  const handleCaptured = async (result: CaptureResult) => {
    setSubmitting(true);
    setCameraVisible(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (activeMode === 'check-in') {
        setCheckedIn(true);
        setActiveMode('check-out');
      } else {
        setCheckedIn(false);
        setActiveMode('check-in');
      }

      Alert.alert(
        'Success',
        activeMode === 'check-in' ? 'Checked in successfully.' : 'Checked out successfully.',
      );
    } catch (error) {
      Alert.alert('Error', 'Could not submit attendance. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Attendance Management</Text>
        {/* <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialDesignIcons name="cog-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialDesignIcons name="calendar-month-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <MaterialDesignIcons name="home-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.body}>
        <View style={styles.dateBanner}>
          <Text style={styles.dateBannerText}>Today's Attendance: {TODAY_LABEL}</Text>
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleCard,
              activeMode === 'check-in' && styles.toggleCardActive,
              checkedIn && styles.toggleCardDisabled,
            ]}
            onPress={() => !checkedIn && setActiveMode('check-in')}
            disabled={checkedIn}
          >
            <View style={styles.toggleIconWrap}>
              <MaterialDesignIcons name="location-enter" size={22} color={MAROON} />
            </View>
            <Text style={styles.toggleLabel}>Check-In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleCard,
              activeMode === 'check-out' && styles.toggleCardActive,
              !checkedIn && styles.toggleCardDisabled,
            ]}
            onPress={() => checkedIn && setActiveMode('check-out')}
            disabled={!checkedIn}
          >
            <View style={styles.toggleIconWrap}>
              <MaterialDesignIcons name="location-exit" size={22} color={checkedIn ? MAROON : '#B79999'} />
            </View>
            <Text style={[styles.toggleLabel, !checkedIn && styles.toggleLabelDisabled]}>
              Check-Out
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={openCaptureFlow} disabled={submitting}>
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <MaterialDesignIcons name="camera-outline" size={26} color="#fff" />
          )}
        </TouchableOpacity>
        <Text style={styles.actionHint}>
          Tap to {activeMode === 'check-in' ? 'check in' : 'check out'} with photo &amp; location
        </Text>

        <TouchableOpacity style={styles.leaveButton}>
          <Text style={styles.leaveButtonText}>Leave</Text>
        </TouchableOpacity>
      </View>

      <CameraCaptureModal
        visible={cameraVisible}
        mode={activeMode}
        onClose={() => setCameraVisible(false)}
        onCaptured={handleCaptured}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FBFBFB' },
  header: {
    backgroundColor: MAROON,
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700', flexShrink: 1 },
  headerIcons: { flexDirection: 'row' },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' },
  dateBanner: {
    backgroundColor: MAROON,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  dateBannerText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F7E3E3',
    borderRadius: 20,
    padding: 6,
    alignSelf: 'stretch',
    marginBottom: 34,
  },
  toggleCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  toggleCardActive: {
    backgroundColor: '#fff',
    borderColor: MAROON,
  },
  toggleCardDisabled: { opacity: 0.55 },
  toggleIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1E4E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: { fontSize: 16, fontWeight: '700', color: '#111827' },
  toggleLabelDisabled: { color: '#9CA3AF' },
  actionButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: MAROON,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: MAROON,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  actionHint: { marginTop: 14, color: '#6B7280', fontSize: 13, textAlign: 'center' },
  leaveButton: {
    marginTop: 'auto',
    marginBottom: 30,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: MAROON,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  leaveButtonText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});

export default AttendanceScreen;