const AuthModel = require("../../models/auth.model");

exports.log = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).send({
                data: {
                    success: true,
                    message: "email & password are required",
                },
                errorNode: {
                    errorCode: 0,
                    errorMsg: "no error",
                },
            });
        }

        const user = await AuthModel.findOne({ where: { email: email } });

        if (!user) {
            return res.status(400).send({
                data: {
                    success: false,
                    details: {},
                    message: "user not found",
                },
                errorNode: {
                    errorCode: 0,
                    errorMsg: "no error",
                },
            });
        }

        // Check password validity here, and perform login/authentication logic.

        // Return a success response after successful login.
        return res.status(200).send({
            data: {
                success: true,
                details: user,
                message: "login successful",
            },
            errorNode: {
                errorCode: 0,
                errorMsg: "no error",
            },
        });
    } catch (error) {
        // Handle any potential errors during the process.
        return res.status(500).send({
            data: {
                success: false,
                details: {},
                message: "internal server error",
            },
            errorNode: {
                errorCode: 1,
                errorMsg: error.message,
            },
        });
    }
};


// exports.log = async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     if (!email || !password) {
//         return res.status(200).send({
//             data: {
//                 success: true,
//                 message: "email & password is required",
//             },
//             errorNode: {
//                 errorCode: 0,
//                 errorMsg: "no error",
//             },
//         });
//     }
//     const count = await AuthModel.count({ where: { email: email } });
//     if (count) {
//         const dataLog = await AuthModel.findOne({ where: { email: email } })
//     } else {
//         return res.status(400).send({
//             data: {
//                 success: false,
//                 details: {},
//                 message: "user not found"
//             },
//             errorNode: {
//                 errorCode: 0,
//                 errorMsg: "no error",
//             },
//         })
//     }
// };

exports.signup = async (req, res) => {
    try {
        const { email, password} = req.body.data;
        if (!email || !password) {
            return res.status(400).send({
                data: {
                    success: false,
                    message: "All fields are required",
                },
                errorNode: {
                    errorCode: 0,
                    errorMsg: "All fields are required",
                },
            });

        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            data: {
                sucess: false,
                details: "Something went wrong!! please try again",
            },
            errorNode: { errorCode: 1, errorMsg: "error" },
        });
    }
}
