import express from "express";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";

import { register, login, getMe } from "./controllers/UserController.js";

mongoose
    .connect(
        "mongodb+srv://admin:wwwwww@cluster0.yvsoxxm.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        console.log("DB ok");
    })
    .catch((error) => {
        console.log(`DB error: ${error}`);
    });

const app = express();

app.use(express.json());

app.post("/auth/login", login);

app.post("/auth/register", registerValidation, register);

app.get("/auth/me", checkAuth, getMe);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK");
});
