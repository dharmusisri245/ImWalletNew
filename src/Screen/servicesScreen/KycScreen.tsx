import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from '@react-native-vector-icons/feather';
import Toast from 'react-native-toast-message';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

import CustomInput from '../../components/registerFormCompo/CutomInput';
import { colors, spacing, typography, radius } from '../../color/Colurs';
import { validateKycForm, KycFormValues, KycFormErrors } from '../../utils/kycValidators';
import { uploadKycDocument, submitKyc, DocumentType } from '../../auth/rtkApi/KycServicesApi';
import AppHeader from '../../components/AppHeader';

const INITIAL_VALUES: KycFormValues = {
  panNumber: '',
  panImage: null,
  aadhaarNumber: '',
  aadhaarFrontImage: null,
  aadhaarBackImage: null,
  businessDocNumber: '',
  businessDocImage: null,
  shopLicenseNumber: '',
  shopLicenseImage: null,
};

type Props = {
  navigation?: { goBack: () => void };
};

type StepKey = 'pan' | 'aadhaar' | 'business' | 'license' | 'review';

const STEPS: { key: StepKey; label: string; icon: React.ComponentProps<typeof FeatherIcon>['name'] }[] = [
  { key: 'pan', label: 'PAN', icon: 'credit-card' },
  { key: 'aadhaar', label: 'Aadhaar', icon: 'user-check' },
  { key: 'business', label: 'Business', icon: 'briefcase' },
  { key: 'license', label: 'License', icon: 'file-text' },
  { key: 'review', label: 'Review', icon: 'check-square' },
];

// ---------------------------------------------------------------------------
// Reusable bits (kept in this file on purpose - single file, no split)
// ---------------------------------------------------------------------------

function SectionCard({
  icon,
  title,
  subtitle,
  onLayout,
  children,
}: {
  icon: React.ComponentProps<typeof FeatherIcon>['name'];
  title: string;
  subtitle?: string;
  onLayout?: (y: number) => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card} onLayout={(e) => onLayout && onLayout(e.nativeEvent.layout.y)}>
      <View style={styles.sectionHeaderRow}>
        <View style={styles.sectionIconWrap}>
          <FeatherIcon name={icon} size={15} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionLabel}>{title}</Text>
          {!!subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {children}
    </View>
  );
}

function StepIndicator({
  completedSteps,
  currentStep,
}: {
  completedSteps: Record<StepKey, boolean>;
  currentStep: StepKey;
}) {
  return (
    <View style={styles.stepRow}>
      {STEPS.map((step, index) => {
        const isDone = completedSteps[step.key];
        const isCurrent = step.key === currentStep;
        const isLast = index === STEPS.length - 1;
        return (
          <React.Fragment key={step.key}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  isDone && styles.stepCircleDone,
                  isCurrent && !isDone && styles.stepCircleCurrent,
                ]}
              >
                {isDone ? (
                  <FeatherIcon name="check" size={12} color={colors.white} />
                ) : (
                  <Text style={[styles.stepNumber, isCurrent && styles.stepNumberCurrent]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={[styles.stepLabel, (isDone || isCurrent) && styles.stepLabelActive]} numberOfLines={1}>
                {step.label}
              </Text>
            </View>
            {!isLast && <View style={[styles.stepConnector, isDone && styles.stepConnectorDone]} />}
          </React.Fragment>
        );
      })}
    </View>
  );
}

/** Upload tile: dashed placeholder -> thumbnail once picked, with
 *  remove/replace controls and an uploading spinner overlay. */
function DocumentUploadTile({
  label,
  imageUri,
  uploading,
  error,
  onPick,
  onRemove,
}: {
  label: string;
  imageUri: string | null;
  uploading?: boolean;
  error?: string;
  onPick: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.uploadWrapper}>
      <Text style={styles.uploadLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={imageUri ? undefined : onPick}
        style={[
          styles.uploadTile,
          !!imageUri && styles.uploadTileFilled,
          !!error && styles.uploadTileError,
        ]}
      >
        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.uploadImage} resizeMode="cover" />
            {!uploading && (
              <View style={styles.uploadActionsRow}>
                <TouchableOpacity style={styles.uploadActionBtn} onPress={onPick} hitSlop={6}>
                  <FeatherIcon name="repeat" size={14} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadActionBtn} onPress={onRemove} hitSlop={6}>
                  <FeatherIcon name="trash-2" size={14} color={colors.white} />
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <View style={styles.uploadPlaceholder}>
            <View style={styles.uploadIconCircle}>
              <FeatherIcon name="upload" size={18} color={colors.primary} />
            </View>
            <Text style={styles.uploadPlaceholderText}>Tap to upload</Text>
            <Text style={styles.uploadPlaceholderHint}>Camera or Gallery · JPG/PNG</Text>
          </View>
        )}

        {uploading && (
          <View style={styles.uploadOverlay}>
            <ActivityIndicator color={colors.white} />
          </View>
        )}
      </TouchableOpacity>
      {!!error && <Text style={styles.uploadErrorText}>{error}</Text>}
    </View>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function ReviewThumb({ label, uri }: { label: string; uri: string | null }) {
  if (!uri) return null;
  return (
    <View style={styles.reviewThumbWrap}>
      <Image source={{ uri }} style={styles.reviewThumb} resizeMode="cover" />
      <Text style={styles.reviewThumbLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export default function KycScreen({ navigation }: Props) {
  const [values, setValues] = useState<KycFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<KycFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadingField, setUploadingField] = useState<keyof KycFormValues | null>(null);

  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const sectionOffsets = useRef<Record<StepKey, number>>({
    pan: 0,
    aadhaar: 0,
    business: 0,
    license: 0,
    review: 0,
  });

  const setField = <K extends keyof KycFormValues>(key: K, val: KycFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const scrollToStep = (key: StepKey) => {
    const y = sectionOffsets.current[key];
    scrollRef.current?.scrollToPosition(0, Math.max(y - 12, 0), true);
  };

  const pickImage = (field: keyof KycFormValues, docType: DocumentType) => {
    Alert.alert('Upload document', 'Choose a source', [
      { text: 'Camera', onPress: () => handlePick(field, docType, 'camera') },
      { text: 'Gallery', onPress: () => handlePick(field, docType, 'gallery') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handlePick = async (
    field: keyof KycFormValues,
    docType: DocumentType,
    source: 'camera' | 'gallery',
  ) => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.7 as const,
      maxWidth: 1600,
      maxHeight: 1600,
      saveToPhotos: false,
    };

    const callback = async (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorCode) return;
      const asset = response.assets?.[0];
      if (!asset?.uri) return;

      setUploadingField(field);
      const res = await uploadKycDocument(docType, asset.uri);
      setUploadingField(null);

      if (res.success && res.url) {
        setField(field, res.url as any);
      } else {
        Toast.show({ type: 'error', text1: res.message || 'Upload failed' });
      }
    };

    if (source === 'camera') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };

  // ---- Per-step completion ----
  const panDone = !!(values.panNumber && values.panImage);
  const aadhaarDone = !!(values.aadhaarNumber && values.aadhaarFrontImage && values.aadhaarBackImage);
  const businessDone = !!values.businessDocImage;
  const licenseDone = !!values.shopLicenseImage;
  const reviewDone = panDone && aadhaarDone && businessDone && licenseDone;

  const completedSteps: Record<StepKey, boolean> = {
    pan: panDone,
    aadhaar: aadhaarDone,
    business: businessDone,
    license: licenseDone,
    review: reviewDone,
  };

  const currentStep: StepKey = !panDone
    ? 'pan'
    : !aadhaarDone
      ? 'aadhaar'
      : !businessDone
        ? 'business'
        : !licenseDone
          ? 'license'
          : 'review';

  const progressPct = useMemo(() => {
    const doneCount = [panDone, aadhaarDone, businessDone, licenseDone].filter(Boolean).length;
    return Math.round((doneCount / 4) * 100);
  }, [panDone, aadhaarDone, businessDone, licenseDone]);

  const handleSubmit = async () => {
    const validationErrors = validateKycForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Toast.show({ type: 'error', text1: 'Please complete all required documents' });
      scrollToStep(currentStep === 'review' ? 'pan' : currentStep);
      return;
    }

    setSubmitting(true);
    const res = await submitKyc({
      panNumber: values.panNumber,
      panImageUrl: values.panImage as string,
      aadhaarNumber: values.aadhaarNumber,
      aadhaarFrontUrl: values.aadhaarFrontImage as string,
      aadhaarBackUrl: values.aadhaarBackImage as string,
      businessDocNumber: values.businessDocNumber,
      businessDocUrl: values.businessDocImage as string,
      shopLicenseNumber: values.shopLicenseNumber,
      shopLicenseUrl: values.shopLicenseImage as string,
    });
    setSubmitting(false);

    if (res.success) {
      Toast.show({ type: 'success', text1: res.message });
      navigation?.goBack();
    } else {
      Toast.show({ type: 'error', text1: res.message });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <AppHeader />
      <KeyboardAwareScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* Premium gradient header — fixed, does not scroll with content */}
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()} hitSlop={10}>
            <FeatherIcon name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>KYC Verification</Text>
            <Text style={styles.headerSubtitle}>Upload your documents</Text>
          </View>

          <View style={styles.headerBadge}>
            <FeatherIcon name="user-plus" size={18} color={colors.white} />
          </View>
        </LinearGradient>

        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressTopRow}>
            <Text style={styles.progressTitle}>Verification progress</Text>
            <Text style={styles.progressPercent}>{progressPct}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
          </View>
          <StepIndicator completedSteps={completedSteps} currentStep={currentStep} />
        </View>

        {/* PAN */}
        <SectionCard
          icon="credit-card"
          title="PAN Card"
          subtitle="Business owner's PAN details"
          onLayout={(y) => (sectionOffsets.current.pan = y)}
        >
          <CustomInput
            label="Enter PAN Number"
            value={values.panNumber}
            onChangeText={(t) => setField('panNumber', t.toUpperCase().slice(0, 10))}
            autoCapitalize="characters"
            maxLength={10}
            error={errors.panNumber}
          />
          <DocumentUploadTile
            label="PAN Card Photo"
            imageUri={values.panImage}
            uploading={uploadingField === 'panImage'}
            error={errors.panImage}
            onPick={() => pickImage('panImage', 'pan')}
            onRemove={() => setField('panImage', null)}
          />
        </SectionCard>

        {/* Aadhaar */}
        <SectionCard
          icon="user-check"
          title="Aadhaar Card"
          subtitle="Self verification (front & back)"
          onLayout={(y) => (sectionOffsets.current.aadhaar = y)}
        >
          <CustomInput
            label="Enter Aadhaar Number"
            value={values.aadhaarNumber}
            onChangeText={(t) => setField('aadhaarNumber', t.replace(/[^0-9]/g, '').slice(0, 12))}
            keyboardType="number-pad"
            maxLength={12}
            error={errors.aadhaarNumber}
          />
          <View style={styles.row}>
            <View style={styles.half}>
              <DocumentUploadTile
                label="Aadhaar Front"
                imageUri={values.aadhaarFrontImage}
                uploading={uploadingField === 'aadhaarFrontImage'}
                error={errors.aadhaarFrontImage}
                onPick={() => pickImage('aadhaarFrontImage', 'aadhaar_front')}
                onRemove={() => setField('aadhaarFrontImage', null)}
              />
            </View>
            <View style={styles.half}>
              <DocumentUploadTile
                label="Aadhaar Back"
                imageUri={values.aadhaarBackImage}
                uploading={uploadingField === 'aadhaarBackImage'}
                error={errors.aadhaarBackImage}
                onPick={() => pickImage('aadhaarBackImage', 'aadhaar_back')}
                onRemove={() => setField('aadhaarBackImage', null)}
              />
            </View>
          </View>
        </SectionCard>

        {/* Business proof */}
        <SectionCard
          icon="briefcase"
          title="Business Verification"
          subtitle="GST certificate / business registration proof"
          onLayout={(y) => (sectionOffsets.current.business = y)}
        >
          <CustomInput
            label="Enter Document Number (optional)"
            value={values.businessDocNumber}
            onChangeText={(t) => setField('businessDocNumber', t)}
            autoCapitalize="characters"
          />
          <DocumentUploadTile
            label="Business Proof Document"
            imageUri={values.businessDocImage}
            uploading={uploadingField === 'businessDocImage'}
            error={errors.businessDocImage}
            onPick={() => pickImage('businessDocImage', 'business_doc')}
            onRemove={() => setField('businessDocImage', null)}
          />
        </SectionCard>

        {/* Shop license */}
        <SectionCard
          icon="file-text"
          title="Shop Verification"
          subtitle="Shop act / trade license"
          onLayout={(y) => (sectionOffsets.current.license = y)}
        >
          <CustomInput
            label="Enter License Number (optional)"
            value={values.shopLicenseNumber}
            onChangeText={(t) => setField('shopLicenseNumber', t)}
            autoCapitalize="characters"
          />
          <DocumentUploadTile
            label="Shop License Document"
            imageUri={values.shopLicenseImage}
            uploading={uploadingField === 'shopLicenseImage'}
            error={errors.shopLicenseImage}
            onPick={() => pickImage('shopLicenseImage', 'shop_license')}
            onRemove={() => setField('shopLicenseImage', null)}
          />
        </SectionCard>

        {/* Review */}
        <View style={styles.card} onLayout={(e) => (sectionOffsets.current.review = e.nativeEvent.layout.y)}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconWrap}>
              <FeatherIcon name="check-square" size={15} color={colors.primary} />
            </View>
            <Text style={styles.sectionLabel}>Review & Submit</Text>
          </View>

          <View style={styles.reviewThumbRow}>
            <ReviewThumb label="PAN" uri={values.panImage} />
            <ReviewThumb label="Aadhaar Front" uri={values.aadhaarFrontImage} />
            <ReviewThumb label="Aadhaar Back" uri={values.aadhaarBackImage} />
            <ReviewThumb label="Business" uri={values.businessDocImage} />
            <ReviewThumb label="License" uri={values.shopLicenseImage} />
          </View>

          <View style={styles.reviewGroup}>
            <View style={styles.reviewGroupHeader}>
              <Text style={styles.reviewGroupTitle}>PAN</Text>
              <TouchableOpacity onPress={() => scrollToStep('pan')} hitSlop={8}>
                <FeatherIcon name="edit-2" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ReviewRow label="PAN Number" value={values.panNumber} />
          </View>

          <View style={styles.reviewGroup}>
            <View style={styles.reviewGroupHeader}>
              <Text style={styles.reviewGroupTitle}>Aadhaar</Text>
              <TouchableOpacity onPress={() => scrollToStep('aadhaar')} hitSlop={8}>
                <FeatherIcon name="edit-2" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ReviewRow label="Aadhaar Number" value={values.aadhaarNumber} />
          </View>

          <View style={styles.reviewGroup}>
            <View style={styles.reviewGroupHeader}>
              <Text style={styles.reviewGroupTitle}>Business</Text>
              <TouchableOpacity onPress={() => scrollToStep('business')} hitSlop={8}>
                <FeatherIcon name="edit-2" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ReviewRow label="Document Number" value={values.businessDocNumber || '—'} />
          </View>

          <View style={[styles.reviewGroup, styles.reviewGroupLast]}>
            <View style={styles.reviewGroupHeader}>
              <Text style={styles.reviewGroupTitle}>Shop License</Text>
              <TouchableOpacity onPress={() => scrollToStep('license')} hitSlop={8}>
                <FeatherIcon name="edit-2" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ReviewRow label="License Number" value={values.shopLicenseNumber || '—'} />
          </View>

          {!reviewDone && (
            <View style={styles.reviewIncompleteNote}>
              <FeatherIcon name="alert-circle" size={14} color={colors.error} />
              <Text style={styles.reviewIncompleteText}>
                Some required documents are still missing — complete them above before submitting.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.registerButtonWrap}>
          {/* Footer CTA */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={submitting}
            onPress={handleSubmit}
            style={submitting ? styles.disabledWrapper : undefined}
          >
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.registerButton}
            >
              {submitting ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <View style={styles.registerButtonContent}>
                  <Text style={styles.registerButtonText}>Submit KYC</Text>
                  <FeatherIcon name="arrow-right" size={18} color={colors.white} />
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
          </View>


        
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.surface },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    marginBottom: spacing.md,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 2,
    ...Platform.select({
      ios: {
        paddingHorizontal:-2,
        paddingTop: 5,
        paddingBottom: 3,
      },
      android: {
      
      },
    }),
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginRight: spacing.md,
    ...Platform.select({
      ios:{
       marginLeft: 15,
      },
      android:{

      }
    })
  },
  headerTextWrap: {
    flex: 1,
    ...Platform.select({
      ios: {
        margin:20,
      },
      android: {
        marginLeft: 0,
      },
    }),
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 3,
    fontWeight: '500',
  },
  headerBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        marginRight: 15,
      },
      android: {
        marginRight: 0,
      },
    }),
  },

  scrollContent: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 150,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { width: '48%' },

  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#EFEAF8',
    shadowColor: '#2B1E4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressTitle: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  progressPercent: { fontSize: 13, fontWeight: '700', color: colors.primary },
  progressTrack: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.disabled,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.primary },

  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.lg },
  stepItem: { alignItems: 'center', width: 48 },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ---- Scroll / layout -------------------------------------------------
  scrollContent: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 100,
    paddingLeft: 13,
    paddingRight: 13
  },
  stepCircleDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  stepCircleCurrent: { borderColor: colors.primary, backgroundColor: colors.chipBg },
  stepNumber: { fontSize: 11, fontWeight: '700', color: colors.textLabel },
  stepNumberCurrent: { color: colors.primary },
  stepLabel: { fontSize: 9.5, color: colors.textLabel, marginTop: 4, textAlign: 'center' },
  stepLabelActive: { color: colors.textPrimary, fontWeight: '600' },
  stepConnector: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.border,
    marginTop: 13,
    marginHorizontal: -4,
  },
  stepConnectorDone: { backgroundColor: colors.primary },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#EFEAF8',
    shadowColor: '#2B1E4D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 1,
  },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  sectionIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  sectionSubtitle: { fontSize: 11.5, color: colors.textLabel, marginTop: 2 },

  // ---- Upload tile ----
  uploadWrapper: { marginBottom: spacing.lg },
  uploadLabel: { fontSize: 12.5, fontWeight: '600', color: colors.textLabel, marginBottom: spacing.sm },
  uploadTile: {
    height: 140,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  uploadTileFilled: { borderStyle: 'solid', borderColor: colors.border },
  uploadTileError: { borderColor: colors.error },
  uploadPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  uploadIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  uploadPlaceholderText: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  uploadPlaceholderHint: { fontSize: 10.5, color: colors.textLabel, marginTop: 2 },
  uploadImage: { width: '100%', height: '100%' },
  uploadActionsRow: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
  },
  uploadActionBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(20,14,33,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadErrorText: { marginTop: 4, fontSize: typography.helper, color: colors.error },

  // ---- Review ----
  reviewThumbRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
  reviewThumbWrap: { width: 64, marginRight: spacing.sm, marginBottom: spacing.sm },
  reviewThumb: { width: 64, height: 64, borderRadius: radius.sm, backgroundColor: colors.disabled },
  reviewThumbLabel: { fontSize: 9.5, color: colors.textLabel, marginTop: 3, textAlign: 'center' },

  reviewGroup: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F2EFF9',
  },
  reviewGroupLast: { marginBottom: 0, paddingBottom: 0, borderBottomWidth: 0 },
  reviewGroupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewGroupTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  reviewLabel: { fontSize: 13, color: colors.textLabel, flex: 0.5 },
  reviewValue: { fontSize: 13, color: colors.textPrimary, fontWeight: '600', flex: 0.5, textAlign: 'right' },

  reviewIncompleteNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorBg,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  reviewIncompleteText: { flex: 1, fontSize: 11.5, color: colors.error, marginLeft: spacing.xs },




  registerButtonWrap: {
    paddingBottom: spacing.lg,
    backgroundColor:'none'
    
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#EFEAF8',
    shadowColor: '#2B1E4D',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
    ...Platform.select({
      ios: {
        paddingTop: -2,
        position: '',
        
      },
      android: {
        paddingBottom:0,
      },
    }),
  },
  registerButton: {
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  registerButtonContent: { flexDirection: 'row', alignItems: 'center' },
  registerButtonText: { color: colors.white, fontSize: typography.button, fontWeight: '700', marginRight: spacing.sm },
  disabledWrapper: { opacity: 0.65 },
});