import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Controller, RequestWithUser } from "./Controller";

export class ReviewController extends Controller {
  constructor(app: Router, db: PrismaClient) {
    super(app, "/review", db);
    this.subscribePostRoute("create", this.create, true);
    this.subscribeGetRoute("posted/:gameId", this.hasPosted, true);
  }

  protected async create(req: RequestWithUser, res: Response) {
    const { text, gameId } = req.body;
    if (req.user?.type != "REVIEWER") {
      return res.status(403).json({ error: "Only REVIEWER can review games" });
    }
    const reviewCount = await this.db.review.count({
      where: {
        userId: req.user?.id!,
        gameId,
      },
    });
    if (reviewCount > 0) {
      return res.status(400).json({ error: "review already posted" });
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

  protected async hasPosted(req: RequestWithUser, res: Response) {
    const { gameId } = req.params;
    const reviews = await this.db.review.count({
      where: {
        userId: req.user?.id!,
        gameId: Number(gameId),
      },
    });

    return res.json({ posted: reviews > 0 });
  }
}
