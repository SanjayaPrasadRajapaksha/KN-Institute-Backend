import Course from "../../models/course/course.model.js";

const CourseRepo = {
    create: async (first_title, second_title, description, duration, schedule, content) => {
        try {

            const result = await Course.create({
                first_title: first_title,
                second_title: second_title,
                description: description,
                duration: duration,
                schedule: schedule,
                content: content
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const result = await Course.findOne({
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
            const result = await Course.findAll({
            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    deleteById: async (id) => {
        try {
            const result = await Course.destroy({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    updateById: async (id, first_title, second_title, description, duration, schedule, content) => {
        try {
            const result = await Course.update(
                {
                    first_title: first_title,
                    second_title: second_title,
                    description: description,
                    duration: duration,
                    schedule: schedule,
                    content: content
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return result;
        } catch (err) {
            throw err;
        }

    },
}
    export default CourseRepo;