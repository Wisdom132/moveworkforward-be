import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import * as userRoutes from "./handlers/user";
import cors from 'cors'
dotenv.config();

// Create Express server
const app: express.Express = express();


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(cors());
mongoose
  .connect(`${process.env.DB_URL}`, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

app.set("port", process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors(options));

// app.get("/", homeRoute.index);
app.post("/register", userRoutes.registerUser);
app.get("/users", userRoutes.users);

app.use((_req, res): void => {
  res.status(404).send({
    success: false,
    error: "resource not found",
  });
});

export default app;
