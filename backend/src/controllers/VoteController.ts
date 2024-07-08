import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Controller, RequestWithUser } from "./Controller";

export class VoteController extends Controller {
  constructor(app: Router, db: PrismaClient) {
    super(app, "/vote", db);
    this.subscribePostRoute("create", this.create, true);
  }

  protected async create(req: RequestWithUser, res: Response) {
    const { gameId } = req.body;
    if (req.user?.type != "GAMER") {
      return res.status(403).json({ error: "Only GAMER can vote for games" });
    }
    const review = await this.db.vote.create({
      data: {
        userId: req.user?.id!,
        gameId,
      },
    });

    return res.json({ id: review.id });
  }
}
