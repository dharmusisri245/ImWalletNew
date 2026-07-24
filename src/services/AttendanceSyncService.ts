import AttendanceStorage from './AttendanceStorage';
import NetworkService from './NetworkService';
// import {attendanceApi} from '../api/attendanceApi';

class AttendanceSyncService {
  /**
   * Sync all pending attendance
   */
  async syncAttendance() {
    try {
      const isOnline = await NetworkService.isConnected();

      if (!isOnline) {
        console.log('❌ No internet connection');
        return;
      }

      const records = await AttendanceStorage.getAll();

      const pendingRecords = records.filter(
        item => !item.synced,
      );

      console.log(
        `Pending Records : ${pendingRecords.length}`,
      );

    //   for (const record of pendingRecords) {
    //     try {
    //       await attendanceApi.uploadAttendance(record);

    //       record.synced = true;

    //       console.log(
    //         `✅ Synced : ${record.id}`,
    //       );
    //     } catch (error) {
    //       console.log(
    //         `❌ Failed : ${record.id}`,
    //         error,
    //       );
    //     }
    //   }

    //   await AttendanceStorage.replaceAll(records);

      console.log('🎉 Attendance Sync Completed');
    } catch (error) {
      console.log(
        'Sync Error:',
        error,
      );
    }
  }
}

export default new AttendanceSyncService();