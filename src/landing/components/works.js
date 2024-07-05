import create from "./assets/create.svg";
import sub from "./assets/sub.svg";
import access from "./assets/access.svg";

const Works = () => {
  return (
    <>
      <div className="  w-full flex flex-col items-center justify-center py-8 px-4 md:py-16 md:px-20">
        <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">
          How Veclary Works
        </p>
        <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 md:px-[12%]">
          Unlocking success for students, teachers, and schools through
          personalized learning and streamlined operations.
        </p>

        <div className=" mt-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className=" w-full p-8 bg-[#5BC7E1] rounded-[15px] relative">
            <img src={create} className="" alt="" />
            <p className=" font-Outfit font-semibold text-2xl text-white mt-3 md:h-[1.5em]">
              Create account
            </p>
            <p className=" mt-2 md:h-[6em] font-Outfit text-base font-normal text-[#FFFFFFB2]">
              The first step is to create an account with Velcary by completing
              the user registration form.
            </p>
            <button className=" px-6 py-3 bg-[#0530A1] text-white shadow rounded-[5px] mt-8 font-Outfit font-semibold text-base">
              View plans
            </button>
          </div>
          <div className=" w-full p-8 bg-[#F98810] rounded-[15px] relative">
            <img src={sub} className="" alt="" />
            <p className=" font-Outfit font-semibold text-2xl mt-3 md:h-[1.5em] text-white">
              Subscribe to a plan
            </p>
            <p className=" mt-2 md:h-[6em] font-Outfit text-base font-normal text-[#FFFFFFB2]">
              Choose from any of our packages to gain access to all our features
              and products.
            </p>
            <button className=" px-6 py-3 bg-[#0530A1] text-white shadow rounded-[5px] mt-8 font-Outfit font-semibold text-base">
              View plans
            </button>
          </div>
          <div className=" w-full p-8 bg-[#C901A1] rounded-[15px] relative">
            <img src={access} className="" alt="" />
            <p className=" font-Outfit font-semibold text-2xl mt-3 md:h-[1.5em] text-white">
              Access all features
            </p>
            <p className=" mt-2 md:h-[6em] font-Outfit text-base font-normal text-[#FFFFFFB2]">
              Welcome to the future of learning! You now have unlimited access
              to Velcary's features and resources.
            </p>
            <button className=" px-6 py-3 bg-[#0530A1] text-white shadow rounded-[5px] mt-8 font-Outfit font-semibold text-base">
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
