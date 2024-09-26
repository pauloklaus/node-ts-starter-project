import express from "express";
import { loginRoute } from "./loginRoute";
import { logoutRoute } from "./logoutRoute";
import { infoRoute } from "./infoRoute";
import { authMiddleware } from "@/middlewares";

const authRoutes = express.Router();
authRoutes.post("/login", loginRoute);
authRoutes.get("/logout", logoutRoute);
authRoutes.get("/info", authMiddleware, infoRoute);

export { authRoutes };
