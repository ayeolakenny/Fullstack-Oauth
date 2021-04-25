import React from "react";
import Link from "next/link";
import { Navbar } from "../../components/Navbar";

const Login: React.FC<{}> = ({}) => {
  return (
    <div>
      <Navbar />
      <header>
        <h1>Login using...</h1>
      </header>
      <main>
        <a className="google-btn" href="http://localhost:4000/auth/google">
          Google+
        </a>
        <a className="facebook-btn" href="http://localhost:4000/auth/facebook">
          Facebook
        </a>
        <a className="github-btn" href="http://localhost:4000/auth/github">
          Github
        </a>
      </main>
    </div>
  );
};

export default Login;
