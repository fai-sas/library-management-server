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
exports.MemberServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createMemberIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.create({
        data: payload,
    });
    return result;
});
const getAllMembersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findMany();
    return result;
});
const getSingleMemberFromDb = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findUniqueOrThrow({
        where: {
            memberId,
        },
    });
    return result;
});
const updateMemberIntoDb = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.member.findUniqueOrThrow({
        where: {
            memberId,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedMember = yield transactionClient.member.update({
            where: {
                memberId,
            },
            data: payload,
        });
        return updatedMember;
    }));
    return result;
});
const deleteMemberFromDb = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.member.findUniqueOrThrow({
        where: {
            memberId,
        },
    });
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedMember = yield transactionClient.member.delete({
            where: {
                memberId,
            },
        });
        return deletedMember;
    }));
});
exports.MemberServices = {
    createMemberIntoDb,
    getAllMembersFromDb,
    getSingleMemberFromDb,
    updateMemberIntoDb,
    deleteMemberFromDb,
};
