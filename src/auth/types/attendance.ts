// export interface AttendanceRecord {
//   id: string;
//   employeeId: string;
//   employeeName: string;
//   type: 'check-in' | 'check-out';

//   photoUri: string;

//   latitude: number;
//   longitude: number;
//   address: string;

//   timestamp: string;

//   synced: boolean;
// }




export interface EmployeeLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  bearing: number;
  timestamp: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'check-in' | 'check-out';
  photoUri: string;
  latitude: number;
  longitude: number;
  address: string;
  timestamp: string;
  synced: boolean;

  trackingLocations?: EmployeeLocation[];
}