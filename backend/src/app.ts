import "dotenv/config";
import express from "express";
import {
  ControllerFactory,
  ControllerType,
} from "./controllers/ControllerFactory";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();
const port = 3001;
const db = new PrismaClient();

app.use(express.json());
app.use(cors({ origin: "*" }));

ControllerFactory.createController(ControllerType.User, app, db);
ControllerFactory.createController(ControllerType.Game, app, db);
ControllerFactory.createController(ControllerType.Review, app, db);
ControllerFactory.createController(ControllerType.Vote, app, db);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
