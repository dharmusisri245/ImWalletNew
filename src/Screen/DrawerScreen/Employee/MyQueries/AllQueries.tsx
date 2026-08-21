// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const AllQueries = () => {
//   return (
//     <View>
//       <Text>AllQueries</Text>
//     </View>
//   )
// }

// export default AllQueries

// const styles = StyleSheet.create({})





import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import EmployeeTrackingService, {
  EmployeeLocation,
  TrackingState,
} from '../../../../services/tracking/EmployeeTrackingService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  navigation?: any;
}

const AllQueries: React.FC<Props> = ({ navigation }) => {
  const [trackingState, setTrackingState] = useState<TrackingState>(
    EmployeeTrackingService.getState(),
  );


  const insets = useSafeAreaInsets();
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = EmployeeTrackingService.subscribe(
      (_location: EmployeeLocation, state: TrackingState) => {
        setTrackingState({
          ...state,
          locations: [...state.locations],
        });
      },
    );

    setTrackingState(EmployeeTrackingService.getState());

    return () => {
      unsubscribe();
    };
  }, []);

  const handleStartTracking = async () => {
    try {
      setLoading(true);
      await EmployeeTrackingService.startTracking();
      setTrackingState(EmployeeTrackingService.getState());
    } catch (error: any) {
      console.error('[LiveTrackingScreen] Start tracking error:', error);
      Alert.alert(
        'Tracking Error',
        error?.message || 'Unable to start location tracking.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStopTracking = async () => {
    try {
      setLoading(true);
      await EmployeeTrackingService.stopTracking();
      setTrackingState(EmployeeTrackingService.getState());
    } catch (error: any) {
      console.error('[LiveTrackingScreen] Stop tracking error:', error);
      Alert.alert(
        'Tracking Error',
        error?.message || 'Unable to stop location tracking.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRoute = () => {
    if (!navigation) return;
    navigation.navigate('RouteMap');
  };

  const formatTimestamp = (timestamp: number | null) => {
    if (!timestamp) return '--';
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatCoordinate = (value: number | undefined) => {
    if (value === undefined || value === null) return '--';
    return value.toFixed(6);
  };

  const lastLocation = trackingState.lastLocation;

  const progress =
    trackingState.totalLocations > 0
      ? Math.min(trackingState.capturedCount / trackingState.totalLocations, 1)
      : 0;

  return (
    <View style={{flex:1, paddingTop:insets.top}}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.eyebrow}>LOCATION SERVICES</Text>
        <Text style={styles.title}>Live Tracking</Text>
        <Text style={styles.subtitle}>Employee location tracking</Text>
      </View>

      {/* Status Hero Card */}
      <View
        style={[
          styles.heroCard,
          trackingState.isTracking
            ? styles.heroCardActive
            : styles.heroCardInactive,
        ]}
      >
        <View style={styles.statusRow}>
          <View style={styles.statusDotWrap}>
            <View
              style={[
                styles.statusDot,
                trackingState.isTracking
                  ? styles.activeDot
                  : styles.inactiveDot,
              ]}
            />
            {trackingState.isTracking && (
              <View style={styles.statusDotPulse} />
            )}
          </View>

          <Text style={styles.statusText}>
            {trackingState.isTracking
              ? 'Tracking Active'
              : 'Tracking Inactive'}
          </Text>

          <View
            style={[
              styles.pill,
              trackingState.isTracking
                ? styles.pillActive
                : styles.pillInactive,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                trackingState.isTracking
                  ? styles.pillTextActive
                  : styles.pillTextInactive,
              ]}
            >
              {trackingState.isTracking ? 'LIVE' : 'IDLE'}
            </Text>
          </View>
        </View>

        <Text style={styles.statusDescription}>
          {trackingState.isTracking
            ? 'Your location is being tracked during working hours.'
            : 'Location tracking is currently stopped.'}
        </Text>
      </View>

      {/* Progress Card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Locations Captured</Text>
          <Text style={styles.progressPercent}>
            {Math.round(progress * 100)}%
          </Text>
        </View>

        <View style={styles.progressRow}>
          <Text style={styles.progressCount}>
            {trackingState.capturedCount}
          </Text>
          <Text style={styles.progressTotal}>
            / {trackingState.totalLocations}
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>

        <Text style={styles.progressText}>
          {trackingState.capturedCount} of {trackingState.totalLocations}{' '}
          locations captured
        </Text>
      </View>

      {/* Last Location */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Last Location</Text>

        {lastLocation ? (
          <View style={styles.locationGrid}>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>Latitude</Text>
              <Text style={styles.locationValue}>
                {formatCoordinate(lastLocation.latitude)}
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>Longitude</Text>
              <Text style={styles.locationValue}>
                {formatCoordinate(lastLocation.longitude)}
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>Accuracy</Text>
              <Text style={styles.locationValue}>
                {lastLocation.accuracy.toFixed(1)} m
              </Text>
            </View>

            <View style={[styles.locationRow, styles.locationRowLast]}>
              <Text style={styles.locationLabel}>Updated</Text>
              <Text style={styles.locationValue}>
                {formatTimestamp(lastLocation.timestamp)}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyLocation}>
            <Text style={styles.emptyText}>No location captured yet</Text>
          </View>
        )}
      </View>

      {/* Tracking Session */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tracking Session</Text>

        <View style={styles.locationGrid}>
          <View style={styles.locationRow}>
            <Text style={styles.locationLabel}>Started</Text>
            <Text style={styles.locationValue}>
              {formatTimestamp(trackingState.startTime)}
            </Text>
          </View>

          <View style={[styles.locationRow, styles.locationRowLast]}>
            <Text style={styles.locationLabel}>Status</Text>
            <Text
              style={[
                styles.locationValue,
                trackingState.isTracking
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {trackingState.isTracking ? 'ACTIVE' : 'STOPPED'}
            </Text>
          </View>
        </View>
      </View>

      {/* Start / Stop */}
      {!trackingState.isTracking ? (
        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabledButton]}
          onPress={handleStartTracking}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Starting…' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.stopButton, loading && styles.disabledButton]}
          onPress={handleStopTracking}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.stopButtonText}>
            {loading ? 'Stopping…' : 'Stop Tracking'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Route Map */}
      <TouchableOpacity
        style={styles.routeButton}
        onPress={handleOpenRoute}
        activeOpacity={0.85}
      >
        <Text style={styles.routeButtonText}>View Route Map</Text>
        <Text style={styles.routeButtonChevron}>›</Text>
      </TouchableOpacity>

      {/* Information */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Tracking Information</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBullet} />
          <Text style={styles.infoText}>Target locations: 20</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBullet} />
          <Text style={styles.infoText}>
            Locations are collected from GPS
          </Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBullet} />
          <Text style={styles.infoText}>
            Only valid GPS locations are counted
          </Text>
        </View>

        <View style={[styles.infoRow, styles.infoRowLast]}>
          <View style={styles.infoBullet} />
          <Text style={styles.infoText}>
            Tracking stops automatically after 20 locations
          </Text>
        </View>
      </View>
    </ScrollView>
    </View>
  );
}; 

export default AllQueries;

const GOLD = '#B08D57';
const MAROON = '#7A1F2B';
const INK = '#1A1A1E';
const SUBTLE = '#8A8A93';
const BORDER = '#EFEFF3';
const SUCCESS = '#1FA463';
const DANGER = '#C62828';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },

  contentContainer: {
    padding: 18,
    paddingBottom: 44,
  },

  header: {
    marginBottom: 22,
    marginTop: 6,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: INK,
    letterSpacing: -0.4,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: SUBTLE,
  },

  heroCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    backgroundColor: INK,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  heroCardActive: {
    backgroundColor: INK,
  },

  heroCardInactive: {
    backgroundColor: '#2B2B31',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDotWrap: {
    width: 12,
    height: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  statusDotPulse: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: SUCCESS,
    opacity: 0.35,
  },

  activeDot: {
    backgroundColor: SUCCESS,
  },

  inactiveDot: {
    backgroundColor: '#8A8A93',
  },

  statusText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  pillActive: {
    backgroundColor: 'rgba(31,164,99,0.18)',
  },

  pillInactive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  pillText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  pillTextActive: {
    color: SUCCESS,
  },

  pillTextInactive: {
    color: '#B7B7BE',
  },

  statusDescription: {
    marginTop: 12,
    fontSize: 13,
    lineHeight: 19,
    color: '#B7B7BE',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },

  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: INK,
    letterSpacing: -0.1,
  },

  progressPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: GOLD,
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  progressCount: {
    fontSize: 44,
    fontWeight: '800',
    color: MAROON,
    letterSpacing: -1,
  },

  progressTotal: {
    fontSize: 20,
    fontWeight: '600',
    color: SUBTLE,
    marginLeft: 6,
  },

  progressBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EEEEF1',
    overflow: 'hidden',
    marginTop: 14,
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: MAROON,
  },

  progressText: {
    marginTop: 10,
    fontSize: 12.5,
    color: SUBTLE,
  },

  locationGrid: {
    marginTop: -2,
  },

  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },

  locationRowLast: {
    borderBottomWidth: 0,
  },

  locationLabel: {
    fontSize: 13.5,
    color: SUBTLE,
    fontWeight: '500',
  },

  locationValue: {
    fontSize: 14,
    fontWeight: '700',
    color: INK,
    maxWidth: '60%',
  },

  activeText: {
    color: SUCCESS,
  },

  inactiveText: {
    color: '#9A9AA2',
  },

  emptyLocation: {
    paddingVertical: 18,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 13.5,
    color: '#B0B0B8',
  },

  primaryButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: MAROON,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: MAROON,
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  stopButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: DANGER,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  stopButtonText: {
    color: DANGER,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  disabledButton: {
    opacity: 0.55,
  },

  routeButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  routeButtonText: {
    color: INK,
    fontSize: 15.5,
    fontWeight: '700',
  },

  routeButtonChevron: {
    color: GOLD,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 6,
    marginTop: -2,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: SUBTLE,
    letterSpacing: 0.6,
    marginBottom: 12,
    textTransform: 'uppercase',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  infoRowLast: {
    marginBottom: 0,
  },

  infoBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: GOLD,
    marginTop: 7,
    marginRight: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 13.5,
    color: '#4A4A50',
    lineHeight: 20,
  },
});