import mongoose, { Schema, Document } from 'mongoose';

export interface IRSVP extends Document {
  invitationId: mongoose.Types.ObjectId;
  name: string;
  attending: boolean;
  guestCount: number;
  createdAt: Date;
}

const RSVPSchema: Schema = new Schema(
  {
    invitationId: { type: Schema.Types.ObjectId, ref: 'Invitation', required: true },
    name: { type: String, required: true },
    attending: { type: Boolean, required: true },
    guestCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.RSVP || mongoose.model<IRSVP>('RSVP', RSVPSchema);
