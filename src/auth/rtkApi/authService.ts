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