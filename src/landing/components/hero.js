import orange from "./assets/orange.svg";
import search from "./assets/search-normal.svg";
import heroImg from "./assets/heroimg.webp";
import { motion } from "framer-motion";
import marker1 from "./assets/marker1.svg";
import heroImg1 from "./assets/heroImg1.webp";
import heroImg2 from "./assets/heroImg2.webp";
import heroImg3 from "./assets/heroImg3.webp";
import { useState, useEffect } from "react";

const Hero = () => {
  const heroContent = [
    {
      mainText: "The Best System To Enhance Your Education",
      subText:
        "Seamlessly connect educators, students, and parents, while nurturing collaboration and individual exploration through our powerful education suite.",
      imag: heroImg,
    },

    {
      mainText: "The Best E-library To Enhance Your Education",
      subText:
        "Streamline operations, ignite learning, and foster a connected community with our comprehensive suite of educational tools.",
      imag: heroImg1,
    },
    {
      mainText: "The Best Management System For your Schools",
      subText:
        "Empower students, teachers, and parents with instant access to a vast collection of digital resources, fostering exploration and knowledge acquisition.",
      imag: heroImg2,
    },
    {
      mainText: "The Best System To Enhance Your Education",
      subText:
        "Dive deeper into your studies, compete with fellow learners, and showcase your academic achievements by participating in Veclary's dynamic student competition. Exciting prizes await the winners!",
      imag: heroImg3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, 6000); // 6000ms = 6 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const currentContent = heroContent[currentIndex];
  return (
    <>
      <div className=" flex flex-col lg:flex-row space-y-10 lg:space-y-0 items-center justify-between w-full py-12 md:py-16 px-4 md:px-20">
        {/* column 1 */}
        <div className="flex flex-col items-start justify-start lg:w-[48%] w-full">
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8, type: "tween" }}
            className="font-Outfit text-4xl leading-[50px] md:text-[55px] font-semibold md:leading-[82.5px] text-black text-center md:text-left"
          >
            {currentContent.mainText}
          </motion.p>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "tween" }}
            className="text-xl font-normal font-Outfit text-[#000000CC] text-center md:text-left mt-3"
          >
            {currentContent.subText}
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "tween" }}
            className=" w-full md:w-[500px] lg:w-[500px] h-[54px] border-[3px] border-[#F1F1F1] rounded-[10px] relative flex items-center justify-between mt-12 bg-white pr-[6px]"
          >
            <img src={search} className=" absolute left-5" alt="" />
            <input
              type="text"
              placeholder="Search for Books"
              className=" placeholder:text-[#000000CC] pl-12 font-Outfit h-[54px] w-full border-y-[3px] border-[#F1F1F1]"
            />
            <button className=" px-8 py-[8px] rounded-[5px] bg-[#0530A1] font-Outfit text-center font-semibold text-base text-white">
              Search
            </button>
          </motion.div>
        </div>

        {/* column 2 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "tween" }}
          style={{
            backgroundImage: `url(${currentContent.imag})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="lg:w-[48%] w-full h-[512px] 2xl:h-[620px] relative rounded-[10px] bg-[#4991EF] text-center md:text-left"
        >
          <div className="absolute bottom-4 w-full flex justify-center items-center">
            <img src={marker1} className="absolute bottom-4" alt="" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
