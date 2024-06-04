const reviewService = require('../model/review');
const { sendData } = require('../websocket/socket');
class reviewController {
  async getAllReviews(req, res) {
    try {
      const reviews = await reviewService.find();
      res.send({
        message: "All Reviews",
        data: reviews,
        status: 200
      })
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving reviews.",
        status: 500
      });
    }
  }

  async getReview(req, res) {
    const id = req.params.id;

    try {
      const data = await reviewService.findById(id);
      if (!data) {
        res.status(404).send({
          message: `Not found Review with id ${id}`,
          status: 404
        });
      } else {
        res.send({
          message: "Review",
          data: data,
          status: 200
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error retrieving Review with id=" + id,
        status: 500
      });
    }
  }

  async addReview(req, res) {
    if (!req.body.title || !req.body.content) {
      res.status(400).send({
        message: "Title and Content can not be empty!",
        status: 400
      });
      return;
    }

    const review = new reviewService({
      title: req.body.title,
      content: req.body.content,
    });

    try {
      const data = await review.save();

      sendData({
        task: 'add',
        data: data,
        status: 200
      });
      res.send(data);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the Review.",
        status: 500
      });
    }
  }

  async removeReview(req, res) {
    const id = req.params.id;

    try {
      const data = await reviewService.findByIdAndDelete(id);
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Review with id=${id}. Maybe Review was not found!`,
          status: 404
        });
      } else {

        sendData({
          task: 'remove',
          data: data,
          status: 200
        })

        res.send({
          message: "Review was deleted successfully!",
          status: 200
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Could not delete Review with id=" + id,
        status: 500
      });
    }
  }

  async updateReview(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
        status: 400
      });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).send({
        message: "Title and Content can not be empty!",
        status: 400
      });
      return;
    }

    const id = req.params.id;

    try {
      const data = await reviewService.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true});
      if (!data) {
        res.status(404).send({
          message: `Cannot update Review with id=${id}. Maybe Review was not found!`,
          status: 404
        });
      } else {

        sendData({
          task: 'update',
          data: data,
          status: 200
        })

        res.send({
          message: "Review was updated successfully.",
          status: 200
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error updating Review with id=" + id,
        status: 500
      });
    }
  }

}

module.exports = {
  userController: reviewController
}
