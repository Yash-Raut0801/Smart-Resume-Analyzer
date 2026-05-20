import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    email:      { type: String, required: true },
    skills:     [String],
    experience: { type: Number, default: 0 },
    score:      { type: Number, default: 0 },
    role:       { type: String, default: "General Software Developer" }
}, { timestamps: true });

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
