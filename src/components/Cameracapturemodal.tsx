import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  PhotoFile,
} from 'react-native-vision-camera';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import LocationService, { OFFICE_LABEL } from '../services/LocationService';

export interface CaptureResult {
  photo: PhotoFile;
  latitude: number;
  longitude: number;
  distanceKm: number;
  address: string;
}

interface Props {
  visible: boolean;
  mode: 'check-in' | 'check-out';
  onClose: () => void;
  onCaptured: (result: CaptureResult) => void;
}

const MAROON = '#7A2020';

const CameraCaptureModal: React.FC<Props> = ({ visible, mode, onClose, onCaptured }) => {
  const camera = useRef<Camera>(null);
  const { hasPermission } = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
  const device = useCameraDevice(cameraPosition);

  const [locating, setLocating] = useState(true);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [address, setAddress] = useState<string>('Fetching location...');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const [capturing, setCapturing] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [pendingPhoto, setPendingPhoto] = useState<PhotoFile | null>(null);

  const loadLocation = useCallback(async () => {
    setLocating(true);
    try {
      const position = await LocationService.getLatLng();
      const dist = LocationService.getDistanceFromOffice(position);
      const addr = await LocationService.reverseGeocode(position);

      setCoords({ latitude: position.latitude, longitude: position.longitude });
      setDistanceKm(dist);
      setAddress(addr.shortAddress);
    } catch (error) {
      setAddress('Unable to fetch location');
    } finally {
      setLocating(false);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      setPreviewUri(null);
      setPendingPhoto(null);
      loadLocation();
    }
  }, [visible, loadLocation]);

  const handleCapture = async () => {
    if (!camera.current || capturing) return;
    setCapturing(true);
    try {
      const photo = await camera.current.takePhoto({ flash: 'off' });
      setPendingPhoto(photo);
      setPreviewUri(`file://${photo.path}`);
    } catch (error) {
      console.log('Capture error:', error);
    } finally {
      setCapturing(false);
    }
  };

  const handleConfirm = () => {
    if (!pendingPhoto || !coords || distanceKm === null) return;
    onCaptured({
      photo: pendingPhoto,
      latitude: coords.latitude,
      longitude: coords.longitude,
      distanceKm,
      address,
    });
  };

  const handleRetake = () => {
    setPreviewUri(null);
    setPendingPhoto(null);
  };

  if (!hasPermission || !device) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={MAROON} />
          <Text style={styles.infoText}>Waiting for camera access...</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeFallback}>
            <Text style={styles.closeFallbackText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Camera</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialDesignIcons name="close" size={26} color="#111827" />
          </TouchableOpacity>
        </View>

        <View style={styles.previewArea}>
          {previewUri ? (
            <Image source={{ uri: previewUri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          ) : (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={visible}
              photo={true}
            />
          )}

          {!previewUri && (
            <View style={styles.locationBadge}>
              <View style={styles.mapIconWrap}>
                <MaterialDesignIcons name="map-marker-radius" size={22} color="#4285F4" />
              </View>
              <View style={styles.locationTextWrap}>
                {locating ? (
                  <Text style={styles.distanceText}>Fetching location...</Text>
                ) : (
                  <>
                    <Text style={styles.distanceText}>
                      Approx <Text style={styles.distanceBold}>{distanceKm?.toFixed(2)} km</Text> from{' '}
                      {OFFICE_LABEL}
                    </Text>
                    <Text style={styles.addressText} numberOfLines={2}>
                      {address}
                    </Text>
                  </>
                )}
              </View>
            </View>
          )}
        </View>

        <View style={styles.controlBar}>
          {previewUri ? (
            <>
              <TouchableOpacity style={styles.secondaryBtn} onPress={handleRetake}>
                <Text style={styles.secondaryBtnText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.primaryBtn, locating && styles.disabledBtn]}
                onPress={handleConfirm}
                disabled={locating}
              >
                <Text style={styles.primaryBtnText}>
                  Confirm {mode === 'check-in' ? 'Check-In' : 'Check-Out'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.controlSpacer} />
              <TouchableOpacity style={styles.shutterButton} onPress={handleCapture} disabled={capturing}>
                {capturing ? <ActivityIndicator color="#fff" /> : <View style={styles.shutterInner} />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={() => setCameraPosition((p) => (p === 'front' ? 'back' : 'front'))}
              >
                <MaterialDesignIcons name="camera-flip-outline" size={26} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 24 },
  infoText: { marginTop: 12, color: '#374151' },
  closeFallback: { marginTop: 20, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: MAROON, borderRadius: 8 },
  closeFallbackText: { color: '#fff', fontWeight: '600' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  previewArea: { flex: 1, backgroundColor: '#000' },
  locationBadge: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 14,
    padding: 12,
  },
  mapIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationTextWrap: { flex: 1 },
  distanceText: { fontSize: 13, color: '#1F2937' },
  distanceBold: { fontWeight: '700' },
  addressText: { fontSize: 12, color: '#4B5563', marginTop: 2 },
  controlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 22,
    backgroundColor: '#000',
  },
  controlSpacer: { width: 50 },
  shutterButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#fff' },
  flipButton: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
  secondaryBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  secondaryBtnText: { color: '#fff', fontWeight: '600' },
  primaryBtn: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 10, backgroundColor: MAROON },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  disabledBtn: { opacity: 0.5 },
});

export default CameraCaptureModal;