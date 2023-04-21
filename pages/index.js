import Head from "next/head";
import Image from "next/image";
import SearchBox from "../components/SearchBox";
import FamousPlaces from "../components/FamousPlaces";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {" "}
      <div className="container">
        <Head>
          <title>Weather App</title>
        </Head>
        <div className="home">
          <div className="container">
            {/**/}
            <SearchBox placeholder="Search for a city..." />
            <FamousPlaces />
            {/**/}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
