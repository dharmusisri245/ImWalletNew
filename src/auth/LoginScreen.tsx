


// import React, { useRef, useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     StatusBar,
//     //   KeyboardAvoidingView,
//     //   ScrollView,
//     Platform,
//     Animated,
//     Alert,
//     ActivityIndicator,
// } from 'react-native';


// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import Video from 'react-native-video';
// import LinearGradient from 'react-native-linear-gradient';
// import { BlurView } from '@react-native-community/blur';
// import Feather from '@react-native-vector-icons/feather';

// import authService from '../auth/rtkApi/authService';
// import { useNavigation } from '@react-navigation/native';




// // Replace with your own ImWallet brand advertisement video (mp4, looped, muted, ~15-30s).
// // Local asset example: source={require('../../assets/videos/imwallet-ad.mp4')}
// const AD_VIDEO_SOURCE = {
//     uri: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-typing-on-a-laptop-4132-large.mp4',
// };

// const OTP_LENGTH = 4;
// const RESEND_SECONDS = 30;

// // ---------- Brand color palette (from partner.imwallet.in) ----------
// const COLORS = {
//     primary: '#6C2BD9',      // main purple (header bar / buttons on website)
//     primaryDark: '#4C1D95',  // darker purple for gradient end
//     primaryLight: '#8B5CF6', // lighter purple accent
//     background: '#FFFFFF',
//     surface: '#F5F3FA',      // light purple-tinted input background
//     border: '#E4DFF3',
//     textDark: '#241B3A',
//     textMuted: '#6B7280',
//     error: '#DC2626',
//     errorBg: '#FEF2F2',
//     errorBorder: '#FCA5A5',
// };

// export default function LoginScreen({ onLoginSuccess }: { onLoginSuccess?: (result: any) => void }) {
//     const navigation = useNavigation()
//     const [empId, setEmpId] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
//     const [focusedOtpIndex, setFocusedOtpIndex] = useState(null);
//     const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
//     const [loading, setLoading] = useState(false);
//     const [errorMsg, setErrorMsg] = useState('');
//     const [timer, setTimer] = useState(RESEND_SECONDS);

//     const otpRefs = useRef([]);
//     const cardAnim = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.timing(cardAnim, {
//             toValue: 1,
//             duration: 550,
//             useNativeDriver: true,
//         }).start();
//     }, []);

//     useEffect(() => {
//         let interval;
//         if (step === 'otp' && timer > 0) {
//             interval = setInterval(() => setTimer((t) => t - 1), 1000);
//         }
//         return () => clearInterval(interval);
//     }, [step, timer]);

//     const cardTranslate = cardAnim.interpolate({ inputRange: [0, 1], outputRange: [36, 0] });

//     const handleGetOtp = async () => {
//         setErrorMsg('');
//         if (!empId.trim()) return setErrorMsg('Please enter your Employee ID.');
//         if (!password.trim()) return setErrorMsg('Please enter your password.');

//         setLoading(true);
//         try {
//             await authService.requestOtp(empId.trim(), password);
//             setStep('otp');
//             setTimer(RESEND_SECONDS);
//             setOtp(Array(OTP_LENGTH).fill(''));
//         } catch (err) {
//             setErrorMsg(err.message || 'Something went wrong. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleResendOtp = async () => {
//         if (timer > 0) return;
//         setLoading(true);
//         try {
//             await authService.requestOtp(empId.trim(), password);
//             setTimer(RESEND_SECONDS);
//         } catch (err) {
//             setErrorMsg(err.message || 'Could not resend OTP.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleOtpChange = (value, index) => {
//         const digit = value.replace(/[^0-9]/g, '');
//         const next = [...otp];
//         next[index] = digit;
//         setOtp(next);
//         if (digit && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
//     };

//     const handleOtpKeyPress = (e, index) => {
//         if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//             otpRefs.current[index - 1]?.focus();
//         }
//     };

//     const handleLogin = async () => {
//         setErrorMsg("");

//         const code = otp.join("");

//         if (code.length < OTP_LENGTH) {
//             return setErrorMsg(`Please enter the ${OTP_LENGTH}-digit OTP.`);
//         }

//         setLoading(true);

//         try {
//             const result = await authService.verifyOtp({
//                 employeeId: empId.trim(),
//                 otp: code,
//             });

//             console.log("Login Success:", result);

//             // navigation.reset({ index: 0, routes: [{ name: 'BottomTab' as never }] });
//             navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'BottomTab' }],
//             });

//             console.log("navigation reset success");
//             console.log('will go to BottomTab');

//         } catch (err: any) {
//             console.log(err);
//             setErrorMsg(err.message || "Invalid OTP");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <View style={styles.screen}>
//             <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

//             {/* ---------- Background Advertisement Video ---------- */}
//             <Video
//                 source={AD_VIDEO_SOURCE}
//                 style={StyleSheet.absoluteFill}
//                 resizeMode="cover"
//                 repeat
//                 muted
//                 paused={false}
//                 playInBackground={false}
//             />

//             {/* White wash overlay so the site's clean white background reads through */}
//             <LinearGradient
//                 colors={['#FFFFFF', '#FFFFFF', '#F5F3FA']}
//                 locations={[0, 0.55, 1]}
//                 style={StyleSheet.absoluteFill}
//             />


//             <KeyboardAwareScrollView
//                 contentContainerStyle={styles.scrollContent}
//                 enableOnAndroid={true}
//                 extraScrollHeight={40}
//                 extraHeight={120}
//                 keyboardShouldPersistTaps="handled"
//                 showsVerticalScrollIndicator={false}
//             >

//                 {/* ---------- Brand ---------- */}
//                 <View style={styles.brandWrap}>
//                     <View style={styles.logoCircle}>
//                         <Feather name="credit-card" size={24} color="#FFFFFF" />
//                     </View>
//                     <Text style={styles.brandName}>
//                         Im<Text style={{ color: COLORS.primary }}>Wallet</Text>
//                     </Text>
//                     <Text style={styles.brandTagline}>Power your business. Anytime, anywhere.</Text>
//                 </View>

//                 {/* ---------- Login Card ---------- */}
//                 <Animated.View
//                     style={[styles.cardOuter, { transform: [{ translateY: cardTranslate }], opacity: cardAnim }]}
//                 >
//                     {/* Blur is used ONLY as a flat background layer — never wraps content directly.
//                Wrapping real content inside <BlurView> is what causes the broken/gray-box
//                layout on Android; this layered approach avoids that entirely. */}
//                     <BlurView
//                         style={StyleSheet.absoluteFill}
//                         blurType="light"
//                         blurAmount={18}
//                         overlayColor="rgba(255,255,255,0.75)"
//                         reducedTransparencyFallbackColor="#FFFFFF"
//                     />
//                     <View style={styles.cardTint} />

//                     <View style={styles.cardContent}>
//                         {/* Step indicator */}
//                         <View style={styles.stepRow}>
//                             <View style={[styles.stepDot, styles.stepDotActive]} />
//                             <View style={[styles.stepBar, step === 'otp' && styles.stepBarActive]} />
//                             <View style={[styles.stepDot, step === 'otp' && styles.stepDotActive]} />
//                         </View>

//                         <Text style={styles.welcomeText}>Welcome back, Retailer</Text>
//                         <Text style={styles.subText}>
//                             {step === 'credentials'
//                                 ? 'Sign in with your Employee ID to continue'
//                                 : `Enter the ${OTP_LENGTH}-digit code sent to your registered mobile`}
//                         </Text>

//                         {!!errorMsg && (
//                             <View style={styles.errorBanner}>
//                                 <Feather name="alert-circle" size={14} color={COLORS.error} />
//                                 <Text style={styles.errorText}>{errorMsg}</Text>
//                             </View>
//                         )}

//                         {step === 'credentials' ? (
//                             <>
//                                 <View style={styles.inputWrap}>
//                                     <View style={styles.inputIconWrap}>
//                                         <Feather name="user" size={16} color={COLORS.primary} />
//                                     </View>
//                                     <TextInput
//                                         style={styles.input}
//                                         placeholder="Employee ID"
//                                         placeholderTextColor={COLORS.textMuted}
//                                         autoCapitalize="characters"
//                                         value={empId}
//                                         onChangeText={setEmpId}
//                                     />
//                                 </View>

//                                 <View style={styles.inputWrap}>
//                                     <View style={styles.inputIconWrap}>
//                                         <Feather name="lock" size={16} color={COLORS.primary} />
//                                     </View>
//                                     <TextInput
//                                         style={styles.input}
//                                         placeholder="Password"
//                                         placeholderTextColor={COLORS.textMuted}
//                                         secureTextEntry={!showPassword}
//                                         value={password}
//                                         onChangeText={setPassword}
//                                     />
//                                     <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
//                                         <Feather name={showPassword ? 'eye-off' : 'eye'} size={17} color={COLORS.textMuted} />
//                                     </TouchableOpacity>
//                                 </View>

//                                 <TouchableOpacity style={styles.forgotWrap} hitSlop={8}>
//                                     <Text style={styles.forgotText}>Forgot Password?</Text>
//                                 </TouchableOpacity>

//                                 <TouchableOpacity onPress={handleGetOtp} disabled={loading} activeOpacity={0.88}>
//                                     <LinearGradient
//                                         colors={[COLORS.primary, COLORS.primaryDark]}
//                                         start={{ x: 0, y: 0 }}
//                                         end={{ x: 1, y: 0 }}
//                                         style={styles.primaryBtnGradient}
//                                     >
//                                         {loading ? (
//                                             <ActivityIndicator color="#FFFFFF" />
//                                         ) : (
//                                             <>
//                                                 <Text style={styles.primaryBtnText}>Get OTP</Text>
//                                                 <Feather name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
//                                             </>
//                                         )}
//                                     </LinearGradient>
//                                 </TouchableOpacity>
//                             </>
//                         ) : (
//                             <>
//                                 <View style={styles.otpRow}>
//                                     {otp.map((digit, index) => (
//                                         <TextInput
//                                             key={index}
//                                             ref={(ref) => (otpRefs.current[index] = ref)}
//                                             style={[styles.otpBox, focusedOtpIndex === index && styles.otpBoxFocused]}
//                                             value={digit}
//                                             onChangeText={(v) => handleOtpChange(v, index)}
//                                             onKeyPress={(e) => handleOtpKeyPress(e, index)}
//                                             onFocus={() => setFocusedOtpIndex(index)}
//                                             onBlur={() => setFocusedOtpIndex(null)}
//                                             keyboardType="number-pad"
//                                             maxLength={1}
//                                             textAlign="center"
//                                         />
//                                     ))}
//                                 </View>

//                                 <View style={styles.resendRow}>
//                                     <Text style={styles.resendHint}>Didn't get the code?</Text>
//                                     {timer > 0 ? (
//                                         <Text style={styles.timerText}>Resend in 0:{timer.toString().padStart(2, '0')}</Text>
//                                     ) : (
//                                         <TouchableOpacity onPress={handleResendOtp} hitSlop={8}>
//                                             <Text style={styles.resendText}>Resend OTP</Text>
//                                         </TouchableOpacity>
//                                     )}
//                                 </View>

//                                 <TouchableOpacity onPress={handleLogin} disabled={loading} activeOpacity={0.88}>
//                                     <LinearGradient
//                                         colors={[COLORS.primary, COLORS.primaryDark]}
//                                         start={{ x: 0, y: 0 }}
//                                         end={{ x: 1, y: 0 }}
//                                         style={styles.primaryBtnGradient}
//                                     >
//                                         {loading ? (
//                                             <ActivityIndicator color="#FFFFFF" />
//                                         ) : (
//                                             <>
//                                                 <Feather name="shield" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
//                                                 <Text style={styles.primaryBtnText}>Login</Text>
//                                             </>
//                                         )}
//                                     </LinearGradient>
//                                 </TouchableOpacity>

//                                 <TouchableOpacity style={styles.backRow} onPress={() => setStep('credentials')} hitSlop={8}>
//                                     <Feather name="arrow-left" size={14} color={COLORS.textMuted} />
//                                     <Text style={styles.backText}>Back to login</Text>
//                                 </TouchableOpacity>
//                             </>
//                         )}

//                         <View style={styles.dividerRow}>
//                             <View style={styles.dividerLine} />
//                             <Text style={styles.dividerText}>need help?</Text>
//                             <View style={styles.dividerLine} />
//                         </View>

//                         <TouchableOpacity style={styles.supportRow} hitSlop={8}>
//                             <Feather name="headphones" size={14} color={COLORS.primary} />
//                             <Text style={styles.supportText}>Contact ImWallet Support</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </Animated.View>

//                 <Text style={styles.footerText}>
//                     By continuing you agree to ImWallet's Terms of Service & Privacy Policy
//                 </Text>
//             </KeyboardAwareScrollView>
//         </View >
//     );
// }

// const styles = StyleSheet.create({
//     screen: { flex: 1, backgroundColor: COLORS.background },
//     scrollContent: { flexGrow: 1, justifyContent: 'flex-end', paddingBottom: 24 },

//     brandWrap: { alignItems: 'center', marginTop: 64, marginBottom: 28, paddingHorizontal: 24 },
//     logoCircle: {
//         width: 58,
//         height: 58,
//         borderRadius: 18,
//         backgroundColor: COLORS.primary,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 12,
//         shadowColor: COLORS.primary,
//         shadowOpacity: 0.35,
//         shadowRadius: 14,
//         shadowOffset: { width: 0, height: 4 },
//         elevation: 6,
//     },
//     brandName: { fontSize: 27, fontWeight: '800', color: COLORS.textDark, letterSpacing: 0.4 },
//     brandTagline: { fontSize: 12.5, color: COLORS.textMuted, marginTop: 6, textAlign: 'center' },

//     cardOuter: {
//         marginHorizontal: 18,
//         borderRadius: 28,
//         overflow: 'hidden',
//         borderWidth: 1,
//         borderColor: COLORS.border,
//         backgroundColor: COLORS.background,
//         shadowColor: '#000000',
//         shadowOpacity: 0.12,
//         shadowRadius: 24,
//         shadowOffset: { width: 0, height: 10 },
//         elevation: 10,
//     },
//     cardTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.55)' },
//     cardContent: { paddingHorizontal: 22, paddingTop: 24, paddingBottom: 22 },

//     stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
//     stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border },
//     stepDotActive: { backgroundColor: COLORS.primary },
//     stepBar: { flex: 1, height: 2, backgroundColor: COLORS.border, marginHorizontal: 6, borderRadius: 1 },
//     stepBarActive: { backgroundColor: COLORS.primaryDark },

//     welcomeText: { fontSize: 19, fontWeight: '800', color: COLORS.textDark },
//     subText: { fontSize: 12.5, color: COLORS.textMuted, marginTop: 4, marginBottom: 18, lineHeight: 17 },

//     errorBanner: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: COLORS.errorBg,
//         borderWidth: 1,
//         borderColor: COLORS.errorBorder,
//         borderRadius: 10,
//         paddingHorizontal: 12,
//         paddingVertical: 9,
//         marginBottom: 14,
//         marginTop: -6,
//     },
//     errorText: { color: COLORS.error, fontSize: 11.5, marginLeft: 8, flex: 1 },

//     inputWrap: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: COLORS.surface,
//         borderRadius: 14,
//         borderWidth: 1,
//         borderColor: COLORS.border,
//         paddingHorizontal: 10,
//         height: 54,
//         marginBottom: 14,
//     },
//     inputIconWrap: {
//         width: 30,
//         height: 30,
//         borderRadius: 9,
//         backgroundColor: '#FFFFFF',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     input: { flex: 1, color: COLORS.textDark, fontSize: 14.5, marginLeft: 10 },

//     forgotWrap: { alignSelf: 'flex-end', marginBottom: 18, marginTop: -2 },
//     forgotText: { color: COLORS.primary, fontSize: 12, fontWeight: '600' },

//     primaryBtnGradient: {
//         height: 54,
//         borderRadius: 16,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: COLORS.primary,
//         shadowOpacity: 0.35,
//         shadowRadius: 12,
//         shadowOffset: { width: 0, height: 6 },
//         elevation: 4,
//     },
//     primaryBtnText: { color: '#FFFFFF', fontSize: 15.5, fontWeight: '700' },

//     otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
//     otpBox: {
//         width: 58,
//         height: 58,
//         borderRadius: 14,
//         backgroundColor: COLORS.surface,
//         borderWidth: 1.5,
//         borderColor: COLORS.border,
//         color: COLORS.textDark,
//         fontSize: 21,
//         fontWeight: '700',
//     },
//     otpBoxFocused: { borderColor: COLORS.primary, backgroundColor: '#EFE9FB' },

//     resendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
//     resendHint: { fontSize: 11.5, color: COLORS.textMuted },
//     timerText: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },
//     resendText: { color: COLORS.primary, fontSize: 12, fontWeight: '700' },

//     backRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
//     backText: { color: COLORS.textMuted, fontSize: 12, marginLeft: 6 },

//     dividerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 22, marginBottom: 12 },
//     dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
//     dividerText: { color: COLORS.textMuted, fontSize: 10, marginHorizontal: 10, textTransform: 'uppercase' },

//     supportRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
//     supportText: { color: COLORS.primary, fontSize: 12, marginLeft: 8, fontWeight: '600' },

//     footerText: {
//         textAlign: 'center',
//         color: COLORS.textMuted,
//         fontSize: 10,
//         marginTop: 18,
//         paddingHorizontal: 40,
//     },
// });













import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    //   KeyboardAvoidingView,
    //   ScrollView,
    Platform,
    Animated,
    Alert,
    ActivityIndicator,
} from 'react-native';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Feather from '@react-native-vector-icons/feather';

import authService from '../auth/rtkApi/authService';
import { useNavigation } from '@react-navigation/native';
import { KeychainStorage, MMKVStorage } from '../storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';




// Replace with your own ImWallet brand advertisement video (mp4, looped, muted, ~15-30s).
// Local asset example: source={require('../../assets/videos/imwallet-ad.mp4')}
// const AD_VIDEO_SOURCE = {
//     uri: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-typing-on-a-laptop-4132-large.mp4',
// };

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

// ---------- Brand color palette (from partner.imwallet.in) ----------
const COLORS = {
    primary: '#6C2BD9',      // main purple (header bar / buttons on website)
    primaryDark: '#4C1D95',  // darker purple for gradient end
    primaryLight: '#8B5CF6', // lighter purple accent
    background: '#FFFFFF',
    surface: '#F5F3FA',      // light purple-tinted input background
    border: '#E4DFF3',
    textDark: '#241B3A',
    textMuted: '#6B7280',
    error: '#DC2626',
    errorBg: '#FEF2F2',
    errorBorder: '#FCA5A5',
};

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  BottomTab: undefined;
};

export default function LoginScreen({ onLoginSuccess }: { onLoginSuccess?: (result: any) => void }) {
    // const navigation = useNavigation()

const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    
    const [empId, setEmpId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    // const [focusedOtpIndex, setFocusedOtpIndex] = useState(null);
    const [focusedOtpIndex, setFocusedOtpIndex] =useState<number | null>(null);
    // const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
    const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [timer, setTimer] = useState(RESEND_SECONDS);

    // const otpRefs = useRef([]);

    const otpRefs = useRef<Array<TextInput | null>>([]);

    const cardAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(cardAnim, {
            toValue: 1,
            duration: 550,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        // let interval;
        let interval: ReturnType<typeof setInterval>;
        if (step === 'otp' && timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const cardTranslate = cardAnim.interpolate({ inputRange: [0, 1], outputRange: [36, 0] });

    const handleGetOtp = async () => {
        setErrorMsg('');
        if (!empId.trim()) return setErrorMsg('Please enter your Employee ID.');
        if (!password.trim()) return setErrorMsg('Please enter your password.');

        setLoading(true);
        try {
            await authService.requestOtp(empId.trim(), password);
            setStep('otp');
            setTimer(RESEND_SECONDS);
            setOtp(Array(OTP_LENGTH).fill(''));
        } catch (err) {
            setErrorMsg(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0) return;
        setLoading(true);
        try {
            await authService.requestOtp(empId.trim(), password);
            setTimer(RESEND_SECONDS);
        } catch (err) {
            setErrorMsg(err.message || 'Could not resend OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (value, index) => {
        const digit = value.replace(/[^0-9]/g, '');
        const next = [...otp];
        next[index] = digit;
        setOtp(next);
        if (digit && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleLogin = async () => {
        setErrorMsg("");

        const code = otp.join("");

        if (code.length < OTP_LENGTH) {
            return setErrorMsg(`Please enter the ${OTP_LENGTH}-digit OTP.`);
        }

        setLoading(true);

        try {
            const result = await authService.verifyOtp({
                employeeId: empId.trim(),
                otp: code,
            });

            // Save Access Token
            await KeychainStorage.saveAccessToken(result.accessToken);


            // SAVE refreash token in 
            await KeychainStorage.saveRefreshToken(result.refreshToken)
            
            // Save Employee
            MMKVStorage.saveEmployee(result.employee);

            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'BottomTab'}],
            // });
            navigation.reset({
                index: 0,
                routes: [{ name: 'BottomTab' }],
            });
            console.log("navigation reset success");
            console.log('will go to BottomTab');


        } catch (err: any) {
            console.log(err);
            setErrorMsg(err.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.screen}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* ---------- Background Advertisement Video ---------- */}
            {/* <Video
                source={AD_VIDEO_SOURCE}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
                repeat
                muted
                paused={false}
                playInBackground={false}
            /> */}

            <View style={StyleSheet.absoluteFill} />

            {/* White wash overlay so the site's clean white background reads through */}
            <LinearGradient
                colors={['#FFFFFF', '#FFFFFF', '#F5F3FA']}
                locations={[0, 0.55, 1]}
                style={StyleSheet.absoluteFill}
            />


            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContent}
                enableOnAndroid={true}
                extraScrollHeight={40}
                extraHeight={120}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                {/* ---------- Brand ---------- */}
                <View style={styles.brandWrap}>
                    <View style={styles.logoCircle}>
                        <Feather name="credit-card" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.brandName}>
                        Im<Text style={{ color: COLORS.primary }}>Wallet</Text>
                    </Text>
                    <Text style={styles.brandTagline}>Power your business. Anytime, anywhere.</Text>
                </View>

                {/* ---------- Login Card ---------- */}
                <Animated.View
                    style={[styles.cardOuter, { transform: [{ translateY: cardTranslate }], opacity: cardAnim }]}
                >
                    {/* Blur is used ONLY as a flat background layer — never wraps content directly.
               Wrapping real content inside <BlurView> is what causes the broken/gray-box
               layout on Android; this layered approach avoids that entirely. */}
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="light"
                        blurAmount={18}
                        overlayColor="rgba(255,255,255,0.75)"
                        reducedTransparencyFallbackColor="#FFFFFF"
                    />
                    <View style={styles.cardTint} />

                    <View style={styles.cardContent}>
                        {/* Step indicator */}
                        <View style={styles.stepRow}>
                            <View style={[styles.stepDot, styles.stepDotActive]} />
                            <View style={[styles.stepBar, step === 'otp' && styles.stepBarActive]} />
                            <View style={[styles.stepDot, step === 'otp' && styles.stepDotActive]} />
                        </View>

                        <Text style={styles.welcomeText}>Welcome back, Retailer</Text>
                        <Text style={styles.subText}>
                            {step === 'credentials'
                                ? 'Sign in with your Employee ID to continue'
                                : `Enter the ${OTP_LENGTH}-digit code sent to your registered mobile`}
                        </Text>

                        {!!errorMsg && (
                            <View style={styles.errorBanner}>
                                <Feather name="alert-circle" size={14} color={COLORS.error} />
                                <Text style={styles.errorText}>{errorMsg}</Text>
                            </View>
                        )}

                        {step === 'credentials' ? (
                            <>
                                <View style={styles.inputWrap}>
                                    <View style={styles.inputIconWrap}>
                                        <Feather name="user" size={16} color={COLORS.primary} />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Employee ID"
                                        placeholderTextColor={COLORS.textMuted}
                                        autoCapitalize="characters"
                                        value={empId}
                                        onChangeText={setEmpId}
                                    />
                                </View>

                                <View style={styles.inputWrap}>
                                    <View style={styles.inputIconWrap}>
                                        <Feather name="lock" size={16} color={COLORS.primary} />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor={COLORS.textMuted}
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                                        <Feather name={showPassword ? 'eye-off' : 'eye'} size={17} color={COLORS.textMuted} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.forgotWrap} hitSlop={8}>
                                    <Text style={styles.forgotText}>Forgot Password?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleGetOtp} disabled={loading} activeOpacity={0.88}>
                                    <LinearGradient
                                        colors={[COLORS.primary, COLORS.primaryDark]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.primaryBtnGradient}
                                    >
                                        {loading ? (
                                            <ActivityIndicator color="#FFFFFF" />
                                        ) : (
                                            <>
                                                <Text style={styles.primaryBtnText}>Get OTP</Text>
                                                <Feather name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
                                            </>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <View style={styles.otpRow}>
                                    {otp.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            ref={(ref) => (otpRefs.current[index] = ref)}
                                            style={[styles.otpBox, focusedOtpIndex === index && styles.otpBoxFocused]}
                                            value={digit}
                                            onChangeText={(v) => handleOtpChange(v, index)}
                                            onKeyPress={(e) => handleOtpKeyPress(e, index)}
                                            onFocus={() => setFocusedOtpIndex(index)}
                                            onBlur={() => setFocusedOtpIndex(null)}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            textAlign="center"
                                        />
                                    ))}
                                </View>

                                <View style={styles.resendRow}>
                                    <Text style={styles.resendHint}>Didn't get the code?</Text>
                                    {timer > 0 ? (
                                        <Text style={styles.timerText}>Resend in 0:{timer.toString().padStart(2, '0')}</Text>
                                    ) : (
                                        <TouchableOpacity onPress={handleResendOtp} hitSlop={8}>
                                            <Text style={styles.resendText}>Resend OTP</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <TouchableOpacity onPress={handleLogin} disabled={loading} activeOpacity={0.88}>
                                    <LinearGradient
                                        colors={[COLORS.primary, COLORS.primaryDark]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.primaryBtnGradient}
                                    >
                                        {loading ? (
                                            <ActivityIndicator color="#FFFFFF" />
                                        ) : (
                                            <>
                                                <Feather name="shield" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                                                <Text style={styles.primaryBtnText}>Login</Text>
                                            </>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.backRow} onPress={() => setStep('credentials')} hitSlop={8}>
                                    <Feather name="arrow-left" size={14} color={COLORS.textMuted} />
                                    <Text style={styles.backText}>Back to login</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>need help?</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity style={styles.supportRow} hitSlop={8}>
                            <Feather name="headphones" size={14} color={COLORS.primary} />
                            <Text style={styles.supportText}>Contact ImWallet Support</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <Text style={styles.footerText}>
                    By continuing you agree to ImWallet's Terms of Service & Privacy Policy
                </Text>
            </KeyboardAwareScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { flexGrow: 1, justifyContent: 'flex-end', paddingBottom: 24 },

    brandWrap: { alignItems: 'center', marginTop: 64, marginBottom: 28, paddingHorizontal: 24 },
    logoCircle: {
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.35,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    brandName: { fontSize: 27, fontWeight: '800', color: COLORS.textDark, letterSpacing: 0.4 },
    brandTagline: { fontSize: 12.5, color: COLORS.textMuted, marginTop: 6, textAlign: 'center' },

    cardOuter: {
        marginHorizontal: 18,
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background,
        shadowColor: '#000000',
        shadowOpacity: 0.12,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
    },
    cardTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.55)' },
    cardContent: { paddingHorizontal: 22, paddingTop: 24, paddingBottom: 22 },

    stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
    stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border },
    stepDotActive: { backgroundColor: COLORS.primary },
    stepBar: { flex: 1, height: 2, backgroundColor: COLORS.border, marginHorizontal: 6, borderRadius: 1 },
    stepBarActive: { backgroundColor: COLORS.primaryDark },

    welcomeText: { fontSize: 19, fontWeight: '800', color: COLORS.textDark },
    subText: { fontSize: 12.5, color: COLORS.textMuted, marginTop: 4, marginBottom: 18, lineHeight: 17 },

    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.errorBg,
        borderWidth: 1,
        borderColor: COLORS.errorBorder,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 9,
        marginBottom: 14,
        marginTop: -6,
    },
    errorText: { color: COLORS.error, fontSize: 11.5, marginLeft: 8, flex: 1 },

    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 10,
        height: 54,
        marginBottom: 14,
    },
    inputIconWrap: {
        width: 30,
        height: 30,
        borderRadius: 9,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: { flex: 1, color: COLORS.textDark, fontSize: 14.5, marginLeft: 10 },

    forgotWrap: { alignSelf: 'flex-end', marginBottom: 18, marginTop: -2 },
    forgotText: { color: COLORS.primary, fontSize: 12, fontWeight: '600' },

    primaryBtnGradient: {
        height: 54,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    primaryBtnText: { color: '#FFFFFF', fontSize: 15.5, fontWeight: '700' },

    otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    otpBox: {
        width: 58,
        height: 58,
        borderRadius: 14,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        color: COLORS.textDark,
        fontSize: 21,
        fontWeight: '700',
    },
    otpBoxFocused: { borderColor: COLORS.primary, backgroundColor: '#EFE9FB' },

    resendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
    resendHint: { fontSize: 11.5, color: COLORS.textMuted },
    timerText: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },
    resendText: { color: COLORS.primary, fontSize: 12, fontWeight: '700' },

    backRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
    backText: { color: COLORS.textMuted, fontSize: 12, marginLeft: 6 },

    dividerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 22, marginBottom: 12 },
    dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
    dividerText: { color: COLORS.textMuted, fontSize: 10, marginHorizontal: 10, textTransform: 'uppercase' },

    supportRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    supportText: { color: COLORS.primary, fontSize: 12, marginLeft: 8, fontWeight: '600' },

    footerText: {
        textAlign: 'center',
        color: COLORS.textMuted,
        fontSize: 10,
        marginTop: 18,
        paddingHorizontal: 40,
    },
});






// import { View, Text } from 'react-native'
// import React from 'react'

// const LoginScreen = () => {
//   return (
//     <View>
//       <Text>LoginScreen</Text>
//     </View>
//   )
// }

// export default LoginScreen