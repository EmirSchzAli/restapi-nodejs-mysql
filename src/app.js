import express from "express"
import "./config.js"

import adminsRoutes from "./routes/admins.routes.js"
import studentsRoutes from "./routes/students.routes.js"
import indexRoutes from "./routes/index.routes.js"
import teachersRoutes from "./routes/teachers.routes.js"
import classroomsRoutes from "./routes/classrooms.routes.js";
import registriesRoutes from "./routes/registries.routes.js";

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use("/api", adminsRoutes)
app.use("/api", studentsRoutes)
app.use("/api", teachersRoutes);
app.use("/api", classroomsRoutes);
app.use("/api", registriesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
})

export default app