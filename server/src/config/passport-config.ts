import passport from "passport";
import GoogleStrategy, { _StrategyOptionsBase } from "passport-google-oauth20";
import FacebookStrategy, { StrategyOption } from "passport-facebook";
import GithubStrategy, { StrategyOptions } from "passport-github";
import * as dotenv from "dotenv";
import { UserModel } from "../entities/User";
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      //options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as _StrategyOptionsBase,
    async (_accessToken, _refreshToken, profile, done) => {
      // check if user already exists
      const currentUser = await UserModel.findOne({ providerId: profile.id });
      if (currentUser) {
        // already have the user
        done(null, currentUser);
      } else {
        //create user
        const newUser = new UserModel({
          username: profile.displayName,
          providerId: profile.id,
          provider: profile.provider,
        });
        await newUser.save();
      }
    }
  )
);

passport.use(
  new GithubStrategy.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/redirect",
    } as StrategyOptions,
    async (_accessToken, _refreshToken, profile, done) => {
      // check if user already exists
      const currentUser = await UserModel.findOne({ providerId: profile.id });
      if (currentUser) {
        // already have the user
        done(null, currentUser);
      } else {
        //create user
        const newUser = new UserModel({
          username: profile.displayName,
          providerId: profile.id,
          provider: profile.provider,
        });
        await newUser.save();
      }
    }
  )
);

passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/redirect",
    } as StrategyOption,
    async (_accessToken, _refreshToken, profile, done) => {
      // check if user already exists
      const currentUser = await UserModel.findOne({ providerId: profile.id });
      if (currentUser) {
        // already have the user
        done(null, currentUser);
      } else {
        //create user
        const newUser = new UserModel({
          username: profile.displayName,
          providerId: profile.id,
          provider: profile.provider,
        });
        await newUser.save();
      }
    }
  )
);
