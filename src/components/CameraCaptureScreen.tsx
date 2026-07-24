// PAGE ATTENDENCE SCREEN CODE ==========================================WITHOUT FLASHLIGHT ==========================================

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import LinearGradient from 'react-native-linear-gradient';

import {
  Camera,
  useCameraDevice,
  usePhotoOutput,
  type PhotoFile,
} from 'react-native-vision-camera';

import LocationService from '../services/LocationService';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type AttendanceMode = 'check-in' | 'check-out';
export type EmployeeType = 'office' | 'field';
export type FlashMode = 'off' | 'on' | 'auto';

export interface CaptureResult {
  photoUri: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  address: string;
  distanceFromOfficeMeters?: number;
  insideOfficeRadius?: boolean;
  employeeId: string;
  employeeName: string;
}

interface OfficeConfig {
  name: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
}

interface CameraCaptureScreenProps {
  visible: boolean;
  mode: AttendanceMode;
  employeeName: string;
  employeeId: string;
  employeeType: EmployeeType;
  office?: OfficeConfig; // required for office employees
  onClose: () => void;
  onCaptured: (result: CaptureResult) => void | Promise<void>;
  // TODO(RTK): once wired to RTK Query, `onCaptured` can be replaced with a
  // `useCheckInMutation()` / `useCheckOutMutation()` trigger passed down from
  // the parent screen — the payload shape (CaptureResult) is already what
  // the mutation body should look like, so no changes needed here.
}

/* ------------------------------------------------------------------ */
/*  Brand / theme                                                      */
/* ------------------------------------------------------------------ */

const BRAND = '#4338CA'; // ImWallet indigo
const GREEN = '#16A34A';
const RED = '#EF4444';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function haversineMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatKm(meters: number): string {
  return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(2)} km`;
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function flashIconFor(mode: FlashMode): string {
  if (mode === 'on') return 'flash';
  if (mode === 'auto') return 'flash-auto';
  return 'flash-off';
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/* ------------------------------------------------------------------ */
/*  Component — full page, no Modal wrapper                            */
/* ------------------------------------------------------------------ */

const CameraCaptureScreen = ({
  visible,
  mode,
  employeeName,
  employeeId,
  employeeType,
  office,
  onClose,
  onCaptured,
}: CameraCaptureScreenProps) => {
  const camera = useRef<Camera>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [flash, setFlash] = useState<FlashMode>('off');
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
  const device = useCameraDevice(cameraPosition);
  const photoOutput = usePhotoOutput();

  console.log("Camera output after take photo", photoOutput);

  // A physical flash unit is (almost) never present on the front camera, so
  // for selfies we simulate it with a full-white screen flash instead.
  const hasPhysicalFlash = cameraPosition === 'back' && !!device?.hasFlash;

  const [now, setNow] = useState(new Date());
  const [gpsLoading, setGpsLoading] = useState(true);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');

  const [capturedPhoto, setCapturedPhoto] = useState<PhotoFile | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const successScale = useRef(new Animated.Value(0)).current;
  const screenFlashOpacity = useRef(new Animated.Value(0)).current;
  const shutterScale = useRef(new Animated.Value(1)).current;

  /* ---------------- Clock tick ---------------- */
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, [visible]);



  useEffect(() => {
    console.log(device?.hasTorch);
    console.log("=========== Capture ===========");
    console.log("Camera Position:", cameraPosition);
    console.log("Has Flash:", hasPhysicalFlash);
    console.log("Flash State:", flash);
    console.log("Device Flash:", device?.hasFlash);
    console.log("===============================");
    console.log("Camera device changed:", device);
    console.log("Device ID:", device?.id);
    console.log("Device Position:", device?.position);
    console.log("Device has Flash:", device?.hasFlash);
    console.log("Device Type:", device?.type);
    console.log(" physical Device Name:", device?.physicalDevices);
  }, [device, cameraPosition]);


  /* ---------------- Fetch GPS on open ---------------- */
  const fetchLocation = useCallback(async () => {
    try {
      setGpsLoading(true);
      setGpsError(null);

      const location = await LocationService.getLatLng();
      setCoords({ lat: location.latitude, lng: location.longitude });

      const addr = await LocationService.reverseGeocode({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      setAddress(addr.displayName);
    } catch (error: any) {
      setGpsError(error.message || 'Unable to fetch location');
    } finally {
      setGpsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      setCapturedPhoto(null);
      setShowSuccess(false);
      fetchLocation();
    }
  }, [visible, fetchLocation]);

  /* ---------------- Derived geofencing ---------------- */
  const distanceMeters = useMemo(() => {
    if (!coords || !office) return undefined;
    return haversineMeters(coords.lat, coords.lng, office.latitude, office.longitude);
  }, [coords, office]);

  const insideRadius = useMemo(() => {
    if (distanceMeters === undefined || !office) return undefined;
    return distanceMeters <= office.radiusMeters;
  }, [distanceMeters, office]);

  /* ---------------- Actions ---------------- */
  const triggerScreenFlash = () =>
    new Promise<void>(resolve => {
      Animated.sequence([
        Animated.timing(screenFlashOpacity, { toValue: 1, duration: 80, useNativeDriver: true }),
        Animated.timing(screenFlashOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      ]).start(() => resolve());
    });



  const handleCapture = async () => {
    if (isCapturing) {
      console.log("Already capturing...");
      return;
    }

    setIsCapturing(true);

    try {
      const needsSimulatedFlash =
        cameraPosition === "front" && flash !== "off";

      if (needsSimulatedFlash) {
        await triggerScreenFlash();
      }



      console.log("Flash Mode:", flash);
      console.log("Has Physical Flash:", hasPhysicalFlash);

      const options = {
        flashMode: hasPhysicalFlash ? flash : "off",
        enableShutterSound: true,
      };

      console.log("Capture Options:", options);

      // const photo = await photoOutput.capturePhoto(options, {});

      const photo = await photoOutput.capturePhoto(
        {
          flashMode: hasPhysicalFlash ? flash : "off",
          enableShutterSound: true,
        },
        {}
      );




      const filePath = await photo.saveToTemporaryFileAsync();
      console.log("Saved Path:", filePath);
      console.log("Name:", photo.name);
      console.log("Width:", photo.width);
      console.log("Height:", photo.height);
      console.log("Orientation:", photo.orientation);
      console.log("Container:", photo.containerFormat);
      console.log("Timestamp:", photo.timestamp);

      setCapturedPhoto({
        path: filePath,
        width: photo.width,
        height: photo.height,
        orientation: photo.orientation,
        isMirrored: photo.isMirrored,
      });

      photo.dispose();
    } catch (e) {
      console.log("Capture Error:", e);
      setGpsError("Could not capture photo. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleRetake = () => setCapturedPhoto(null);

  const handleConfirm = async () => {
    if (!capturedPhoto || !coords) return;
    setSubmitting(true);
    try {
      const result: CaptureResult = {
        photoUri: Platform.OS === 'android' ? `file://${capturedPhoto.path}` : capturedPhoto.path,
        timestamp: now.toISOString(),
        latitude: coords.lat,
        longitude: coords.lng,
        address,
        distanceFromOfficeMeters: distanceMeters,
        insideOfficeRadius: insideRadius,
        employeeId,
        employeeName,
      };

      // TODO(RTK): swap this for e.g.
      //   await checkInMutation(result).unwrap();
      // once the endpoint is wired up. `onCaptured` stays as the escape
      // hatch for optimistic UI / toast handling in the parent.
      await onCaptured(result);

      setShowSuccess(true);
      Animated.spring(successScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          successScale.setValue(0);
          setShowSuccess(false);
          onClose();
        }, 1200);
      });
    } finally {
      setSubmitting(false);
    }
  };


 

  if (!visible) return null;

  /* ------------------------------------------------------------------ */
  /*  Device fallback                                                     */
  /* ------------------------------------------------------------------ */

  if (!device) {
    return (
      <View style={[styles.root, styles.centerFallback]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <ActivityIndicator color="#fff" size="large" />
        <Text style={styles.fallbackSubtitle}>Starting camera…</Text>
      </View>
    );
  }

  /* ------------------------------------------------------------------ */
  /*  Main render — this is a full page, not a Modal                     */
  /* ------------------------------------------------------------------ */

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* ---------------- Camera / captured preview (full screen) ---------------- */}
      {!capturedPhoto ? (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={visible}
          outputs={[photoOutput]}
        />
      ) : (
        <Animated.Image
          source={{
            uri: Platform.OS === 'android' ? `file://${capturedPhoto.path}` : capturedPhoto.path,
          }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      )}

      {/* Front camera / no-hardware-flash simulated screen flash */}
      <Animated.View
        pointerEvents="none"
        style={[styles.screenFlash, { opacity: screenFlashOpacity }]}
      />

      {/* ---------------- Top gradient + brand/header bar ---------------- */}
      <LinearGradient
        colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0)']}
        style={styles.topGradient}
        pointerEvents="box-none">
        <View style={styles.brandRow}>
          <View style={styles.brandLeft}>
            <View style={styles.brandLogoWrap}>
              <MaterialDesignIcons name="wallet-outline" size={24} color={BRAND} />
            </View>
            <Text style={styles.brandText}>ImWallet</Text>
          </View>
          <View style={styles.modePill}>
            <MaterialDesignIcons
              name={mode === 'check-in' ? 'login' : 'logout'}
              size={12}
              color="#fff"
            />
            <Text style={styles.modePillText}>
              {mode === 'check-in' ? 'Check-In' : 'Check-Out'}
            </Text>
          </View>
        </View>

        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topIconBtn} onPress={onClose} activeOpacity={0.8}>
            <MaterialDesignIcons name="close" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.topCenter}>
            <Text style={styles.topDate}>{formatDate(now)}</Text>
            <Text style={styles.topTime}>{formatTime(now)}</Text>
          </View>

          {!capturedPhoto ? (
            <View style={styles.topRightGroup}>
              <TouchableOpacity
                style={[styles.topIconBtn, flash !== 'off' && styles.topIconBtnActive]}
                activeOpacity={0.8}
                onPress={() =>
                  setFlash(f => (f === 'off' ? 'on' : f === 'on' ? 'auto' : 'off'))
                }>
                <MaterialDesignIcons name={flashIconFor(flash)} size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.topIconBtn, { marginLeft: 10 }]}
                activeOpacity={0.8}
                onPress={() => setCameraPosition(p => (p === 'front' ? 'back' : 'front'))}>
                <MaterialDesignIcons name="camera-flip-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ width: 38 }} />
          )}
        </View>

        {!capturedPhoto && (
          <View style={styles.cameraBadge}>
            <MaterialDesignIcons
              name={cameraPosition === 'front' ? 'account-box-outline' : 'image-filter-hdr'}
              size={12}
              color="#fff"
            />
            <Text style={styles.cameraBadgeText}>
              {cameraPosition === 'front' ? 'Front camera' : 'Back camera'}
            </Text>
          </View>
        )}
      </LinearGradient>

      {/* ---------------- Bottom gradient ---------------- */}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      {/* ---------------- Employee + location card ---------------- */}
      <View style={styles.locationBadge}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>{initialsOf(employeeName)}</Text>
        </View>

        <View style={styles.locationTextWrap}>
          <View style={styles.employeeRow}>
            <Text style={styles.employeeName} numberOfLines={1}>
              {employeeName}
            </Text>
            <View style={styles.codeChip}>
              <Text style={styles.codeChipText}>#{employeeId}</Text>
            </View>
          </View>
          <Text style={styles.employeeSub}>
            {employeeType === 'office' ? 'Office Employee' : 'Field Employee'}
          </Text>

          <View style={styles.divider} />

          {gpsLoading ? (
            <View style={styles.locationRow}>
              <ActivityIndicator color="#CBD5E1" size="small" />
              <Text style={styles.locationLine1}>Fetching location…</Text>
            </View>
          ) : gpsError ? (
            <View style={styles.locationRow}>
              <MaterialDesignIcons name="alert-circle-outline" size={14} color={RED} />
              <Text style={[styles.locationLine1, { color: RED }]} numberOfLines={2}>
                {gpsError}
              </Text>
            </View>
          ) : (
            <>
              {distanceMeters !== undefined && office && (
                <View style={styles.locationRow}>
                  <MaterialDesignIcons
                    name={insideRadius ? 'map-marker-check' : 'map-marker-alert'}
                    size={14}
                    color={insideRadius ? GREEN : '#F59E0B'}
                  />
                  <Text style={styles.locationLine1} numberOfLines={1}>
                    <Text style={styles.locationBold}>{formatKm(distanceMeters)}</Text> from{' '}
                    {office.name}
                  </Text>
                </View>
              )}
              <View style={styles.locationRow}>
                <MaterialDesignIcons name="map-marker-outline" size={14} color="#CBD5E1" />
                <Text style={styles.locationLine2} numberOfLines={2}>
                  {address}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      {/* ---------------- Bottom controls ---------------- */}
      {!capturedPhoto ? (
        <View style={styles.bottomBar}>
          <View style={styles.flipBtnWrap}>
            <TouchableOpacity
              style={styles.flipBtn}
              onPress={() => setCameraPosition(p => (p === 'front' ? 'back' : 'front'))}
              activeOpacity={0.8}>
              <MaterialDesignIcons name="camera-flip-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.flipBtnLabel}>
              {cameraPosition === 'front' ? 'Back' : 'Front'}
            </Text>
          </View>

          <Animated.View style={{ transform: [{ scale: shutterScale }] }}>
            <TouchableOpacity
              style={[styles.shutterBtn, (gpsLoading || !!gpsError) && styles.shutterBtnDisabled]}
              onPress={handleCapture}
              disabled={isCapturing || gpsLoading || !!gpsError}
              activeOpacity={0.85}>
              <View style={styles.shutterInner} />
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.flipBtnWrap}>
            <View style={styles.flipBtn}>
              <MaterialDesignIcons
                name={flashIconFor(flash)}
                size={18}
                color={flash !== 'off' ? '#FBBF24' : '#fff'}
              />
            </View>
            <Text style={styles.flipBtnLabel}>
              {flash === 'off' ? 'Flash off' : flash === 'on' ? 'Flash on' : 'Flash auto'}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.confirmBar}>
          <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake} activeOpacity={0.8}>
            <MaterialDesignIcons name="camera-retake-outline" size={18} color="#fff" />
            <Text style={styles.retakeBtnText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirm}
            disabled={submitting}
            activeOpacity={0.85}>
            {submitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <MaterialDesignIcons name="check" size={18} color="#fff" />
                <Text style={styles.confirmBtnText}>
                  {mode === 'check-in' ? 'Confirm Check-In' : 'Confirm Check-Out'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* ---------------- Success overlay ---------------- */}
      {showSuccess && (
        <View style={styles.successOverlay} pointerEvents="none">
          <Animated.View style={[styles.successCircle, { transform: [{ scale: successScale }] }]}>
            <MaterialDesignIcons name="check-bold" size={44} color="#fff" />
          </Animated.View>
          <Text style={styles.successText}>
            {mode === 'check-in' ? 'Checked In Successfully' : 'Checked Out Successfully'}
          </Text>
          <Text style={styles.successSubText}>
            {employeeName} · #{employeeId}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CameraCaptureScreen;

/* ------------------------------------------------------------------ */
/*  Styles                                                              */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  fallbackSubtitle: {
    color: '#CBD5E1',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
  },

  screenFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },

  /* ---- Top ---- */
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 24) + 8,
    paddingBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogoWrap: {
    width: 35,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  brandText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
  },
  modePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(67,56,202,0.85)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  modePillText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 4,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  topIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIconBtnActive: {
    backgroundColor: 'rgba(251,191,36,0.35)',
  },
  topCenter: {
    alignItems: 'center',
  },
  topDate: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
  },
  topTime: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 1,
  },
  topRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cameraBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 12,
  },
  cameraBadgeText: {
    color: '#fff',
    fontSize: 10.5,
    fontWeight: '700',
    marginLeft: 5,
  },

  /* ---- Bottom gradient ---- */
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_H * 0.42,
  },

  /* ---- Employee / location card ---- */
  locationBadge: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 150,
    flexDirection: 'row',
    backgroundColor: 'rgba(17,24,39,0.72)',
    borderRadius: 16,
    padding: 14,
    alignItems: 'flex-start',
  },
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: BRAND,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  locationTextWrap: {
    flex: 1,
  },
  employeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  employeeName: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#fff',
    flexShrink: 1,
    marginRight: 8,
  },
  employeeSub: {
    marginTop: 1,
    fontSize: 11,
    color: '#CBD5E1',
    fontWeight: '500',
  },
  codeChip: {
    backgroundColor: 'rgba(129,140,248,0.25)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  codeChipText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#C7D2FE',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },
  locationLine1: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 6,
    flexShrink: 1,
  },
  locationBold: {
    fontWeight: '800',
  },
  locationLine2: {
    fontSize: 11.5,
    color: '#CBD5E1',
    fontWeight: '500',
    marginLeft: 6,
    flexShrink: 1,
  },

  /* ---- Bottom bar (capture) ---- */
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: Platform.OS === 'ios' ? 40 : 26,
    paddingTop: 10,
  },
  flipBtnWrap: {
    alignItems: 'center',
    width: 56,
  },
  flipBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipBtnLabel: {
    marginTop: 6,
    fontSize: 9.5,
    fontWeight: '700',
    color: '#E2E8F0',
    textAlign: 'center',
  },
  shutterBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterBtnDisabled: {
    opacity: 0.35,
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BRAND,
  },

  /* ---- Bottom bar (confirm) ---- */
  confirmBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 26,
    paddingTop: 12,
  },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 18,
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  retakeBtnText: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  confirmBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND,
    borderRadius: 14,
    height: 52,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  confirmBtnText: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: '700',
    fontSize: 14.5,
  },

  /* ---- Success overlay ---- */
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(49,46,129,0.94)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    marginTop: 18,
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  successSubText: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
});




// // PAGE ATTENDENCE SCREEN CODE ==========================================USING FLASHLIGHT ==========================================

// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Animated,
//   Platform,
//   StatusBar,
//   Dimensions,
// } from 'react-native';

// import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
// import LinearGradient from 'react-native-linear-gradient';

// import {
//   Camera,
//   useCameraDevice,
//   type PhotoFile,
// } from 'react-native-vision-camera';

// import LocationService from '../services/LocationService';

// /* ------------------------------------------------------------------ */
// /*  Types                                                              */
// /* ------------------------------------------------------------------ */

// export type AttendanceMode = 'check-in' | 'check-out';
// export type EmployeeType = 'office' | 'field';
// export type FlashMode = 'off' | 'on' | 'auto';

// export interface CaptureResult {
//   photoUri: string;
//   timestamp: string;
//   latitude: number;
//   longitude: number;
//   address: string;
//   distanceFromOfficeMeters?: number;
//   insideOfficeRadius?: boolean;
//   employeeId: string;
//   employeeName: string;
// }

// interface OfficeConfig {
//   name: string;
//   latitude: number;
//   longitude: number;
//   radiusMeters: number;
// }

// interface CameraCaptureScreenProps {
//   visible: boolean;
//   mode: AttendanceMode;
//   employeeName: string;
//   employeeId: string;
//   employeeType: EmployeeType;
//   office?: OfficeConfig; // required for office employees
//   onClose: () => void;
//   onCaptured: (result: CaptureResult) => void | Promise<void>;
//   // TODO(RTK): once wired to RTK Query, `onCaptured` can be replaced with a
//   // `useCheckInMutation()` / `useCheckOutMutation()` trigger passed down from
//   // the parent screen — the payload shape (CaptureResult) is already what
//   // the mutation body should look like, so no changes needed here.
// }

// /* ------------------------------------------------------------------ */
// /*  Brand / theme                                                      */
// /* ------------------------------------------------------------------ */

// const BRAND = '#4338CA'; // ImWallet indigo
// const GREEN = '#16A34A';
// const RED = '#EF4444';

// const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// /* ------------------------------------------------------------------ */
// /*  Helpers                                                             */
// /* ------------------------------------------------------------------ */

// function haversineMeters(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number,
// ): number {
//   const R = 6371000;
//   const toRad = (v: number) => (v * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// function formatKm(meters: number): string {
//   return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(2)} km`;
// }

// function initialsOf(name: string): string {
//   const parts = name.trim().split(/\s+/).filter(Boolean);
//   if (parts.length === 0) return '?';
//   if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
//   return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
// }

// function flashIconFor(mode: FlashMode): string {
//   if (mode === 'on') return 'flash';
//   if (mode === 'auto') return 'flash-auto';
//   return 'flash-off';
// }

// function formatTime(date: Date): string {
//   return date.toLocaleTimeString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//   });
// }

// function formatDate(date: Date): string {
//   return date.toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   });
// }

// /* ------------------------------------------------------------------ */
// /*  Component — full page, no Modal wrapper                            */
// /* ------------------------------------------------------------------ */

// const CameraCaptureScreen = ({
//   visible,
//   mode,
//   employeeName,
//   employeeId,
//   employeeType,
//   office,
//   onClose,
//   onCaptured,
// }: CameraCaptureScreenProps) => {
//   const camera = useRef<Camera>(null);
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [flash, setFlash] = useState<FlashMode>('off');
//   const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
//   const device = useCameraDevice(cameraPosition);


//   // A physical flash unit is (almost) never present on the front camera, so
//   // for selfies we simulate it with a full-white screen flash instead.
//   const hasPhysicalFlash = cameraPosition === 'back' && !!device?.hasFlash;

//   const [now, setNow] = useState(new Date());
//   const [gpsLoading, setGpsLoading] = useState(true);
//   const [gpsError, setGpsError] = useState<string | null>(null);
//   const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
//   const [address, setAddress] = useState<string>('');

//   const [capturedPhoto, setCapturedPhoto] = useState<PhotoFile | null>(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const successScale = useRef(new Animated.Value(0)).current;
//   const screenFlashOpacity = useRef(new Animated.Value(0)).current;
//   const shutterScale = useRef(new Animated.Value(1)).current;

//   /* ---------------- Clock tick ---------------- */
//   useEffect(() => {
//     if (!visible) return;
//     const t = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(t);
//   }, [visible]);



//   useEffect(() => {
//     console.log(device?.hasTorch);
//     console.log("=========== Capture ===========");
//     console.log("Camera Position:", cameraPosition);
//     console.log("Has Flash:", hasPhysicalFlash);
//     console.log("Flash State:", flash);
//     console.log("Device Flash:", device?.hasFlash);
//     console.log("===============================");
//     console.log("Camera device changed:", device);
//     console.log("Device ID:", device?.id);
//     console.log("Device Position:", device?.position);
//     console.log("Device has Flash:", device?.hasFlash);
//     console.log("Device Type:", device?.type);
//     console.log(" physical Device Name:", device?.physicalDevices);
//   }, [device, cameraPosition]);


//   /* ---------------- Fetch GPS on open ---------------- */
//   const fetchLocation = useCallback(async () => {
//     try {
//       setGpsLoading(true);
//       setGpsError(null);

//       const location = await LocationService.getLatLng();
//       setCoords({ lat: location.latitude, lng: location.longitude });

//       const addr = await LocationService.reverseGeocode({
//         latitude: location.latitude,
//         longitude: location.longitude,
//       });
//       setAddress(addr.displayName);
//     } catch (error: any) {
//       setGpsError(error.message || 'Unable to fetch location');
//     } finally {
//       setGpsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (visible) {
//       setCapturedPhoto(null);
//       setShowSuccess(false);
//       fetchLocation();
//     }
//   }, [visible, fetchLocation]);

//   /* ---------------- Derived geofencing ---------------- */
//   const distanceMeters = useMemo(() => {
//     if (!coords || !office) return undefined;
//     return haversineMeters(coords.lat, coords.lng, office.latitude, office.longitude);
//   }, [coords, office]);

//   const insideRadius = useMemo(() => {
//     if (distanceMeters === undefined || !office) return undefined;
//     return distanceMeters <= office.radiusMeters;
//   }, [distanceMeters, office]);

//   /* ---------------- Actions ---------------- */
//   const triggerScreenFlash = () =>
//     new Promise<void>(resolve => {
//       Animated.sequence([
//         Animated.timing(screenFlashOpacity, { toValue: 1, duration: 80, useNativeDriver: true }),
//         Animated.timing(screenFlashOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
//       ]).start(() => resolve());
//     });



//   const handleCapture = async () => {
//     if (isCapturing) {
//       console.log("Already capturing...");
//       return;
//     }

//     setIsCapturing(true);

//     try {
//       const needsSimulatedFlash =
//         cameraPosition === "front" && flash !== "off";

//       if (needsSimulatedFlash) {
//         await triggerScreenFlash();
//       }

//       // const photo = await photoOutput.capturePhoto(
//       //   {
//       //     flashMode: hasPhysicalFlash ? flash : "off",
//       //     enableShutterSound: true,
//       //   },
//       //   {}
//       // );

//       console.log("camera.current =", camera.current);
//       console.log("takePhoto =", camera.current?.takePhoto);
//       console.log("camera keys =", Object.keys(camera.current ?? {}));

//       const photo = await camera.current?.takePhoto({
//         flash: hasPhysicalFlash
//           ? (flash === "off" ? "off" : "on")
//           : "off",

//         enableShutterSound: true,
//       });


//       // const filePath = await photo.saveToTemporaryFileAsync();

//       const filePath = photo.path;

//       console.log("Saved Path:", filePath);
//       console.log("Name:", photo.name);
//       console.log("Width:", photo.width);
//       console.log("Height:", photo.height);
//       console.log("Orientation:", photo.orientation);
//       console.log("Container:", photo.containerFormat);
//       console.log("Timestamp:", photo.timestamp);

//       setCapturedPhoto(photo);

//       // photo.dispose();
//     } catch (e) {
//       console.log("Capture Error:", e);
//       setGpsError("Could not capture photo. Please try again.");
//     } finally {
//       setIsCapturing(false);
//     }
//   };

//   const handleRetake = () => setCapturedPhoto(null);

//   const handleConfirm = async () => {
//     if (!capturedPhoto || !coords) return;
//     setSubmitting(true);
//     try {
//       const result: CaptureResult = {
//         photoUri: Platform.OS === 'android' ? `file://${capturedPhoto.path}` : capturedPhoto.path,
//         timestamp: now.toISOString(),
//         latitude: coords.lat,
//         longitude: coords.lng,
//         address,
//         distanceFromOfficeMeters: distanceMeters,
//         insideOfficeRadius: insideRadius,
//         employeeId,
//         employeeName,
//       };

//       // TODO(RTK): swap this for e.g.
//       //   await checkInMutation(result).unwrap();
//       // once the endpoint is wired up. `onCaptured` stays as the escape
//       // hatch for optimistic UI / toast handling in the parent.
//       await onCaptured(result);

//       setShowSuccess(true);
//       Animated.spring(successScale, {
//         toValue: 1,
//         friction: 5,
//         tension: 80,
//         useNativeDriver: true,
//       }).start(() => {
//         setTimeout(() => {
//           successScale.setValue(0);
//           setShowSuccess(false);
//           onClose();
//         }, 1200);
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!visible) return null;

//   /* ------------------------------------------------------------------ */
//   /*  Device fallback                                                     */
//   /* ------------------------------------------------------------------ */

//   if (!device) {
//     return (
//       <View style={[styles.root, styles.centerFallback]}>
//         <StatusBar barStyle="light-content" backgroundColor="#000" />
//         <ActivityIndicator color="#fff" size="large" />
//         <Text style={styles.fallbackSubtitle}>Starting camera…</Text>
//       </View>
//     );
//   }

//   /* ------------------------------------------------------------------ */
//   /*  Main render — this is a full page, not a Modal                     */
//   /* ------------------------------------------------------------------ */

//   return (
//     <View style={styles.root}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//       {/* ---------------- Camera / captured preview (full screen) ---------------- */}
//       {!capturedPhoto ? (
//         // <Camera
//         //   ref={camera}
//         //   style={StyleSheet.absoluteFill}
//         //   device={device}
//         //   isActive={visible}
//         //   outputs={[photoOutput]}
//         // />'

//         <Camera
//           ref={camera}
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={visible}
//           photo={true}
//           torch={flash === 'on' ? 'on' : 'off'}
//         />
//       ) : (
//         <Animated.Image
//           source={{
//             uri: Platform.OS === 'android' ? `file://${capturedPhoto.path}` : capturedPhoto.path,
//           }}
//           style={StyleSheet.absoluteFill}
//           resizeMode="cover"
//         />
//       )}

//       {/* Front camera / no-hardware-flash simulated screen flash */}
//       <Animated.View
//         pointerEvents="none"
//         style={[styles.screenFlash, { opacity: screenFlashOpacity }]}
//       />

//       {/* ---------------- Top gradient + brand/header bar ---------------- */}
//       <LinearGradient
//         colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0)']}
//         style={styles.topGradient}
//         pointerEvents="box-none">
//         <View style={styles.brandRow}>
//           <View style={styles.brandLeft}>
//             <View style={styles.brandLogoWrap}>
//               <MaterialDesignIcons name="wallet-outline" size={24} color={BRAND} />
//             </View>
//             <Text style={styles.brandText}>ImWallet</Text>
//           </View>
//           <View style={styles.modePill}>
//             <MaterialDesignIcons
//               name={mode === 'check-in' ? 'login' : 'logout'}
//               size={12}
//               color="#fff"
//             />
//             <Text style={styles.modePillText}>
//               {mode === 'check-in' ? 'Check-In' : 'Check-Out'}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.topBar}>
//           <TouchableOpacity style={styles.topIconBtn} onPress={onClose} activeOpacity={0.8}>
//             <MaterialDesignIcons name="close" size={22} color="#fff" />
//           </TouchableOpacity>

//           <View style={styles.topCenter}>
//             <Text style={styles.topDate}>{formatDate(now)}</Text>
//             <Text style={styles.topTime}>{formatTime(now)}</Text>
//           </View>

//           {!capturedPhoto ? (
//             <View style={styles.topRightGroup}>
//               <TouchableOpacity
//                 style={[styles.topIconBtn, flash !== 'off' && styles.topIconBtnActive]}
//                 activeOpacity={0.8}
//                 onPress={() =>
//                   setFlash(f => (f === 'off' ? 'on' : f === 'on' ? 'auto' : 'off'))
//                 }>
//                 <MaterialDesignIcons name={flashIconFor(flash)} size={20} color="#fff" />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.topIconBtn, { marginLeft: 10 }]}
//                 activeOpacity={0.8}
//                 onPress={() => setCameraPosition(p => (p === 'front' ? 'back' : 'front'))}>
//                 <MaterialDesignIcons name="camera-flip-outline" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View style={{ width: 38 }} />
//           )}
//         </View>

//         {!capturedPhoto && (
//           <View style={styles.cameraBadge}>
//             <MaterialDesignIcons
//               name={cameraPosition === 'front' ? 'account-box-outline' : 'image-filter-hdr'}
//               size={12}
//               color="#fff"
//             />
//             <Text style={styles.cameraBadgeText}>
//               {cameraPosition === 'front' ? 'Front camera' : 'Back camera'}
//             </Text>
//           </View>
//         )}
//       </LinearGradient>

//       {/* ---------------- Bottom gradient ---------------- */}
//       <LinearGradient
//         colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
//         style={styles.bottomGradient}
//         pointerEvents="none"
//       />

//       {/* ---------------- Employee + location card ---------------- */}
//       <View style={styles.locationBadge}>
//         <View style={styles.avatarWrap}>
//           <Text style={styles.avatarText}>{initialsOf(employeeName)}</Text>
//         </View>

//         <View style={styles.locationTextWrap}>
//           <View style={styles.employeeRow}>
//             <Text style={styles.employeeName} numberOfLines={1}>
//               {employeeName}
//             </Text>
//             <View style={styles.codeChip}>
//               <Text style={styles.codeChipText}>#{employeeId}</Text>
//             </View>
//           </View>
//           <Text style={styles.employeeSub}>
//             {employeeType === 'office' ? 'Office Employee' : 'Field Employee'}
//           </Text>

//           <View style={styles.divider} />

//           {gpsLoading ? (
//             <View style={styles.locationRow}>
//               <ActivityIndicator color="#CBD5E1" size="small" />
//               <Text style={styles.locationLine1}>Fetching location…</Text>
//             </View>
//           ) : gpsError ? (
//             <View style={styles.locationRow}>
//               <MaterialDesignIcons name="alert-circle-outline" size={14} color={RED} />
//               <Text style={[styles.locationLine1, { color: RED }]} numberOfLines={2}>
//                 {gpsError}
//               </Text>
//             </View>
//           ) : (
//             <>
//               {distanceMeters !== undefined && office && (
//                 <View style={styles.locationRow}>
//                   <MaterialDesignIcons
//                     name={insideRadius ? 'map-marker-check' : 'map-marker-alert'}
//                     size={14}
//                     color={insideRadius ? GREEN : '#F59E0B'}
//                   />
//                   <Text style={styles.locationLine1} numberOfLines={1}>
//                     <Text style={styles.locationBold}>{formatKm(distanceMeters)}</Text> from{' '}
//                     {office.name}
//                   </Text>
//                 </View>
//               )}
//               <View style={styles.locationRow}>
//                 <MaterialDesignIcons name="map-marker-outline" size={14} color="#CBD5E1" />
//                 <Text style={styles.locationLine2} numberOfLines={2}>
//                   {address}
//                 </Text>
//               </View>
//             </>
//           )}
//         </View>
//       </View>

//       {/* ---------------- Bottom controls ---------------- */}
//       {!capturedPhoto ? (
//         <View style={styles.bottomBar}>
//           <View style={styles.flipBtnWrap}>
//             <TouchableOpacity
//               style={styles.flipBtn}
//               onPress={() => setCameraPosition(p => (p === 'front' ? 'back' : 'front'))}
//               activeOpacity={0.8}>
//               <MaterialDesignIcons name="camera-flip-outline" size={20} color="#fff" />
//             </TouchableOpacity>
//             <Text style={styles.flipBtnLabel}>
//               {cameraPosition === 'front' ? 'Back' : 'Front'}
//             </Text>
//           </View>

//           <Animated.View style={{ transform: [{ scale: shutterScale }] }}>
//             <TouchableOpacity
//               style={[styles.shutterBtn, (gpsLoading || !!gpsError) && styles.shutterBtnDisabled]}
//               onPress={handleCapture}
//               disabled={isCapturing || gpsLoading || !!gpsError}
//               activeOpacity={0.85}>
//               <View style={styles.shutterInner} />
//             </TouchableOpacity>
//           </Animated.View>

//           <View style={styles.flipBtnWrap}>
//             <View style={styles.flipBtn}>
//               <MaterialDesignIcons
//                 name={flashIconFor(flash)}
//                 size={18}
//                 color={flash !== 'off' ? '#FBBF24' : '#fff'}
//               />
//             </View>
//             <Text style={styles.flipBtnLabel}>
//               {flash === 'off' ? 'Flash off' : flash === 'on' ? 'Flash on' : 'Flash auto'}
//             </Text>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.confirmBar}>
//           <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake} activeOpacity={0.8}>
//             <MaterialDesignIcons name="camera-retake-outline" size={18} color="#fff" />
//             <Text style={styles.retakeBtnText}>Retake</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.confirmBtn}
//             onPress={handleConfirm}
//             disabled={submitting}
//             activeOpacity={0.85}>
//             {submitting ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <>
//                 <MaterialDesignIcons name="check" size={18} color="#fff" />
//                 <Text style={styles.confirmBtnText}>
//                   {mode === 'check-in' ? 'Confirm Check-In' : 'Confirm Check-Out'}
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* ---------------- Success overlay ---------------- */}
//       {showSuccess && (
//         <View style={styles.successOverlay} pointerEvents="none">
//           <Animated.View style={[styles.successCircle, { transform: [{ scale: successScale }] }]}>
//             <MaterialDesignIcons name="check-bold" size={44} color="#fff" />
//           </Animated.View>
//           <Text style={styles.successText}>
//             {mode === 'check-in' ? 'Checked In Successfully' : 'Checked Out Successfully'}
//           </Text>
//           <Text style={styles.successSubText}>
//             {employeeName} · #{employeeId}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CameraCaptureScreen;

// /* ------------------------------------------------------------------ */
// /*  Styles                                                              */
// /* ------------------------------------------------------------------ */

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   centerFallback: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//   },
//   fallbackSubtitle: {
//     color: '#CBD5E1',
//     fontSize: 13,
//     textAlign: 'center',
//     marginTop: 8,
//     lineHeight: 19,
//   },

//   screenFlash: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#fff',
//   },

//   /* ---- Top ---- */
//   topGradient: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 24) + 8,
//     paddingBottom: 20,
//   },
//   brandRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 18,
//     marginBottom: 14,
//   },
//   brandLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   brandLogoWrap: {
//     width: 35,
//     height: 30,
//     borderRadius: 9,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 7,
//   },
//   brandText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '800',
//     letterSpacing: 0.3,
//     textShadowColor: 'rgba(0,0,0,0.5)',
//     textShadowRadius: 4,
//   },
//   modePill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(67,56,202,0.85)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   modePillText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '700',
//     marginLeft: 4,
//   },

//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 18,
//   },
//   topIconBtn: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   topIconBtnActive: {
//     backgroundColor: 'rgba(251,191,36,0.35)',
//   },
//   topCenter: {
//     alignItems: 'center',
//   },
//   topDate: {
//     color: '#E2E8F0',
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   topTime: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '700',
//     marginTop: 1,
//   },
//   topRightGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   cameraBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     marginTop: 12,
//   },
//   cameraBadgeText: {
//     color: '#fff',
//     fontSize: 10.5,
//     fontWeight: '700',
//     marginLeft: 5,
//   },

//   /* ---- Bottom gradient ---- */
//   bottomGradient: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: SCREEN_H * 0.42,
//   },

//   /* ---- Employee / location card ---- */
//   locationBadge: {
//     position: 'absolute',
//     left: 16,
//     right: 16,
//     bottom: 150,
//     flexDirection: 'row',
//     backgroundColor: 'rgba(17,24,39,0.72)',
//     borderRadius: 16,
//     padding: 14,
//     alignItems: 'flex-start',
//   },
//   avatarWrap: {
//     width: 38,
//     height: 38,
//     borderRadius: 10,
//     backgroundColor: BRAND,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   avatarText: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: '800',
//   },
//   locationTextWrap: {
//     flex: 1,
//   },
//   employeeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   employeeName: {
//     fontSize: 14.5,
//     fontWeight: '800',
//     color: '#fff',
//     flexShrink: 1,
//     marginRight: 8,
//   },
//   employeeSub: {
//     marginTop: 1,
//     fontSize: 11,
//     color: '#CBD5E1',
//     fontWeight: '500',
//   },
//   codeChip: {
//     backgroundColor: 'rgba(129,140,248,0.25)',
//     borderRadius: 999,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//   },
//   codeChipText: {
//     fontSize: 10.5,
//     fontWeight: '700',
//     color: '#C7D2FE',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     marginVertical: 8,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: 2,
//   },
//   locationLine1: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#fff',
//     marginLeft: 6,
//     flexShrink: 1,
//   },
//   locationBold: {
//     fontWeight: '800',
//   },
//   locationLine2: {
//     fontSize: 11.5,
//     color: '#CBD5E1',
//     fontWeight: '500',
//     marginLeft: 6,
//     flexShrink: 1,
//   },

//   /* ---- Bottom bar (capture) ---- */
//   bottomBar: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 30,
//     paddingBottom: Platform.OS === 'ios' ? 40 : 26,
//     paddingTop: 10,
//   },
//   flipBtnWrap: {
//     alignItems: 'center',
//     width: 56,
//   },
//   flipBtn: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flipBtnLabel: {
//     marginTop: 6,
//     fontSize: 9.5,
//     fontWeight: '700',
//     color: '#E2E8F0',
//     textAlign: 'center',
//   },
//   shutterBtn: {
//     width: 76,
//     height: 76,
//     borderRadius: 38,
//     borderWidth: 3,
//     borderColor: '#fff',
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   shutterBtnDisabled: {
//     opacity: 0.35,
//   },
//   shutterInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: BRAND,
//   },

//   /* ---- Bottom bar (confirm) ---- */
//   confirmBar: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingBottom: Platform.OS === 'ios' ? 40 : 26,
//     paddingTop: 12,
//   },
//   retakeBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 14,
//     height: 52,
//     paddingHorizontal: 18,
//     marginRight: 10,
//     backgroundColor: 'rgba(255,255,255,0.16)',
//     borderWidth: 1.5,
//     borderColor: 'rgba(255,255,255,0.5)',
//   },
//   retakeBtnText: {
//     marginLeft: 6,
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 14,
//   },
//   confirmBtn: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: BRAND,
//     borderRadius: 14,
//     height: 52,
//     shadowColor: '#000',
//     shadowOpacity: 0.35,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 5,
//   },
//   confirmBtnText: {
//     marginLeft: 8,
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 14.5,
//   },

//   /* ---- Success overlay ---- */
//   successOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(49,46,129,0.94)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successCircle: {
//     width: 96,
//     height: 96,
//     borderRadius: 48,
//     backgroundColor: GREEN,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successText: {
//     marginTop: 18,
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   successSubText: {
//     marginTop: 4,
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 12,
//     fontWeight: '600',
//   },
// });





// MODEL ATTENDENCE SCREEN CODE ====================================================================================


// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   Animated,
//   Platform,
//   Modal,
//   Dimensions,
// } from 'react-native';

// import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

// import {
//   Camera,
//   useCameraDevice,
//   usePhotoOutput,
//   type PhotoFile,
// } from 'react-native-vision-camera';

// import LocationService from '../services/LocationService';

// /* ------------------------------------------------------------------ */
// /*  Types                                                              */
// /* ------------------------------------------------------------------ */

// export type AttendanceMode = 'check-in' | 'check-out';
// export type EmployeeType = 'office' | 'field';
// export type FlashMode = 'off' | 'on' | 'auto';

// export interface CaptureResult {
//   photoUri: string;
//   timestamp: string;
//   latitude: number;
//   longitude: number;
//   address: string;
//   distanceFromOfficeMeters?: number;
//   insideOfficeRadius?: boolean;
//   employeeId: string;
//   employeeName: string;
// }

// interface OfficeConfig {
//   name: string;
//   latitude: number;
//   longitude: number;
//   radiusMeters: number;
// }

// interface CameraCaptureScreenProps {
//   visible: boolean;
//   mode: AttendanceMode;
//   employeeName: string;
//   employeeId: string;
//   employeeType: EmployeeType;
//   office?: OfficeConfig; // required for office employees
//   onClose: () => void;
//   onCaptured: (result: CaptureResult) => void | Promise<void>;
//   // TODO(RTK): once wired to RTK Query, `onCaptured` can be replaced with a
//   // `useCheckInMutation()` / `useCheckOutMutation()` trigger passed down from
//   // the parent screen — the payload shape (CaptureResult) is already what
//   // the mutation body should look like, so no changes needed here.
// }

// /* ------------------------------------------------------------------ */
// /*  Brand / theme                                                      */
// /* ------------------------------------------------------------------ */

// const BRAND = '#4338CA'; // ImWallet indigo
// const BRAND_DARK = '#312E81';
// const BLUE = '#2563EB';
// const GREEN = '#16A34A';
// const RED = '#EF4444';
// const SLATE = '#111827';

// const { width: SCREEN_W } = Dimensions.get('window');
// const CARD_WIDTH = Math.min(SCREEN_W - 32, 420);
// const PREVIEW_HEIGHT = 440;

// /* ------------------------------------------------------------------ */
// /*  Helpers                                                             */
// /* ------------------------------------------------------------------ */

// function haversineMeters(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number,
// ): number {
//   const R = 6371000;
//   const toRad = (v: number) => (v * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// function formatKm(meters: number): string {
//   return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(2)} km`;
// }

// function initialsOf(name: string): string {
//   const parts = name.trim().split(/\s+/).filter(Boolean);
//   if (parts.length === 0) return '?';
//   if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
//   return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
// }

// function flashIconFor(mode: FlashMode): string {
//   if (mode === 'on') return 'flash';
//   if (mode === 'auto') return 'flash-auto';
//   return 'flash-off';
// }

// /* ------------------------------------------------------------------ */
// /*  Component                                                           */
// /* ------------------------------------------------------------------ */

// const CameraCaptureScreen = ({
//   visible,
//   mode,
//   employeeName,
//   employeeId,
//   employeeType,
//   office,
//   onClose,
//   onCaptured,
// }: CameraCaptureScreenProps) => {
//   // const camera = useRef<Camera>(null);
//   const camera = useRef<any>(null);
//   const [cameraReadyToRender, setCameraReadyToRender] = useState(false);

//   const [flash, setFlash] = useState<FlashMode>('off');
//   const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
//   const device = useCameraDevice(cameraPosition);
//   const photoOutput = usePhotoOutput();



//   // A physical flash unit is (almost) never present on the front camera, so
//   // for selfies we simulate it with a full-white screen flash instead.
//   const hasPhysicalFlash = cameraPosition === 'back' && !!device?.hasFlash;

//   const [gpsLoading, setGpsLoading] = useState(true);
//   const [gpsError, setGpsError] = useState<string | null>(null);
//   const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
//   const [address, setAddress] = useState<string>('');

//   const [capturedPhoto, setCapturedPhoto] = useState<PhotoFile | null>(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const successScale = useRef(new Animated.Value(0)).current;
//   const screenFlashOpacity = useRef(new Animated.Value(0)).current;
//   const shutterScale = useRef(new Animated.Value(1)).current;

//   const [isCapturing, setIsCapturing] = useState(false);

//   /* ---------------- Fetch GPS on open ---------------- */
//   const fetchLocation = useCallback(async () => {
//     try {
//       setGpsLoading(true);
//       setGpsError(null);

//       const location = await LocationService.getLatLng();
//       setCoords({ lat: location.latitude, lng: location.longitude });

//       const addr = await LocationService.reverseGeocode({
//         latitude: location.latitude,
//         longitude: location.longitude,
//       });
//       setAddress(addr.displayName);
//     } catch (error: any) {
//       setGpsError(error.message || 'Unable to fetch location');
//     } finally {
//       setGpsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (visible) {
//       setCapturedPhoto(null);
//       setShowSuccess(false);
//       fetchLocation();
//     }
//   }, [visible, fetchLocation]);



//   useEffect(() => {
//     if (visible) {
//       setCameraReadyToRender(false);

//       const timer = setTimeout(() => {
//         setCameraReadyToRender(true);
//       }, 200); // try 200–300 ms

//       return () => clearTimeout(timer);
//     } else {
//       setCameraReadyToRender(false);
//     }
//   }, [visible]);

//   /* ---------------- Derived geofencing ---------------- */
//   const distanceMeters = useMemo(() => {
//     if (!coords || !office) return undefined;
//     return haversineMeters(coords.lat, coords.lng, office.latitude, office.longitude);
//   }, [coords, office]);

//   const insideRadius = useMemo(() => {
//     if (distanceMeters === undefined || !office) return undefined;
//     return distanceMeters <= office.radiusMeters;
//   }, [distanceMeters, office]);

//   /* ---------------- Actions ---------------- */
//   const triggerScreenFlash = () =>
//     new Promise<void>(resolve => {
//       Animated.sequence([
//         Animated.timing(screenFlashOpacity, { toValue: 1, duration: 80, useNativeDriver: true }),
//         Animated.timing(screenFlashOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
//       ]).start(() => resolve());
//     });


//   const handleCapture = async () => {
//     if (isCapturing) {
//       console.log("Already capturing...");
//       return;
//     }

//     setIsCapturing(true);

//     try {
//       console.log("Before capture");

//       const photo = await photoOutput.capturePhoto(
//         {
//           flashMode: hasPhysicalFlash ? flash : "off",
//           enableShutterSound: true,
//         },
//         {}
//       );

//       const filePath = await photo.saveToTemporaryFileAsync();

//       console.log("Saved Path:", filePath);

//       setCapturedPhoto({
//         path: filePath,
//         width: photo.width,
//         height: photo.height,
//         orientation: photo.orientation,
//         isMirrored: photo.isMirrored,
//       });

//       photo.dispose();
//     } catch (e) {
//       console.log("Capture Error:", e);
//     } finally {
//       setIsCapturing(false);
//     }
//   };

//   const handleRetake = () => setCapturedPhoto(null);

//   const handleConfirm = async () => {
//     if (!capturedPhoto || !coords) return;
//     setSubmitting(true);
//     try {
//       const result: CaptureResult = {
//         photoUri: Platform.OS === 'android' ? `file://${capturedPhoto.path}` : capturedPhoto.path,
//         timestamp: new Date().toISOString(),
//         latitude: coords.lat,
//         longitude: coords.lng,
//         address,
//         distanceFromOfficeMeters: distanceMeters,
//         insideOfficeRadius: insideRadius,
//         employeeId,
//         employeeName,
//       };

//       // TODO(RTK): swap this for e.g.
//       //   await checkInMutation(result).unwrap();
//       // once the endpoint is wired up. `onCaptured` stays as the escape
//       // hatch for optimistic UI / toast handling in the parent.
//       await onCaptured(result);

//       setShowSuccess(true);
//       Animated.spring(successScale, {
//         toValue: 1,
//         friction: 5,
//         tension: 80,
//         useNativeDriver: true,
//       }).start(() => {
//         setTimeout(() => {
//           successScale.setValue(0);
//           setShowSuccess(false);
//           onClose();
//         }, 1200);
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!visible) return null;

//   /* ------------------------------------------------------------------ */
//   /*  Render                                                              */
//   /* ------------------------------------------------------------------ */

//   return (
//     // <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onShow={() => setCameraReadyToRender(true)}
//       onRequestClose={() => {
//         setCameraReadyToRender(false);
//         onClose();
//       }}
//     >
//       <View style={styles.backdrop}>
//         <View style={styles.card}>
//           {/* ---------------- Brand bar ---------------- */}
//           <View style={styles.brandBar}>
//             <View style={styles.brandLeft}>
//               <View style={styles.brandLogoWrap}>
//                 <MaterialDesignIcons name="wallet-outline" size={16} color={BRAND} />
//               </View>
//               <Text style={styles.brandText}>ImWallet</Text>
//             </View>
//             <View style={styles.modePill}>
//               <MaterialDesignIcons
//                 name={mode === 'check-in' ? 'login' : 'logout'}
//                 size={12}
//                 color="#fff"
//               />
//               <Text style={styles.modePillText}>
//                 {mode === 'check-in' ? 'Check-In' : 'Check-Out'}
//               </Text>
//             </View>
//           </View>

//           {/* ---------------- Header ---------------- */}
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Camera</Text>

//             <View style={styles.headerActions}>
//               <TouchableOpacity
//                 onPress={() =>
//                   setFlash(f => (f === 'off' ? 'on' : f === 'on' ? 'auto' : 'off'))
//                 }
//                 style={[styles.iconBtn, flash !== 'off' && styles.iconBtnActive]}
//                 hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
//                 <MaterialDesignIcons
//                   name={flashIconFor(flash)}
//                   size={20}
//                   color={flash !== 'off' ? BRAND : SLATE}
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={onClose}
//                 style={styles.iconBtn}
//                 hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
//                 <MaterialDesignIcons name="close" size={20} color={SLATE} />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* ---------------- Preview area ---------------- */}
//           <View style={styles.previewArea}>
//             {!capturedPhoto ? (
//               device ? (
//                 <>
//                   {cameraReadyToRender ? (
//                     <View
//                       style={{
//                         flex: 1,
//                         overflow: 'hidden',
//                       }}
//                     >
//                       {/* <Camera
//                         ref={camera}
//                         style={{
//                           width: '100%',
//                           height: '100%',
//                         }}
//                         device={device}
//                         isActive={visible}
//                         photo
//                       /> */}
//                       <Camera
//                         ref={camera}
//                         style={{
//                           width: '100%',
//                           height: '100%',
//                         }}
//                         device={device}
//                         isActive={visible}
//                         outputs={[photoOutput]}
//                       />
//                     </View>
//                   ) : (
//                     <View
//                       style={[
//                         StyleSheet.absoluteFill,
//                         {
//                           backgroundColor: '#000',
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         },
//                       ]}>
//                       <ActivityIndicator size="large" color="#fff" />
//                       <Text
//                         style={{
//                           color: '#fff',
//                           marginTop: 12,
//                           fontSize: 14,
//                         }}>
//                         Opening Camera...
//                       </Text>
//                     </View>
//                   )}

//                   <Animated.View
//                     pointerEvents="none"
//                     style={[
//                       styles.screenFlash,
//                       { opacity: screenFlashOpacity },
//                     ]}
//                   />

//                   <View style={styles.cameraBadge}>
//                     <MaterialDesignIcons
//                       name={
//                         cameraPosition === 'front'
//                           ? 'account-box-outline'
//                           : 'image-filter-hdr'
//                       }
//                       size={13}
//                       color="#fff"
//                     />
//                     <Text style={styles.cameraBadgeText}>
//                       {cameraPosition === 'front'
//                         ? 'Front camera'
//                         : 'Back camera'}
//                     </Text>
//                   </View>

//                   <View style={styles.locationBadge}>
//                     <View style={styles.avatarWrap}>
//                       <Text style={styles.avatarText}>
//                         {initialsOf(employeeName)}
//                       </Text>
//                     </View>

//                     <View style={styles.locationTextWrap}>
//                       <View style={styles.employeeRow}>
//                         <Text
//                           style={styles.employeeName}
//                           numberOfLines={1}>
//                           {employeeName}
//                         </Text>

//                         <View style={styles.codeChip}>
//                           <Text style={styles.codeChipText}>
//                             #{employeeId}
//                           </Text>
//                         </View>
//                       </View>

//                       <View style={styles.divider} />

//                       {gpsLoading ? (
//                         <View style={styles.locationRow}>
//                           <ActivityIndicator
//                             color="#6B7280"
//                             size="small"
//                           />
//                           <Text style={styles.locationLine1}>
//                             Fetching location...
//                           </Text>
//                         </View>
//                       ) : gpsError ? (
//                         <View style={styles.locationRow}>
//                           <MaterialDesignIcons
//                             name="alert-circle-outline"
//                             size={14}
//                             color={RED}
//                           />
//                           <Text
//                             style={[
//                               styles.locationLine1,
//                               { color: RED },
//                             ]}>
//                             {gpsError}
//                           </Text>
//                         </View>
//                       ) : (
//                         <>
//                           {distanceMeters !== undefined && office && (
//                             <View style={styles.locationRow}>
//                               <MaterialDesignIcons
//                                 name={
//                                   insideRadius
//                                     ? 'map-marker-check'
//                                     : 'map-marker-alert'
//                                 }
//                                 size={14}
//                                 color={
//                                   insideRadius
//                                     ? GREEN
//                                     : '#D97706'
//                                 }
//                               />

//                               <Text
//                                 style={styles.locationLine1}
//                                 numberOfLines={1}>
//                                 <Text style={styles.locationBold}>
//                                   {formatKm(distanceMeters)}
//                                 </Text>{' '}
//                                 from {office.name}
//                               </Text>
//                             </View>
//                           )}

//                           <View style={styles.locationRow}>
//                             <MaterialDesignIcons
//                               name="map-marker-outline"
//                               size={14}
//                               color="#4B5563"
//                             />
//                             <Text
//                               style={styles.locationLine2}
//                               numberOfLines={2}>
//                               {address}
//                             </Text>
//                           </View>
//                         </>
//                       )}
//                     </View>
//                   </View>
//                 </>
//               ) : (
//                 <View
//                   style={[
//                     StyleSheet.absoluteFill,
//                     styles.centerFallback,
//                   ]}>
//                   <ActivityIndicator
//                     color="#9CA3AF"
//                     size="large"
//                   />
//                   <Text style={styles.fallbackText}>
//                     Starting camera...
//                   </Text>
//                 </View>
//               )
//             ) : (
//               <Animated.Image
//                 source={{
//                   uri:
//                     Platform.OS === 'android'
//                       ? `file://${capturedPhoto.path}`
//                       : capturedPhoto.path,
//                 }}
//                 style={StyleSheet.absoluteFill}
//                 resizeMode="cover"
//               />
//             )}
//           </View>

//           {/* ---------------- Bottom bar ---------------- */}
//           {!capturedPhoto ? (
//             <View style={styles.bottomBar}>
//               <View style={styles.flipBtnWrap}>
//                 <TouchableOpacity
//                   style={styles.flipBtn}
//                   onPress={() => setCameraPosition(p => (p === 'front' ? 'back' : 'front'))}
//                   activeOpacity={0.8}>
//                   <MaterialDesignIcons name="camera-flip-outline" size={20} color={SLATE} />
//                 </TouchableOpacity>
//                 <Text style={styles.flipBtnLabel}>
//                   {cameraPosition === 'front' ? 'Back' : 'Front'}
//                 </Text>
//               </View>

//               <Animated.View style={{ transform: [{ scale: shutterScale }] }}>
//                 <TouchableOpacity
//                   style={[styles.shutterBtn, (gpsLoading || !!gpsError) && styles.shutterBtnDisabled]}
//                   onPress={handleCapture}
//                   disabled={isCapturing}
//                   activeOpacity={0.85}>
//                   <View style={styles.shutterInner} />
//                 </TouchableOpacity>
//               </Animated.View>

//               <View style={styles.flipBtnWrap}>
//                 <View style={[styles.flipBtn, styles.flashIndicator]}>
//                   <MaterialDesignIcons
//                     name={flashIconFor(flash)}
//                     size={18}
//                     color={flash !== 'off' ? BRAND : '#9CA3AF'}
//                   />
//                 </View>
//                 <Text style={styles.flipBtnLabel}>
//                   {flash === 'off' ? 'Flash off' : flash === 'on' ? 'Flash on' : 'Flash auto'}
//                 </Text>
//               </View>
//             </View>
//           ) : (
//             <View style={styles.confirmBar}>
//               <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake} activeOpacity={0.8}>
//                 <MaterialDesignIcons name="camera-retake-outline" size={18} color={BRAND} />
//                 <Text style={styles.retakeBtnText}>Retake</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.confirmBtn}
//                 onPress={handleConfirm}
//                 disabled={submitting}
//                 activeOpacity={0.85}>
//                 {submitting ? (
//                   <ActivityIndicator color="#fff" size="small" />
//                 ) : (
//                   <>
//                     <MaterialDesignIcons name="check" size={18} color="#fff" />
//                     <Text style={styles.confirmBtnText}>
//                       {mode === 'check-in' ? 'Confirm Check-In' : 'Confirm Check-Out'}
//                     </Text>
//                   </>
//                 )}
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* ---------------- Success overlay ---------------- */}
//         {showSuccess && (
//           <View style={styles.successOverlay} pointerEvents="none">
//             <Animated.View style={[styles.successCircle, { transform: [{ scale: successScale }] }]}>
//               <MaterialDesignIcons name="check-bold" size={40} color="#fff" />
//             </Animated.View>
//             <Text style={styles.successText}>
//               {mode === 'check-in' ? 'Checked In Successfully' : 'Checked Out Successfully'}
//             </Text>
//             <Text style={styles.successSubText}>{employeeName} · #{employeeId}</Text>
//           </View>
//         )}
//       </View>
//     </Modal>
//   );
// };

// export default CameraCaptureScreen;

// /* ------------------------------------------------------------------ */
// /*  Styles                                                              */
// /* ------------------------------------------------------------------ */

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(15,23,42,0.65)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 24,
//   },

//   card: {
//     width: CARD_WIDTH,
//     backgroundColor: '#fff',
//     // height:'100%',
//     borderRadius: 20,
//     overflow: 'hidden',
//     marginTop: 20,
//     marginBottom: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOpacity: 0.25,
//         shadowRadius: 20,
//         shadowOffset: { width: 0, height: 10 },
//       },
//       android: { elevation: 12 },
//     }),
//   },
//   /* ---- Brand bar ---- */
//   brandBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 15,
//     backgroundColor: BRAND,
//   },
//   brandLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   brandLogoWrap: {
//     width: 22,
//     height: 22,
//     borderRadius: 6,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   brandText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '800',
//     letterSpacing: 0.3,
//   },
//   modePill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   modePillText: {
//     color: '#fff',
//     fontSize: 11,
//     fontWeight: '700',
//     marginLeft: 4,
//   },

//   /* ---- Header ---- */
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   headerTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: SLATE,
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconBtn: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: '#F8FAFC',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 8,
//   },
//   iconBtnActive: {
//     backgroundColor: '#EEF2FF',
//   },

//   /* ---- Preview ---- */
//   previewArea: {
//     width: '100%',
//     height: PREVIEW_HEIGHT,
//     backgroundColor: '#000',
//   },
//   centerFallback: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0F172A',
//   },
//   fallbackText: {
//     marginTop: 10,
//     color: '#CBD5E1',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   screenFlash: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#fff',
//   },

//   cameraBadge: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.45)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   cameraBadgeText: {
//     color: '#fff',
//     fontSize: 10.5,
//     fontWeight: '700',
//     marginLeft: 5,
//   },

//   /* ---- Employee / location card ---- */
//   locationBadge: {
//     position: 'absolute',
//     left: 12,
//     right: 12,
//     bottom: 14,
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,255,255,0.96)',
//     borderRadius: 14,
//     padding: 12,
//     alignItems: 'flex-start',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOpacity: 0.15,
//         shadowRadius: 8,
//         shadowOffset: { width: 0, height: 4 },
//       },
//       android: { elevation: 4 },
//     }),
//   },
//   avatarWrap: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: BRAND,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   avatarText: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: '800',
//   },
//   locationTextWrap: {
//     flex: 1,
//   },
//   employeeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   employeeName: {
//     fontSize: 13.5,
//     fontWeight: '800',
//     color: SLATE,
//     flexShrink: 1,
//     marginRight: 8,
//   },
//   codeChip: {
//     backgroundColor: '#EEF2FF',
//     borderRadius: 999,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//   },
//   codeChipText: {
//     fontSize: 10.5,
//     fontWeight: '700',
//     color: BRAND,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E5E7EB',
//     marginVertical: 6,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginTop: 2,
//   },
//   locationLine1: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: SLATE,
//     marginLeft: 6,
//     flexShrink: 1,
//   },
//   locationBold: {
//     fontWeight: '800',
//   },
//   locationLine2: {
//     fontSize: 11.5,
//     color: '#4B5563',
//     fontWeight: '500',
//     marginLeft: 6,
//     flexShrink: 1,
//   },

//   /* ---- Bottom bar (capture) ---- */
//   bottomBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 26,
//     paddingVertical: 16,
//     backgroundColor: '#fff',
//   },
//   flipBtnWrap: {
//     alignItems: 'center',
//     width: 56,
//   },
//   flipBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#F1F5F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flashIndicator: {
//     backgroundColor: '#F8FAFC',
//   },
//   flipBtnLabel: {
//     marginTop: 4,
//     fontSize: 9.5,
//     fontWeight: '700',
//     color: '#6B7280',
//     textAlign: 'center',
//   },
//   shutterBtn: {
//     width: 66,
//     height: 66,
//     borderRadius: 33,
//     borderWidth: 3,
//     borderColor: BRAND,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   shutterBtnDisabled: {
//     opacity: 0.35,
//   },
//   shutterInner: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: BRAND,
//   },

//   /* ---- Bottom bar (confirm) ---- */
//   confirmBar: {
//     flexDirection: 'row',
//     padding: 14,
//     backgroundColor: '#fff',
//   },
//   retakeBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 12,
//     height: 48,
//     paddingHorizontal: 16,
//     marginRight: 10,
//     borderWidth: 1.5,
//     borderColor: BRAND,
//   },
//   retakeBtnText: {
//     marginLeft: 6,
//     color: BRAND,
//     fontWeight: '700',
//     fontSize: 13,
//   },
//   confirmBtn: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: BRAND,
//     borderRadius: 12,
//     height: 48,
//   },
//   confirmBtnText: {
//     marginLeft: 6,
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 13,
//   },

//   /* ---- Success overlay ---- */
//   successOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(49,46,129,0.94)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: GREEN,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   successText: {
//     marginTop: 16,
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '700',
//   },
//   successSubText: {
//     marginTop: 4,
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 12,
//     fontWeight: '600',
//   },
// });