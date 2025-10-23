import mongoose from "mongoose";

const camperSchema = new mongoose.Schema();

export default mongoose.model("Camper", camperSchema);
