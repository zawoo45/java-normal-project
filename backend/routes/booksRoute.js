import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for save a new book
router.post("/", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message:
					"Sent all the required fields: title, author, PublishYear",
			});
		}
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear,
		};

		const book = await Book.create(newBook);
		return response.status(201).send(book);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});
//Route for get all books from the database
router.get("/", async (request, response) => {
	try {
		const books = await Book.find({});
		return response.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});
//Route for get all books from database by id
router.get("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const book = await Book.findById(id);
		return response.status(200).json(book);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});
//Route for update a book by id
router.put("/:id", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message:
					"Sent all the required fields: title, author, PublishYear",
			});
		}
		const { id } = request.params;
		const result = await Book.findByIdAndUpdate(id, request.body);
		if (!result) {
			return response.status(404).json({ message: "Book not found" });
		}
		return response
			.status(200)
			.send({ message: "Book updated successfully" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});
//Route for delete a book by id
router.delete("/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const result = await Book.findByIdAndDelete(id);
		if (!result) {
			return response.status(404).json({ message: "Book not found" });
		}
		return response
			.status(200)
			.send({ message: "Book deleted successfully" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});
export default router;
