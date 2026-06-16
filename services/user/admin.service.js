import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../config/adminEmail.js";
import adminRepo from "../../repositories/user/admin.repo.js";
import RoleRepo from "../../repositories/user/role.repo.js";

const adminService = {

    superAdminRegistration: async () => {
        try {
            const password = process.env.SUPER_ADMIN_PASSWORD || "superAdmin@123";
            const email = process.env.SUPER_ADMIN_EMAIL || "superadmin@example.com";
            const name = process.env.SUPER_ADMIN_NAME || "superadmin";

            const encrypted_pw = await bcrypt.hash(password, 10);

            const existingUser = await adminRepo.getAdminByEmail(email);
            if (existingUser) {
                return {
                    status: false,
                    message: "Super Admin user already exists.",
                };
            }

            // Create or find role
            const position = "Super Admin";
            const role = await RoleRepo.findOrCreateByPosition(position);

            // Create user account
            const user = await adminRepo.registerAdmin(
                email,
                encrypted_pw,
                name,
                role.id,
            );

            return {
                status: true,
                message: "Super Admin registered successfully!",
                data: user,
            };
        } catch (error) {
            console.error("Error in superAdminRegistration:", error);
            throw error;
        }
    },

    adminRegistration: async (email, password, name, role_id) => {
        try {
            const encrypted_pw = await bcrypt.hash(password, 10);

            const existingUser = await adminRepo.getAdminByEmail(email);
            if (existingUser) {
                return {
                    status: false,
                    message: "User with this email already exists.",
                };
            }

            const role = await RoleRepo.findById(role_id);
            if (!role) {
                return {
                    status: false,
                    message: "Invalid role ID provided.",
                };
            }

            // Create user account
            const user = await adminRepo.registerAdmin(email, encrypted_pw, name, role.id);

            const credentialMessage = `
Dear ${name},<br><br>

Your admin account has been successfully created. Below are your login credentials:<br><br>

<b>Email:</b> ${email}<br>
<b>Password:</b> ${password}<br><br>

For security reasons, please log in and change your password immediately after your first login.<br><br>

Best regards,<br>
Tupnow Team
`;
            await sendEmail(email, "Admin Account Credentials", credentialMessage);
            return {
                status: true,
                message: "Admin registered successfully!",
                data: user,
            };
        } catch (error) {
            console.error("Error in adminRegistration:", error);
            throw error;
        }
    },

    adminLogin: async (email, password) => {
        try {
            const admin = await adminRepo.getAdminByEmail(email);
            if (!admin) {
                return { status: false, message: "admin data not found!" };
            }

            // checking password
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                return { status: false, message: "Incorrect password!" };
            }

            const secret = process.env.SECRET;
            if (!secret) {
                return { status: false, message: 'JWT secret not configured on server' };
            }
            const token = jwt.sign({ AdminId: admin.id }, secret, { expiresIn: 259200 });
            return { status: true, message: "Login Successfully!", id: admin.id, token };
        } catch (error) {
            throw error;
        }
    },

    changeAdminPassword: async (adminId, oldPassword, newPassword) => {
        try {
            // get admin
            const admin = await adminRepo.getAdminById(adminId);
            if (!admin) {
                return {
                    status: false,
                    message: "admin not found!",
                };
            }
            // checking current password
            const passwordMatch = await bcrypt.compare(oldPassword, admin.password);
            if (!passwordMatch) {
                return {
                    status: false,
                    message: "Incorrect old password!",
                };
            }
            // hash new password using bcrypt algorithm
            const newPasswordHash = await bcrypt.hash(newPassword, 10);
            console.log(newPassword);
            const result = await adminRepo.changeAdminPassword(adminId, newPasswordHash);
            // Sequelize update returns an array [affectedCount] or number depending on config
            const updated = Array.isArray(result) ? result[0] : result;
            if (!updated) {
                return { status: false, message: "Password update failed!" };
            }
            return { status: true, message: "Password updated successfully!" };
        } catch (error) {
            throw error;
        }
    },

    getAdmin: async () => {
        try {
            const result = await adminRepo.getAdmin();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAdminById: async (adminId) => {
        try {
            const admin = await adminRepo.getAdminById(adminId);
            if (!admin) {
                return { status: false, message: 'Admin not found' };
            }
            return { status: true, message: 'Admin fetched successfully', data: admin };
        } catch (error) {
            throw error;
        }
    },

    updateAdmin: async (adminId, email, name) => {
        try {
            const exUser = await adminRepo.getAdminById(adminId);
            if (!exUser) {
                return { status: false, message: "User not found" };
            }

            let dataToUpdate = { adminId, email, name };
            const result = await adminRepo.updateAdmin(dataToUpdate);
            const updatedUser = await adminRepo.getAdminById(adminId);
            return { status: true, message: "Admin updated successfully", updatedUser };
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    verifyAdminById: async (id, status) => {
        try {
            const admin = await adminRepo.getAdminById(id);

            if (!admin) {
                return { status: false, message: "Admin not found!" };
            }

            const result = await adminRepo.verifyAdminById(id, status);
            if (result == 1) {
                return {
                    status: true,
                    message: "Admin verification status updated successfully!",
                };
            } else {
                return {
                    status: false,
                    message: "Error when updating admin verification status!",
                };
            }
        } catch (error) {
            throw error;
        }
    },

    activateAdminById: async (id, status) => {
        try {
            const admin = await adminRepo.getAdminById(id);

            if (!admin) {
                return { status: false, message: "Admin not found!" };
            }

            const result = await adminRepo.activateAdminById(id, status);
            if (result == 1) {
                return {
                    status: true,
                    message: "Admin activation status updated successfully!",
                };
            } else {
                return {
                    status: false,
                    message: "Error when updating admin activation status!",
                };
            }
        } catch (error) {
            throw error;
        }
    },

    updateSuspendStatusById: async (id, status) => {
        try {
            const admin = await adminRepo.getAdminById(id);

            if (!admin) {
                return { status: false, message: "Admin not found!" };
            }

            const result = await adminRepo.updateSuspendStatusById(id, status);
            if (result == 1) {
                return {
                    status: true,
                    message: "Admin suspend status updated successfully!",
                };
            } else {
                return {
                    status: false,
                    message: "Error when updating admin suspend status!",
                };
            }
        } catch (error) {
            throw error;
        }
    },

    deleteAdminById: async (id) => {
        try {
            const admin = await adminRepo.getAdminById(id);

            if (!admin) {
                return { status: false, message: "Admin not found!" };
            }

            const result = await adminRepo.deleteAdminById(id);
            if (result == 1) {
                return { status: true, message: "Admin deleted successfully!" };
            } else {
                return { status: false, message: "Error when deleting admin!" };
            }
        } catch (error) {
            throw error;
        }
    },
}

export default adminService;