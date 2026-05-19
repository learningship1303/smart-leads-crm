import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,

      // EMAIL VALIDATION
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Lost",
      ],
      default: "New",
    },

    source: {
      type: String,
      enum: [
        "Website",
        "Instagram",
        "Referral",
      ],
      default: "Website",
      required: true,
    },

    // OWNER OF LEAD
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Lead",
  leadSchema
);