import TeacherRepo from "../../repositories/course/teacher.repo.js";


const TeacherService = {
    create: async (name, qualification, experience, description) => {
        try {
            const result = await TeacherRepo.create(name, qualification, experience, description);
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
            const result = await TeacherRepo.getAll();
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    findById: async (id) => {
        try {
            const result = await TeacherRepo.findById(id);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    deleteById: async (id) => {
        try {
            const result = await TeacherRepo.deleteById(id);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    updateById: async (id, name, qualification, experience, description) => {

        try {
            const result = await TeacherRepo.updateById(id, name, qualification, experience, description);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }

    }
}

export default TeacherService;