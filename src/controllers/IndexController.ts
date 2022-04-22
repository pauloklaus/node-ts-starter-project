import { Request, Response } from "express";

const IndexController = {
  index(_: Request, response: Response) {
    response.json({ status: "ok" });
  }
};

export default IndexController;
