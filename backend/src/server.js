import express from "express";
//this is type module
//by default its commonjs =>  const express = require("express")
//apis are part of the server , api calls the backend system and mongodb is part of the backend system
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middlewares/rateLimiter.js";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
// a middleware that executes first before reaching any route

// console.log("Hi I am outside middleware");
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("hi i am inside the middleware");
//   next();
// });
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("App is listening on port", PORT);
  });
});

//nodemon specific with development => npm run dev
//node not specific with deployemnt => npm run start

// 6NTAGq6FeuC0Ft6u
