import CourseService from "../../services/course/course.service.js";

const CourseController = {
    create: async (req, res) => {
        try {
            const { first_title, second_title, description, duration, schedule, content } = req.body;

            const result = await CourseService.create(first_title, second_title, description, duration, schedule, content);

            if (result.status) {
                res.status(201).json({
                    response_code: 200,
                    status: true,
                    message: 'Course added successfully!',
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
                message: 'Error occurred while saving Course!'
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await CourseService.getAll();
            if (!result) {
                res.status(404).json({ response_code: 404, status: false, message: 'Courses not found!' });
                return;
            }
            res.status(200).json({
                response_code: 200,
                status: true,
                message: 'Course fetched successfully!',
                result
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while fetching Course!'
            });
        }
    },

    deleteById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await CourseService.deleteById(id);

            if (result == 1) {
                res.status(200).json({
                    response_code: 200,
                    status: true, message: 'Course deleted successfully!'
                });
            } else {
                res.status(404).json({
                    response_code: 404,
                    status: false, message: 'Course not found!'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while deleting Course!'
            });

        }
    },

    findById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await CourseService.findById(id);
            if (!result) {
                res.status(404).json({ response_code: 404, status: false, message: 'Course not found!' });
                return;
            }
            res.status(200).json({
                response_code: 200,
                status: true,
                message: 'Course fetched successfully!',
                result
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while fetching Course!'
            });
        }
    },

    updateById: async (req, res) => {
        const id = req.params.id;
        const { first_title, second_title, description, duration, schedule, content } = req.body;

        try {
            const result = await CourseService.updateById(id, first_title, second_title, description, duration, schedule, content);

            if (result == 1) {
                res.status(200).json({
                    response_code: 200,
                    status: true, message: 'Course updated successfully!'
                });
            } else {
                res.status(404).json({
                    response_code: 404,
                    status: false, message: 'Course not found!'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while updating course!'
            });
        }
    },
}

export default CourseController;