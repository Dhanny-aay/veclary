import { useContext } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import chart from "./assets/chart.svg";
import chart1 from "./assets/chart1.svg";
import chart2 from "./assets/chart2.svg";
import {
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";

const VendorMarket = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const analysis = [
    {
      name: "Total Impression",
      percentage: "90%",
      stat: "Weekly Stats",
      img: chart,
    },
    {
      name: "Total Advert Clicks",
      percentage: "88",
      stat: "All Stats",
      img: chart1,
    },
    {
      name: "Total Book Sold",
      percentage: "88%",
      stat: "Weekly Stats",
      img: chart2,
    },
  ];

  const adverts = [
    { name: "Chemistry", impressions: "10", click: "10" },
    { name: "Biology", impressions: "01", click: "12" },
    { name: "English", impressions: "10", click: "10" },
    { name: "Physics", impressions: "20", click: "12" },
    { name: "Mathematics", impressions: "400", click: "121" },
  ];

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">Market</p>
        </span>

        <div className=" mt-6 px-6">
          <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.map((item, index) => (
              <div
                key={index}
                className=" border border-[#EAEBF0] rounded-[10px] p-4"
              >
                <p className=" font-Outfit font-medium text-[#272D37] text-base">
                  {item.name}
                </p>
                <div className=" w-full flex flex-row justify-between mt-2 items-end">
                  <div className=" w-[40%]">
                    <p className=" font-Outfit text-[#272D37] text-xl font-semibold">
                      {item.percentage}
                    </p>
                    <p className=" font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">
                      {item.stat}
                    </p>
                  </div>
                  <div className=" w-[59%]">
                    <img src={item.img} className=" w-[100%] h-full" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" mt-6 px-6">
          <span className=" w-full flex flex-row justify-between">
            <p className=" font-Outfit font-semibold text-xl text-[#101828]">
              Adverts
            </p>
            <button className=" px-4 py-2 rounded-[10px] bg-[#0530A1] font-medium font-Outfit text-sm text-white">
              Create New Advert
            </button>
          </span>
          <div className=" w-full rounded-[10px] border mt-6 border-[#EAEBF0]">
            <div className=" overflow-x-auto">
              <table className="border-collapse w-full">
                <thead>
                  <tr className="border-b border-[#eaecf0] px-4 py-3">
                    <th className="font-Outfit font-medium text-[#667085] w-[50px] text-xs text-left py-2 px-4">
                      S/N
                    </th>
                    <th className="font-Outfit font-medium text-[#667085] text-xs text-left py-2 px-4">
                      Books
                    </th>
                    <th className="font-Outfit font-medium text-[#667085] text-xs py-2 px-4">
                      Impressions
                    </th>
                    <th className="font-Outfit font-medium text-[#667085] text-xs py-2 px-4">
                      Ad Clicks
                    </th>
                    <th className="font-Outfit font-medium text-[#667085] text-xs text-center  py-2 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adverts.map((item, index) => (
                    <tr key={index} className="border-b border-[#EAECF0]">
                      <td className="text-left w-[50px] py-2 px-4">
                        0{index + 1}
                      </td>
                      <td className="text-left py-2 px-4 flex flex-col">
                        <p className="font-Outfit text-[#101828] text-sm font-medium">
                          {item.name}
                        </p>
                      </td>
                      <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4">
                        {item.impressions}
                      </td>
                      <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4">
                        {item.click}
                      </td>
                      <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4 flex space-x-3 justify-center items-center">
                        <button className=" px-2 py-1 font-medium font-Outfit text-xs text-white bg-[#0530A1] rounded-[10px]">
                          View resources
                        </button>
                        <button className=" px-2 py-1 font-medium font-Outfit text-xs text-black bg-[#F5F5F5] rounded-[10px]">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorMarket;
