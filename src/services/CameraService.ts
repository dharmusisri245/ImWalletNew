import {
  Asset,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';

class CameraService {

  /**
   * Open Front Camera
   */
  async openFrontCamera(): Promise<Asset | null> {

    return new Promise((resolve, reject) => {

      launchCamera(
        {
          mediaType: 'photo',
          cameraType: 'front',
          quality: 0.8,
          saveToPhotos: false,
          includeBase64: false,
        },

        (response: ImagePickerResponse) => {

          if (response.didCancel) {
            resolve(null);
            return;
          }

          if (response.errorCode) {
            reject(response.errorMessage);
            return;
          }

          if (
            response.assets &&
            response.assets.length > 0
          ) {
            resolve(response.assets[0]);
            return;
          }

          resolve(null);
        },
      );

    });

  }

  /**
   * Open Back Camera
   */

  async openBackCamera(): Promise<Asset | null> {

    return new Promise((resolve, reject) => {

      launchCamera(
        {
          mediaType: 'photo',
          cameraType: 'back',
          quality: 0.8,
        },

        (response: ImagePickerResponse) => {

          if (response.didCancel) {
            resolve(null);
            return;
          }

          if (response.errorCode) {
            reject(response.errorMessage);
            return;
          }

          if (
            response.assets &&
            response.assets.length > 0
          ) {
            resolve(response.assets[0]);
            return;
          }

          resolve(null);
        },
      );

    });

  }
}

export default new CameraService();