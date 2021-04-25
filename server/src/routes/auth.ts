import express from "express";
import passport from "passport";
import { USER_ID_PREFIX } from "../constants";
export const authRoutes = express.Router();
import { redis } from "../redis";

//auth with google
authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//callback route for google authentication
authRoutes.get(
  "/google/redirect",
  passport.authenticate("google"),
  async (req, res) => {
    // req.session.userId = req.session.passport.user;
    // console.log(req.session.passport.user);
    await redis.set(
      USER_ID_PREFIX,
      req.user?._id,
      "ex",
      1000 * 60 * 60 * 24 * 365 * 10
    );
    res.redirect("http://localhost:3000/profile");
  }
);

//auth with facebook
authRoutes.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

//callback route for facebook authentication
authRoutes.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  async (req, res) => {
    // req.session.userId = req.session.passport.user;
    // console.log(req.session.passport.user);
    await redis.set(
      USER_ID_PREFIX,
      req.user?._id,
      "ex",
      1000 * 60 * 60 * 24 * 365 * 10
    );
    res.redirect("http://localhost:3000/profile");
  }
);

//auth with github
authRoutes.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user"],
  })
);

//callback route for github authentication
authRoutes.get(
  "/github/redirect",
  passport.authenticate("github"),
  async (req, res) => {
    // req.session.userId = req.session.passport.user;
    // console.log(req.session.passport.user);
    await redis.set(
      USER_ID_PREFIX,
      req.user?._id,
      "ex",
      1000 * 60 * 60 * 24 * 365 * 10
    );
    res.redirect("http://localhost:3000/profile");
  }
);
