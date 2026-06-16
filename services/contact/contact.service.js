import contactRepo from "../../repositories/contact/contact.repo.js";
import sendEmail from "../../config/sendEmail.js";

const contactService = {
    contactAdd: async (firstName, lastName, phoneNumber, email, message) => {
        try {

            const contact = await contactRepo.contactAdd(firstName, lastName, phoneNumber, email, message);

            await sendEmail(email,firstName,lastName);
            return contact;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    getAllContact: async () => {
        try {
            const allContact = await contactRepo.getAllContact();
            return allContact;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    getContactById: async (id) => {
        try {
            const contact = await contactRepo.findById(id);
            return contact;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    deleteContactById: async (id) => {
        try {
            const deleteContact = await contactRepo.deleteContactById(id);
            return deleteContact;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },
}


export default contactService;