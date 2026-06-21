import Story from "../../models/feedback/story.model.js";

const StoryRepo = {
    create: async (name, message) => {
        try {

            const result = await Story.create({
                name: name,
                message: message
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const result = await Story.findOne({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await Story.findAll({
            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    deleteById: async (id) => {
        try {
            const result = await Story.destroy({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    verifyById: async (id, status) => {
        try {
            const result = await Story.update({
                verified: status
            }, {
                where: {
                    id: id
                }
            });
            return result[0];
        } catch (error) {
            throw error;
        }
    },
}


export default StoryRepo;