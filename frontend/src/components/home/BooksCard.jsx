import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
			{books.map(item => (
				<BookSingleCard key={item._id} book={item} />
			))}
		</div>
	);
};

export default BooksCard;
