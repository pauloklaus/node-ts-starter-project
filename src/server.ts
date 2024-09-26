import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { errorHandler, globalMiddleware } from "./middlewares";
import { envSettings } from "@/helpers";
import { HttpStatusCode } from "@/enums";

const { rateLimitInMs, rateLimitMaxRequests } = envSettings();
const { corsAllowedOrigin } = envSettings();

const limiter = rateLimit({
  windowMs: rateLimitInMs,
  max: rateLimitMaxRequests,
});

const server = express();

server.disable("x-powered-by");
server.disable("etag");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(limiter);
server.use(helmet());
server.use(
  cors({
    origin: corsAllowedOrigin.split(";"),
    credentials: true,
    optionsSuccessStatus: HttpStatusCode.OK,
  })
);
server.use(cookieParser());
server.use(globalMiddleware);
server.use(routes);
server.use(errorHandler);

export { server };
