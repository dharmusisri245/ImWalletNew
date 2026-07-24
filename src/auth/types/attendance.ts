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
}