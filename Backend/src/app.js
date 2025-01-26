import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! This is the backend of the Vibe application.");
});

export default app;
