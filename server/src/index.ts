import express from "express";

import dotenv from "dotenv";

import cors from "cors";

import connectDB from "./config/db";

import leadRoutes from "./routes/leadRoutes";

import authRoutes from "./routes/authRoutes";

import { errorHandler }
from "./middleware/errorMiddleware";

dotenv.config();

// CONNECT DATABASE
connectDB();

const app = express();

// MIDDLEWARES
app.use(cors());

app.use(express.json());

// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/leads",
  leadRoutes
);

// ERROR HANDLER
app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

// SERVER
app.listen(PORT, () => {

  console.log(
    `Server started on port ${PORT}`
  );

});