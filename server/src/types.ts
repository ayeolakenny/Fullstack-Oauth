import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import { User } from "./entities/User";

export type Ref<T> = T | ObjectId;

export type MyContext = {
  req: Request & {
    user: User;
    session: {
      userId?: any;
      passport: {
        user?: any;
      };
    };
  };
  res: Response & {
    session: {
      userId?: any;
    };
  };
  redis: Redis;
};
