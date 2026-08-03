import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from '@react-native-vector-icons/feather';
import Toast from 'react-native-toast-message';

import CustomInput from '../../components/registerFormCompo/CutomInput';
import CustomDropdown, { DropdownOption } from '../../components/registerFormCompo/CustomDown';
import MobileOtpField from '../../components/registerFormCompo/mobileOtpfield';

import { colors, spacing, typography, radius } from '../../color/Colurs';
import {
  validateRegisterForm,
  RegisterFormValues,
  RegisterFormErrors,
} from '../../utils/validators';
import {
  lookupPincode,
  registerVendor,
  fetchOwners,
  fetchMonthlyBusinessRanges,
  fetchMajorServices,
  ROLE_OPTIONS,
} from '../../services/RegisterServices';
import AppHeader from '../../components/AppHeader';

const INITIAL_VALUES: RegisterFormValues = {
  fullName: '',
  email: '',
  mobile: '',
  otp: '',
  otpVerified: false,
  shopName: '',
  pincode: '',
  state: '',
  city: '',
  block: '',
  subArea: '',
  address: '',
  role: '',
  owner: '',
  monthlyBusiness: '',
  majorServices: [],
};

type Props = {
  navigation?: { goBack: () => void };
};

type StepKey = 'personal' | 'shop' | 'business' | 'review';

const STEPS: { key: StepKey; label: string; icon: React.ComponentProps<typeof FeatherIcon>['name'] }[] = [
  { key: 'personal', label: 'Personal', icon: 'user' },
  { key: 'shop', label: 'Shop', icon: 'shopping-bag' },
  { key: 'business', label: 'Business', icon: 'briefcase' },
  { key: 'review', label: 'Review', icon: 'check-square' },
];

/** Small presentational wrapper so every section reads as a distinct card
 *  with an icon + title, instead of one long unbroken form. */
function SectionCard({
  icon,
  title,
  onLayout,
  children,
}: {
  icon: React.ComponentProps<typeof FeatherIcon>['name'];
  title: string;
  onLayout?: (y: number) => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card} onLayout={(e) => onLayout && onLayout(e.nativeEvent.layout.y)}>
      <View style={styles.sectionHeaderRow}>
        <View style={styles.sectionIconWrap}>
          <FeatherIcon name={icon} size={15} color={colors.primary} />
        </View>
        <Text style={styles.sectionLabel}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

/** Horizontal step tracker: 4 stages (Personal / Shop / Business / Review),
 *  each marked complete, current, or upcoming based on form progress. */
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
                  <FeatherIcon name="check" size={13} color={colors.white} />
                ) : (
                  <Text style={[styles.stepNumber, isCurrent && styles.stepNumberCurrent]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[styles.stepLabel, (isDone || isCurrent) && styles.stepLabelActive]}
                numberOfLines={1}
              >
                {step.label}
              </Text>
            </View>
            {!isLast && (
              <View style={[styles.stepConnector, isDone && styles.stepConnectorDone]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

/** Read-only "Field: Value" row used inside the Review card. */
function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

export default function RegisterUserScreen({ navigation }: Props) {
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const [subAreaOptions, setSubAreaOptions] = useState<DropdownOption[]>([]);
  const [ownerOptions, setOwnerOptions] = useState<DropdownOption[]>([]);
  const [businessOptions, setBusinessOptions] = useState<DropdownOption[]>([]);
  const [serviceOptions, setServiceOptions] = useState<DropdownOption[]>([]);

  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const sectionOffsets = useRef<Record<StepKey, number>>({
    personal: 0,
    shop: 0,
    business: 0,
    review: 0,
  });

  // Preload static-ish dropdown data once. In a real integration these could
  // also be role-dependent and re-fetched when `values.role` changes.
  useEffect(() => {
    (async () => {
      const [owners, business, services] = await Promise.all([
        fetchOwners(),
        fetchMonthlyBusinessRanges(),
        fetchMajorServices(),
      ]);
      setOwnerOptions(owners);
      setBusinessOptions(business);
      setServiceOptions(services);
    })();
  }, []);

  const setField = <K extends keyof RegisterFormValues>(key: K, val: RegisterFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // Auto-fetch state / city / block / sub-area options once a valid 6-digit
  // pin code is entered - mirrors the behaviour implied by the screenshots.
  useEffect(() => {
    const run = async () => {
      if (values.pincode.length === 6) {
        setPincodeLoading(true);
        const result = await lookupPincode(values.pincode);
        setPincodeLoading(false);
        if (result) {
          setValues((prev) => ({
            ...prev,
            state: result.state,
            city: result.city,
            block: result.block,
            subArea: '',
          }));
          setSubAreaOptions(result.subAreas);
        } else {
          Toast.show({ type: 'error', text1: 'Could not fetch details for this pin code' });
        }
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.pincode]);

  // ---- Per-section + overall completion (drives the step tracker + %) ----
  const personalDone = !!(values.fullName && values.email && values.mobile && values.otpVerified);
  const shopDone = !!(
    values.shopName &&
    values.pincode &&
    values.state &&
    values.city &&
    values.subArea &&
    values.address
  );
  const businessDone = !!(
    values.role &&
    values.owner &&
    values.monthlyBusiness &&
    values.majorServices.length > 0
  );
  const reviewDone = personalDone && shopDone && businessDone;

  const completedSteps: Record<StepKey, boolean> = {
    personal: personalDone,
    shop: shopDone,
    business: businessDone,
    review: reviewDone,
  };

  const currentStep: StepKey = !personalDone
    ? 'personal'
    : !shopDone
      ? 'shop'
      : !businessDone
        ? 'business'
        : 'review';

  const progress = useMemo(() => {
    const fields: (keyof RegisterFormValues)[] = [
      'fullName',
      'email',
      'mobile',
      'shopName',
      'pincode',
      'address',
      'role',
      'owner',
      'monthlyBusiness',
    ];
    const filled = fields.filter((f) => !!values[f]).length + (values.otpVerified ? 1 : 0);
    const total = fields.length + 1;
    return Math.min(1, filled / total);
  }, [values]);

  const progressPct = Math.round(progress * 100);

  const scrollToStep = (key: StepKey) => {
    const y = sectionOffsets.current[key];
    scrollRef.current?.scrollToPosition(0, Math.max(y - 12, 0), true);
  };

  const handleSubmit = async () => {
    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Toast.show({ type: 'error', text1: 'Please complete all required fields' });
      return;
    }

    setSubmitting(true);
    const res = await registerVendor({
      fullName: values.fullName,
      email: values.email,
      mobile: values.mobile,
      shopName: values.shopName,
      pincode: values.pincode,
      state: values.state,
      city: values.city,
      block: values.block,
      subArea: values.subArea,
      address: values.address,
      role: values.role,
      owner: values.owner,
      monthlyBusiness: values.monthlyBusiness,
      majorServices: values.majorServices,
    });
    setSubmitting(false);

    if (res.success) {
      Toast.show({ type: 'success', text1: res.message });
      navigation?.goBack();
    } else {
      Toast.show({ type: 'error', text1: res.message });
    }
  };

  const roleLabel = ROLE_OPTIONS.find((o) => o.value === values.role)?.label ?? values.role;
  const ownerLabel = ownerOptions.find((o) => o.value === values.owner)?.label ?? values.owner;
  const businessLabel =
    businessOptions.find((o) => o.value === values.monthlyBusiness)?.label ?? values.monthlyBusiness;
  const servicesLabel = serviceOptions
    .filter((o) => values.majorServices.includes(o.value))
    .map((o) => o.label)
    .join(', ');
  const subAreaLabel = subAreaOptions.find((o) => o.value === values.subArea)?.label ?? values.subArea;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader/>
      {/* Single scroll view — holds progress card, all sections, and review */}
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
          <Text style={styles.headerTitle}>Register</Text>
          <Text style={styles.headerSubtitle}>Onboard a new vendor / shop</Text>
        </View>

        <View style={styles.headerBadge}>
          <FeatherIcon name="user-plus" size={18} color={colors.white} />
        </View>
      </LinearGradient>

      
        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressTopRow}>
            <Text style={styles.progressTitle}>Registration progress</Text>
            <Text style={styles.progressPercent}>{progressPct}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
          </View>

          <StepIndicator completedSteps={completedSteps} currentStep={currentStep} />
        </View>

        {/* Personal details */}
        <SectionCard
          icon="user"
          title="Personal Details"
          onLayout={(y) => (sectionOffsets.current.personal = y)}
        >
          <CustomInput
            label="Enter Full Name"
            value={values.fullName}
            onChangeText={(t) => setField('fullName', t)}
            autoCapitalize="words"
            error={errors.fullName}
          />
          <CustomInput
            label="Enter E-Mail"
            value={values.email}
            onChangeText={(t) => setField('email', t)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <MobileOtpField
            mobile={values.mobile}
            otp={values.otp}
            otpVerified={values.otpVerified}
            onMobileChange={(v) => setField('mobile', v)}
            onOtpChange={(v) => setField('otp', v)}
            onVerified={(v) => setField('otpVerified', v)}
            mobileError={errors.mobile}
            otpError={errors.otp}
          />
        </SectionCard>

        {/* Shop details */}
        <SectionCard
          icon="shopping-bag"
          title="Shop Details"
          onLayout={(y) => (sectionOffsets.current.shop = y)}
        >
          <CustomInput
            label="Enter Shop Name"
            value={values.shopName}
            onChangeText={(t) => setField('shopName', t)}
            autoCapitalize="words"
            error={errors.shopName}
          />

          <View style={styles.row}>
            <CustomInput
              label="Pin code"
              value={values.pincode}
              onChangeText={(t) => setField('pincode', t.replace(/[^0-9]/g, '').slice(0, 6))}
              keyboardType="number-pad"
              maxLength={6}
              error={errors.pincode}
              containerStyle={styles.half}
              rightElement={
                pincodeLoading ? <ActivityIndicator size="small" color={colors.primary} /> : null
              }
            />
            <CustomInput
              label="State"
              value={values.state}
              editable={false}
              containerStyle={styles.half}
              error={errors.state}
            />
          </View>

          <View style={styles.row}>
            <CustomInput
              label="City"
              value={values.city}
              editable={false}
              containerStyle={styles.half}
              error={errors.city}
            />
            <CustomInput
              label="Block"
              value={values.block}
              editable={false}
              containerStyle={styles.half}
            />
          </View>

          <CustomDropdown
            label="Select sub-area"
            options={subAreaOptions}
            value={values.subArea}
            onChange={(v) => setField('subArea', v as string)}
            disabled={subAreaOptions.length === 0}
            error={errors.subArea}
          />

          <CustomInput
            label="Enter address"
            value={values.address}
            onChangeText={(t) => setField('address', t)}
            multiline
            error={errors.address}
          />
        </SectionCard>

        {/* Business details */}
        <SectionCard
          icon="briefcase"
          title="Business Details"
          onLayout={(y) => (sectionOffsets.current.business = y)}
        >
          <CustomDropdown
            label="Role"
            options={ROLE_OPTIONS}
            value={values.role}
            onChange={(v) => setField('role', v as string)}
            error={errors.role}
          />
          <CustomDropdown
            label="Select Owner"
            options={ownerOptions}
            value={values.owner}
            onChange={(v) => setField('owner', v as string)}
            searchable
            error={errors.owner}
          />
          <CustomDropdown
            label="Select Monthly Bussiness"
            options={businessOptions}
            value={values.monthlyBusiness}
            onChange={(v) => setField('monthlyBusiness', v as string)}
            error={errors.monthlyBusiness}
          />
          <CustomDropdown
            label="Select Major Services"
            options={serviceOptions}
            value={values.majorServices}
            onChange={(v) => setField('majorServices', v as string[])}
            multiSelect
            error={errors.majorServices}
          />
        </SectionCard>

        {/* Review */}
        <View style={styles.card} onLayout={(e) => (sectionOffsets.current.review = e.nativeEvent.layout.y)}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconWrap}>
              <FeatherIcon name="check-square" size={15} color={colors.primary} />
            </View>
            <Text style={styles.sectionLabel}>Review Details</Text>
          </View>

          <View style={styles.reviewGroup}>
            <View style={styles.reviewGroupHeader}>
              <Text style={styles.reviewGroupTitle}>Personal</Text>
              <TouchableOpacity onPress={() => scrollToStep('personal')} hitSlop={8}>
                <FeatherIcon name="edit-2" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ReviewRow label="Full Name" value={values.fullName} />
            <ReviewRow label="Email" value={values.email} />
            <ReviewRow
              label="Mobile"
              value={values.mobile ? `${values.mobile}${values.otpVerified ? ' (verified)' : ''}` : ''}
            />
          </View>

          <View style={styles.reviewGroup}>
            <View style={styles.reviewGroupHeader}>
              <Text style={styles.reviewGroupTitle}>Shop</Text>
              <TouchableOpacity onPress={() => scrollToStep('shop')} hitSlop={8}>
                <FeatherIcon name="edit-2" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ReviewRow label="Shop Name" value={values.shopName} />
            <ReviewRow label="Pin code" value={values.pincode} />
            <ReviewRow label="State" value={values.state} />
            <ReviewRow label="City" value={values.city} />
            <ReviewRow label="Block" value={values.block} />
            <ReviewRow label="Sub-area" value={subAreaLabel} />
            <ReviewRow label="Address" value={values.address} />
          </View>

          <View style={[styles.reviewGroup, styles.reviewGroupLast]}>
            <View style={styles.reviewGroupHeader}>
              <Text style={styles.reviewGroupTitle}>Business</Text>
              <TouchableOpacity onPress={() => scrollToStep('business')} hitSlop={8}>
                <FeatherIcon name="edit-2" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <ReviewRow label="Role" value={roleLabel} />
            <ReviewRow label="Owner" value={ownerLabel} />
            <ReviewRow label="Monthly Business" value={businessLabel} />
            <ReviewRow label="Major Services" value={servicesLabel} />
          </View>

          {!reviewDone && (
            <View style={styles.reviewIncompleteNote}>
              <FeatherIcon name="alert-circle" size={14} color={colors.error} />
              <Text style={styles.reviewIncompleteText}>
                Some required fields are still missing — complete them above before submitting.
              </Text>
            </View>
          )}
        </View>
     

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.85} disabled={submitting} onPress={handleSubmit}>
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
                <Text style={styles.registerButtonText}>Register</Text>
                <View style={styles.registerButtonIcon}>
                  <FeatherIcon name="arrow-right" size={18} color={colors.white}  />
                </View>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
       </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles (kept in the same file as requested)
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
    
  },

  // ---- Header (premium gradient, fixed) --------------------------------
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    marginBottom:spacing.md,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    borderTopLeftRadius:radius.lg,
    borderTopRightRadius:radius.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 2,
    ...Platform.select({
      ios: {
        paddingTop: 0,
        paddingHorizontal: -2,
        paddingBottom: spacing.xl,
        // marginBottom:spacing.md,
        height: 115,
        paddingBottom:15,
      },
      android: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    })
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
      ios: {
        marginLeft: 15,
        // marginTop:30,
      },
      android: {},
    }),
  },



  headerTextWrap: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        paddingTop: 0,
      },
    })
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
      ios:{
       marginRight: 15,
      },
      android:{
      }
    })
  },

  // ---- Scroll / layout -------------------------------------------------
  scrollContent: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 100,
    paddingLeft:13,
    paddingRight:13
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },

  // ---- Progress card -----------------------------------------------------
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
  progressTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  progressTrack: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.disabled,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },

  // ---- Step indicator -------------------------------------------------
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.lg,
  },
  stepItem: {
    alignItems: 'center',
    width: 56,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepCircleCurrent: {
    borderColor: colors.primary,
    backgroundColor: colors.chipBg,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLabel,
  },
  stepNumberCurrent: {
    color: colors.primary,
  },
  stepLabel: {
    fontSize: 10.5,
    color: colors.textLabel,
    marginTop: 4,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  stepConnector: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.border,
    marginTop: 14,
    marginHorizontal: -6,
  },
  stepConnectorDone: {
    backgroundColor: colors.primary,
  },

  // ---- Section cards -------------------------------------------------
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
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

  // ---- Review card -------------------------------------------------
  reviewGroup: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    marginTop:spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F2EFF9',
  },
  reviewGroupLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
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
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  reviewLabel: {
    fontSize: 13,
    color: colors.textLabel,
    flex: 0.42,
  },
  reviewValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 0.58,
    textAlign: 'right',
  },
  reviewIncompleteNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorBg,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  reviewIncompleteText: {
    flex: 1,
    fontSize: 11.5,
    color: colors.error,
    marginLeft: spacing.xs,
  },

  // ---- Footer / CTA -------------------------------------------------
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#EFEAF8',
    shadowColor: '#8b2497',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
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
    ...Platform.select({
      ios: {
        paddingHorizontal: 0,
        paddingVertical: 16,
        paddingBottom: 16,
        height: 80,

      },
      android: {
        paddingHorizontal: 0,
      },
    }),
  },
  registerButtonIcon: {
    ...Platform.select({
      ios: {
        paddingBottom: 26,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
  registerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: typography.button,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginRight: spacing.sm,
    ...Platform.select({
      ios: {
        marginRight: 10,
        paddingBottom: 28,
      },
      android: {
        marginRight: 0,
      },
    }),
  },
  disabledWrapper: {
    opacity: 0.65,
    

  },
});