import { Request, Response } from "express";

const PingController = {
  ping(_: Request, response: Response) {
    response.json({ response: "pong" });
  }
};

export default PingController;
