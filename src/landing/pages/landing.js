import Banner from "../components/banner";
import Blog from "../components/blog";
import Carousel from "../components/carousel";
import Choose from "../components/choose";
import Faq from "../components/faq";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Leaderboard from "../components/leaderboard";
import Libary from "../components/libary";
import Navbar from "../components/navbar";
import Pricing from "../components/pricing";
import Products from "../components/products";
import Target from "../components/target";
import Works from "../components/works";
import lines from "./assets/lines.svg";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";

const Landing = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
    };

    // Initial check on mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        style={
          isMobile
            ? {
                backgroundImage: `url(${vector})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {}
        }
        className=" w-full"
      >
        <Navbar />
        <div
          style={
            isMobile
              ? {}
              : {
                  backgroundImage: `url(${lines})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
          }
          className=" w-full"
        >
          <Hero />
          <Carousel />
          <Leaderboard />
          <Products />
          <Target />
          <Libary />
          <Choose />
          <Works />
          <Pricing />
          <Blog />
        </div>
        <Faq />
        <Banner />
        <Footer />
      </div>
    </>
  );
};

export default Landing;
