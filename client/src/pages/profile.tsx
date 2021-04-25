import React from "react";
import Link from "next/link";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { Navbar } from "../components/Navbar";

const profile: React.FC<{}> = ({}) => {
  const { data } = useMeQuery();
  const user = data?.me;
  return (
    <div>
      <Navbar />
      <header>
        <h1>Welcome to your profile {user?.username}</h1>
      </header>
      <main>
        <p>Your Provider is, {user?.provider}</p>
      </main>
    </div>
  );
};

export default profile;
