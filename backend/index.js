import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
//middleware for parsing request body

app.use(express.json());
//middleware for handling cors policy
//option 1: Allow all origins with default cors Settings
app.use(cors());
//option 2: Allow specific origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome to the backend");
});
app.use("/books", booksRoute);
mongoose
	.connect(MONGODB_URL)
	.then(() => {
		console.log("App is connected to MongoDB");
		app.listen(PORT, () => {
			console.log(`App is listening on port ${PORT}`);
		});
	})
	.catch(error => {
		console.log(error);
	});
