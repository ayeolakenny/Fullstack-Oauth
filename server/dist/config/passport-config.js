"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_github_1 = __importDefault(require("passport-github"));
const dotenv = __importStar(require("dotenv"));
const User_1 = require("../entities/User");
dotenv.config();
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.UserModel.findById(id);
    done(null, user);
}));
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    callbackURL: "/auth/google/redirect",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.UserModel.findOne({ providerId: profile.id });
    if (currentUser) {
        done(null, currentUser);
    }
    else {
        const newUser = new User_1.UserModel({
            username: profile.displayName,
            providerId: profile.id,
            provider: profile.provider,
        });
        yield newUser.save();
    }
})));
passport_1.default.use(new passport_github_1.default.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/redirect",
}, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.UserModel.findOne({ providerId: profile.id });
    if (currentUser) {
        done(null, currentUser);
    }
    else {
        const newUser = new User_1.UserModel({
            username: profile.displayName,
            providerId: profile.id,
            provider: profile.provider,
        });
        yield newUser.save();
    }
})));
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/redirect",
}, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield User_1.UserModel.findOne({ providerId: profile.id });
    if (currentUser) {
        done(null, currentUser);
    }
    else {
        const newUser = new User_1.UserModel({
            username: profile.displayName,
            providerId: profile.id,
            provider: profile.provider,
        });
        yield newUser.save();
    }
})));
//# sourceMappingURL=passport-config.js.map