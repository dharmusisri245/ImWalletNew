import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';


import { reverseGeocode$ } from '../../services/GeocodingService';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PermissionService from '../../services/PermissionService';
import CameraCaptureScreen, {
  CaptureResult,
  AttendanceMode,
  EmployeeType
} from '../../components/CameraCaptureScreen';
import LocationService from '../../services/LocationService';
import AttendanceStorage from '../../services/AttendanceStorage';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { MOCK_EMPLOYEE } from '../../components/config/mockEmployeeConfig';
import CompanyHeader from '../../components/CompanyHeader';
import DistanceService from '../../services/DistanceService';

const office = MOCK_EMPLOYEE.office;

const TODAY_LABEL = new Date().toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const MAROON = '#082db3';


// const CURRENT_EMPLOYEE = {
//   name: 'Dharmendra Gupta',
//   id: 'EMP-4521',
//   type: 'field' as EmployeeType, // 'office' | 'field'
// };

// const ASSIGNED_OFFICE = {
//   name: 'Corporate HQ - Sector 63',
//   latitude: 28.6139,
//   longitude: 77.209,
//   radiusMeters: 300,
// };

const AttendanceScreen = () => {
  const [activeMode, setActiveMode] = useState<AttendanceMode>('check-in');
  const [checkedIn, setCheckedIn] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigation();
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [distanceFromOffice, setDistanceFromOffice] = useState<number>(0);
  const [summary, setSummary] = useState({
    checkInTime: '',
    checkOutTime: '',
    workingHours: '00h 00m',
  })


  const loadAttendance = async () => {
    const data = await AttendanceStorage.getTodayAttendanceSummary();
    setSummary(data)
  }


  useEffect(() => {
    loadAttendance()
  }, [])



  //   useFocusEffect(
  //   useCallback(() => {
  //     const init = async () => {
  //       // Clear old attendance records (FOR TESTING ONLY)
  //       await AttendanceStorage.clear();

  //       await loadAttendanceStatus();
  //     };

  //     init();
  //   }, []),
  // );


  const loadAttendanceStatus = async () => {
    const lastAttendance =
      await AttendanceStorage.getLastAttendance();

    console.log('Last Attendance:', lastAttendance);

    if (!lastAttendance) {
      setCheckedIn(false);
      setActiveMode('check-in');
      return;
    }

    if (lastAttendance.type === 'check-in') {
      setCheckedIn(true);
      setActiveMode('check-out');
    } else {
      setCheckedIn(false);
      setActiveMode('check-in');
    }
  };

  useEffect(() => {
    console.log('checkedIn State:', checkedIn);
    console.log('activeMode State:', activeMode);
  }, [checkedIn, activeMode]);

  useFocusEffect(
    useCallback(() => {
      loadAttendanceStatus();
    }, []),
  );

  const openCaptureFlow = async () => {
    try {
      setLoadingLocation(true);

      const hasCamera = await PermissionService.hasCameraPermission();
      const hasLocation = await PermissionService.hasLocationPermission();

      if (!hasCamera || !hasLocation) {
        setLoadingLocation(false);
        return;
      }

      const gpsEnabled = await LocationService.ensureGpsEnabled();

      if (!gpsEnabled) {
        setLoadingLocation(false);
        return;
      }

      // 1. Get Current Location
      const location = await LocationService.getCurrentLocation();

      // 2. Calculate Distance
      const distance = DistanceService.calculateDistance(
        location.latitude,
        location.longitude,
        office.latitude,
        office.longitude,
      );

      // 3. Get Address
      const address = await reverseGeocode$({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      // 4. Save Data
      setCurrentLocation(location);
      setCurrentAddress(address.displayName);
      setDistanceFromOffice(distance);

      // Optional
      console.log("Distance:", distance);

      // 5. Open Camera
      setLoadingLocation(false);
      setCameraVisible(true);

    } catch (e: any) {
      setLoadingLocation(false);

      Alert.alert(
        "Location Error",
        e?.message || "Unable to fetch current location."
      );
    }
  };

  const handleCaptured = async (result: CaptureResult) => {
    setSubmitting(true);
    try {
      const attendance = {
        id: Date.now().toString(),

        employeeId: result.employeeId,
        employeeName: result.employeeName,

        type: activeMode,

        photoUri: result.photoUri,

        latitude: result.latitude,
        longitude: result.longitude,

        address: result.address,

        distanceFromOfficeMeters: result.distanceFromOfficeMeters,

        insideOfficeRadius: result.insideOfficeRadius,

        timestamp: result.timestamp,

        synced: false,
      };

      await AttendanceStorage.save(attendance);

      if (activeMode === 'check-in') {
        setCheckedIn(true);
        setActiveMode('check-out');
      } else {
        setCheckedIn(false);
        setActiveMode('check-in');
      }

      // Close camera
      setCameraVisible(false);

      // Show Success Toast
      Toast.show({
        type: 'success',
        text1:
          activeMode === 'check-in'
            ? 'Check-In Successful'
            : 'Check-Out Successful',
        text2: 'Attendance submitted successfully.',
        visibilityTime: 2000,
      });

      // Navigate after a short delay
      setTimeout(() => {
        navigate.navigate('HomeScreen' as never);
      }, 1200);

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Unable to save attendance.',
      });
    }
  };

  

  return (
    <View style={styles.screen}>
      <View></View>
      <CompanyHeader title="ImWallet Lt" />
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
            onPress={async () => {
              if (checkedIn) return;
              setActiveMode('check-in');
              await openCaptureFlow();
            }}
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
            // onPress={() => checkedIn && setActiveMode('check-out')}
            onPress={async () => {
              if (!checkedIn) return;

              setActiveMode('check-out');
              await openCaptureFlow();
            }}
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
        <TouchableOpacity style={styles.leaveButton}>
          <Text style={styles.leaveButtonText}>Leave</Text>
        </TouchableOpacity>
      </View>

      {/* Full-screen camera — rendered on top of everything, no modal chrome */}

      {loadingLocation && (
        <View style={styles.loadingOverlay}>

          <View style={styles.loadingCard}>

            <ActivityIndicator
              size="large"
              color={MAROON}
            />

            <Text style={styles.loadingTitle}>
              Getting your current location...
            </Text>

            <Text style={styles.loadingSub}>
              Please wait
            </Text>
          </View>
        </View>
      )}
      <Modal
        visible={cameraVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => setCameraVisible(false)}
      >
        <CameraCaptureScreen
          visible={cameraVisible}
          mode={activeMode}
          // employeeName={CURRENT_EMPLOYEE.name}
          // employeeId={CURRENT_EMPLOYEE.id}
          // employeeType={CURRENT_EMPLOYEE.type}
          // distanceFromOfficeMeters={distance}
          // distanceFromOffice={distanceFromOffice}
          distanceFromOfficeMeters={distanceFromOffice}
          mode={activeMode}
          employeeName={office.name}
          employeeId={office.id}
          employeeType={office.type}
          office={
            office.type === 'office'
              ? ASSIGNED_OFFICE
              : undefined
          }
          currentLocation={currentLocation}
          currentAddress={currentAddress}
          onClose={() => setCameraVisible(false)}
          onCaptured={handleCaptured}
        />
      </Modal>



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
    ...Platform.select({
      ios: {
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
      },
      android: {
        elevation: 8,
      },
    }),
  },
  // headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700', flexShrink: 1 },
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
    marginBottom: 150,
    width: 110,
    height: 110,
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingCard: {
    width: 260,
    // backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    position: 'absolute',
    marginBottom: 400,
  },

  loadingTitle: {
    marginTop: 18,
    fontSize: 15,
    fontWeight: '700',
    color: '#913800', // Dark aqua
  },

  loadingSub: {
    marginTop: 6,
    color: '#0ba50b',
  },
  // header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0444a4',
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    // Android
    elevation: 8,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  headerContent: {
    marginLeft: 16,
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#D8E9FF',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default AttendanceScreen;




