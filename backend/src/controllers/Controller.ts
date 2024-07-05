import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

type RequestFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export abstract class Controller {
  protected route: string;
  protected app: Router;
  protected db: PrismaClient;
  constructor(app: Router, route: string, db: PrismaClient) {
    this.route = route;
    this.app = app;
    this.db = db;
  }

  public subscribePostRoute(resource: string, handler: RequestFunction) {
    this.app.post(this.route + "/" + resource, handler.bind(this));
  }
  public subscribeGetRoute(resource: string, handler: RequestFunction) {
    this.app.get(this.route + "/" + resource, handler.bind(this));
  }
}
