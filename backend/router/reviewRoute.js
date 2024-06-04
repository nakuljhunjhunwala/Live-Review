const express = require('express');
const router = express.Router();
const { reviewController } = require('../controller/reviewController');
const review = new reviewController;

router.get('/', (req, res) => {
  res.send({
    message: "Welcome to the HomePage of Review Route",
    status: 200
  })
});

router.get('/all', review.getAllReviews)
router.get('/:id', review.getReview)
router.post('/add', review.addReview)
router.delete('/remove/:id', review.removeReview)
router.put('/update/:id', review.updateReview)

module.exports = router;
