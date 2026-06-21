import CourseRepo from "../../repositories/course/course.repo.js";


const CourseService = {
    create: async (first_title, second_title, description, duration, schedule, content) => {
        try {
            const result = await CourseRepo.create(first_title, second_title, description, duration, schedule, content);
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
            const result = await CourseRepo.getAll();
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    findById: async (id) => {
        try {
            const result = await CourseRepo.findById(id);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    deleteById: async (id) => {
        try {
            const result = await CourseRepo.deleteById(id);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    updateById: async (id, first_title, second_title, description, duration, schedule, content) => {
        try {
            const result = await CourseRepo.updateById(id, first_title, second_title, description, duration, schedule, content);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }

    }
}

export default CourseService;