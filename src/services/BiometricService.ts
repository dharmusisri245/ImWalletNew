// import ReactNativeBiometrics, {
//   BiometryTypes,
// } from 'react-native-biometrics';

// // const rnBiometrics = new ReactNativeBiometrics();
// const rnBiometrics = new ReactNativeBiometrics({
//   allowDeviceCredentials: true,
// });

// class BiometricService {
//   /**
//    * Check whether biometric authentication
//    * is available on the device.
//    */
//   static async getBiometry() {
//     try {
//       const result = await rnBiometrics.isSensorAvailable();

//       console.log('Biometric result:', result);

//       return {
//         available: result.available,
//         biometryType: result.biometryType ?? null,
//       };
//     } catch (error) {
//       console.log('Biometric check error:', error);

//       return {
//         available: false,
//         biometryType: null,
//       };
//     }
//   }

//   /**
//    * Get user-friendly authentication name.
//    */
//   static getBiometryName(biometryType: string | null) {
//     switch (biometryType) {
//       case BiometryTypes.FaceID:
//         return 'Face ID';

//       case BiometryTypes.TouchID:
//         return 'Touch ID';

//       case BiometryTypes.Biometrics:
//         return 'Fingerprint';

//       default:
//         return 'Device Security';
//     }
//   }

//   /**
//    * Authenticate user.
//    */
//   static async authenticate(): Promise<boolean> {
//     try {
//       const { available, biometryType } =
//         await this.getBiometry();

//       if (!available) {
//         console.log('Biometric authentication unavailable');

//         return false;
//       }

//       const biometryName =
//         this.getBiometryName(biometryType);

//       // const result = await rnBiometrics.simplePrompt({
//       //   promptMessage: `Use ${biometryName} to unlock ImWallet`,
//       //   cancelButtonText: 'Cancel',
//       // });


//       const result = await rnBiometrics.simplePrompt({
//         promptMessage: `Use ${biometryName} to unlock ImWallet`,
//         fallbackPromptMessage: 'Use your device passcode',
//         cancelButtonText: 'Cancel',
//       });

//       console.log('Authentication result:', result);

//       return result.success;
//     } catch (error) {
//       console.log('Authentication error:', error);

//       return false;
//     }
//   }
// }

// export default BiometricService;






import ReactNativeBiometrics, {
  BiometryTypes,
} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

class BiometricService {
  /**
   * Check available biometric security.
   */
  static async getBiometry() {
    try {
      const result = await rnBiometrics.isSensorAvailable();

      console.log('Biometric result:', result);

      return {
        available: result.available,
        biometryType: result.biometryType ?? null,
      };
    } catch (error) {
      console.log('Biometric check error:', error);

      return {
        available: false,
        biometryType: null,
      };
    }
  }

  /**
   * Get user-friendly security name.
   */
  static getBiometryName(
    biometryType: string | null,
  ) {
    switch (biometryType) {
      case BiometryTypes.FaceID:
        return 'Face ID';

      case BiometryTypes.TouchID:
        return 'Touch ID';

      case BiometryTypes.Biometrics:
        return 'Fingerprint';

      default:
        return 'Device Security';
    }
  }

  /**
   * Authenticate user using available
   * biometric/device security.
   */
  static async authenticate(): Promise<boolean> {
    try {
      const result =
        await rnBiometrics.simplePrompt({
          promptMessage:
            'Authenticate to unlock ImWallet',

          fallbackPromptMessage:
            'Use your device passcode',

          cancelButtonText: 'Cancel',
        });

      console.log(
        'Authentication result:',
        result,
      );

      return result.success;
    } catch (error) {
      console.log(
        'Authentication error:',
        error,
      );

      return false;
    }
  }
}

export default BiometricService;