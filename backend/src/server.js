import express from "express";
//this is type module
//by default its commonjs =>  const express = require("express")
//apis are part of the server , api calls the backend system and mongodb is part of the backend system
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middlewares/rateLimiter.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
// a middleware that executes first before reaching any route

// console.log("Hi I am outside middleware");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("hi i am inside the middleware");
//   next();
// });
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("App is listening on port", PORT);
  });
});

//nodemon specific with development => npm run dev
//node not specific with deployemnt => npm run start

// 6NTAGq6FeuC0Ft6u
