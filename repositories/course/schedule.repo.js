import Schedule from "../../models/course/schedule.model.js";

const ScheduleRepo = {
    create: async (day, start_time, end_time) => {
        try {

            const result = await Schedule.create({
                day: day,
                start_time: start_time,
                end_time: end_time
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const result = await Schedule.findOne({
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
            const result = await Schedule.findAll({
            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    deleteById: async (id) => {
        try {
            const result = await Schedule.destroy({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    updateById: async (id, day, start_time, end_timet) => {
        try {
            const result = await Schedule.update({
                day: day,
                start_time: start_time,
                end_time: end_timet
            }, {
                where: {
                    id: id,
                },

            });
            return result;
        } catch (err) {
            throw err;
        }
    },
}
export default ScheduleRepo;