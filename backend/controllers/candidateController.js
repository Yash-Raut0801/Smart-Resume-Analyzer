import Candidate from "../models/Candidate.js";

// ── Skill scoring logic (ported from Java) ──────────────────────────────────
const SKILL_SCORES = {
    java:           20,
    python:         15,
    sql:            10,
    machinelearning:25,
    javascript:     12,
    react:          12,
    nodejs:         12,
    mongodb:        10,
    html:            5,
    css:             5,
};

function evaluateSkills(skills, experience) {
    const skillScore = skills.reduce((total, skill) => {
        const key = skill.trim().toLowerCase().replace(/\s+/g, "");
        return total + (SKILL_SCORES[key] || 0);
    }, 0);
    return skillScore + experience * 5;
}

function suggestRole(skills) {
    const s = skills.map(sk => sk.trim().toLowerCase().replace(/\s+/g, ""));
    if (s.includes("machinelearning"))  return "AI Engineer";
    if (s.includes("java"))             return "Backend Developer";
    if (s.includes("react"))            return "Frontend Developer";
    if (s.includes("javascript"))       return "Frontend Developer";
    if (s.includes("nodejs"))           return "Backend Developer";
    return "General Software Developer";
}

// ── POST /api/candidates/add ─────────────────────────────────────────────────
export const addCandidate = async (req, res) => {
    try {
        const { name, email, skills, experience } = req.body;

        if (!name || !email || !skills || !Array.isArray(skills)) {
            return res.status(400).json({ message: "name, email and skills[] are required" });
        }

        const score = evaluateSkills(skills, experience || 0);
        const role  = suggestRole(skills);

        const candidate = await Candidate.create({ name, email, skills, experience: experience || 0, score, role });
        res.status(201).json(candidate);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── GET /api/candidates/ ─────────────────────────────────────────────────────
export const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ createdAt: -1 });
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── GET /api/candidates/rank ─────────────────────────────────────────────────
export const rankCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ score: -1 });
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── GET /api/candidates/search?skill=java ────────────────────────────────────
export const searchBySkill = async (req, res) => {
    try {
        const { skill } = req.query;
        if (!skill) return res.status(400).json({ message: "skill query param required" });

        const candidates = await Candidate.find({
            skills: { $regex: new RegExp(`^${skill.trim()}$`, "i") }
        });
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── DELETE /api/candidates/:id ───────────────────────────────────────────────
export const deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);
        if (!candidate) return res.status(404).json({ message: "Candidate not found" });
        res.json({ message: "Candidate deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
