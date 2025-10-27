import { Router } from "express";
import { sentimentAnalyzer } from "../controller/analyser";
import { emailer } from "../controller/emailer";

const router = Router()

router.post("/analyse", sentimentAnalyzer)
router.post("/sendEmail", emailer)

export default router