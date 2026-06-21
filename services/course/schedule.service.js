import ScheduleRepo from "../../repositories/course/schedule.repo.js";


const ScheduleService = {
    create: async (day, start_time, end_time) => {
        try {
            const result = await ScheduleRepo.create(day, start_time, end_time);
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
            const result = await ScheduleRepo.getAll();
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    findById: async (id) => {
        try {
            const result = await ScheduleRepo.findById(id);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    deleteById: async (id) => {
        try {
            const result = await ScheduleRepo.deleteById(id);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    updateById: async (id, day, start_time, end_time) => {

        try {
            const result = await ScheduleRepo.updateById(id, day, start_time, end_time);
            return result;
        } catch (error) {
            return { status: false, message: error.message };
        }

    }
}

export default ScheduleService;