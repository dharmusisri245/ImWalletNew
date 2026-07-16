import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from '@react-native-vector-icons/feather';
import Toast from 'react-native-toast-message';
import CustomInput from './CutomInput';
import { colors, spacing, typography } from '../../color/Colurs';
import { sendOtp, verifyOtp } from '../../services/RegisterServices';
import { isValidMobile, isValidOtp } from '../../utils/validators';

const RESEND_SECONDS = 30;

type Props = {
  mobile: string;
  otp: string;
  otpVerified: boolean;
  onMobileChange: (v: string) => void;
  onOtpChange: (v: string) => void;
  onVerified: (verified: boolean) => void;
  mobileError?: string;
  otpError?: string;
};

/**
 * Combines "Mobile Number" + "Enter OTP" into the paired-column layout
 * shown in the mock, plus the send/verify/resend-timer behaviour.
 */
export default function MobileOtpField({
  mobile,
  otp,
  otpVerified,
  onMobileChange,
  onOtpChange,
  onVerified,
  mobileError,
  otpError,
}: Props) {
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    setTimer(RESEND_SECONDS);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!isValidMobile(mobile)) {
      Toast.show({ type: 'error', text1: 'Enter a valid 10-digit mobile number' });
      return;
    }
    setSending(true);
    const res = await sendOtp(mobile);
    setSending(false);
    if (res.success) {
      setOtpSent(true);
      startTimer();
      Toast.show({ type: 'success', text1: res.message });
    } else {
      Toast.show({ type: 'error', text1: res.message });
    }
  };

  const handleVerifyOtp = async () => {
    if (!isValidOtp(otp)) {
      Toast.show({ type: 'error', text1: 'Enter the 6-digit OTP' });
      return;
    }
    setVerifying(true);
    const res = await verifyOtp(mobile, otp);
    setVerifying(false);
    onVerified(res.success);
    Toast.show({ type: res.success ? 'success' : 'error', text1: res.message });
  };

  return (
    <View style={styles.row}>
      <CustomInput
        label="Mobile Number"
        value={mobile}
        onChangeText={(t) => {
          onMobileChange(t.replace(/[^0-9]/g, '').slice(0, 10));
          if (otpSent) {
            setOtpSent(false);
            onOtpChange('');
            onVerified(false);
          }
        }}
        keyboardType="number-pad"
        maxLength={10}
        editable={!otpVerified}
        error={mobileError}
        containerStyle={styles.half}
        rightElement={
          !otpVerified ? (
            <TouchableOpacity
              onPress={handleSendOtp}
              disabled={sending || timer > 0}
              hitSlop={8}
            >
              <Text
                style={[
                  styles.actionText,
                  (sending || timer > 0) && styles.actionTextDisabled,
                ]}
              >
                {sending ? 'Sending…' : timer > 0 ? `${otpSent ? 'Resend' : 'Send'} ${timer}s` : otpSent ? 'Resend' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          ) : (
            <FeatherIcon name="check-circle" size={18} color={colors.success} />
          )
        }
      />

      <CustomInput
        label="Enter OTP"
        value={otp}
        onChangeText={(t) => onOtpChange(t.replace(/[^0-9]/g, '').slice(0, 6))}
        keyboardType="number-pad"
        maxLength={6}
        editable={otpSent && !otpVerified}
        error={otpError}
        containerStyle={styles.half}
        rightElement={
          otpSent && !otpVerified ? (
            <TouchableOpacity onPress={handleVerifyOtp} disabled={verifying} hitSlop={8}>
              <Text style={styles.actionText}>{verifying ? 'Verifying…' : 'Verify'}</Text>
            </TouchableOpacity>
          ) : otpVerified ? (
            <FeatherIcon name="check-circle" size={18} color={colors.success} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  actionTextDisabled: {
    color: colors.textPlaceholder,
  },
});