import { Alert } from 'react-native';

class NotificationService {

  /**
   * Simple Notification
   */
  showNotification(
    title: string,
    message: string,
  ) {

    Alert.alert(title, message);

  }

  /**
   * Check In Success
   */
  checkInSuccess() {

    this.showNotification(
      'Attendance',
      'Check In Successful',
    );

  }

  /**
   * Check Out Success
   */
  checkOutSuccess() {

    this.showNotification(
      'Attendance',
      'Check Out Successful',
    );

  }

  /**
   * Error
   */
  error(message: string) {

    this.showNotification(
      'Error',
      message,
    );

  }

}

export default new NotificationService();