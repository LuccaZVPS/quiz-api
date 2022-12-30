import express, { Application, urlencoded } from "express";
import accountRoutes from "./routes/account/index";
import dotenv from "dotenv";
dotenv.config();
class App {
  app: Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  routes() {
    this.app.use("/", accountRoutes);
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
  }
}

export const app = new App().app;
