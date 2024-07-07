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
    this.subscribePostRoute("create", this.create, UserType.REVIEWER);
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

        fs.renameSync(file.filepath, newPath);

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
        include: { _count: { select: { votes: true } }, reviews: true },
      });
      return res.json(game);
    } catch (er) {
      return res.status(404).json({ error: "review not found" });
    }
  }
  protected async getTimeline(req: Request, res: Response) {
    const games = await this.db.game.findMany({
      orderBy: { votes: { _count: "desc" } },
      include: {
        _count: { select: { reviews: true, votes: true } },
        createdBy: { select: { name: true, id: true } },
      },
    });
    return res.json({ games });
  }
}
