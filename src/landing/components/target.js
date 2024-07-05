import targ1 from "./assets/targ1.svg";
import targ2 from "./assets/targ2.svg";
import targ3 from "./assets/targ3.svg";
import targ4 from "./assets/targ4.svg";
import targ5 from "./assets/targ5.svg";
import targ6 from "./assets/targ6.svg";

const Target = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-20">
        <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">
          Who is Veclary for ?
        </p>
        <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 lg:px-[12%]">
          Veclary's comprehensive suite of educational tools caters to a wide
          range of learners, from the youngest minds to lifelong learners.
        </p>

        <div className=" w-full flex flex-col mt-16 space-y-16">
          {/* target 1 */}
          <div className=" flex flex-col lg:flex-row items-center justify-between w-full">
            <div
              style={{
                backgroundImage: `url(${targ1})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full lg:w-[47%] h-[340px] bg-[#4991EF] rounded-[10px]"
            ></div>
            <div className=" w-full lg:w-[47%] flex flex-col items-start">
              <p className=" font-Outfit mt-3 lg:mt-0 font-semibold text-xl md:text-[32px] text-black">
                Primary & Nursery
              </p>
              <p className=" mt-2 text-[#000000B2] font-Outfit text-sm md:text-xl">
                Spark curiosity and ignite a love for learning with interactive
                learning, engaging activities, and age-appropriate resources.
                Veclary supports the development of foundational literacy,
                numeracy, and social skills.
              </p>
              <button className=" bg-[#0530A1] py-4 px-6 rounded-[5px] shadow-sm shadow-[#1018280A] font-Outfit text-base font-semibold text-[#FFFFFF] mt-10">
                Sign Up
              </button>
            </div>
          </div>

          {/* target 2 */}
          <div className=" flex flex-col-reverse lg:flex-row items-center justify-between w-full">
            <div className="w-full lg:w-[47%] flex flex-col items-start">
              <p className=" font-Outfit font-semibold mt-3 md:mt-0 text-xl md:text-[32px] text-black">
                Secondary Schools
              </p>
              <p className=" mt-2 text-[#000000B2] font-Outfit text-sm md:text-xl">
                Deepen subject matter knowledge with our extensive library,
                personalized learning paths, and collaborative tools. Prepare
                for standardized tests like Basic Education Certificate
                Examination (BECE) or West African Senior School Certificate
                Examination (WASSCE) with targeted practice materials.
              </p>
              <button className=" bg-[#0530A1] py-4 px-6 rounded-[5px] shadow-sm shadow-[#1018280A] font-Outfit text-base font-semibold text-[#FFFFFF] mt-10">
                Sign Up
              </button>
            </div>
            <div
              style={{
                backgroundImage: `url(${targ2})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="w-full lg:w-[47%] h-[340px] bg-[#4991EF] rounded-[10px]"
            ></div>
          </div>

          {/* target 3 */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            <div
              style={{
                backgroundImage: `url(${targ3})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="w-full lg:w-[47%] h-[340px] bg-[#4991EF] rounded-[10px]"
            ></div>
            <div className="w-full lg:w-[47%] flex flex-col items-start">
              <p className=" font-Outfit mt-3 md:mt-0  font-semibold text-xl md:text-[32px] text-black">
                Tertiary Institutions
              </p>
              <p className=" mt-2 text-[#000000B2] font-Outfit text-sm md:text-xl">
                Enhance your studies with in-depth resources, research tools,
                and online communities. Veclary facilitates academic success at
                the university or college level, including preparation for
                Advanced Level (A-Level) examinations.
              </p>
              <button className=" bg-[#0530A1] py-4 px-6 rounded-[5px] shadow-sm shadow-[#1018280A] font-Outfit text-base font-semibold text-[#FFFFFF] mt-10">
                Sign Up
              </button>
            </div>
          </div>

          {/* target 4 */}
          <div className=" flex flex-col-reverse lg:flex-row items-center justify-between w-full">
            <div className=" w-full lg:w-[47%] flex flex-col items-start">
              <p className=" font-Outfit mt-3 md:mt-0 font-semibold text-xl md:text-[32px] text-black">
                Individual Learners
              </p>
              <p className=" mt-2 text-[#000000B2] font-Outfit text-sm md:text-xl">
                Supplement your formal education or pursue independent learning
                goals. Veclary offers a wealth of resources across various
                disciplines, allowing you to explore topics at your own pace and
                expand your knowledge base.
              </p>
              <button className=" bg-[#0530A1] py-4 px-6 rounded-[5px] shadow-sm shadow-[#1018280A] font-Outfit text-base font-semibold text-[#FFFFFF] mt-10">
                Sign Up
              </button>
            </div>
            <div
              style={{
                backgroundImage: `url(${targ4})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full lg:w-[47%] h-[340px] bg-[#4991EF] rounded-[10px]"
            ></div>
          </div>

          {/* target 5 */}
          <div className=" flex flex-col lg:flex-row items-center justify-between w-full">
            <div
              style={{
                backgroundImage: `url(${targ5})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full lg:w-[47%] h-[340px] bg-[#4991EF] rounded-[10px]"
            ></div>
            <div className=" w-full lg:w-[47%] flex flex-col items-start">
              <p className=" font-Outfit mt-3 md:mt-0 font-semibold text-xl md:text-[32px] text-black">
                Authors & Publishers
              </p>
              <p className=" mt-2 text-[#000000B2] font-Outfit text-sm md:text-xl">
                Reach a wider audience and contribute to educational progress by
                creating and sharing high-quality content on Veclary's platform.
                We provide tools and resources to make content creation and
                distribution seamless.
              </p>
              <button className=" bg-[#0530A1] py-4 px-6 rounded-[5px] shadow-sm shadow-[#1018280A] font-Outfit text-base font-semibold text-[#FFFFFF] mt-10">
                Sign Up
              </button>
            </div>
          </div>

          {/* target 6 */}
          <div className=" flex flex-col-reverse lg:flex-row items-center justify-between w-full">
            <div className=" w-full lg:w-[47%] flex flex-col items-start">
              <p className=" font-Outfit mt-3 md:mt-0 font-semibold text-xl md:text-[32px] text-black">
                School Management
              </p>
              <p className=" mt-2 text-[#000000B2] font-Outfit text-sm md:text-xl">
                Streamline school operations, boost communication, and gain
                valuable insights with Veclary's powerful management system.
                Manage student data, automate workflows, and make data-driven
                decisions to optimize your school's efficiency and success.
              </p>
              <button className=" bg-[#0530A1] py-4 px-6 rounded-[5px] shadow-sm shadow-[#1018280A] font-Outfit text-base font-semibold text-[#FFFFFF] mt-10">
                Sign Up
              </button>
            </div>
            <div
              style={{
                backgroundImage: `url(${targ6})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full lg:w-[47%] h-[340px] bg-[#4991EF] rounded-[10px]"
            ></div>
          </div>

          <div className=" w-full">
            <p className=" text-center font-Outfit font-medium text-2xl md:text-[32px] md:leading-[60px]">
              A Unified Platform for All
            </p>
            <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 lg:px-[12%]">
              No matter your role or learning stage, Veclary offers a
              personalized and engaging experience. We believe in fostering a
              collaborative environment where everyone can thrive.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Target;
