import Link from "next/link";
import React from "react";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

export const Navbar: React.FC<{}> = ({}) => {
  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: MeDocument }],
  });

  const { data } = useMeQuery();
  const user = data?.me;

  let body = user ? (
    <nav>
      <ul>
        <li>
          <a style={{ cursor: "pointer" }} onClick={() => logout()}>
            Logout
          </a>
        </li>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav>
      <ul>
        <li>
          <Link href="/auth/login">Login</Link>
        </li>
        <li>
          <Link href="/">Homepage</Link>
        </li>
      </ul>
    </nav>
  );

  return body;
};
