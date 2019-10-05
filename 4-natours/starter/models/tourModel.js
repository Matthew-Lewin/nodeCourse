const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must have less than or equal to 40 characters'
      ],
      minlength: [10, 'A tour name must have 10 or more characters']
      /*       validate: [validator.isAlpha, 'Tour name must only contain characters'] */
      // Above excludes spaces, too... 💀
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Duration is required']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'MaxGroupSize is required']
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy, medium or difficult'
        //enum is for strings only!
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc when creating NEW documents
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be less than regular price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a cover image']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: true
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// Document Middleware: runs before .save() and .create()

tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
});

tourSchema.pre('save', function(next) {
  console.log('Will save document... 🧾');

  next();
});

// Query Middleware
/* tourSchema.pre('find', function(next) {
 */
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  console.log(docs);
  next();
});

//Aggregation Middleware
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
