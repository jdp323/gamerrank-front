import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Controller } from "./Controller";
import { createHash } from "crypto";
import { sha256 } from "../utils";
import * as jwt from "jsonwebtoken";

export class UserController extends Controller {
  constructor(app: Router, db: PrismaClient) {
    super(app, "/user", db);
    this.subscribeGetRoute("register", this.register);
    this.subscribeGetRoute("login", this.login);
  }

  protected async register(req: Request, res: Response) {
    const { name, username, password, type } = req.body;

    const user = await this.db.user.create({
      data: {
        username,
        name,
        passwordHash: sha256(password),
        type,
      },
    });
    return res.json({ id: user.id });
  }
  protected async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await this.db.user.findFirst({
      where: {
        username,
        passwordHash: sha256(password),
      },
    });
    if (!user) {
      res.status(404).json({ error: "Username or password is invalid" });
      return;
    }

    const token = jwt.sign({ username, id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    return res.json({ token });
  }
}
