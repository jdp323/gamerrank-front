import { Router } from "express";
import { UserController } from "./UserController";
import { Controller } from "./Controller";
import { PrismaClient } from "@prisma/client";

export enum ControllerType {
  User,
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
      default:
        throw new Error("Invalid error");
    }
  }
}
