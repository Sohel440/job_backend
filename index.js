import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import CompanyRoutes from "./routes/CompanyRoutes.js"
import JobRoutes from "./routes/JobRoutes.js"
import ApplicationRoutes from "./routes/ApplicationRoutes.js"
dotenv.config({});

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'https://job-frontend-alpha.vercel.app/',
  credentials: true
};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/company", CompanyRoutes);
app.use("/api/v1/job" , JobRoutes);
app.use("/api/v1/application" , ApplicationRoutes);



app.get('/', (req, res) => {
  return res.send("I am now in Home page!");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
  connectDB();
});
