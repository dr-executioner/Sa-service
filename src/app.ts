import express from "express"
import cors from "cors"
import analyseRoutes from "./routes/routes"
import { errorHandler } from "./middleware/errorHandler"
import config from "./config/config"

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: config.feUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", analyseRoutes);

app.use(errorHandler)

export default app;