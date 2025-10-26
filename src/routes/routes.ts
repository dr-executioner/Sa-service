import { Router } from "express";
import { sentimentAnalyzer } from "../controller/analyser";

const router = Router()

router.post("/analyse", sentimentAnalyzer)

export default router