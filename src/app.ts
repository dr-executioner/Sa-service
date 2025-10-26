import express from "express"
import cors from "cors"
import analyseRoutes from "./routes/routes"
import { errorHandler } from "./middleware/errorHandler"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", analyseRoutes);

app.use(errorHandler)

export default app;