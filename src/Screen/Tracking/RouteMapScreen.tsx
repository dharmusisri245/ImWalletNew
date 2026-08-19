import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import EmployeeTrackingService, {
  EmployeeLocation,
} from '../../services/tracking/EmployeeTrackingService';

interface Props {
  navigation?: any;
}

const RouteMapScreen: React.FC<Props> = ({
  navigation,
}) => {
  const [locations, setLocations] =
    useState<EmployeeLocation[]>([]);

  const [selectedLocation, setSelectedLocation] =
    useState<EmployeeLocation | null>(null);

  useEffect(() => {
    // Load locations already captured.
    setLocations(
      EmployeeTrackingService.getLocations(),
    );

    // Listen for new locations.
    const unsubscribe =
      EmployeeTrackingService.subscribe(
        (_location, state) => {
          setLocations([
            ...state.locations,
          ]);
        },
      );

    return () => {
      unsubscribe();
    };
  }, []);

  const coordinates = locations.map(
    location => ({
      latitude: location.latitude,
      longitude: location.longitude,
    }),
  );

  const lastLocation =
    locations.length > 0
      ? locations[locations.length - 1]
      : null;

  const initialRegion = lastLocation
    ? {
        latitude: lastLocation.latitude,
        longitude: lastLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 28.6139,
        longitude: 77.2090,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  const formatTime = (
    timestamp: number,
  ) => {
    return new Date(
      timestamp,
    ).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatCoordinate = (
    value: number,
  ) => value.toFixed(6);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Employee Route
          </Text>

          <Text style={styles.subtitle}>
            {locations.length} / 20 locations
            captured
          </Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation?.goBack()
          }
        >
          <Text style={styles.backText}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
     {/* Map */}
<View style={styles.mapContainer}>
  <MapView
    style={styles.map}
    provider={PROVIDER_GOOGLE}
    mapType="standard"
    initialRegion={initialRegion}
    showsUserLocation={true}
    showsMyLocationButton={true}
    zoomControlEnabled={true}
    loadingEnabled={true}
    onMapReady={() => {
      console.log('✅ GOOGLE MAP READY');
    }}
    onMapLoaded={() => {
      console.log('✅ GOOGLE MAP LOADED');
    }}
  >
    {/* Employee route */}
    {coordinates.length >= 2 && (
      <Polyline
        coordinates={coordinates}
        strokeWidth={5}
        strokeColor="#7A1F2B"
        lineCap="round"
        lineJoin="round"
      />
    )}

    {/* Employee tracking points */}
    {locations.map((location, index) => (
      <Marker
        key={`${location.timestamp}-${index}`}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title={`Location ${index + 1}`}
        description={formatTime(location.timestamp)}
        onPress={() => setSelectedLocation(location)}
      >
        <View
          style={[
            styles.marker,
            index === locations.length - 1 && styles.lastMarker,
          ]}
        >
          <Text style={styles.markerText}>
            {index + 1}
          </Text>
        </View>
      </Marker>
    ))}
  </MapView>

  {/* Empty state */}
  {locations.length === 0 && (
    <View style={styles.emptyOverlay}>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>
          No Locations Yet
        </Text>

        <Text style={styles.emptyText}>
          Start employee tracking to see the route here.
        </Text>
      </View>
    </View>
  )}
</View>

      {/* Selected location */}
      {selectedLocation && (
        <View style={styles.selectedCard}>
          <View style={styles.selectedHeader}>
            <Text
              style={styles.selectedTitle}
            >
              Selected Location
            </Text>

            <TouchableOpacity
              onPress={() =>
                setSelectedLocation(null)
              }
            >
              <Text style={styles.closeText}>
                ×
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.detailText}>
            Latitude:{' '}
            {formatCoordinate(
              selectedLocation.latitude,
            )}
          </Text>

          <Text style={styles.detailText}>
            Longitude:{' '}
            {formatCoordinate(
              selectedLocation.longitude,
            )}
          </Text>

          <Text style={styles.detailText}>
            Accuracy:{' '}
            {selectedLocation.accuracy.toFixed(
              1,
            )}{' '}
            m
          </Text>

          <Text style={styles.detailText}>
            Time:{' '}
            {formatTime(
              selectedLocation.timestamp,
            )}
          </Text>
        </View>
      )}

      {/* Location list */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            Tracking Points
          </Text>

          <Text style={styles.listCount}>
            {locations.length}/20
          </Text>
        </View>

        <FlatList
          data={locations}
          keyExtractor={(
            item,
            index,
          ) =>
            `${item.timestamp}-${index}`
          }
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.listContent
          }
          renderItem={({
            item,
            index,
          }) => (
            <TouchableOpacity
              style={styles.locationCard}
              onPress={() =>
                setSelectedLocation(item)
              }
            >
              <View
                style={styles.locationNumber}
              >
                <Text
                  style={
                    styles.locationNumberText
                  }
                >
                  {index + 1}
                </Text>
              </View>

              <Text
                style={styles.locationTime}
              >
                {formatTime(
                  item.timestamp,
                )}
              </Text>

              <Text
                style={
                  styles.locationCoordinate
                }
              >
                {formatCoordinate(
                  item.latitude,
                )}
              </Text>

              <Text
                style={
                  styles.locationCoordinate
                }
              >
                {formatCoordinate(
                  item.longitude,
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default RouteMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222222',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#777777',
  },

  backButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#EFEFF2',
  },

  backText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },

  mapContainer: {
    flex: 1,
    minHeight: 400,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7A1F2B',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lastMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1FA463',
  },

  markerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  emptyOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },

  emptyCard: {
    width: '80%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 5,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },

  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    color: '#777777',
  },

  selectedCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 8,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  selectedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },

  closeText: {
    fontSize: 28,
    color: '#777777',
    lineHeight: 28,
  },

  detailText: {
    fontSize: 13,
    color: '#555555',
    marginTop: 5,
  },

  listContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
  },

  listHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },

  listCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7A1F2B',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  locationCard: {
    width: 125,
    marginRight: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F6F7F9',
  },

  locationNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#7A1F2B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  locationNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  locationTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },

  locationCoordinate: {
    fontSize: 10,
    color: '#777777',
    marginTop: 2,
  },
});