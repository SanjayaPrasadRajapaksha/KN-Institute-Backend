import TeacherService from "../../services/course/teacher.service.js";

const TeacherController = {
    create: async (req, res) => {
        try {
            const { name, qualification, experience, description } = req.body;

            const result = await TeacherService.create(name, qualification, experience, description);

            if (result.status) {
                res.status(201).json({
                    response_code: 200,
                    status: true,
                    message: 'Teacher added successfully!',
                    result: result.result
                });
            } else {
                res.status(400).json({
                    response_code: 400,
                    status: false,
                    message: result.message
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                error: error,
                status: false,
                message: 'Error occurred while saving Teacher!'
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await TeacherService.getAll();
            if (!result) {
                res.status(404).json({ response_code: 404, status: false, message: 'Teachers not found!' });
                return;
            }
            res.status(200).json({
                response_code: 200,
                status: true,
                message: 'Teachers fetched successfully!',
                result
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while fetching Teacher!'
            });
        }
    },

    deleteById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await TeacherService.deleteById(id);

            if (result == 1) {
                res.status(200).json({
                    response_code: 200,
                    status: true, message: 'Teacher deleted successfully!'
                });
            } else {
                res.status(404).json({
                    response_code: 404,
                    status: false, message: 'Teacher not found!'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while deleting Teacher!'
            });

        }
    },

    findById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await TeacherService.findById(id);
            if (!result) {
                res.status(404).json({ response_code: 404, status: false, message: 'Teacher not found!' });
                return;
            }
            res.status(200).json({
                response_code: 200,
                status: true,
                message: 'Teacher fetched successfully!',
                result
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while fetching Teacher!'
            });
        }
    },

    updateById: async (req, res) => {
        const id = req.params.id;
        const { name, qualification, experience, description } = req.body;
        console.log("ssssss", id)
        try {
            const result = await TeacherService.updateById(id, name, qualification, experience, description);


            if (result == 1) {
                res.status(200).json({
                    response_code: 200,
                    status: true, message: 'Teacher updated successfully!'
                });
            } else {
                res.status(404).json({
                    response_code: 404,
                    status: false, message: 'Teacher not found!'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while updating teacher!'
            });
        }
    },
}

export default TeacherController;