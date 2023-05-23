import { Router } from "express";
import LoggerController from "../../controllers/api/logger.controller.js";

const router = Router()
const loggerController = new LoggerController();

router.get('/', loggerController.loggerTest);

export default router;