import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { RegisterRoute } from "./routes";
import { routesJson } from "../constant/routeInfo";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

interface CustomRequest extends Request {}
interface CustomResponse extends Response {}
interface CustomNextFunction extends NextFunction {}
//This are the routes
app.use((_: CustomRequest, res: CustomResponse, next: CustomNextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (_: CustomRequest, res: CustomResponse) => {
  res.json({ message: "Hello World" });
});

const routes = new RegisterRoute();
// API Routes
app.use("/api", routes.routes());

app.get("/api", (_, res) => {
  res.json(routesJson);
});

// 404 Handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "404 - Endpoint not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error for debugging purposes
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
    success: false,
  });
});

export default app;
