// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AttendanceRecord} from '../auth/types/attendance';

// const KEY = 'attendance_records';

// class AttendanceStorage {
//   async save(record: AttendanceRecord) {
//     const existing = await this.getAll();

//     existing.unshift(record);

//     await AsyncStorage.setItem(
//       KEY,
//       JSON.stringify(existing),
//     );
//   }

//   async getAll(): Promise<AttendanceRecord[]> {
//     const value = await AsyncStorage.getItem(KEY);

//     if (!value) return [];

//     return JSON.parse(value);
//   }

//   async clear() {
//     await AsyncStorage.removeItem(KEY);
//   }
// }

// export default new AttendanceStorage();




import AsyncStorage from '@react-native-async-storage/async-storage';
import {AttendanceRecord} from '../auth/types/attendance';

const KEY = 'attendance_records';

class AttendanceStorage {
  async save(record: AttendanceRecord) {
    const existing = await this.getAll();

    existing.unshift(record);

    await AsyncStorage.setItem(
      KEY,
      JSON.stringify(existing),
    );
  }

  async getAll(): Promise<AttendanceRecord[]> {
    const value = await AsyncStorage.getItem(KEY);

    if (!value) {
      return [];
    }

    return JSON.parse(value);
  }

  async clear() {
    await AsyncStorage.removeItem(KEY);
  }

  // ==============================
  // New Helper Methods
  // ==============================

  async getLastAttendance(): Promise<AttendanceRecord | null> {
    const records = await this.getAll();

    if (records.length === 0) {
      return null;
    }

    return records[0];
  }

  async getTodayAttendance(): Promise<AttendanceRecord[]> {
    const records = await this.getAll();

    const today = new Date().toDateString();

    return records.filter(item => {
      return (
        new Date(item.timestamp).toDateString() === today
      );
    });
  }

  async hasCheckedInToday(): Promise<boolean> {
    const todayRecords = await this.getTodayAttendance();

    return todayRecords.some(
      item => item.type === 'check-in',
    );
  }

  async hasCheckedOutToday(): Promise<boolean> {
    const todayRecords = await this.getTodayAttendance();

    return todayRecords.some(
      item => item.type === 'check-out',
    );
  }

  async replaceAll(records: AttendanceRecord[]) {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify(records),
    );
  }
}

export default new AttendanceStorage();