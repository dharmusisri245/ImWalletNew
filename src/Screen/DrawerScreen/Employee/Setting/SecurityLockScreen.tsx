




// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import BiometricService from '../../../../services/BiometricService';
// import AppSecurityService from '../../../../services/AppSecurityService';

// const SecurityLockScreen = ({navigation}: any) => {
//   const [biometryName, setBiometryName] =
//     useState('Device Security');

//   const [securityEnabled, setSecurityEnabled] =
//     useState(false);

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState('');

//   useEffect(() => {
//     loadSecurityInfo();
//   }, []);

//   /**
//    * Load available device security
//    * and current App Security state.
//    */
//   const loadSecurityInfo = async () => {
//     try {
//       const biometric =
//         await BiometricService.getBiometry();

//       console.log('Biometric info:', biometric);

//       if (biometric.available) {
//         const name =
//           BiometricService.getBiometryName(
//             biometric.biometryType,
//           );

//         setBiometryName(name);
//       }

//       setSecurityEnabled(
//         AppSecurityService.isSecurityEnabled(),
//       );
//     } catch (error) {
//       console.log(
//         'Security initialization error:',
//         error,
//       );
//     }
//   };

//   /**
//    * Authenticate the user.
//    */
//   const authenticate = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       const success =
//         await AppSecurityService.authenticateAndUnlock();

//       if (!success) {
//         setError(
//           'Authentication failed. Please try again.',
//         );

//         return false;
//       }

//       return true;
//     } catch (error) {
//       console.log(
//         'Security authentication error:',
//         error,
//       );

//       setError(
//         'Unable to authenticate. Please try again.',
//       );

//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Enable App Security.
//    *
//    * User must successfully authenticate
//    * before security becomes ON.
//    */
//   const enableSecurity = async () => {
//     setError('');
//     setLoading(true);

//     try {
//       const success =
//         await AppSecurityService.authenticateAndUnlock();

//       if (!success) {
//         setSecurityEnabled(false);

//         setError(
//           `Unable to enable security. ${biometryName} verification failed.`,
//         );

//         return;
//       }

//       AppSecurityService.enableSecurity();

//       setSecurityEnabled(true);

//       console.log('App Security enabled');

//       /**
//        * Security has been successfully enabled.
//        *
//        * We can now continue to MainApp.
//        */
//       navigation.replace('BottomTab');
//     } catch (error) {
//       console.log(
//         'Enable security error:',
//         error,
//       );

//       setSecurityEnabled(false);

//       setError(
//         'Unable to enable App Security.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Disable App Security.
//    *
//    * User must authenticate before
//    * security can be turned OFF.
//    */
//   const disableSecurity = async () => {
//     setError('');
//     setLoading(true);

//     try {
//       const success =
//         await BiometricService.authenticate();

//       if (!success) {
//         setSecurityEnabled(true);

//         setError(
//           `Unable to disable security. ${biometryName} verification failed.`,
//         );

//         return;
//       }

//       AppSecurityService.disableSecurity();

//       setSecurityEnabled(false);

//       console.log('App Security disabled');

//       /**
//        * Security is OFF.
//        * Directly continue to MainApp.
//        */
//       navigation.replace('BottomTab');
//     } catch (error) {
//       console.log(
//         'Disable security error:',
//         error,
//       );

//       setSecurityEnabled(true);

//       setError(
//         'Unable to disable App Security.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Handle ON/OFF switch.
//    */
//   const handleSecurityToggle = async (
//     value: boolean,
//   ) => {
//     if (loading) {
//       return;
//     }

//     if (value) {
//       await enableSecurity();
//     } else {
//       await disableSecurity();
//     }
//   };

//   /**
//    * If security is already ON,
//    * authenticate and enter MainApp.
//    */
//   const continueWithSecurity = async () => {
//     const success = await authenticate();

//     if (success) {
//       navigation.replace('BottomTab');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Lock Icon */}
//       <View style={styles.iconContainer}>
//         <Text style={styles.lockIcon}>🔐</Text>
//       </View>

//       {/* Title */}
//       <Text style={styles.title}>
//         App Security
//       </Text>

//       <Text style={styles.subtitle}>
//         Protect ImWallet using your device security
//       </Text>

//       {/* Security Setting */}
//       <View style={styles.securityRow}>
//         <View style={styles.securityTextContainer}>
//           <Text style={styles.securityTitle}>
//             Security
//           </Text>

//           <Text style={styles.securityDescription}>
//             {securityEnabled
//               ? `Use ${biometryName} to unlock ImWallet`
//               : 'App security is currently disabled'}
//           </Text>
//         </View>

//         <Switch
//           value={securityEnabled}
//           onValueChange={handleSecurityToggle}
//           disabled={loading}
//         />
//       </View>

//       {/* Continue / Verify */}
//       {securityEnabled && (
//         <TouchableOpacity
//           style={styles.button}
//           onPress={continueWithSecurity}
//           disabled={loading}
//           activeOpacity={0.8}>
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>
//               Use {biometryName}
//             </Text>
//           )}
//         </TouchableOpacity>
//       )}

//       {/* Error */}
//       {error ? (
//         <Text style={styles.error}>
//           {error}
//         </Text>
//       ) : null}
//     </View>
//   );
// };

// export default SecurityLockScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 25,
//     backgroundColor: '#fff',
//   },

//   iconContainer: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f5f5f5',
//     marginBottom: 25,
//   },

//   lockIcon: {
//     fontSize: 40,
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#222',
//     marginBottom: 8,
//   },

//   subtitle: {
//     fontSize: 15,
//     color: '#777',
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: 30,
//   },

//   securityRow: {
//     width: '100%',
//     minHeight: 75,
//     paddingHorizontal: 18,
//     paddingVertical: 15,
//     borderRadius: 14,
//     backgroundColor: '#f7f7f7',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 25,
//   },

//   securityTextContainer: {
//     flex: 1,
//     paddingRight: 15,
//   },

//   securityTitle: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: 4,
//   },

//   securityDescription: {
//     fontSize: 13,
//     color: '#777',
//     lineHeight: 18,
//   },

//   button: {
//     width: '100%',
//     height: 52,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#800000',
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   error: {
//     color: '#d00',
//     marginTop: 15,
//     textAlign: 'center',
//     lineHeight: 20,
//   },
// });



// SecurityLockScreen.tsx

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import BiometricService from '../../../../services/BiometricService';
import AppSecurityService from '../../../../services/AppSecurityService';

const SecurityLockScreen = () => {
  const [biometryName, setBiometryName] =
    useState('Device Security');

  const [securityEnabled, setSecurityEnabled] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    loadSecurityInfo();
  }, []);

  /**
   * Load current biometric information
   * and saved App Security state.
   */
  const loadSecurityInfo = async () => {
    try {
      setError('');

      const biometric =
        await BiometricService.getBiometry();

      console.log(
        'Biometric info:',
        biometric,
      );

      if (biometric.available) {
        const name =
          BiometricService.getBiometryName(
            biometric.biometryType,
          );

        setBiometryName(name);
      }

      const enabled =
        AppSecurityService.isSecurityEnabled();

      setSecurityEnabled(enabled);

      console.log(
        'Current App Security:',
        enabled,
      );
    } catch (error) {
      console.log(
        'Security initialization error:',
        error,
      );

      setError(
        'Unable to load security settings.',
      );
    }
  };

  /**
   * Enable App Security.
   *
   * IMPORTANT:
   * We authenticate FIRST.
   *
   * Only after successful authentication
   * do we save Security = ON.
   */

  
  const enableSecurity = async () => {
    try {
      setLoading(true);
      setError('');

      console.log(
        'Enabling App Security...',
      );

      const authenticated =
        await BiometricService.authenticate();

      if (!authenticated) {
        console.log(
          'Enable security authentication failed',
        );

        setSecurityEnabled(false);

        setError(
          `${biometryName} verification failed. Security remains OFF.`,
        );

        return;
      }

      // Authentication successful
      AppSecurityService.enableSecurity();

      setSecurityEnabled(true);

      console.log(
        'App Security enabled successfully',
      );
    } catch (error) {
      console.log(
        'Enable security error:',
        error,
      );

      setSecurityEnabled(false);

      setError(
        'Unable to enable App Security.',
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Disable App Security.
   *
   * IMPORTANT:
   * We authenticate FIRST.
   *
   * Only after successful authentication
   * do we save Security = OFF.
   */
  const disableSecurity = async () => {
    try {
      setLoading(true);
      setError('');

      console.log(
        'Disabling App Security...',
      );

      const authenticated =
        await BiometricService.authenticate();

      if (!authenticated) {
        console.log(
          'Disable security authentication failed',
        );

        // Keep it ON
        setSecurityEnabled(true);

        setError(
          `${biometryName} verification failed. Security remains ON.`,
        );

        return;
      }

      // Authentication successful
      AppSecurityService.disableSecurity();

      setSecurityEnabled(false);

      console.log(
        'App Security disabled successfully',
      );
    } catch (error) {
      console.log(
        'Disable security error:',
        error,
      );

      // Keep it ON
      setSecurityEnabled(true);

      setError(
        'Unable to disable App Security.',
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Security ON/OFF switch.
   */
  const handleSecurityToggle = async (
    value: boolean,
  ) => {
    if (loading) {
      return;
    }

    if (value) {
      await enableSecurity();
    } else {
      await disableSecurity();
    }
  };

  return (
    <View style={styles.container}>

      {/* Security Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.lockIcon}>
          🔐
        </Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        App Security
      </Text>

      {/* Description */}
      <Text style={styles.subtitle}>
        Protect ImWallet using your device security
      </Text>

      {/* Security Setting */}
      <View style={styles.securityRow}>

        <View style={styles.securityTextContainer}>

          <Text style={styles.securityTitle}>
            Security
          </Text>

          <Text style={styles.securityDescription}>
            {securityEnabled
              ? `Use ${biometryName} when logging in`
              : 'App security is currently disabled'}
          </Text>

        </View>

        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Switch
            value={securityEnabled}
            onValueChange={
              handleSecurityToggle
            }
            disabled={loading}
          />
        )}

      </View>

      {/* Error */}
      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

    </View>
  );
};

export default SecurityLockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 25,
  },

  lockIcon: {
    fontSize: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },

  securityRow: {
    width: '100%',
    minHeight: 75,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  securityTextContainer: {
    flex: 1,
    paddingRight: 15,
  },

  securityTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },

  securityDescription: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },

  error: {
    color: '#d00',
    marginTop: 15,
    textAlign: 'center',
    lineHeight: 20,
  },
});