import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.config.js";
import contactRoutes from "./routes/contact/contact.route.js";
import adminRoutes from "./routes/user/admin.route.js";
import roleRoutes from "./routes/user/role.route.js";
import feedbackRoutes from "./routes/feedback/feedback.route.js";
import courseRoutes from "./routes/course/course.route.js";
import scheduleRoutes from "./routes/course/schedule.route.js";
import storyRoutes from "./routes/feedback/story.route.js";
import teacherRoutes from "./routes/course/teacher.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "150mb" }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect database
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

// Table creation
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Tables created");
    })
    .catch((error) => {
        console.error("Unable to create tables: ", error);
    });

// Main Routes
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/story", storyRoutes);
// Run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});