import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './axiosBaseQuery';
import {AttendanceRecord} from '../auth/types/attendance';

export const attendanceApi = createApi({
  reducerPath: 'attendanceApi',

  baseQuery: axiosBaseQuery({
    baseUrl: 'https://dummy-api.imwallet.com/api', // Replace later
  }),

  tagTypes: ['Attendance'],

  endpoints: builder => ({
    uploadAttendance: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      AttendanceRecord
    >({
      query: body => ({
        url: '/attendance',
        method: 'POST',
        data: body,
      }),
    }),
  }),
});

export const {
  useUploadAttendanceMutation,
} = attendanceApi;