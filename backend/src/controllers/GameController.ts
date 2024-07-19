import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Controller, RequestWithUser } from "./Controller";
import * as fs from "fs";
import * as path from "path";
import { uid } from "../utils";
import formidable from "formidable";
export class GameController extends Controller {
  constructor(app: Router, db: PrismaClient) {
    super(app, "/game", db);
    this.subscribePostRoute("create", this.create, true);
    this.subscribeGetRoute("get/:id", this.get);
    this.subscribeGetRoute("timeline", this.getTimeline);
  }

  protected async create(req: RequestWithUser, res: Response) {
    try {
      const form = formidable({ multiples: false });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal error" });
        }
        const { title, url, description } = fields as any;

        const file = files.image![0];
        const imgName = uid() + "." + file.originalFilename?.split(".").at(-1);
        const newPath = path.join("uploads", imgName);

        fs.copyFileSync(file.filepath, newPath);
        fs.rmSync(file.filepath);

        const game = await this.db.game.create({
          data: {
            title: title[0],
            imageUrl: `/images/` + imgName,
            url: url[0],
            description: description[0],
            userId: req.user?.id!,
          },
        });

        return res.json({ id: game.id });
      });
    } catch (er) {
      console.log(er);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  protected async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const game = await this.db.game.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          _count: { select: { votes: true, reviews: true } },
          reviews: {
            orderBy: { createdAt: "desc" },
            include: {
              createdBy: { select: { id: true, username: true, name: true } },
            },
          },
          createdBy: { select: { id: true, name: true, username: true } },
        },
      });
      return res.json(game);
    } catch (er) {
      return res.status(404).json({ error: "review not found" });
    }
  }
  protected async getTimeline(req: Request, res: Response) {
    const games = await this.db.game.findMany({
      orderBy: [{ votes: { _count: "asc" } }, { createdAt: "desc" }],
      include: {
        _count: { select: { reviews: true, votes: true } },
        createdBy: { select: { name: true, username: true, id: true } },
      },
    });

    const sortedGames = games.sort((a, b) => {
      const scoreA = this.calcScore(
        a._count.votes,
        (Date.now() - new Date(a.createdAt).getTime()) / 1000 / 60 / 60 // to hours
      );
      const scoreB = this.calcScore(
        b._count.votes,
        Date.now() - new Date(b.createdAt).getTime() / 1000 / 60 / 60
      );
      return scoreB - scoreA;
    });

    return res.json({ games: sortedGames });
  }

  // hackernews sorting algorithm
  protected calcScore(votes: number, item_hour_age: number, gravity = 1.8) {
    return (votes - 1) / Math.pow(item_hour_age + 2, gravity);
  }
}
