import check from "./assets/check.svg";
import { Tooltip, Whisper } from "rsuite";
import { Link } from "react-router-dom";
import orange from "./assets/orange.svg";

const Pricing = () => {
  const plans = [
    {
      name: "LMS Only",
      price: "₦1,800 / term",
      subtext: "Per student · billed termly",
      features: [
        "Student results & records",
        "Class & subject management",
        "Assignments & resources",
        "Attendance tracking",
        "Basic reports",
      ],
      bgColor: "#5BC7E1",
      cta: "Get started",
      link: "/management-signup",
    },
    {
      name: "Library Only",
      price: "₦2,100 / term",
      subtext: "Per student · billed termly",
      features: [
        "E-Library access",
        "Read & Buy books",
        "Offline reading (where available)",
        "Reading progress tracking",
      ],
      bgColor: "#F98810",
      cta: "Get started",
      link: "/management-signup",
    },
    {
      name: "School Bundle",
      price: "₦3,700 / term",
      subtext: "Per student · billed termly",
      recommended: true,
      features: [
        "Everything in LMS",
        "E-Library access",
        "Read & Buy books",
        "Student learning history",
        "Parent fee payments",
      ],
      comingSoon: [
        {
          text: "Secure Pickup & Drop",
          tooltip:
            "A secure parent-approved pickup system for schools. Parents generate pickup codes, schools verify instantly. Launching Q2 2026.",
        },
        {
          text: "AI Class Assistant",
          tooltip:
            "Records classroom lectures and generates study notes for students. Helps revision and learning continuity. Launching Q3 2026.",
        },
      ],
      bgColor: "#C901A1",
      cta: "Get started",
      link: "/management-signup",
    },
  ];

  return (
    <>
      <div className=" w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-20">
        <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">
          Our Pricing
        </p>
        <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 lg:px-[12%]">
          Choose the plan that works best for your school.
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-[32px] w-full items-start">
          {plans.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: `${item.bgColor}`,
              }}
              className={`w-full p-8 rounded-[30px] border border-[#EAEBF0] relative flex flex-col h-full ${
                item.recommended ? "shadow-2xl border-2 border-[#0530A1]" : ""
              }`}
            >
              {item.recommended && (
                <div className="absolute top-0 right-0 left-0 -mt-5 flex justify-center">
                  <span className="bg-[#0530A1] text-white px-6 py-2 rounded-full text-base font-bold font-Outfit shadow-lg flex items-center gap-2">
                    <span>⭐</span> Recommended
                  </span>
                </div>
              )}

              <div className="flex flex-col mb-4">
                <p className="font-Outfit font-medium text-2xl text-white md:text-4xl">
                  {item.name}
                </p>
              </div>

              <div className="flex flex-col mt-2">
                <p className="font-Outfit font-medium text-[28px] text-white md:text-[32px]">
                  {item.price}
                </p>
                <p className="font-medium text-sm md:text-base text-[#FFFFFFCC] font-Outfit">
                  {item.subtext}
                </p>
              </div>

              <div className="mt-6 flex-grow">
                {item.features.map((feature, i) => (
                  <div
                    key={i}
                    className={`py-3 flex flex-row items-center space-x-3 ${
                      i !== item.features.length - 1
                        ? "border-b border-[#ffffff4d]"
                        : ""
                    }`}
                  >
                    <img src={check} alt="" className="w-5 h-5" />
                    <p className="font-Outfit font-normal text-base text-white">
                      {feature}
                    </p>
                  </div>
                ))}

                {item.comingSoon && (
                  <>
                    <div className="border-t border-white my-4 opacity-50"></div>
                    <p className="text-white font-bold mb-2 font-Outfit">
                      Coming soon
                    </p>
                    {item.comingSoon.map((feat, i) => (
                      <div
                        key={i}
                        className={`py-3 flex flex-row items-center space-x-3 ${
                          i !== item.comingSoon.length - 1
                            ? "border-b border-[#ffffff4d]"
                            : ""
                        }`}
                      >
                        <img src={check} alt="" className="w-5 h-5" />
                        {feat.tooltip ? (
                          <Whisper
                            placement="top"
                            trigger="hover"
                            speaker={<Tooltip>{feat.tooltip}</Tooltip>}
                          >
                            <p className="font-Outfit font-normal text-base text-white cursor-help border-b border-dashed border-white inline-block leading-tight">
                              {feat.text} (?)
                            </p>
                          </Whisper>
                        ) : (
                          <p className="font-Outfit font-normal text-base text-white">
                            {feat.text}
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>

              <Link to={item.link} className="w-full">
                <button className="w-full mt-10 px-6 py-3 bg-[#0530A1] text-white text-center font-Outfit font-semibold text-base rounded-[10px] hover:bg-[#04247a] transition-colors">
                  {item.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Independent Learners Section */}
        <div className="mt-16 w-full max-w-6xl bg-[#EBF5FF] rounded-[20px] py-8 md:py-16 px-7 md:px-14 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:w-2/3">
            <h3 className="font-Outfit font-semibold text-[32px] md:text-5xl md:leading-[60px] text-[#121212] mb-2 flex flex-col items-start">
              <span>Independent</span>
              <span className="inline-flex flex-col">Learners</span>
            </h3>
            <p className="font-Outfit text-[#121212B2] text-lg font-normal mt-4 mb-6">
              Library access for students not attached to a school.
            </p>
            <div className="flex flex-col md:flex-row md:items-baseline space-y-1 md:space-y-0 md:space-x-4">
              <span className="font-Outfit font-bold text-2xl text-[#121212]">
                ₦750
                <span className="text-base font-normal text-[#12121266]">
                  /month
                </span>
              </span>
              <span className="font-Outfit text-[#12121266]">or</span>
              <span className="font-Outfit font-bold text-2xl text-[#121212]">
                ₦9,000
                <span className="text-base font-normal text-[#12121266]">
                  /year
                </span>
              </span>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <Link to="/student-signup">
              <button className="px-8 py-4 bg-[#0530A1] text-white font-Outfit font-semibold text-lg rounded-[10px] shadow-lg hover:bg-[#04247a] transition-all transform hover:scale-105">
                Start learning
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
