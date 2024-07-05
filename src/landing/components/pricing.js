import check from "./assets/check.svg";

const Pricing = () => {
  const plans = [
    {
      name: "Individual",
      price: "$0",
      desc: "",
      duration: "Per month",
      detail: "Explore the product and transcribe personal audios",
      ideal: "Ideal for Individual or occasional users",
      feat: "10 Transcriptions per month",
      bgColor: "#5BC7E1",
      cta: "Get Started",
    },
    {
      name: "Family",
      price: "$395",
      desc: "for five users",
      duration: "Per month",
      detail: "Explore the product with full functionality",
      ideal: "Ideal for Professionals and small teams",
      feat: "10 Transcriptions per month",
      bgColor: "#F98810",
      cta: "Get Started",
    },
    {
      name: "Schools",
      price: "Custom pricing",
      desc: "",
      duration: "",
      detail:
        "Explore the product with full functionality, onboarding and support.",
      ideal: "Ideal for Large organizations and high-volume users",
      feat: "10 Transcriptions per month",
      bgColor: "#C901A1",
      cta: "Contact Sales",
    },
  ];

  return (
    <>
      <div className=" w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-20">
        <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">
          Our Pricing
        </p>
        <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 lg:px-[12%]">
          Keeping your eye on the ball while performing a deep dive on the
          start-up mentality to derive convergence on cross-platform
          integration.
        </p>

        <div className=" mt-12 grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
          {plans.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: `${item.bgColor}`,
              }}
              className=" w-full p-8 rounded-[30px] border border-[#EAEBF0]"
            >
              <span className="flex flex-row space-x-2 items-center">
                <p className=" font-Outfit font-medium text-2xl text-white md:text-4xl">
                  {item.name}
                </p>
                <p className=" text-[#FFFFFF80] font-medium text-xl font-Outfit">
                  {item.desc}
                </p>
              </span>
              <span className=" flex flex-row items-center h-[2em] mt-4 md:mt-8 space-x-1">
                <p className=" font-Outfit font-medium text-[28px] text-white md:text-[32px]">
                  {item.price}
                </p>
                <p className=" font-medium text-lg md:text-xl text-[#FFFFFF80] font-Outfit">
                  {item.duration}
                </p>
              </span>
              <p className=" mt-6 font-Outfit font-normal md:h-[5em] text-base text-white">
                {item.detail}
              </p>

              <p className=" mt-6 md:mt-2 font-Outfit font-semibold md:h-[4em] text-white text-lg">
                {item.ideal}
              </p>

              <span className=" py-3 border-y border-[#fff] flex flex-row  items-center mt-3 space-x-3">
                <img src={check} alt="" />
                <p className=" font-Outfit font-normal text-base text-white">
                  {item.feat}
                </p>
              </span>
              <span className=" py-3 flex flex-row items-center space-x-3">
                <img src={check} alt="" />
                <p className=" font-Outfit font-normal text-base text-white">
                  {item.feat}
                </p>
              </span>
              <span className=" py-3 border-y border-[#fff] flex flex-row items-center space-x-3">
                <img src={check} alt="" />
                <p className=" font-Outfit font-normal text-base text-white">
                  {item.feat}
                </p>
              </span>

              <button className=" mt-10 px-6 py-3 bg-[#0530A1] text-white text-center font-Outfit font-semibold text-base rounded-[10px]">
                {item.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pricing;
