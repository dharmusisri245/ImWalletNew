// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {AttendanceRecord} from '../auth/types/attendance';

// // const KEY = 'attendance_records';

// // class AttendanceStorage {
// //   async save(record: AttendanceRecord) {
// //     const existing = await this.getAll();

// //     existing.unshift(record);

// //     await AsyncStorage.setItem(
// //       KEY,
// //       JSON.stringify(existing),
// //     );
// //   }

// //   async getAll(): Promise<AttendanceRecord[]> {
// //     const value = await AsyncStorage.getItem(KEY);

// //     if (!value) return [];

// //     return JSON.parse(value);
// //   }

// //   async clear() {
// //     await AsyncStorage.removeItem(KEY);
// //   }
// // }

// // export default new AttendanceStorage();




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

//     if (!value) {
//       return [];
//     }

//     return JSON.parse(value);
//   }

//   async clear() {
//     await AsyncStorage.removeItem(KEY);
//   }

//   // ==============================
//   // New Helper Methods
//   // ==============================

//   async getLastAttendance(): Promise<AttendanceRecord | null> {
//     const records = await this.getAll();

//     if (records.length === 0) {
//       return null;
//     }

//     return records[0];
//   }

//   async getTodayAttendance(): Promise<AttendanceRecord[]> {
//     const records = await this.getAll();

//     const today = new Date().toDateString();

//     return records.filter(item => {
//       return (
//         new Date(item.timestamp).toDateString() === today
//       );
//     });
//   }

//   async hasCheckedInToday(): Promise<boolean> {
//     const todayRecords = await this.getTodayAttendance();

//     return todayRecords.some(
//       item => item.type === 'check-in',
//     );
//   }

//   async hasCheckedOutToday(): Promise<boolean> {
//     const todayRecords = await this.getTodayAttendance();

//     return todayRecords.some(
//       item => item.type === 'check-out',
//     );
//   }

//   async replaceAll(records: AttendanceRecord[]) {
//     await AsyncStorage.setItem(
//       KEY,
//       JSON.stringify(records),
//     );
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

    await AsyncStorage.setItem(KEY, JSON.stringify(existing));
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

  // ==============================
  // Attendance Summary
  // ==============================
  async getTodayAttendanceSummary() {
    const records = await this.getTodayAttendance();

    const checkIn = records.find(
      item => item.type === 'check-in',
    );

    const checkOut = records.find(
      item => item.type === 'check-out',
    );

    let workingHours = '00h 00m';

    if (checkIn && checkOut) {
      const start = new Date(checkIn.timestamp).getTime();
      const end = new Date(checkOut.timestamp).getTime();

      const diff = end - start;

      const hours = Math.floor(
        diff / (1000 * 60 * 60),
      );

      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
          (1000 * 60),
      );

      workingHours = `${hours}h ${minutes}m`;
    } else if (checkIn) {
      const start = new Date(checkIn.timestamp).getTime();
      const now = Date.now();

      const diff = now - start;

      const hours = Math.floor(
        diff / (1000 * 60 * 60),
      );

      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
          (1000 * 60),
      );

      workingHours = `${hours}h ${minutes}m`;
    }

    return {
      checkInTime: checkIn
        ? new Date(
            checkIn.timestamp,
          ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '',

      checkOutTime: checkOut
        ? new Date(
            checkOut.timestamp,
          ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '',

      workingHours,
    };
  }
}

export default new AttendanceStorage();