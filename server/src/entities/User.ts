import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  username: String;

  @Field()
  @Property({ required: true })
  providerId: String;

  @Field()
  @Property({ required: true })
  provider: String;
}

export const UserModel = getModelForClass(User);
