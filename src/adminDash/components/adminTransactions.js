import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import down from "./assets/download.svg";

const AdminTransactions = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [selectedOption, setSelectedOption] = useState("schData");

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const schData = [
    {
      regNo: "SCI-20-0102",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0103",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0104",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0105",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0106",
      name: "Grand Rapids",
      amount: "$2000",
    },
  ];
  const bookData = [
    {
      regNo: "SCI-20-0102",
      name: "Broomfield",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0103",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0104",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0105",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0106",
      name: "Grand Rapids",
      amount: "$2000",
    },
  ];
  const subData = [
    {
      regNo: "SCI-20-0102",
      name: "Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0103",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0104",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0105",
      name: "Grand Rapids",
      amount: "$2000",
    },
    {
      regNo: "SCI-20-0106",
      name: "Grand Rapids",
      amount: "$2000",
    },
  ];

  const columns = {
    schData: ["S/N", "Name", "Amount", "Transaction ID"],
    bookData: ["S/N", "Name", "Amount", "Transaction ID"],
    subData: ["S/N", "Name", "Amount", "Transaction ID"],
  };

  const dataToRender =
    selectedOption === "schData"
      ? schData
      : selectedOption === "bookData"
      ? bookData
      : subData;

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className="cursor-pointer mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Transactions
          </p>
        </span>

        <div className="w-full items-end flex flex-row mt-6 justify-between">
          <span className="flex items-start space-x-6">
            <label
              htmlFor="Class Teacher"
              className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Filter
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              >
                <option value="schData">Sort by School fee</option>
                <option value="bookData">Sort by Books sold</option>
                <option value="subData">Sort by Subscription fee</option>
              </select>
            </label>
          </span>

          <span className="flex items-start">
            <button className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]">
              Add New School
            </button>
          </span>
        </div>

        <div className="mt-6">
          <div className="border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className="w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    {columns[selectedOption].map((column, index) => (
                      <th
                        key={index}
                        className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"
                      >
                        {column}
                      </th>
                    ))}
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataToRender.map((data, index) => (
                    <tr key={index}>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                        0{index + 1}
                      </td>
                      <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.name}
                      </td>
                      {selectedOption === "schData" ? (
                        <>
                          <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                            {data.amount}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.regNo}
                          </td>
                        </>
                      ) : selectedOption === "bookData" ? (
                        <>
                          <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                            {data.amount}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.regNo}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                            {data.amount}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.regNo}
                          </td>
                        </>
                      )}
                      <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] items-center justify-center h-full text-center flex space-x-3">
                        <img className="w-3 mt-3" src={down} alt="Download" />
                        <img className="w-3 mt-3" src={edit} alt="Edit" />
                        <img className="w-3 mt-3" src={trash} alt="Trash" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full py-3 px-3 flex justify-between items-center">
              <span className="flex space-x-1">
                <img src={backArr} alt="Previous" />
                <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Prev
                </p>
              </span>
              <span className="flex items-end space-x-4">
                <p className="font-Outfit text-sm text-[#0530A1]">1</p>
                <p className="font-Outfit text-sm">2</p>
                <p className="font-Outfit text-sm">...</p>
                <p className="font-Outfit text-sm">5</p>
                <p className="font-Outfit text-sm">6</p>
              </span>
              <span className="flex space-x-1">
                <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Next
                </p>
                <img src={fwdArr} alt="Next" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTransactions;
