import { PrismaClient, UserType, User } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";

export type RequestWithUser = Request & { user?: User };

type RequestFunction = (
  req: Request | RequestWithUser,
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

  public subscribePostRoute(
    resource: string,
    handler: RequestFunction,
    requiredUserType?: UserType
  ) {
    console.log("Registering: POST", this.route + "/" + resource);
    this.app.post(
      this.route + "/" + resource,
      this.handlerWrapper(handler, requiredUserType)
    );
  }
  public subscribeGetRoute(
    resource: string,
    handler: RequestFunction,
    requiredUserType?: UserType
  ) {
    console.log("Registering: GET", this.route + "/" + resource);

    this.app.get(
      this.route + "/" + resource,
      this.handlerWrapper(handler, requiredUserType)
    );
  }

  protected handlerWrapper(
    handler: RequestFunction,
    requiredUserType?: UserType
  ) {
    if (requiredUserType) {
      return [this.authMiddle(requiredUserType).bind(this), handler.bind(this)];
    }
    return [handler.bind(this)];
  }

  protected authMiddle(requiredType: UserType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401);
      const token = authHeader.split(" ")[1];
      if (!token) return res.status(401).json({ error: "No token supplied" });
      try {
        const v = jwt.verify(token, process.env.JWT_SECRET!) as {
          username: string;
          id: number;
        };
        const user = await this.db.user.findUniqueOrThrow({
          where: { id: v.id },
        });
        (req as RequestWithUser).user = user;

        next();
      } catch (er) {
        console.log(er);
        return res.status(400).json({ error: "Invalid token" });
      }
    };
  }
}
