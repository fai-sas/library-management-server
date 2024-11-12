"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createBookIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data: payload,
    });
    return result;
});
const getAllBooksFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany();
    return result;
});
const getSingleBookFromDb = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUniqueOrThrow({
        where: {
            bookId,
        },
    });
    return result;
});
const updateBookIntoDb = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.book.findUniqueOrThrow({
        where: {
            bookId,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBook = yield transactionClient.book.update({
            where: {
                bookId,
            },
            data: payload,
        });
        return updatedBook;
    }));
    return result;
});
const deleteBookFromDb = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.book.findUniqueOrThrow({
        where: {
            bookId,
        },
    });
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedBook = yield transactionClient.book.delete({
            where: {
                bookId,
            },
        });
        return deletedBook;
    }));
});
exports.BookServices = {
    createBookIntoDb,
    getAllBooksFromDb,
    getSingleBookFromDb,
    updateBookIntoDb,
    deleteBookFromDb,
};
