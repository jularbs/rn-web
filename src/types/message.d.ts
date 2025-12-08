export interface IMessage {
  _id: Types.ObjectId;
  stationId: Types.ObjectId;
  reason: string;
  fullName: string;
  emailAddress: string;
  excerpt: string;
  contactNumber: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  readAt?: Date;
  readBy?: Types.ObjectId;
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
