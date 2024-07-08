import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Controller, RequestWithUser } from "./Controller";
import { createHash } from "crypto";
import { sha256 } from "../utils";
import * as jwt from "jsonwebtoken";

export class UserController extends Controller {
  constructor(app: Router, db: PrismaClient) {
    super(app, "/user", db);
    this.subscribePostRoute("register", this.register);
    this.subscribePostRoute("login", this.login);
    this.subscribeGetRoute("get", this.get, true);
  }

  protected async register(req: Request, res: Response) {
    const { name, username, password, type } = req.body as Record<
      string,
      string
    >;
    if (name.length == 0 || username.length == 0 || password.length == 0) {
      return res.status(400).json("Please enter valid fields");
    }
    if ((await this.db.user.count({ where: { username } })) > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }
    const user = await this.db.user.create({
      data: {
        username,
        name,
        passwordHash: sha256(password),
        type: type as UserType,
      },
    });
    const token = jwt.sign({ username, id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    return res.json({ id: user.id, token });
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
  protected async get(req: RequestWithUser, res: Response) {
    const u = await this.db.user.findUniqueOrThrow({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        type: true,
        username: true,
        createdAt: true,
        _count: { select: { games: true, reviews: true, votes: true } },
      },
    });
    return res.json(u);
  }
}
