import { Router } from "express";
import { UserController } from "./UserController";
import { Controller } from "./Controller";
import { PrismaClient } from "@prisma/client";
import { ReviewController } from "./ReviewController";
import { VoteController } from "./VoteController";
import { GameController } from "./GameController";

export enum ControllerType {
  User,
  Game,
  Review,
  Vote,
}
export class ControllerFactory {
  static createController(
    type: ControllerType,
    app: Router,
    db: PrismaClient
  ): Controller {
    switch (type) {
      case ControllerType.User:
        return new UserController(app, db);
      case ControllerType.Review:
        return new ReviewController(app, db);
      case ControllerType.Vote:
        return new VoteController(app, db);
      case ControllerType.Game:
        return new GameController(app, db);
      default:
        throw new Error("Invalid controller");
    }
  }
}
