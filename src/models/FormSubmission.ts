import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFormSubmission extends Document {
  name: string;
  email?: string;
  phone: string;
  service?: string;
  message?: string;
  source: 'Réparation' | 'Installation du climatiseur';
  createdAt: Date;
  whatsappSent: boolean;
  whatsappMessageId?: string;
}

const FormSubmissionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    source: {
      type: String,
      enum: ['Réparation', 'Installation du climatiseur'],
      required: true,
    },
    whatsappSent: {
      type: Boolean,
      default: false,
    },
    whatsappMessageId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-compilation during development
const FormSubmission: Model<IFormSubmission> =
  mongoose.models.FormSubmission ||
  mongoose.model<IFormSubmission>('FormSubmission', FormSubmissionSchema);

export default FormSubmission;

