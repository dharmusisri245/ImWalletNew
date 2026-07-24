import NetInfo from '@react-native-community/netinfo';

class NetworkService {
  /**
   * Check current internet connection
   */
  async isConnected(): Promise<boolean> {
    const state = await NetInfo.fetch();

    return !!(
      state.isConnected &&
      state.isInternetReachable
    );
  }

  /**
   * Listen for network changes
   */
  subscribe(callback: (connected: boolean) => void) {
    return NetInfo.addEventListener(state => {
      callback(
        !!(
          state.isConnected &&
          state.isInternetReachable
        ),
      );
    });
  }
}

export default new NetworkService();