// src/storage/KeychainStorage.ts

import * as Keychain from 'react-native-keychain';
import { StorageKeys } from './StorageKeys';

class KeychainStorage {
  //==========================
  // Access Token
  //==========================

  async saveAccessToken(token: string) {
    await Keychain.setInternetCredentials(
      StorageKeys.ACCESS_TOKEN,
      'access',
      token,
    );
  }

  async getAccessToken() {
    const credentials =
      await Keychain.getInternetCredentials(
        StorageKeys.ACCESS_TOKEN,
      );

    return credentials
      ? credentials.password
      : null;
  }

  async removeAccessToken() {
    await Keychain.resetInternetCredentials(
      StorageKeys.ACCESS_TOKEN,
    );
  }

  //==========================
  // Refresh Token
  //==========================

  async saveRefreshToken(token: string) {
    await Keychain.setInternetCredentials(
      StorageKeys.REFRESH_TOKEN,
      'refresh',
      token,
    );
  }

  async getRefreshToken() {
    const credentials =
      await Keychain.getInternetCredentials(
        StorageKeys.REFRESH_TOKEN,
      );

    return credentials
      ? credentials.password
      : null;
  }

  async removeRefreshToken() {
    await Keychain.resetInternetCredentials(
      StorageKeys.REFRESH_TOKEN,
    );
  }

  //==========================
  // Logout
  //==========================

  async clearAll() {
    await this.removeAccessToken();
    await this.removeRefreshToken();
  }
}

export default new KeychainStorage();