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
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("../constants");
exports.authRoutes = express_1.default.Router();
const redis_1 = require("../redis");
exports.authRoutes.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile"],
}));
exports.authRoutes.get("/google/redirect", passport_1.default.authenticate("google"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield redis_1.redis.set(constants_1.USER_ID_PREFIX, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id, "ex", 1000 * 60 * 60 * 24 * 365 * 10);
    res.redirect("http://localhost:3000/profile");
}));
exports.authRoutes.get("/facebook", passport_1.default.authenticate("facebook", {
    scope: ["public_profile", "email"],
}));
exports.authRoutes.get("/facebook/redirect", passport_1.default.authenticate("facebook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    yield redis_1.redis.set(constants_1.USER_ID_PREFIX, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id, "ex", 1000 * 60 * 60 * 24 * 365 * 10);
    res.redirect("http://localhost:3000/profile");
}));
exports.authRoutes.get("/github", passport_1.default.authenticate("github", {
    scope: ["user"],
}));
exports.authRoutes.get("/github/redirect", passport_1.default.authenticate("github"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    yield redis_1.redis.set(constants_1.USER_ID_PREFIX, (_c = req.user) === null || _c === void 0 ? void 0 : _c._id, "ex", 1000 * 60 * 60 * 24 * 365 * 10);
    res.redirect("http://localhost:3000/profile");
}));
//# sourceMappingURL=auth.js.map