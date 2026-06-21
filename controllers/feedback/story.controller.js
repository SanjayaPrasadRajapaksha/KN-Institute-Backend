import StoryService from "../../services/feedback/story.service.js"; 

const StoryController = {
  create: async (req, res) => {
    try {
      const { name, message } = req.body;

      const result = await StoryService.create(name, message);

      if (result.status) {
        res.status(201).json({
          response_code: 200,
          status: true,
          message: 'Story added successfully!',
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
        message: 'Error occurred while saving story!'
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await StoryService.getAll();
      if (!result) {
        res.status(404).json({ response_code: 404, status: false, message: 'Story not found!' });
        return;
      }
      res.status(200).json({
        response_code: 200,
        status: true,
        message: 'Story fetched successfully!',
        result
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        status: false, message: 'Error occurred while fetching story!'
      });
    }
  },

  deleteById: async (req, res) => {
    const id = req.params.id;

    try {
      const result = await StoryService.deleteById(id);

      if (result == 1) {
        res.status(200).json({
          response_code: 200,
          status: true, message: 'Story deleted successfully!'
        });
      } else {
        res.status(404).json({
          response_code: 404,
          status: false, message: 'Story not found!'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        status: false, message: 'Error occurred while deleting story!'
      });

    }
  },

  findById: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await StoryService.findById(id);
      if (!result) {
        res.status(404).json({ response_code: 404, status: false, message: 'Story not found!' });
        return;
      }
      res.status(200).json({
        response_code: 200,
        status: true,
        message: 'Story fetched successfully!',
        result
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        status: false, message: 'Error occurred while fetching story!'
      });
    }
  },

  verifyById: async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    try {
      const result = await StoryService.verifyById(id, status);

      if (result == 1) {
        res.status(200).json({
          response_code: 200,
          status: true, message: 'Story verification status updated successfully!'
        });
      } else {
        res.status(404).json({
          response_code: 404,
          status: false, message: 'Story not found!'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        status: false, message: 'Error occurred while updating story verification status!'
      });
    }
  },
}

export default StoryController;