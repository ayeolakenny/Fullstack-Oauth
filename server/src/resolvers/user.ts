import { User, UserModel } from "../entities/User";
import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";
import { USER_ID_PREFIX } from "../constants";

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { redis }: MyContext): Promise<User | null> {
    const key = USER_ID_PREFIX;
    const userId = await redis.get(key);
    if (!userId) return null;
    const user = await UserModel.findById(userId);
    return user;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { redis }: MyContext) {
    const key = USER_ID_PREFIX;
    return new Promise((resolve) => {
      redis
        .del(key)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          if (err) {
            resolve(false);
            return;
          }
        });
    });
  }
}
