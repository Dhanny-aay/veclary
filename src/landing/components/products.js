import group1 from "./assets/Group1.svg";
import group2 from "./assets/Group2.svg";
import group3 from "./assets/Group3.svg";

const Products = () => {
  return (
    <>
      <div className=" w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-20">
        <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">
          What We Offer
        </p>

        <div className=" grid grid-cols-1 lg:grid-cols-3 w-full mt-8 gap-6">
          <div className=" bg-gradient-to-tr to-[#9BEBFF] from-[#5BC7E1] p-6 md:p-8 w-full rounded-[20px] relative">
            <p className=" font-Outfit text-lg md:text-2xl font-semibold capitalize ">
              An Efficient school management system
            </p>
            <p className=" mt-2 text-sm md:text-base font-normal font-Outfit text-[#000000B2]">
              All-in-one system for scheduling, attendance, grading, and
              communication.
            </p>
            <img
              src={group1}
              alt="An Efficient school management system"
              className=" mt-9"
            />
          </div>

          <div className=" bg-gradient-to-tr from-[#C901A1] to-[#FF82E6] p-6 md:p-8 w-full rounded-[20px] relative">
            <p className=" font-Outfit text-lg md:text-2xl font-semibold capitalize text-white">
              A Robust Digital library
            </p>
            <p className=" mt-2 text-sm md:text-base font-normal font-Outfit text-[#ffffffB2]">
              Explore thousands of eBooks, articles, and multimedia Resources
              Tailored to All Ages, Interests, and Learning Levels, in Multiple
              Languages and Subjects.
            </p>
            <img
              src={group2}
              alt="A Robust Digital library"
              className=" mt-9"
            />
          </div>

          <div className=" bg-gradient-to-tr from-[#F98810] to-[#FFD7AE] p-6 md:p-8 w-full rounded-[20px] relative ">
            <p className=" font-Outfit text-lg md:text-2xl font-semibold capitalize">
              Advanced Class Assistant
            </p>
            <p className=" mt-2 text-sm md:text-base font-normal font-Outfit text-[#000000B2]">
              Record, transcribe, and manage class sessions with ease. Review
              lectures, revisit key concepts, and optimize learning with clear
              transcripts.
            </p>
            <img
              src={group3}
              alt="A Robust Digital library"
              className=" mt-9"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
