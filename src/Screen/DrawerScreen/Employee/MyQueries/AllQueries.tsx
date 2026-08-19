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

interface Props {
  navigation?: any;
}

const AllQueries: React.FC<Props> = ({
  navigation,
}) => {
  const [trackingState, setTrackingState] =
    useState<TrackingState>(
      EmployeeTrackingService.getState(),
    );

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    /**
     * Subscribe to location/tracking updates.
     */
    const unsubscribe =
      EmployeeTrackingService.subscribe(
        (_location: EmployeeLocation, state: TrackingState) => {
          setTrackingState({
            ...state,
            locations: [...state.locations],
          });
        },
      );

    /**
     * Get latest state when screen opens.
     */
    setTrackingState(
      EmployeeTrackingService.getState(),
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleStartTracking = async () => {
    try {
      setLoading(true);

      await EmployeeTrackingService.startTracking();

      setTrackingState(
        EmployeeTrackingService.getState(),
      );
    } catch (error: any) {
      console.error(
        '[LiveTrackingScreen] Start tracking error:',
        error,
      );

      Alert.alert(
        'Tracking Error',
        error?.message ||
          'Unable to start location tracking.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStopTracking = async () => {
    try {
      setLoading(true);

      await EmployeeTrackingService.stopTracking();

      setTrackingState(
        EmployeeTrackingService.getState(),
      );
    } catch (error: any) {
      console.error(
        '[LiveTrackingScreen] Stop tracking error:',
        error,
      );

      Alert.alert(
        'Tracking Error',
        error?.message ||
          'Unable to stop location tracking.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRoute = () => {
    if (!navigation) {
      return;
    }

    navigation.navigate('RouteMap');
  };

  const formatTimestamp = (
    timestamp: number | null,
  ) => {
    if (!timestamp) {
      return '--';
    }

    return new Date(
      timestamp,
    ).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatCoordinate = (
    value: number | undefined,
  ) => {
    if (
      value === undefined ||
      value === null
    ) {
      return '--';
    }

    return value.toFixed(6);
  };

  const lastLocation =
    trackingState.lastLocation;

  const progress =
    trackingState.totalLocations > 0
      ? Math.min(
          trackingState.capturedCount /
            trackingState.totalLocations,
          1,
        )
      : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.contentContainer
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Live Tracking
        </Text>

        <Text style={styles.subtitle}>
          Employee location tracking
        </Text>
      </View>

      {/* Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              trackingState.isTracking
                ? styles.activeDot
                : styles.inactiveDot,
            ]}
          />

          <Text style={styles.statusText}>
            {trackingState.isTracking
              ? 'Tracking Active'
              : 'Tracking Inactive'}
          </Text>
        </View>

        <Text style={styles.statusDescription}>
          {trackingState.isTracking
            ? 'Your location is being tracked during working hours.'
            : 'Location tracking is currently stopped.'}
        </Text>
      </View>

      {/* Progress Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Locations Captured
        </Text>

        <View style={styles.progressRow}>
          <Text style={styles.progressCount}>
            {trackingState.capturedCount}
          </Text>

          <Text style={styles.progressTotal}>
            / {trackingState.totalLocations}
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {trackingState.capturedCount} of{' '}
          {trackingState.totalLocations}{' '}
          locations captured
        </Text>
      </View>

      {/* Last Location */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Last Location
        </Text>

        {lastLocation ? (
          <>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>
                Latitude
              </Text>

              <Text style={styles.locationValue}>
                {formatCoordinate(
                  lastLocation.latitude,
                )}
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>
                Longitude
              </Text>

              <Text style={styles.locationValue}>
                {formatCoordinate(
                  lastLocation.longitude,
                )}
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>
                Accuracy
              </Text>

              <Text style={styles.locationValue}>
                {lastLocation.accuracy.toFixed(
                  1,
                )}{' '}
                m
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>
                Updated
              </Text>

              <Text style={styles.locationValue}>
                {formatTimestamp(
                  lastLocation.timestamp,
                )}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.emptyLocation}>
            <Text style={styles.emptyText}>
              No location captured yet
            </Text>
          </View>
        )}
      </View>

      {/* Tracking Session */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Tracking Session
        </Text>

        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>
            Started
          </Text>

          <Text style={styles.locationValue}>
            {formatTimestamp(
              trackingState.startTime,
            )}
          </Text>
        </View>

        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>
            Status
          </Text>

          <Text
            style={[
              styles.locationValue,
              trackingState.isTracking
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            {trackingState.isTracking
              ? 'ACTIVE'
              : 'STOPPED'}
          </Text>
        </View>
      </View>

      {/* Start / Stop */}
      {!trackingState.isTracking ? (
        <TouchableOpacity
          style={[
            styles.primaryButton,
            loading &&
              styles.disabledButton,
          ]}
          onPress={handleStartTracking}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {loading
              ? 'Starting...'
              : 'Start Tracking'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.stopButton,
            loading &&
              styles.disabledButton,
          ]}
          onPress={handleStopTracking}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.stopButtonText}>
            {loading
              ? 'Stopping...'
              : 'Stop Tracking'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Route Map */}
      <TouchableOpacity
        style={styles.routeButton}
        onPress={handleOpenRoute}
        activeOpacity={0.8}
      >
        <Text style={styles.routeButtonText}>
          View Route Map
        </Text>
      </TouchableOpacity>

      {/* Information */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Tracking Information
        </Text>

        <Text style={styles.infoText}>
          • Target locations: 20
        </Text>

        <Text style={styles.infoText}>
          • Locations are collected from GPS
        </Text>

        <Text style={styles.infoText}>
          • Only valid GPS locations are counted
        </Text>

        <Text style={styles.infoText}>
          • Tracking stops automatically after
          20 locations
        </Text>
      </View>
    </ScrollView>
  );
};

export default AllQueries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222222',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#777777',
  },

  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  activeDot: {
    backgroundColor: '#1FA463',
  },

  inactiveDot: {
    backgroundColor: '#999999',
  },

  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },

  statusDescription: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: '#777777',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 15,
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  progressCount: {
    fontSize: 42,
    fontWeight: '800',
    color: '#7A1F2B',
  },

  progressTotal: {
    fontSize: 20,
    fontWeight: '600',
    color: '#777777',
    marginLeft: 5,
  },

  progressBackground: {
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
    overflow: 'hidden',
    marginTop: 12,
  },

  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#7A1F2B',
  },

  progressText: {
    marginTop: 10,
    fontSize: 13,
    color: '#777777',
  },

  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEEEEE',
  },

  locationLabel: {
    fontSize: 14,
    color: '#777777',
  },

  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    maxWidth: '60%',
  },

  activeText: {
    color: '#1FA463',
  },

  inactiveText: {
    color: '#888888',
  },

  emptyLocation: {
    paddingVertical: 15,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: '#999999',
  },

  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#7A1F2B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  stopButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C62828',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  stopButtonText: {
    color: '#C62828',
    fontSize: 16,
    fontWeight: '700',
  },

  disabledButton: {
    opacity: 0.6,
  },

  routeButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#EFEFF2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  routeButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '700',
  },

  infoCard: {
    backgroundColor: '#F0F1F4',
    borderRadius: 14,
    padding: 16,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 10,
  },

  infoText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 21,
  },
});