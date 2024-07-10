import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Controller, RequestWithUser } from "./Controller";

export class VoteController extends Controller {
  constructor(app: Router, db: PrismaClient) {
    super(app, "/vote", db);
    this.subscribePostRoute("vote", this.vote, true);
    this.subscribeGetRoute("voted/:gameId", this.hasVoted, true);
  }

  protected async vote(req: RequestWithUser, res: Response) {
    const { gameId, status } = req.body;
    if (req.user?.type != "GAMER") {
      return res.status(403).json({ error: "Only GAMER can vote for games" });
    }

    if (!status) {
      await this.db.vote.deleteMany({
        where: {
          userId: req.user?.id!,
          gameId: Number(gameId),
        },
      });
      return res.json({ ok: true });
    }

    const alreadyVote = await this.db.vote.findFirst({
      where: {
        userId: req.user?.id!,
        gameId: Number(gameId),
      },
    });
    if (alreadyVote) {
      return res.json({ id: alreadyVote.id });
    }
    const vote = await this.db.vote.create({
      data: {
        userId: req.user?.id!,
        gameId,
      },
    });

    return res.json({ id: vote.id });
  }

  protected async hasVoted(req: RequestWithUser, res: Response) {
    const { gameId } = req.params;

    const voteCount = await this.db.vote.count({
      where: {
        userId: req.user?.id!,
        gameId: Number(gameId),
      },
    });

    return res.json({ voted: voteCount > 0 });
  }
}
