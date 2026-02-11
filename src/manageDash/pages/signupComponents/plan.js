import { useState, useEffect } from "react";
import down from "../assets/down.svg";
import progress2 from "../assets/progress2.svg";
import { Check, HelpCircle } from "lucide-react";

const PlanManage = ({ formData, setFormData }) => {
  // Initialize from formData if available, else null
  const [selectedPlan, setSelectedPlan] = useState(formData?.plan || null);

  const plans = [
    {
      id: "lms_only",
      title: "LMS Only",
      price: "₦1,800 / term",
      subtext: "Per student · billed termly",
      features: [
        "Student results & records",
        "Class & subject management",
        "Assignments & resources",
        "Attendance tracking",
        "Basic reports",
      ],
      recommended: false,
    },
    {
      id: "school_bundle",
      title: "School Bundle",
      price: "₦3,700 / term",
      subtext: "Per student · billed termly",
      features: [
        "Everything in LMS",
        "E-Library access",
        "Read & Buy books",
        "Student learning history",
        "Parent fee payments",
      ],
      comingSoon: [
        {
          name: "Secure Pickup & Drop",
          tooltip:
            "A secure parent-approved pickup system for schools.\nParents generate pickup codes, schools verify instantly.\nLaunching Q2 2026.",
        },
        {
          name: "AI Class Assistant",
          tooltip:
            "Records classroom lectures and generates study notes for students.\nHelps revision and learning continuity.\nLaunching Q3 2026.",
        },
      ],
      recommended: true,
    },
    {
      id: "library_only",
      title: "Library Only",
      price: "₦2,100 / term",
      subtext: "Per student · billed termly",
      features: [
        "E-Library access",
        "Read & Buy books",
        "Offline reading (where available)",
        "Reading progress tracking",
      ],
      recommended: false,
    },
  ];

  /*
   * Independent Learners section excluded per instruction:
   * "only plans that relate directly to school, if they dont. we should comment out the plan section"
   */

  const handlePlanSelect = (planTitle) => {
    const newSelection = selectedPlan === planTitle ? null : planTitle;
    setSelectedPlan(newSelection);
    if (setFormData) {
      setFormData((prev) => ({ ...prev, plan: newSelection }));
    }
  };

  return (
    <div className="w-full">
      <img src={progress2} className="w-full mt-3" alt="Progress Step 3" />
      <p className="font-Outfit font-medium text-xl mt-6 text-center lg:text-left">
        Unlock Veclary full learning experience by choosing a plan
      </p>

      <div className="w-full mt-6 pb-24 lg:overflow-y-auto lg:h-[350px]">
        <div className="space-y-4 flex flex-col items-center w-full">
          {plans.map((item) => (
            <div
              key={item.id}
              className={`w-full border transition-all duration-300 ${
                selectedPlan === item.title
                  ? "border-[#0530A1] border-2 bg-white shadow-md"
                  : "border-[#EAEBF0] bg-[#F4F4F5]"
              } rounded-[10px] cursor-pointer overflow-hidden`}
              onClick={() => handlePlanSelect(item.title)}
            >
              {/* Header Section */}
              <div className="flex items-center w-full justify-between p-4">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <p className="font-Outfit text-base font-medium text-[#121212]">
                      {item.title}
                    </p>
                    {item.recommended && (
                      <span className="bg-[#0530A1] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="font-Outfit text-sm text-[#0530A1] font-bold">
                    {item.price}
                  </p>
                </div>
                <img
                  src={down}
                  alt="Expand"
                  className={`transform transition-transform duration-300 ${
                    selectedPlan === item.title ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Expanded Content */}
              {selectedPlan === item.title && (
                <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-200">
                  <div className="w-full h-[1px] bg-[#EAEBF0] mb-4"></div>

                  <p className="font-Outfit text-xs text-[#121212]/60 mb-4">
                    {item.subtext}
                  </p>

                  <ul className="space-y-3">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-[#0530A1] mt-0.5 flex-shrink-0" />
                        <span className="font-Outfit text-sm text-[#121212]/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {item.comingSoon && (
                    <>
                      <div className="w-full flex items-center space-x-2 my-4">
                        <div className="h-[1px] bg-[#EAEBF0] flex-1"></div>
                        <span className="text-[10px] font-bold text-[#121212]/40 uppercase tracking-wider">
                          Coming Soon
                        </span>
                        <div className="h-[1px] bg-[#EAEBF0] flex-1"></div>
                      </div>
                      <ul className="space-y-3">
                        {item.comingSoon.map((coming, i) => (
                          <li
                            key={i}
                            className="flex items-start justify-between"
                          >
                            <span className="font-Outfit text-sm text-[#121212]/60 flex items-center">
                              {coming.name === "Secure Pickup & Drop" && "🔒 "}
                              {coming.name === "AI Class Assistant" && "🤖 "}
                              {coming.name}
                            </span>
                            <div className="group relative">
                              <HelpCircle className="w-4 h-4 text-[#121212]/40 hover:text-[#0530A1] transition-colors" />
                              <div className="absolute bottom-full right-0 mb-2 w-48 bg-black/90 text-white text-xs p-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-pre-line text-center">
                                {coming.tooltip}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanManage;
