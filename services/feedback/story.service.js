import StoryRepo from "../../repositories/feedback/story.repo.js";


const StoryService = {
    create: async (name, message) => {
        try {
            const result = await StoryRepo.create(name, message);
            return {
                status: true,
                result: result
            };
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    getAll: async () => {
        try {
            const result = await StoryRepo.getAll();
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    findById: async (id) => {
        try {
            const result = await StoryRepo.findById(id);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    deleteById: async (id) => {
        try {
            const result = await StoryRepo.deleteById(id);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    verifyById: async (id, status) => {
        try {
            const result = await StoryRepo.verifyById(id, status);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    }


}

export default StoryService;