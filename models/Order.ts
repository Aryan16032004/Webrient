import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  userEmail: string;
  template: mongoose.Types.ObjectId;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalPrice: number;
  customerDetails: {
    businessName: string;
    contactEmail: string;
    contactPhone: string;
    requirements: string;
  };
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    customerDetails: {
      businessName: {
        type: String,
        required: true,
      },
      contactEmail: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
        required: true,
      },
      requirements: {
        type: String,
        required: true,
      },
    },
    paymentId: {
      type: String,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Generate order number before saving
OrderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `WR-${year}${month}${day}-${random}`;
  }
  next();
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);