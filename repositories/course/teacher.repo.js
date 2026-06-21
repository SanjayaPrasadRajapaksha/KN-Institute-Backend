import Teacher from "../../models/course/teacher.model.js";

const TeacherRepo = {
    create: async (name, qualification, experience, description) => {
        try {

            const result = await Teacher.create({
                name: name,
                qualification: qualification,
                experience: experience,
                description: description
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    findById: async (id) => {
        try {
            const result = await Teacher.findOne({
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
            const result = await Teacher.findAll({
            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    deleteById: async (id) => {
        try {
            const result = await Teacher.destroy({
                where: {
                    id: id,
                },

            });
            return result;
        } catch (err) {
            throw err;
        }
    },

    updateById: async (id, name, qualification, experience, description) => {
        try {
            const result = await Teacher.update({
                name: name,
                qualification: qualification,
                experience: experience,
                description: description
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
export default TeacherRepo;