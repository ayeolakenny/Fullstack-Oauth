import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { ObjectId } from "mongodb";
import { connect } from "mongoose";
import path from "path";
import { buildSchema } from "type-graphql";
import { ObjectIdScalar } from "./object-id.scalar";
import { HelloResolver } from "./resolvers/hello";
import { TypegooseMiddleware } from "./typegoose-middleware";
import * as dotenv from "dotenv";
import { authRoutes } from "./routes/auth";
import "./config/passport-config";
import passport from "passport";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { UserResolver } from "./resolvers/user";

dotenv.config();

const MONGO_DB_URL: any = process.env.MONGO_DB_URL;

const main = async () => {
  try {
    const app = express();

    //connect to the database
    const mongoose = await connect(MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    mongoose.connection.on("open", () => console.log("DB CONNECTED"));

    //configure crossite origin requests
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    //routes
    app.use("/auth", authRoutes);

    //session
    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
      session({
        name: process.env.COOKIE_NAME,
        store: new RedisStore({
          client: redis,
          disableTouch: true,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
          httpOnly: true,
          sameSite: "lax", // csrf
          secure: process.env.NODE_ENV === "production", // cookie only works in https
        },
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET as string,
        resave: false,
      })
    );

    //connection with apolloserver
    const apolloServer = new ApolloServer({
      // build TypeGraphQL executable schema
      schema: await buildSchema({
        resolvers: [HelloResolver, UserResolver],
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        // use document converting middleware
        globalMiddlewares: [TypegooseMiddleware],
        // use ObjectId scalar mapping
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        validate: false,
      }),
      context: ({ req, res }) => ({ req, res, redis }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    //Start server
    app.listen(4000, () => console.log("Server is now running"));
  } catch (err) {
    console.error(err);
  }
};

main().catch((err) => console.log(err));
