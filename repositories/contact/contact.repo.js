import { Contact } from "../../models/contact/contact.model.js";

const contactRepo = {
    contactAdd: async (firstName, lastName, phoneNumber, email, message) => {
        try {

            const result = await Contact.create({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                message: message
            }
            );
            return result;
        } catch (error) {
            throw error;
        }
    },


    findByEmail: async (email) => {
        try {
            const result = await Contact.findOne({
                where: {
                    email: email,
                },

            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAllContact: async () => {
        try {
            const result = await Contact.findAll({

            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const result = await Contact.findOne({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteContactById: async (id) => {
        try {
            const result = await Contact.destroy({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}


export default contactRepo;