import Link from "next/link";
import { Navbar } from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <header>
        <h1>Net Ninja OAuth Tut's</h1>
        <h2>HomePage</h2>
      </header>
      <main>
        <p>Probably the best OAuth tut on the planet</p>
      </main>
    </div>
  );
};

export default Home;
