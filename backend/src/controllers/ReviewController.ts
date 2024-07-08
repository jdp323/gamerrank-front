import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Controller, RequestWithUser } from "./Controller";

export class ReviewController extends Controller {
  constructor(app: Router, db: PrismaClient) {
    super(app, "/review", db);
    this.subscribePostRoute("create", this.create, true);
  }

  protected async create(req: RequestWithUser, res: Response) {
    const { text, gameId } = req.body;
    if (req.user?.type != "REVIEWER") {
      return res.status(403).json({ error: "Only REVIEWER can review games" });
    }
    const review = await this.db.review.create({
      data: {
        text,
        userId: req.user?.id!,
        gameId,
      },
    });

    return res.json({ id: review.id });
  }
}
