import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";

import tripsRouter from "./routes/tripsRoutes";

const app = express();

dotenv.config({ path: "./config.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

app.use("/api/v1/trips", tripsRouter);
// app.use('/api/v1/users', userRouter);

export { app };
