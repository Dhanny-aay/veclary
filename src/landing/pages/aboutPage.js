import Banner from "../components/banner";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";
import lines from "./assets/lines.svg";
import Faq from "../components/faq";
import aboutBg from "./assets/aboutBg.svg";
import group4 from "./assets/Group4.svg";
import group5 from "./assets/Group5.svg";
import medal from "./assets/medal.svg";
import plant from "./assets/plant.svg";
import custo from "./assets/custo.svg";
import transpa from "./assets/transpa.svg";

const AboutPage = () => {
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
          className="w-full flex flex-col items-center justify-center py-8 px-4 font-Outfit md:py-16 md:px-20 text-black"
        >
          <p className=" text-center font-Outfit font-semibold text-2xl md:text-[55px] md:leading-[82px]">
            About Veclary
          </p>
          <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 md:px-[12%]">
            Veclary is a dynamic learning ecosystem designed to empower
            students, teachers, schools, authors, and publishers. We believe in
            the transformative power of education, and our platform is built to
            foster a love for learning, ignite curiosity, and connect the dots
            between the classroom and the wider world of knowledge.
          </p>
          <div
            style={{
              backgroundImage: `url(${aboutBg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" w-full mt-12 h-[300px] md:h-[500px] bg-[#9ECBFF] rounded-[20px]"
          ></div>
          <div className=" w-full mt-12">
            <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">
              What We Offer
            </p>
            <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 md:px-[12%]">
              Our values are the guiding principles that shape our most crucial
              decisions – from how we work together and interact with customers,
              to the way we conduct business and approach every aspect that
              matters to our success.
            </p>

            <div className=" w-full mt-16 space-y-16">
              <div className=" w-full flex flex-col lg:flex-row items-center justify-between">
                <div className=" w-full lg:w-[48%]">
                  <p className=" text-black font-semibold text-2xl md:text-[32px] font-Outfit md:leading-[48px]">
                    School Management System
                    <br /> for Registered Schools
                  </p>
                  <p className=" mt-2 text-[#000000B2] font-Outfit font-normal text-base md:text-xl">
                    A robust platform streamlining school administration,
                    <br />
                    communication, and student management.
                  </p>
                  <div className="mt-4 ml-4">
                    <ul className="list-disc  text-black font-Outfit text-sm md:text-base font-normal">
                      <li>
                        Simplify tasks like attendance tracking, grade
                        management, and parent communication.
                      </li>
                      <li>
                        Create a centralized hub for school information and
                        resources.
                      </li>
                      <li>
                        Gain insights into student performance and progress.
                      </li>
                    </ul>
                  </div>
                  <button className=" mt-10 py-3 px-[18px] bg-[#0530A1] rounded-[6px] text-center text-white font-Outfit text-[15px] font-semibold">
                    Start now
                  </button>
                </div>
                <div className=" w-full lg:w-[48%] h-[550px] rounded-[20px] mt-3 lg:mt-0 bg-gradient-to-tr from-[#5BC7E1] to-[#9BEBFF]">
                  <img src={group4} className=" w-full mt-[150px]" alt="" />
                </div>
              </div>
              {/* 2 */}
              <div className=" w-full flex flex-col lg:flex-row items-center justify-between mt-8 lg:mt-0">
                <div className=" w-full lg:w-[48%] h-[550px] rounded-[20px] bg-gradient-to-tr from-[#C901A1] to-[#FF82E6]">
                  <img src={group5} className=" w-full mt-[150px]" alt="" />
                </div>
                <div className=" w-full lg:w-[48%] mt-3 lg:mt-0 lg:text-right">
                  <p className=" text-black font-semibold text-2xl md:text-[32px] font-Outfit md:leading-[48px]">
                    E-Library
                    <br /> For Independent Learners and
                    <br /> Students
                  </p>
                  <p className=" mt-2 text-[#000000B2] font-Outfit font-normal text-base md:text-xl">
                    A vast digital library offering diverse learning resources
                    for students and self-directed learners.
                  </p>
                  <div className="p-4">
                    <ul className="list-disc list-inside text-black font-Outfit text-sm md:text-base font-normal">
                      <li>
                        Access textbooks, novels, educational videos, and more.
                      </li>
                      <li>
                        Enjoy personalized learning tools, quizzes, and
                        flashcards.
                      </li>
                      <li>
                        Connect with other learners through study groups and
                        discussions.
                      </li>
                    </ul>
                  </div>

                  <button className=" mt-10 py-3 px-[18px] bg-[#0530A1] rounded-[6px] text-center text-white font-Outfit text-[15px] font-semibold">
                    Start now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center mb-6 py-8 px-4 font-Outfit md:py-16 md:px-20 text-black bg-[#EBF5FF]">
          <p className=" text-center font-Outfit font-semibold text-[#0530A1] text-2xl md:text-[40px] md:leading-[60px]">
            Our Values
          </p>
          <p className=" font-Outfit text-center text-sm md:text-xl text-[#0530A1B2] font-normal mt-3 md:px-[12%]">
            Our values are the guiding principles that shape our most crucial
            decisions – from how we work together and interact with customers,
            to the way we conduct business and approach every aspect that
            matters to our success.
          </p>
          {/* 1 */}
          <div className=" w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 justify-between mt-16">
            <div className=" w-full md:w-[65%]">
              <p className=" capitalize font-Outfit font-semibold text-[#0530A1] text-xl md:text-[32px] md:leading-[48px]">
                a relentless pursuit of excellence
              </p>
              <p className=" mt-2 font-Outfit text-sm md:text-xl font-normal text-[#0530A1B2]">
                At Veclary, excellence is at the heart of everything we do. We
                understand the importance of providing high-quality educational
                tools for schools, teachers, and learners. We take immense pride
                in crafting exceptional learning experiences, from our
                comprehensive school management system to our vast and engaging
                e-library. Every feature, every resource, and every interaction
                is meticulously designed to meet the highest standards.
              </p>
            </div>
            <div className=" md:w-[300px] md:h-[300px] w-[200px] h-[200px] bg-[#FFFFFF] rounded-[10px] flex justify-center items-center">
              <img src={medal} alt="" className=" w-24 h-24" />
            </div>
          </div>
          {/* 2 */}
          <div className=" w-full flex flex-col-reverse md:flex-row items-center justify-between mt-16">
            <div className=" mt-4 md:mt-0 md:w-[300px] md:h-[300px] w-[200px] h-[200px] bg-[#FFFFFF] rounded-[10px] flex justify-center items-center">
              <img src={transpa} alt="" className=" w-24 h-24" />
            </div>
            <div className=" w-full md:w-[65%]">
              <p className=" capitalize font-Outfit font-semibold text-[#0530A1] text-xl md:text-[32px] md:leading-[48px]">
                Transparency
              </p>
              <p className=" mt-2 font-Outfit text-sm md:text-xl font-normal text-[#0530A1B2]">
                At Veclary, we embrace the fact that everyone is human and that
                nobody has all the answers. We champion a culture of
                transparency, where openly acknowledging what you don't know and
                seeking help from colleagues is not only accepted, but
                encouraged. We value individuals who proactively identify and
                address obstacles, regardless of who encounters them, as this is
                crucial to our collective progress.
              </p>
            </div>
          </div>
          {/* 3 */}
          <div className=" w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 justify-between mt-16">
            <div className=" w-full md:w-[65%]">
              <p className=" capitalize font-Outfit font-semibold text-[#0530A1] text-xl md:text-[32px] md:leading-[48px]">
                Continuous Learning and Growth
              </p>
              <p className=" mt-2 font-Outfit text-sm md:text-xl font-normal text-[#0530A1B2]">
                Veclary thrives on a culture of continuous learning and growth.
                We are an organization that values knowledge, actively seeking
                it through reading, research, collaboration, customer
                interaction, and constant curiosity. We believe in empowering
                our team members to expand their skills and knowledge, as this
                is fundamental to our success in shaping the future of
                education.
              </p>
            </div>
            <div className=" md:w-[300px] md:h-[300px] w-[200px] h-[200px] bg-[#FFFFFF] rounded-[10px] flex justify-center items-center">
              <img src={plant} alt="" className=" w-24 h-24" />
            </div>
          </div>
          {/* 4 */}
          <div className=" w-full flex flex-col-reverse md:flex-row items-center justify-between mt-16">
            <div className=" mt-4 md:mt-0 md:w-[300px] md:h-[300px] w-[200px] h-[200px] bg-[#FFFFFF] rounded-[10px] flex justify-center items-center">
              <img src={custo} alt="" className=" w-24 h-24" />
            </div>
            <div className=" w-full  md:w-[65%]">
              <p className=" capitalize font-Outfit font-semibold text-[#0530A1] text-xl md:text-[32px] md:leading-[48px]">
                Customer-Centricity
              </p>
              <p className=" mt-2 font-Outfit text-sm md:text-xl font-normal text-[#0530A1B2]">
                At Veclary, our users—students, teachers, schools, and content
                creators—are at the heart of everything we do. Every decision we
                make, every feature we develop, and every interaction we have is
                guided by a focus on delivering exceptional experiences.
                Customer service isn't just a department; it's an integral part
                of our company culture.
              </p>
            </div>
          </div>
        </div>
        <Faq />
        <Banner />
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
