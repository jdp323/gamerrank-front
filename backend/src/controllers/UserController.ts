import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Controller } from "./Controller";

export class UserController extends Controller {
  constructor(app: Router, db: PrismaClient) {
    super(app, "/user", db);
    this.subscribeGetRoute("hello", this.register);
  }

  protected async register(req: Request, res: Response) {
    const { name, username, password } = req.body;
    res.send("Total users:" + (await this.db.user.count()));
  }
}
