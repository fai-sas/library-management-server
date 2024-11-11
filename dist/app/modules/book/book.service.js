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
const borrowBookIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.book.findUniqueOrThrow({
        where: {
            bookId: payload.bookId,
        },
    });
    yield prisma_1.default.member.findUniqueOrThrow({
        where: {
            memberId: payload.memberId,
        },
    });
    const result = yield prisma_1.default.borrowRecord.create({
        data: payload,
    });
    return result;
});
const returnBookIntoDb = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.borrowRecord.findUniqueOrThrow({
        where: {
            borrowId,
        },
    });
});
const getOverdueBorrowListFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const overdueBooks = yield prisma_1.default.borrowRecord.findMany({
        where: {
            returnDate: null,
            borrowDate: {
                lte: new Date(currentDate.setDate(currentDate.getDate() - 14)),
            },
        },
        include: {
            Book: {
                select: {
                    title: true,
                },
            },
            Member: {
                select: {
                    name: true,
                },
            },
        },
    });
    const result = overdueBooks.map((record) => {
        const overdueDays = Math.floor((currentDate.getTime() - new Date(record.borrowDate).getTime()) /
            (1000 * 60 * 60 * 24)) - 14;
        return {
            borrowId: record.borrowId,
            bookTitle: record.Book.title,
            borrowerName: record.Member.name,
            overdueDays: overdueDays > 0 ? overdueDays : 0,
        };
    });
    return result;
});
exports.BookServices = {
    createBookIntoDb,
    getAllBooksFromDb,
    getSingleBookFromDb,
    updateBookIntoDb,
    deleteBookFromDb,
    borrowBookIntoDb,
    returnBookIntoDb,
    getOverdueBorrowListFromDb,
};
