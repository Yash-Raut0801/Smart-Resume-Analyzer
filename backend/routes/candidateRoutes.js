import express from "express";
import {
    addCandidate,
    getCandidates,
    deleteCandidate,
    rankCandidates,
    searchBySkill
} from "../controllers/candidateController.js";

const router = express.Router();

router.post("/add",       addCandidate);
router.get("/",           getCandidates);
router.get("/rank",       rankCandidates);
router.get("/search",     searchBySkill);
router.delete("/:id",     deleteCandidate);

export default router;
