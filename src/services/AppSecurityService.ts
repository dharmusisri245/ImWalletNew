// import BiometricService from './BiometricService';

// class AppSecurityService {
//   private static locked = true;
//   private static securityEnabled = false;

//   /**
//    * Initialize app security state.
//    */
//   static initialize() {
//     this.locked = true;
//   }

//   /**
//    * Check whether security is enabled.
//    */
//   static isSecurityEnabled() {
//     return this.securityEnabled;
//   }

//   /**
//    * Enable app security.
//    */
//   static enableSecurity() {
//     console.log('ImWallet security enabled');

//     this.securityEnabled = true;
//     this.locked = true;
//   }

//   /**
//    * Disable app security.
//    */
//   static disableSecurity() {
//     console.log('ImWallet security disabled');

//     this.securityEnabled = false;
//     this.locked = false;
//   }

//   /**
//    * Check whether app is currently locked.
//    */
//   static isLocked() {
//     return this.locked;
//   }

//   /**
//    * Lock application.
//    */
//   static lock() {
//     if (!this.securityEnabled) {
//       this.locked = false;
//       return;
//     }

//     console.log('ImWallet locked');

//     this.locked = true;
//   }

//   /**
//    * Unlock application.
//    */
//   static unlock() {
//     console.log('ImWallet unlocked');

//     this.locked = false;
//   }

//   /**
//    * Authenticate and unlock.
//    */
//   static async authenticateAndUnlock() {
//     if (!this.securityEnabled) {
//       console.log(
//         'Security disabled - authentication skipped',
//       );

//       this.unlock();

//       return true;
//     }

//     const authenticated =
//       await BiometricService.authenticate();

//     if (authenticated) {
//       this.unlock();

//       return true;
//     }

//     return false;
//   }
// }

// export default AppSecurityService;
// src/services/AppSecurityService.ts

import BiometricService from './BiometricService';
import MMKVStorage from '../storage/MMKVStorage';

class AppSecurityService {
  private static locked = false;

  private static securityEnabled = false;

  //==========================
  // Initialize
  //==========================

  /**
   * Load App Security setting
   * from persistent MMKV storage.
   *
   * This should be called from SplashScreen.
   */
  static initialize() {
    const enabled =
      MMKVStorage.isAppSecurityEnabled();

    this.securityEnabled = enabled;

    this.locked = enabled;

    console.log(
      'App Security initialized:',
      enabled,
    );
  }

  //==========================
  // Security Status
  //==========================

  /**
   * Check whether App Security
   * is enabled.
   */
  
  static isSecurityEnabled(): boolean {
    return this.securityEnabled;
  }

  /**
   * Check whether app is currently locked.
   */
  static isLocked(): boolean {
    return this.locked;
  }

  //==========================
  // Enable Security
  //==========================

  /**
   * Enable App Security.
   *
   * This should only be called
   * after successful authentication.
   */
  static enableSecurity() {
    this.securityEnabled = true;

    this.locked = true;

    MMKVStorage.setAppSecurityEnabled(
      true,
    );

    console.log(
      'ImWallet security enabled',
    );
  }

  //==========================
  // Disable Security
  //==========================

  /**
   * Disable App Security.
   *
   * This should only be called
   * after successful authentication.
   */
  static disableSecurity() {
    this.securityEnabled = false;

    this.locked = false;

    MMKVStorage.setAppSecurityEnabled(
      false,
    );

    console.log(
      'ImWallet security disabled',
    );
  }

  //==========================
  // Lock
  //==========================

  /**
   * Lock the application.
   */
  static lock() {
    if (!this.securityEnabled) {
      this.locked = false;

      return;
    }

    this.locked = true;

    console.log(
      'ImWallet locked',
    );
  }

  //==========================
  // Unlock
  //==========================

  /**
   * Unlock the application.
   */
  static unlock() {
    this.locked = false;

    console.log(
      'ImWallet unlocked',
    );
  }

  //==========================
  // Authentication
  //==========================

  /**
   * Authenticate the user
   * only when App Security
   * is enabled.
   */
  static async authenticateAndUnlock(): Promise<boolean> {
    /**
     * Security OFF
     *
     * No authentication required.
     */
    if (!this.securityEnabled) {
      console.log(
        'Security OFF - authentication skipped',
      );

      this.unlock();

      return true;
    }

    /**
     * Security ON
     *
     * Request Face ID / Touch ID /
     * device security.
     */
    console.log(
      'Security ON - requesting authentication',
    );

    const authenticated =
      await BiometricService.authenticate();

    /**
     * Authentication successful.
     */
    if (authenticated) {
      this.unlock();

      console.log(
        'Security verification successful',
      );

      return true;
    }

    /**
     * Authentication failed/cancelled.
     */
    console.log(
      'Security verification failed',
    );

    return false;
  }
}

export default AppSecurityService;