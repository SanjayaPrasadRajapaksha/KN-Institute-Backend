import ScheduleService from "../../services/course/schedule.service.js";

const ScheduleController = {
    create: async (req, res) => {
        try {
            const { day, start_time, end_time } = req.body;

            const result = await ScheduleService.create(day, start_time, end_time);

            if (result.status) {
                res.status(201).json({
                    response_code: 200,
                    status: true,
                    message: 'Schedule added successfully!',
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
                message: 'Error occurred while saving Schedule!'
            });
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await ScheduleService.getAll();
            if (!result) {
                res.status(404).json({ response_code: 404, status: false, message: 'Schedules not found!' });
                return;
            }
            res.status(200).json({
                response_code: 200,
                status: true,
                message: 'Schedules fetched successfully!',
                result
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while fetching Schedule!'
            });
        }
    },

    deleteById: async (req, res) => {
        const id = req.params.id;

        try {
            const result = await ScheduleService.deleteById(id);

            if (result == 1) {
                res.status(200).json({
                    response_code: 200,
                    status: true, message: 'Schedule deleted successfully!'
                });
            } else {
                res.status(404).json({
                    response_code: 404,
                    status: false, message: 'Schedule not found!'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while deleting Schedule!'
            });

        }
    },

    findById: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await ScheduleService.findById(id);
            if (!result) {
                res.status(404).json({ response_code: 404, status: false, message: 'Schedule not found!' });
                return;
            }
            res.status(200).json({
                response_code: 200,
                status: true,
                message: 'Schedule fetched successfully!',
                result
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while fetching Schedule!'
            });
        }
    },

    updateById: async (req, res) => {
        const id = req.params.id;
        const { day, start_time, end_time } = req.body;
        console.log("ssssss", id)
        try {
            const result = await ScheduleService.updateById(id, day, start_time, end_time);


            if (result == 1) {
                res.status(200).json({
                    response_code: 200,
                    status: true, message: 'Schedule updated successfully!'
                });
            } else {
                res.status(404).json({
                    response_code: 404,
                    status: false, message: 'Schedule not found!'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                response_code: 500,
                status: false, message: 'Error occurred while updating schedule!'
            });
        }
    },
}

export default ScheduleController;