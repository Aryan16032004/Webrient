import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a template name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['E-commerce', 'Portfolio', 'Blog', 'Business', 'Landing Page', 'Other'],
    },
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    demoUrl: {
      type: String,
      required: [true, 'Please provide a demo URL'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    features: {
      type: [String],
      default: [],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Template || mongoose.model('Template', TemplateSchema);