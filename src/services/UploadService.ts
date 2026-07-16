import { Asset } from 'react-native-image-picker';

class UploadService {

  createImageFormData(
    image: Asset,
    body?: Record<string, any>,
  ) {

    const formData = new FormData();

    formData.append('photo', {
      uri: image.uri!,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'photo.jpg',
    } as any);

    if (body) {
      Object.entries(body).forEach(
        ([key, value]) => {
          formData.append(key, String(value));
        },
      );
    }

    return formData;
  }

}

export default new UploadService();