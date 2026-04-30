import mongoose, { Schema, Document } from 'mongoose';

export interface IInvitation extends Document {
  eventType: 'wedding' | 'housewarming' | 'both';
  slug: string;
  templateId: string;
  musicUrl?: string;
  coverImage?: string;
  
  // Wedding Fields
  eventSubHead?: string;
  brideName?: string;
  brideAddress?: string;
  groomName?: string;
  groomAddress?: string;
  fatherName?: string; // Keep for legacy if needed
  motherName?: string; // Keep for legacy if needed
  brideFatherName?: string;
  brideMotherName?: string;
  groomFatherName?: string;
  groomMotherName?: string;
  withLove?: string;
  familyAddress?: string;
  eventDescription?: string;
  eventDate?: string; // Storing as string for simplicity, or Date
  eventTime?: string;
  locationName?: string;
  googleMapLink?: string;
  sharingHappinessText?: string;
  
  // House Warming Fields
  houseName?: string;
  houseAddress?: string;
  
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InvitationSchema: Schema = new Schema(
  {
    eventType: { type: String, enum: ['wedding', 'housewarming', 'both'], required: true },
    slug: { type: String, required: true, unique: true },
    templateId: { type: String, required: true },
    musicUrl: { type: String },
    coverImage: { type: String },

    // Wedding Fields
    eventSubHead: { type: String },
    brideName: { type: String },
    brideAddress: { type: String },
    groomName: { type: String },
    groomAddress: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    brideFatherName: { type: String },
    brideMotherName: { type: String },
    groomFatherName: { type: String },
    groomMotherName: { type: String },
    withLove: { type: String },
    familyAddress: { type: String },
    eventDescription: { type: String },
    eventDate: { type: String },
    eventTime: { type: String },
    locationName: { type: String },
    googleMapLink: { type: String },
    sharingHappinessText: { type: String },

    // House Warming Fields
    houseName: { type: String },
    houseAddress: { type: String },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Invitation || mongoose.model<IInvitation>('Invitation', InvitationSchema);
