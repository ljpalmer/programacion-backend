import { Router } from "express";
import MockingApiController from "../../controllers/mocking.controller.js";

const router = Router()
const mockingApiController = new MockingApiController();

router.get('/', mockingApiController.getMocks);

export default router