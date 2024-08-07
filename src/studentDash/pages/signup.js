import grid from "./assets/grid.svg";
import logo from "./assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import ilus1 from "./assets/ilus1.svg";
import prog1 from "./assets/prog1.svg";
import { useState } from "react";
import load from "./assets/load.gif";

import PersonalStudent from "./signupComponents/personal";
import AcademicStudent from "./signupComponents/academic";
import PlanStudent from "./signupComponents/plan";
import { handleStudentRegister } from "../../controllers/studentControllers/userAuthController";

const StudentSignup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    grade: "",
    schoolName: "",
    schoolIdentification: "",
    interstedSubject: "",
    bestLearningModel: "",
  });

  console.log(formData);

  const onSuccess = () => {
    setLoading(false);
    navigate("/studentlogin");
  };
  const onError = () => {
    setLoading(false);
    // navigate("/studentlogin");
  };

  const steps = [
    <PersonalStudent formData={formData} setFormData={setFormData} />,
    <AcademicStudent formData={formData} setFormData={setFormData} />,
    <PlanStudent formData={formData} setFormData={setFormData} />,
  ];

  const handleProceed = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = formData;
    handleStudentRegister(userData, onSuccess, onError);
  };

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] text-[#000]">
        <div className="p-6 w-full max-w-[1280px] lg:max-h-[630px] bg-[#fff] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
          <div className="w-full lg:w-[49%] h-full flex flex-col md:px-10 relative">
            <p className="font-Outfit text-[#0530A1] text-2xl font-medium">
              Sign up
            </p>
            <p className="text-[#12121266] font-Outfit text-lg font-normal mt-1">
              Get Started Now
            </p>

            {steps[currentStep]}

            <div className="mt-16 lg:mt-0 lg:absolute bottom-0 w-full left-0 lg:px-10">
              <div className="flex justify-between">
                {currentStep > 0 && (
                  <button
                    className="w-[48%] bg-[#e0e0e0] rounded-[10px] flex items-center justify-center h-[38px] text-black text-center font-Outfit text-base"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}

                <button
                  className={`${
                    currentStep > 0 ? "w-[48%]" : "w-full"
                  } bg-[#0530A1] rounded-[10px] flex items-center justify-center h-[38px] text-white text-center font-Outfit text-base`}
                  onClick={
                    currentStep < steps.length - 1
                      ? handleProceed
                      : handleSubmit
                  }
                >
                  {loading ? (
                    <img src={load} className=" w-6" alt="" />
                  ) : currentStep < steps.length - 1 ? (
                    "Proceed"
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>

              <Link to="/studentlogin">
                <p className="mt-[19px] font-Outfit font-medium text-xs text-[#12121266] text-center">
                  Already have an Account?{" "}
                  <span className="text-[#0530A1]">Login</span>
                </p>
              </Link>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(${grid})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-[49%] bg-[#EBF5FF] rounded-[15px] relative hidden lg:flex flex-col justify-center px-5 py-6"
          >
            <span className="absolute top-6 right-6 flex items-center space-x-2">
              <img
                src={logo}
                className="w-16 h-6 md:w-10 md:h-6"
                alt="Veclary:The Best System To Enhance Your Education"
              />
              <p className="font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
                Veclary
              </p>
            </span>

            <div
              style={{
                backgroundImage: `url(${ilus1})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="w-full h-[250px] z-50 mt-12 rounded-[15px]"
            ></div>

            <p className="z-50 text-xl font-semibold mt-16 font-Outfit">
              Empower Educators and elevate learning
            </p>
            <p className="z-50 font-Outfit mt-2 font-normal text-base">
              unleashing productivity with velcary’s management Tools
            </p>

            <img
              src={prog1}
              className="z-50 w-[90%] absolute bottom-6 left-5"
              alt=""
            />

            <div className="w-full absolute h-[100%] top-0 left-0 bg-gradient-to-b from-[rgba(235,245,255,0)] rounded-[15px] to-[rgba(235,245,255,1)]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSignup;
