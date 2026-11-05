import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  subject: string;
  customer: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved";
  date: string;
  createdBy: string; 
  rating?: number; 
  feedback?: string;
}

const TicketSchema: Schema = new Schema({
  subject: { type: String, required: true },
  customer: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  status: { type: String, enum: ["Open", "In Progress", "Resolved"], default: "Open" },
  date: { type: String, required: true },
  createdBy: { type: String, required: true }, 
   rating: { type: Number, default: 0 }, 
  feedback: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", TicketSchema);