import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(errorMiddleware);
export default app;
