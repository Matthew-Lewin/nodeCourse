const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'New tours must include both name and price. 💀'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    /* time: req.requestTime,
    status: 'success',
    data: {
      tours
    } */
  });
};

exports.getTour = (req, res) => {
  /* const id = req.params.id * 1; */

  res.status(200).json({
    status: 'success'
    /* data: {
      tour
    } */
  });
};

exports.createTour = (req, res) => {
  /* console.log(req.body);
      res.send('Done. 😉'); */

  /* const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); */

  /* tours.push(newTour); */

  res.status(201).json({
    status: 'success'
    /* data: {
      tour: newTour
    } */
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
