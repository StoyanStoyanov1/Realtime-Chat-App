import {signUp, login, logout}  from "../controllers/auth.controller.js";

import express from 'express';

const router = express.Router();

router.get("/signup", signUp);

router.get("/login", login)

router.get("/logout", logout)

export default router;