import express from "express";
import { dashboardRoute } from "./dashboardRoute";

const dashboardRoutes = express.Router();
dashboardRoutes.get("/", dashboardRoute);

export { dashboardRoutes };
