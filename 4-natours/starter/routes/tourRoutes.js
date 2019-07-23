const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');

router.param('id', tourController.checkID);

// Check body for name and price
// If not present return 400
// Add it the POST middleware stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
