import { useState } from "react";
import down from "../assets/down.svg";
import individual from "../assets/Individualplan.svg";
import pro from "../assets/proplan.svg";
import ent from "../assets/entplan.svg";
import progress2 from "../assets/progress2.svg";

const PlanManage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plan = [
    { name: "Individual", price: "₦900/mon", image: individual },
    { name: "Pro", price: "₦2500/mon", image: pro },
    { name: "Enterprise", price: "Custom price/mon", image: ent },
  ];

  const handlePlanSelect = (index) => {
    setSelectedPlan(selectedPlan === index ? null : index);
  };

  return (
    <>
      <div className="w-full">
        <img src={progress2} className=" w-full mt-3" alt="" />
        <p className=" font-Outfit font-medium text-xl mt-6">
          Unlock Velcary full learning experience by choosing a plan
        </p>

        <div className="w-full mt-4 pb-8 lg:overflow-y-scroll lg:h-[260px]">
          <div className="mt-4 space-y-3 flex flex-col items-center w-full">
            {plan.map((item, index) => (
              <div
                key={index}
                className={`w-full border ${
                  selectedPlan === index
                    ? "border-[#0530A1] border-2"
                    : "border-[#EAEBF0]"
                } flex py-4 px-5 rounded-[10px] flex-col justify-between items- bg-[#F4F4F5] cursor-pointer`}
                onClick={() => handlePlanSelect(index)}
              >
                <div className="flex items-center w-full justify-between space-x-2">
                  {" "}
                  {/* Added container for plan details */}
                  <span className=" flex items-center space-x-2">
                    <p className="font-Outfit text-base font-medium">
                      {item.name}
                    </p>
                    <p className="font-Outfit text-xs mb-2 text-[#00000094] font-medium">
                      {item.price}
                    </p>
                  </span>
                  <img src={down} alt="" />
                </div>
                {selectedPlan === index && (
                  <img src={item.image} className="mt-6 w-full" alt="" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanManage;
