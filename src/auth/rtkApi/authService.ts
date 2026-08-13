const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const authService = {
    login: async ({ employeeId, password }) => {
        await delay(1500);

        // Dummy validation
        if (employeeId === 'EMP001' && password === '1234') {
            return {
                success: true,
                message: 'Login successful',
                data: {
                    token: 'dummy-jwt-token',
                    refreshToken: 'dummy-refresh-token',
                    user: {
                        id: '1',
                        employeeId: 'EMP001',
                        name: 'Dharmendra Gupta',
                        email: 'dharmendra@test.com',
                        role: 'Employee',
                    },
                },
            };
        }
        throw {
            success: false,
            message: 'Invalid Employee ID or Password',
        };
    },

    requestOtp: async ({ employeeId }) => {
        await delay(1000);
        return {
            success: true,
            message: 'OTP sent successfully',
            otp: '1234', // Only for testing
        };
    },

    // verifyOtp: async ({ employeeId, otp }) => {
    //     console.log("Employee:", employeeId);
    //     console.log("OTP:", otp);

    //     await delay(1000);

    //     if (otp === "9876") {
    //         return {
    //             success: true,
    //             message: "OTP verified",
    //             token: "dummy-jwt-token",
    //         };
    //     }

    //     throw {
    //         success: false,
    //         message: "Invalid OTP",
    //     };
    // },


    
    verifyOtp: async ({ employeeId, otp }) => {
        console.log('Employee:', employeeId);
        console.log('OTP:', otp);

        await delay(1000);

        if (otp === '9876') {
            return {
                success: true,
                message: 'OTP verified',
                accessToken: 'dummy-jwt-token',
                refreshToken: 'dummy-refresh-token',

                employee: {
                    id: '1',
                    employeeId: employeeId,
                    name: 'Dharmendra Gupta',
                    email: 'dharmendra@test.com',
                    role: 'Employee',
                },
            };
        }

        throw {
            success: false,
            message: 'Invalid OTP',
        };
    },


    logout: async () => {
        await delay(500);

        return {
            success: true,
            message: 'Logout successful',
        };
    },
};

export default authService;







// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export type UserRole =
//   | 'employee'
//   | 'manager'
//   | 'employer'
//   | 'admin';

// export interface User {
//   id: string;
//   employeeId: string;
//   name: string;
//   email: string;
//   role: UserRole;
// }

// interface AuthState {
//   user: User | null;

//   accessToken: string | null;

//   refreshToken: string | null;

//   role: UserRole | null;

//   isAuthenticated: boolean;

//   loading: boolean;
// }

// const initialState: AuthState = {
//   user: null,

//   accessToken: null,

//   refreshToken: null,

//   role: null,

//   isAuthenticated: false,

//   loading: false,
// };

// const authSlice = createSlice({
//   name: 'auth',

//   initialState,

//   reducers: {
//     /**
//      * Called after successful login
//      */
//     loginSuccess: (
//       state,
//       action: PayloadAction<{
//         user: User;
//         accessToken: string;
//         refreshToken?: string;
//       }>,
//     ) => {
//       const {
//         user,
//         accessToken,
//         refreshToken,
//       } = action.payload;

//       state.user = user;

//       state.accessToken = accessToken;

//       state.refreshToken =
//         refreshToken ?? null;

//       state.role = user.role;

//       state.isAuthenticated = true;

//       state.loading = false;
//     },

//     /**
//      * Update only user information
//      */
//     setUser: (
//       state,
//       action: PayloadAction<User>,
//     ) => {
//       state.user = action.payload;

//       state.role = action.payload.role;
//     },

//     /**
//      * Update role if required later
//      */
//     setRole: (
//       state,
//       action: PayloadAction<UserRole>,
//     ) => {
//       state.role = action.payload;

//       if (state.user) {
//         state.user.role = action.payload;
//       }
//     },

//     /**
//      * Update access token
//      */
//     setAccessToken: (
//       state,
//       action: PayloadAction<string>,
//     ) => {
//       state.accessToken = action.payload;
//     },

//     /**
//      * Logout
//      */
//     logout: state => {
//       state.user = null;

//       state.accessToken = null;

//       state.refreshToken = null;

//       state.role = null;

//       state.isAuthenticated = false;

//       state.loading = false;
//     },

//     /**
//      * Loading state
//      */
//     setAuthLoading: (
//       state,
//       action: PayloadAction<boolean>,
//     ) => {
//       state.loading = action.payload;
//     },
//   },
// });

// export const {
//   loginSuccess,
//   setUser,
//   setRole,
//   setAccessToken,
//   logout,
//   setAuthLoading,
// } = authSlice.actions;

// export default authSlice.reducer;