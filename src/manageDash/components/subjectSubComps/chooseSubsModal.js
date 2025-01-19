import subIlus from "./assets/subIllus.svg";

const ChooseSubs = ({ setChooseSub, setSelectSub }) => {
  return (
    <>
      <div className="w-full md:w-[120%] h-full bg-[#1212128d] z-[999] fixed top-0 md:-left-[20%] p-6 flex justify-center items-center">
        <div className="md:ml-[20%] [500px] bg-[#FFFFFF] p-6 rounded-[15px] w-full md:w-[700px]">
          <div className="w-full h-full bg-[#fff] overflow-auto flex flex-col items-center justify-center">
            <img src={subIlus} alt="" />
            <h3 className=" text-center mt-2 font-Outfit font-semibold text-xl text-[#333333]">
              Enter Subjects for your school
            </h3>
            <p className=" text-center font-Outfit text-sm max-w-[600px] mt-3 font-normal text-[#687383]">
              It looks like your school hasn't chosen any subject yet. Get
              started by choosing a subject to organize teachers, students, and
              schedules efficiently.
            </p>
            <button
              onClick={() => {
                setChooseSub(false); // Hide ChooseSub
                setSelectSub(true); // Show SelectSub
              }}
              className=" mt-5 rounded-[26px] bg-[#0530A1] px-10 py-3 text-white font-Outfit font-medium text-lg"
            >
              Choose Subjects
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseSubs;
