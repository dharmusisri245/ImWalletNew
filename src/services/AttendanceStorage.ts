// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import {AttendanceRecord} from '../auth/types/attendance';

// // // const KEY = 'attendance_records';

// // // class AttendanceStorage {
// // //   async save(record: AttendanceRecord) {
// // //     const existing = await this.getAll();

// // //     existing.unshift(record);

// // //     await AsyncStorage.setItem(
// // //       KEY,
// // //       JSON.stringify(existing),
// // //     );
// // //   }

// // //   async getAll(): Promise<AttendanceRecord[]> {
// // //     const value = await AsyncStorage.getItem(KEY);

// // //     if (!value) return [];

// // //     return JSON.parse(value);
// // //   }

// // //   async clear() {
// // //     await AsyncStorage.removeItem(KEY);
// // //   }
// // // }

// // // export default new AttendanceStorage();




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

// //     if (!value) {
// //       return [];
// //     }

// //     return JSON.parse(value);
// //   }

// //   async clear() {
// //     await AsyncStorage.removeItem(KEY);
// //   }

// //   // ==============================
// //   // New Helper Methods
// //   // ==============================

// //   async getLastAttendance(): Promise<AttendanceRecord | null> {
// //     const records = await this.getAll();

// //     if (records.length === 0) {
// //       return null;
// //     }

// //     return records[0];
// //   }

// //   async getTodayAttendance(): Promise<AttendanceRecord[]> {
// //     const records = await this.getAll();

// //     const today = new Date().toDateString();

// //     return records.filter(item => {
// //       return (
// //         new Date(item.timestamp).toDateString() === today
// //       );
// //     });
// //   }

// //   async hasCheckedInToday(): Promise<boolean> {
// //     const todayRecords = await this.getTodayAttendance();

// //     return todayRecords.some(
// //       item => item.type === 'check-in',
// //     );
// //   }

// //   async hasCheckedOutToday(): Promise<boolean> {
// //     const todayRecords = await this.getTodayAttendance();

// //     return todayRecords.some(
// //       item => item.type === 'check-out',
// //     );
// //   }

// //   async replaceAll(records: AttendanceRecord[]) {
// //     await AsyncStorage.setItem(
// //       KEY,
// //       JSON.stringify(records),
// //     );
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

//     await AsyncStorage.setItem(KEY, JSON.stringify(existing));
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

//   // ==============================
//   // Attendance Summary
//   // ==============================
//   async getTodayAttendanceSummary() {
//     const records = await this.getTodayAttendance();

//     const checkIn = records.find(
//       item => item.type === 'check-in',
//     );

//     const checkOut = records.find(
//       item => item.type === 'check-out',
//     );

//     let workingHours = '00h 00m';

//     if (checkIn && checkOut) {
//       const start = new Date(checkIn.timestamp).getTime();
//       const end = new Date(checkOut.timestamp).getTime();

//       const diff = end - start;

//       const hours = Math.floor(
//         diff / (1000 * 60 * 60),
//       );

//       const minutes = Math.floor(
//         (diff % (1000 * 60 * 60)) /
//           (1000 * 60),
//       );

//       workingHours = `${hours}h ${minutes}m`;
//     } else if (checkIn) {
//       const start = new Date(checkIn.timestamp).getTime();
//       const now = Date.now();

//       const diff = now - start;

//       const hours = Math.floor(
//         diff / (1000 * 60 * 60),
//       );

//       const minutes = Math.floor(
//         (diff % (1000 * 60 * 60)) /
//           (1000 * 60),
//       );

//       workingHours = `${hours}h ${minutes}m`;
//     }

//     return {
//       checkInTime: checkIn
//         ? new Date(
//             checkIn.timestamp,
//           ).toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//           })
//         : '',

//       checkOutTime: checkOut
//         ? new Date(
//             checkOut.timestamp,
//           ).toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//           })
//         : '',

//       workingHours,
//     };
//   }
// }

// export default new AttendanceStorage();






import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AttendanceRecord,
  EmployeeLocation,
} from '../auth/types/attendance';

const KEY = 'attendance_records';

class AttendanceStorage {

  // ============================================================
  // SAVE ATTENDANCE RECORD
  // ============================================================

  async save(record: AttendanceRecord): Promise<void> {
    const existing = await this.getAll();

    existing.unshift(record);

    await AsyncStorage.setItem(
      KEY,
      JSON.stringify(existing),
    );
  }

  // ============================================================
  // GET ALL ATTENDANCE RECORDS
  // ============================================================

  async getAll(): Promise<AttendanceRecord[]> {
    const value = await AsyncStorage.getItem(KEY);

    if (!value) {
      return [];
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(
        '[AttendanceStorage] Failed to parse records:',
        error,
      );

      return [];
    }
  }

  // ============================================================
  // GET LAST ATTENDANCE
  // ============================================================

  async getLastAttendance(): Promise<AttendanceRecord | null> {
    const records = await this.getAll();

    if (records.length === 0) {
      return null;
    }

    return records[0];
  }

  // ============================================================
  // GET TODAY ATTENDANCE
  // ============================================================

  async getTodayAttendance(): Promise<AttendanceRecord[]> {
    const records = await this.getAll();

    const today = new Date().toDateString();

    return records.filter(item => {
      return (
        new Date(item.timestamp).toDateString() === today
      );
    });
  }

  // ============================================================
  // CHECK-IN STATUS
  // ============================================================

  async hasCheckedInToday(): Promise<boolean> {
    const todayRecords =
      await this.getTodayAttendance();

    return todayRecords.some(
      item => item.type === 'check-in',
    );
  }

  // ============================================================
  // CHECK-OUT STATUS
  // ============================================================

  async hasCheckedOutToday(): Promise<boolean> {
    const todayRecords =
      await this.getTodayAttendance();

    return todayRecords.some(
      item => item.type === 'check-out',
    );
  }

  // ============================================================
  // GET TODAY'S ACTIVE CHECK-IN
  // ============================================================

  async getActiveCheckIn(): Promise<AttendanceRecord | null> {
    const records =
      await this.getTodayAttendance();

    const checkIn = records.find(
      item => item.type === 'check-in',
    );

    if (!checkIn) {
      return null;
    }

    const hasCheckOut =
      records.some(
        item =>
          item.type === 'check-out' &&
          new Date(item.timestamp).getTime() >
            new Date(checkIn.timestamp).getTime(),
      );

    if (hasCheckOut) {
      return null;
    }

    return checkIn;
  }

  // ============================================================
  // ADD TRACKING LOCATION
  // ============================================================

  async addTrackingLocation(
    location: EmployeeLocation,
  ): Promise<boolean> {

    const records =
      await this.getAll();

    const today =
      new Date().toDateString();

    // Find today's check-in record.
    const checkInIndex =
      records.findIndex(item => {

        if (item.type !== 'check-in') {
          return false;
        }

        return (
          new Date(
            item.timestamp,
          ).toDateString() === today
        );
      });

    if (checkInIndex === -1) {

      console.warn(
        '[AttendanceStorage] No active check-in found.',
      );

      return false;
    }

    const checkIn =
      records[checkInIndex];

    // Existing locations.
    const existingLocations =
      checkIn.trackingLocations ?? [];

    // Maximum 20 locations.
    if (
      existingLocations.length >= 20
    ) {

      console.log(
        '[AttendanceStorage] Maximum 20 locations already stored.',
      );

      return false;
    }

    // Add new location.
    const updatedLocations = [
      ...existingLocations,
      location,
    ];

    records[checkInIndex] = {
      ...checkIn,

      trackingLocations:
        updatedLocations,

      // Tracking changed, therefore
      // the record needs sync later.
      synced: false,
    };

    await AsyncStorage.setItem(
      KEY,
      JSON.stringify(records),
    );

    console.log(
      `[AttendanceStorage] Tracking location saved: ${updatedLocations.length}/20`,
    );

    return true;
  }

  // ============================================================
  // GET TRACKING LOCATIONS
  // ============================================================

  async getTrackingLocations(): Promise<EmployeeLocation[]> {

    const activeCheckIn =
      await this.getActiveCheckIn();

    if (!activeCheckIn) {
      return [];
    }

    return [
      ...(activeCheckIn.trackingLocations ?? []),
    ];
  }

  // ============================================================
  // GET TRACKING COUNT
  // ============================================================

  async getTrackingCount(): Promise<number> {

    const locations =
      await this.getTrackingLocations();

    return locations.length;
  }

  // ============================================================
  // CLEAR TRACKING LOCATIONS
  // ============================================================

  async clearTrackingLocations(): Promise<boolean> {

    const records =
      await this.getAll();

    const today =
      new Date().toDateString();

    const checkInIndex =
      records.findIndex(item => {

        if (item.type !== 'check-in') {
          return false;
        }

        return (
          new Date(
            item.timestamp,
          ).toDateString() === today
        );
      });

    if (checkInIndex === -1) {
      return false;
    }

    records[checkInIndex] = {
      ...records[checkInIndex],

      trackingLocations: [],

      synced: false,
    };

    await AsyncStorage.setItem(
      KEY,
      JSON.stringify(records),
    );

    return true;
  }

  // ============================================================
  // REPLACE ALL
  // ============================================================

  async replaceAll(
    records: AttendanceRecord[],
  ): Promise<void> {

    await AsyncStorage.setItem(
      KEY,
      JSON.stringify(records),
    );
  }

  // ============================================================
  // CLEAR EVERYTHING
  // ============================================================

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  }

  // ============================================================
  // ATTENDANCE SUMMARY
  // ============================================================

  async getTodayAttendanceSummary() {

    const records =
      await this.getTodayAttendance();

    const checkIn =
      records.find(
        item => item.type === 'check-in',
      );

    const checkOut =
      records.find(
        item => item.type === 'check-out',
      );

    let workingHours =
      '00h 00m';

    if (checkIn && checkOut) {

      const start =
        new Date(
          checkIn.timestamp,
        ).getTime();

      const end =
        new Date(
          checkOut.timestamp,
        ).getTime();

      const diff =
        end - start;

      const hours =
        Math.floor(
          diff /
            (1000 * 60 * 60),
        );

      const minutes =
        Math.floor(
          (diff %
            (1000 * 60 * 60)) /
            (1000 * 60),
        );

      workingHours =
        `${hours}h ${minutes}m`;

    } else if (checkIn) {

      const start =
        new Date(
          checkIn.timestamp,
        ).getTime();

      const now =
        Date.now();

      const diff =
        now - start;

      const hours =
        Math.floor(
          diff /
            (1000 * 60 * 60),
        );

      const minutes =
        Math.floor(
          (diff %
            (1000 * 60 * 60)) /
            (1000 * 60),
        );

      workingHours =
        `${hours}h ${minutes}m`;
    }

    return {

      checkInTime:
        checkIn
          ? new Date(
              checkIn.timestamp,
            ).toLocaleTimeString(
              [],
              {
                hour: '2-digit',
                minute: '2-digit',
              },
            )
          : '',

      checkOutTime:
        checkOut
          ? new Date(
              checkOut.timestamp,
            ).toLocaleTimeString(
              [],
              {
                hour: '2-digit',
                minute: '2-digit',
              },
            )
          : '',

      workingHours,
    };
  }
}

export default new AttendanceStorage();