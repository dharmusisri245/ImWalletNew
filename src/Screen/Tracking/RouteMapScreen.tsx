// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';

// import MapView, {
//   Marker,
//   Polyline,
//   PROVIDER_GOOGLE,
// } from 'react-native-maps';

// import EmployeeTrackingService, {
//   EmployeeLocation,
// } from '../../services/tracking/EmployeeTrackingService';

// interface Props {
//   navigation?: any;
// }

// const RouteMapScreen: React.FC<Props> = ({
//   navigation,
// }) => {
//   const [locations, setLocations] =
//     useState<EmployeeLocation[]>([]);

//   const [selectedLocation, setSelectedLocation] =
//     useState<EmployeeLocation | null>(null);

//   useEffect(() => {
//     // Load locations already captured.
//     setLocations(
//       EmployeeTrackingService.getLocations(),
//     );

//     // Listen for new locations.
//     const unsubscribe =
//       EmployeeTrackingService.subscribe(
//         (_location, state) => {
//           setLocations([
//             ...state.locations,
//           ]);
//         },
//       );

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const coordinates = locations.map(
//     location => ({
//       latitude: location.latitude,
//       longitude: location.longitude,
//     }),
//   );

//   const lastLocation =
//     locations.length > 0
//       ? locations[locations.length - 1]
//       : null;

//   const initialRegion = lastLocation
//     ? {
//         latitude: lastLocation.latitude,
//         longitude: lastLocation.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       }
//     : {
//         latitude: 28.6139,
//         longitude: 77.2090,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       };

//   const formatTime = (
//     timestamp: number,
//   ) => {
//     return new Date(
//       timestamp,
//     ).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//     });
//   };

//   const formatCoordinate = (
//     value: number,
//   ) => value.toFixed(6);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>
//             Employee Route
//           </Text>

//           <Text style={styles.subtitle}>
//             {locations.length} / 20 locations
//             captured
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() =>
//             navigation?.goBack()
//           }
//         >
//           <Text style={styles.backText}>
//             Back
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Map */}
//      {/* Map */}
// <View style={styles.mapContainer}>
//   <MapView
//     style={styles.map}
//     provider={PROVIDER_GOOGLE}
//     mapType="standard"
//     initialRegion={initialRegion}
//     showsUserLocation={true}
//     showsMyLocationButton={true}
//     zoomControlEnabled={true}
//     loadingEnabled={true}
//     onMapReady={() => {
//       console.log('✅ GOOGLE MAP READY');
//     }}
//     onMapLoaded={() => {
//       console.log('✅ GOOGLE MAP LOADED');
//     }}
//   >
//     {/* Employee route */}
//     {coordinates.length >= 2 && (
//       <Polyline
//         coordinates={coordinates}
//         strokeWidth={5}
//         strokeColor="#7A1F2B"
//         lineCap="round"
//         lineJoin="round"
//       />
//     )}

//     {/* Employee tracking points */}
//     {locations.map((location, index) => (
//       <Marker
//         key={`${location.timestamp}-${index}`}
//         coordinate={{
//           latitude: location.latitude,
//           longitude: location.longitude,
//         }}
//         title={`Location ${index + 1}`}
//         description={formatTime(location.timestamp)}
//         onPress={() => setSelectedLocation(location)}
//       >
//         <View
//           style={[
//             styles.marker,
//             index === locations.length - 1 && styles.lastMarker,
//           ]}
//         >
//           <Text style={styles.markerText}>
//             {index + 1}
//           </Text>
//         </View>
//       </Marker>
//     ))}
//   </MapView>

//   {/* Empty state */}
//   {locations.length === 0 && (
//     <View style={styles.emptyOverlay}>
//       <View style={styles.emptyCard}>
//         <Text style={styles.emptyTitle}>
//           No Locations Yet
//         </Text>

//         <Text style={styles.emptyText}>
//           Start employee tracking to see the route here.
//         </Text>
//       </View>
//     </View>
//   )}
// </View>

//       {/* Selected location */}
//       {selectedLocation && (
//         <View style={styles.selectedCard}>
//           <View style={styles.selectedHeader}>
//             <Text
//               style={styles.selectedTitle}
//             >
//               Selected Location
//             </Text>

//             <TouchableOpacity
//               onPress={() =>
//                 setSelectedLocation(null)
//               }
//             >
//               <Text style={styles.closeText}>
//                 ×
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.detailText}>
//             Latitude:{' '}
//             {formatCoordinate(
//               selectedLocation.latitude,
//             )}
//           </Text>

//           <Text style={styles.detailText}>
//             Longitude:{' '}
//             {formatCoordinate(
//               selectedLocation.longitude,
//             )}
//           </Text>

//           <Text style={styles.detailText}>
//             Accuracy:{' '}
//             {selectedLocation.accuracy.toFixed(
//               1,
//             )}{' '}
//             m
//           </Text>

//           <Text style={styles.detailText}>
//             Time:{' '}
//             {formatTime(
//               selectedLocation.timestamp,
//             )}
//           </Text>
//         </View>
//       )}

//       {/* Location list */}
//       <View style={styles.listContainer}>
//         <View style={styles.listHeader}>
//           <Text style={styles.listTitle}>
//             Tracking Points
//           </Text>

//           <Text style={styles.listCount}>
//             {locations.length}/20
//           </Text>
//         </View>

//         <FlatList
//           data={locations}
//           keyExtractor={(
//             item,
//             index,
//           ) =>
//             `${item.timestamp}-${index}`
//           }
//           horizontal
//           showsHorizontalScrollIndicator={
//             false
//           }
//           contentContainerStyle={
//             styles.listContent
//           }
//           renderItem={({
//             item,
//             index,
//           }) => (
//             <TouchableOpacity
//               style={styles.locationCard}
//               onPress={() =>
//                 setSelectedLocation(item)
//               }
//             >
//               <View
//                 style={styles.locationNumber}
//               >
//                 <Text
//                   style={
//                     styles.locationNumberText
//                   }
//                 >
//                   {index + 1}
//                 </Text>
//               </View>

//               <Text
//                 style={styles.locationTime}
//               >
//                 {formatTime(
//                   item.timestamp,
//                 )}
//               </Text>

//               <Text
//                 style={
//                   styles.locationCoordinate
//                 }
//               >
//                 {formatCoordinate(
//                   item.latitude,
//                 )}
//               </Text>

//               <Text
//                 style={
//                   styles.locationCoordinate
//                 }
//               >
//                 {formatCoordinate(
//                   item.longitude,
//                 )}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// export default RouteMapScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F7F9',
//   },

//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 12,
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#222222',
//   },

//   subtitle: {
//     marginTop: 4,
//     fontSize: 13,
//     color: '#777777',
//   },

//   backButton: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 10,
//     backgroundColor: '#EFEFF2',
//   },

//   backText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#333333',
//   },

//   mapContainer: {
//     flex: 1,
//     minHeight: 400,
//   },

//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },

//   marker: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#7A1F2B',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   lastMarker: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#1FA463',
//   },

//   markerText: {
//     color: '#FFFFFF',
//     fontSize: 11,
//     fontWeight: '700',
//   },

//   emptyOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: 'center',
//     justifyContent: 'center',
//     pointerEvents: 'none',
//   },

//   emptyCard: {
//     width: '80%',
//     padding: 20,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     elevation: 5,
//   },

//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#222222',
//   },

//   emptyText: {
//     marginTop: 8,
//     textAlign: 'center',
//     fontSize: 13,
//     lineHeight: 20,
//     color: '#777777',
//   },

//   selectedCard: {
//     position: 'absolute',
//     left: 16,
//     right: 16,
//     top: 100,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 16,
//     elevation: 8,
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//   },

//   selectedHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },

//   selectedTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#222222',
//   },

//   closeText: {
//     fontSize: 28,
//     color: '#777777',
//     lineHeight: 28,
//   },

//   detailText: {
//     fontSize: 13,
//     color: '#555555',
//     marginTop: 5,
//   },

//   listContainer: {
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 12,
//   },

//   listHeader: {
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   listTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#222222',
//   },

//   listCount: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#7A1F2B',
//   },

//   listContent: {
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },

//   locationCard: {
//     width: 125,
//     marginRight: 10,
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: '#F6F7F9',
//   },

//   locationNumber: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: '#7A1F2B',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//   },

//   locationNumberText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   locationTime: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#333333',
//     marginBottom: 5,
//   },

//   locationCoordinate: {
//     fontSize: 10,
//     color: '#777777',
//     marginTop: 2,
//   },
// });







import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert,
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

const RouteMapScreen: React.FC<Props> = ({ navigation }) => {
  const [locations, setLocations] = useState<EmployeeLocation[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<EmployeeLocation | null>(null);

  useEffect(() => {
    setLocations(EmployeeTrackingService.getLocations());

    const unsubscribe = EmployeeTrackingService.subscribe(
      (_location, state) => {
        setLocations([...state.locations]);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const coordinates = locations.map(location => ({
    latitude: location.latitude,
    longitude: location.longitude,
  }));

  const lastLocation =
    locations.length > 0 ? locations[locations.length - 1] : null;

  const initialRegion = lastLocation
    ? {
        latitude: lastLocation.latitude,
        longitude: lastLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 28.6139,
        longitude: 77.209,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatCoordinate = (value: number) => value.toFixed(6);

  /**
   * Opens the full captured route as an actual navigable route in the
   * Google Maps app (origin -> waypoints -> destination), instead of
   * just showing individual points on the embedded map.
   */
  const handleOpenInGoogleMaps = () => {
    if (locations.length === 0) {
      Alert.alert(
        'No Route Yet',
        'Start tracking to capture locations before opening the route.',
      );
      return;
    }

    const origin = locations[0];
    const destination = locations[locations.length - 1];
    const waypointLocations = locations.slice(1, -1);

    const originParam = `${origin.latitude},${origin.longitude}`;
    const destinationParam = `${destination.latitude},${destination.longitude}`;

    let url =
      `https://www.google.com/maps/dir/?api=1` +
      `&origin=${originParam}` +
      `&destination=${destinationParam}` +
      `&travelmode=driving`;

    if (waypointLocations.length > 0) {
      // Google Maps supports up to 23 intermediate waypoints.
      const waypointsParam = waypointLocations
        .slice(0, 23)
        .map(location => `${location.latitude},${location.longitude}`)
        .join('|');

      url += `&waypoints=${encodeURIComponent(waypointsParam)}`;
    }

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'Google Maps is not available on this device.');
          return;
        }
        return Linking.openURL(url);
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to open the route in Google Maps.');
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerTextWrap}>
          <Text style={styles.eyebrow}>ROUTE OVERVIEW</Text>
          <Text style={styles.title}>Employee Route</Text>
        </View>

        <View style={styles.countPill}>
          <Text style={styles.countPillText}>{locations.length}/20</Text>
        </View>
      </View>

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
          {coordinates.length >= 2 && (
            <Polyline
              coordinates={coordinates}
              strokeWidth={5}
              strokeColor="#7A1F2B"
              lineCap="round"
              lineJoin="round"
            />
          )}

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
                <Text style={styles.markerText}>{index + 1}</Text>
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Open in Google Maps action */}
        <TouchableOpacity
          style={styles.openMapsButton}
          onPress={handleOpenInGoogleMaps}
          activeOpacity={0.9}
        >
          <View style={styles.openMapsIcon}>
            <Text style={styles.openMapsIconText}>➤</Text>
          </View>
          <Text style={styles.openMapsText}>Open Route in Google Maps</Text>
        </TouchableOpacity>

        {/* Empty state */}
        {locations.length === 0 && (
          <View style={styles.emptyOverlay}>
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No Locations Yet</Text>
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
            <Text style={styles.selectedTitle}>Selected Location</Text>

            <TouchableOpacity onPress={() => setSelectedLocation(null)}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Latitude</Text>
            <Text style={styles.detailValue}>
              {formatCoordinate(selectedLocation.latitude)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Longitude</Text>
            <Text style={styles.detailValue}>
              {formatCoordinate(selectedLocation.longitude)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Accuracy</Text>
            <Text style={styles.detailValue}>
              {selectedLocation.accuracy.toFixed(1)} m
            </Text>
          </View>

          <View style={[styles.detailRow, styles.detailRowLast]}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>
              {formatTime(selectedLocation.timestamp)}
            </Text>
          </View>
        </View>
      )}

      {/* Location list */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Tracking Points</Text>
          <Text style={styles.listCount}>{locations.length}/20</Text>
        </View>

        <FlatList
          data={locations}
          keyExtractor={(item, index) => `${item.timestamp}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.locationCard}
              onPress={() => setSelectedLocation(item)}
              activeOpacity={0.85}
            >
              <View style={styles.locationNumber}>
                <Text style={styles.locationNumberText}>{index + 1}</Text>
              </View>

              <Text style={styles.locationTime}>
                {formatTime(item.timestamp)}
              </Text>

              <Text style={styles.locationCoordinate}>
                {formatCoordinate(item.latitude)}
              </Text>

              <Text style={styles.locationCoordinate}>
                {formatCoordinate(item.longitude)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default RouteMapScreen;

const GOLD = '#B08D57';
const MAROON = '#7A1F2B';
const INK = '#1A1A1E';
const SUBTLE = '#8A8A93';
const BORDER = '#EFEFF3';
const SUCCESS = '#1FA463';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  backText: {
    fontSize: 22,
    fontWeight: '700',
    color: INK,
    marginTop: -2,
  },

  headerTextWrap: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 1.3,
    marginBottom: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: INK,
    letterSpacing: -0.3,
  },

  countPill: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F1E9DD',
  },

  countPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: GOLD,
  },

  mapContainer: {
    flex: 1,
    minHeight: 380,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: MAROON,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lastMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SUCCESS,
  },

  markerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  openMapsButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 52,
    borderRadius: 16,
    backgroundColor: INK,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 6,
  },

  openMapsIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  openMapsIconText: {
    color: INK,
    fontSize: 11,
    fontWeight: '800',
  },

  openMapsText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
  },

  emptyOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },

  emptyCard: {
    width: '80%',
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: INK,
  },

  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    color: SUBTLE,
  },

  selectedCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  selectedTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: INK,
  },

  closeText: {
    fontSize: 26,
    color: SUBTLE,
    lineHeight: 26,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },

  detailRowLast: {
    borderBottomWidth: 0,
  },

  detailLabel: {
    fontSize: 13,
    color: SUBTLE,
    fontWeight: '500',
  },

  detailValue: {
    fontSize: 13.5,
    fontWeight: '700',
    color: INK,
  },

  listContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },

  listHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  listTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: INK,
  },

  listCount: {
    fontSize: 12.5,
    fontWeight: '700',
    color: MAROON,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  locationCard: {
    width: 128,
    marginRight: 10,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#F7F7FA',
    borderWidth: 1,
    borderColor: BORDER,
  },

  locationNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: MAROON,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  locationNumberText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  locationTime: {
    fontSize: 12,
    fontWeight: '700',
    color: INK,
    marginBottom: 5,
  },

  locationCoordinate: {
    fontSize: 10,
    color: SUBTLE,
    marginTop: 2,
  },
});