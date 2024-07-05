import orange from "./assets/orange.svg";

const Banner = () => {
  return (
    <>
      <div className="w-full p-4 md:p-6">
        <div className=" w-full flex flex-col lg:flex-row items-center justify-between bg-[#EBF5FF] rounded-[20px] py-8 md:py-16 px-7 md:px-14">
          <div className="w-full lg:w-[48%]">
            <p className=" font-Outfit font-semibold text-[32px] md:text-5xl md:leading-[72px] flex">
              Elevate{" "}
              <span className=" inline-flex flex-col w-[172px] ml-[6px]  md:w-[242px]">
                Education.
                <img
                  src={orange}
                  className=" -mt-2 md:-mt-4 w-[152px] md:w-[242px]"
                  alt=""
                />
              </span>
            </p>
            <p className=" font-Outfit font-semibold text-[32px] md:text-5xl md:leading-[72px]">
              Explore Velcary for students & schools.
            </p>
          </div>
          <div className="w-full mt-3 lg:mt-0 lg:w-[48%]">
            <p className=" font-Outfit text-[#121212B2] text-lg font-normal">
              Don’t miss this opportunity to join Veclary and enjoy the benefits
              of our simple, affordable, and flexible solutions.
              <br />
              Contact us today to get started
            </p>
            <div className=" flex flex-row items-center space-x-8 mt-6">
              <button className=" rounded-[10px] px-6 py-3 font-Outfit text-base font-semibold bg-[#0530A1] shadow-sm shadow-[#1018280A] text-[#fff] text-center">
                Get Started
              </button>
              <button className=" rounded-[10px] px-6 py-3 font-Outfit text-base font-semibold border border-[#1212121A] shadow-sm shadow-[#1018280A] text-[#121212] text-center">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
