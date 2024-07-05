import "dotenv/config";
import express from "express";
import {
  ControllerFactory,
  ControllerType,
} from "./controllers/ControllerFactory";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3001;
const db = new PrismaClient();

ControllerFactory.createController(ControllerType.User, app, db);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
