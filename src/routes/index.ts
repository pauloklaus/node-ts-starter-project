import express from "express";
import { authMiddleware } from "@/middlewares";
import { NotFoundError } from "@/errors";
import { heartbeatRoutes } from "./heartbeat";
import { authRoutes } from "./auth";
import { dashboardRoutes } from "./dashboard";

const mainRoutes = express.Router();
mainRoutes.use("/dashboard", dashboardRoutes);

const apiRoutes = express.Router();
apiRoutes.use("/heartbeat", heartbeatRoutes);
apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/main", authMiddleware, mainRoutes);

const routes = express.Router();
routes.use("/api", apiRoutes);
routes.use("*", () => {
  throw new NotFoundError("route");
});

export { routes };
