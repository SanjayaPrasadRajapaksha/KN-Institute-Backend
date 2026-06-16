import adminService from "../../services/user/admin.service.js";

const adminController = {

    adminLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await adminService.adminLogin(email, password);
            if (!result.status) {
                // If status is false, return status 400 with the error message
                res.status(400).json({ response_code: 400, error: result.message, });
            } else {
                // If status is true, return status 200 with the success message and token
                res.status(200).json({ response_code: 200, result });
            }
        } catch (error) {
            console.error('Error submitting request form:', error);
            return res.status(500).json({
                response_code: 500,
                success: false,
                message: 'Internal server error',
            });
        }
    },


    registerAdmin: async (req, res) => {
        try {
            const { email, password, name, role_id } = req.body;
            if (!email || !password || !name || !role_id) {
                return res.status(400).json({ response_code: 400, success: false, message: 'Missing required fields: email, password, name, role_id' });
            }
            const result = await adminService.adminRegistration(email, password, name, role_id);
            if (!result || !result.status) {
                return res.status(400).json({ response_code: 400, error: result ? result.message : 'Registration failed' });
            }
            return res.status(201).json({ response_code: 201, success: true, message: result.message, result: result.data });
        } catch (error) {
            res.status(500).json({ response_code: 500, success: false, message: error.message });
        }
    },

    superAdminRegistration: async (req, res) => {
        try {
            const result = await adminService.superAdminRegistration();
            if (!result) {
                res.status(400).json({ response_code: 400, error: result.message });
            } else {
                // If status is true, return status 200 with the success message and token
                res.status(200).json({ response_code: 200, success: true, message: "Super Admin registered successfully" });
            }
        } catch (error) {
            res.status(500).json({
                response_code: 500,
                success: false, message: error.message
            });
        }
    },

    changeAdminPassword: async (req, res) => {
        const adminId = req.params.id;
        const { oldPassword, newPassword } = req.body;
        try {
            const result = await adminService.changeAdminPassword(
                adminId,
                oldPassword,
                newPassword
            );

            if (result.status === false) {
                // If status is false, return status 400 with the error message
                res.status(400).json({ response_code: 400, error: result.message });
            } else {
                res.status(200).json({ response_code: 200, success: true, message: "Admin password updated" });
            }
        } catch (error) {
            res.status(500).json({ response_code: 500, error: "Error occurred!" });
        }
    },

    getAdmin: async (req, res, next) => {
        try {
            const adminData = await adminService.getAdmin();
            const simplifiedAdminData = adminData.map(admin => ({
                id: admin.id,
                email: admin.email,
                name: admin.name,
            }));
            res.json(adminData);
        } catch (error) {
            next(error);
        }
    },

    getAdminById: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await adminService.getAdminById(id);
            if (!result || !result.status) {
                return res.status(404).json({ response_code: 404, status: false, message: result ? result.message : 'Admin not found' });
            }
            return res.status(200).json({ response_code: 200, status: true, message: result.message, result: result.data });
        } catch (error) {
            return res.status(500).json({ response_code: 500, status: false, message: error.message });
        }
    },

    updateAdminDetails: async (req, res) => {
        const adminId = req.params.id
        const { email, name } = req.body;
        try {
            const updatedUser = await adminService.updateAdmin(adminId, email, name);
            if (updatedUser.status) {
                return res.status(200).json({
                    response_code: 200,
                    success: true,
                    message: 'User updated successfully',
                    updatedUser: updatedUser.updatedUser
                });
            } else {
                return res.status(400).json({
                    response_code: 400,
                    status: false,
                    message: updatedUser.message || "User not found or not updated",
                });
            }
        } catch (error) {
            return res.status(500).json({
                response_code: 500,
                status: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    },
    verifyAdminById: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body; // expecting a boolean value

        try {
            const result = await adminService.verifyAdminById(id, status);

            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    status: result.status,
                    message: result.message,
                });
            } else {
                res.status(400).json({
                    response_code: 404,
                    status: result.status,
                    message: result.message,
                });
            }
        } catch (error) {
            return res.status(500).json({
                response_code: 500,
                status: false,
                message: error.message
            });
        }
    },

    activateAdminById: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body; // expecting a boolean value

        try {
            const result = await adminService.activateAdminById(id, status);

            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    status: result.status,
                    message: result.message,
                });
            } else {
                res.status(400).json({
                    response_code: 404,
                    status: result.status,
                    message: result.message,
                });
            }
        } catch (error) {
            return res.status(500).json({
                response_code: 500,
                status: false,
                message: error.message
            });
        }
    },

    updateSuspendStatusById: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body; // expecting a boolean value

        try {
            const result = await adminService.updateSuspendStatusById(id, status);

            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    status: result.status,
                    message: result.message,
                });
            } else {
                res.status(400).json({
                    response_code: 404,
                    status: result.status,
                    message: result.message,
                });
            }
        } catch (error) {
            return res.status(500).json({
                response_code: 500,
                status: false,
                message: error.message
            });
        }
    },

       deleteAdminById: async (req, res) => {

        try {
            const id = req.params.id;
            const result = await adminService.deleteAdminById(id);
            if (result.status) {
                res.status(200).json({
                    response_code: 200,
                    status: result.status,
                    message: result.message,
                });
            } else {
                res.status(400).json({
                    response_code: 404,
                    status: result.status,
                    message: result.message,
                });
            }
        } catch (error) {
            return res.status(500).json({
                response_code: 500,
                status: false,
                message: error.message
            });
        }
    },
};

export default adminController;