import express from "express"
import "./config.js"

import adminsRoutes from "./routes/admins.routes.js"
import indexRoutes from "./routes/index.routes.js"

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use("/api", adminsRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
})

export default app