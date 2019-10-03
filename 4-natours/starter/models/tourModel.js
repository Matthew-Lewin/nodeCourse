const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true
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
      required: [true, 'Difficulty is required']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    priceDiscount: Number,
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

tourSchema.pre('save', function() {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', function(next) {
  console.log('Will save document... 🧾');
  next();
});

tourSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
});

// Query Middleware
tourSchema.pre('find', function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
