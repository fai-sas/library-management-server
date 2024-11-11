"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/', book_controller_1.BookControllers.createBook);
router.get('/', book_controller_1.BookControllers.getAllBooks);
router.get('/:bookId', book_controller_1.BookControllers.getSingleBook);
router.put('/:bookId', book_controller_1.BookControllers.updateBook);
router.delete('/:bookId', book_controller_1.BookControllers.deleteBook);
router.post('/borrow', book_controller_1.BookControllers.borrowBook);
router.get('/borrow/overdue', book_controller_1.BookControllers.getOverdueBorrowList);
router.post('/return', book_controller_1.BookControllers.returnBook);
exports.BookRoutes = router;
