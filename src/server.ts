import express from "express";
import compression from "compression";
import helmet from "helmet";
// import cors from 'cors';
import IndexController from "./controllers/IndexController";
import PingController from "./controllers/PingController";

const server = express();

server.disable("x-powered-by");
server.use(compression());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

const ApiRoutes = express.Router();
ApiRoutes.use("/ping", PingController.ping);

server.use("/api", ApiRoutes);
server.use("/", IndexController.index);

export default server;
