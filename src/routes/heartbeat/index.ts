import express from "express";
import { heartbeatRoute } from "./hearbeatRoute";

const heartbeatRoutes = express.Router();
heartbeatRoutes.get("/", heartbeatRoute);

export { heartbeatRoutes };
