import mongoose from "mongoose";

const emailEventSchema = new mongoose.Schema({
    id: { type: String, required: true },    // Pixel ID
    username: { type: String, required: true },
    opened: { type: Boolean, default: false },
    openedAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("EmailEvent", emailEventSchema);
