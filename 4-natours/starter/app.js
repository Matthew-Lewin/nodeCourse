// 1) Import modules and use middleware
const express = require('express');
const morgan = require('morgan');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  // if you pass an error to next, Express knows there is an error and skips to error middleware
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});
// Error handling middleware
// Express knows this is error handler, due to 4 parameters
app.use(globalErrorHandler);

// 4) Start server

module.exports = app;
