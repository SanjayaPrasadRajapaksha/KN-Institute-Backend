import sequelize from "../../config/db.config.js";
import { Admin } from "../../models/user/admin.model.js";


const adminRepo = {


  registerAdmin: async (email, password, name, role_id, transaction) => {
    try {
      const options = transaction ? { transaction } : {};
      const result = await Admin.create(
        {
          email,
          password,
          name,
          role_id,
        },
        options
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAdmin: async () => {
    try {
      const result = await Admin.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAdminById: async (adminId) => {
    try {
      const result = await Admin.findOne({
        where: {
          id: adminId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAdminByEmail: async (email) => {
    try {
      const result = await Admin.findOne({
        where: {
          email: email,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  changeAdminPassword: async (adminId, newPasswordHash) => {
    try {
      await sequelize.sync();
      const result = await Admin.update(
        {
          password: newPasswordHash,
        },
        {
          where: {
            id: adminId,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateAdmin: async (values) => {
    try {
      const result = await Admin.update({
        email: values.email,
        name: values.name,
      }, {
        where: {
          id: values.adminId,
        },
      });
      return result;

    } catch (error) {
      throw error;
    }
  },

  verifyAdminById: async (id, status) => {
    try {
      const result = await Admin.update(
        {
          verify_Status: status,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  activateAdminById: async (id, status) => {
    try {
      const result = await Admin.update(
        {
          active_status: status,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updateSuspendStatusById: async (id, status) => {
    try {
      const result = await Admin.update(
        {
          suspended_status: status,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteAdminById: async (id) => {
    try {
      const result = await Admin.destroy({
        where: {
          id: id,
        },
      });
      return result;
    } catch (err) {
      throw err;
    }
  },
  getUserByEmail: async (email) => {
    try {
      const result = await Admin.findAll({
        where: {
          email: email,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  storeOTP: async (id, otp, expireTime) => {
    try {
      const [affectedRows] = await Admin.update(
        {
          otp,
          otpExpiryTime: expireTime,
        },
        { where: { id: id } }
      );
      return affectedRows;
    } catch (error) {
      throw error;
    }
  },

  getStroedOTPByEmail: async (email) => {
    try {
      const exUser = await Admin.findOne({
        where: { email: email },
        attributes: ["otp", "otpExpiryTime"],
      });
      return exUser
        ? { otp: exUser.otp, expiryTime: exUser.otpExpiryTime }
        : null;
    } catch (error) {
      throw error;
    }
  },

  changeUserPasswordByEmail: async (email, encrypted_pw) => {
    try {
      const result = await Admin.update(
        {
          password: encrypted_pw,
        },
        {
          where: {
            email: email,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  clearStoredOTP: async (email) => {
    try {
      await Admin.update(
        {
          otp: null,
          otpExpiryTime: null,
        },
        {
          where: { email: email },
        }
      );
    } catch (error) {
      throw error;
    }
  },
}

export default adminRepo;