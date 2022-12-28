import express, { Application, urlencoded } from "express";
class App {
  app: Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  routes() {}
  middlewares() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
  }
}

export const app = new App().app;
