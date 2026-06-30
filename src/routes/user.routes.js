import { Router } from "express";
import { regUser } from "../controllers/user.controller.js";


const router = Router();

router.post('/register', regUser);


export default router;