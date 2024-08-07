import { useContext, useEffect, useState } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import { handleGetStudentPerformance } from "../../controllers/studentControllers/performanceController";
import { useSnackbar } from "notistack";

const StudentPerfomance = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const [performance, setPerformance] = useState(null);
  const enqueueSnackbar = useSnackbar();

  const handleClick = (page) => {
    setActivePage(page);
  };

  // Sample data for the tablw
  const testData = [
    { subject: "Mathematics", test1: 8, test2: 5, test3: 10 },
    { subject: "English", test1: 9, test2: 4, test3: 10 },
    { subject: "Physics", test1: 10, test2: 7, test3: 2 },
    { subject: "Chemistry", test1: 7, test2: 9, test3: 10 },
    { subject: "Biology", test1: 3, test2: 10, test3: 10 },
  ];

  const fetchPerformance = async () => {
    try {
      const data = await handleGetStudentPerformance();
      if (data) {
        setPerformance(data);
      } else {
        enqueueSnackbar("Failed to fetch Note data", { variant: "error" });
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      enqueueSnackbar("An error occurred while fetching Note data", {
        variant: "error",
      });
    }
  };

  console.log(performance);

  useEffect(() => {
    fetchPerformance();
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer w-full flex flex-row p-6 items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit mb-2 text-xl font-semibold ml-3">
            Performance
          </p>
        </span>

        <label
          htmlFor="Class Teacher"
          className=" font-Outfit ml-6 flex flex-col text-[#272D37] text-xs font-medium"
        >
          Choose record option
          <select className=" mt-2 text-[#272D37] text-sm w-[160px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5">
            <option value="">Test</option>
          </select>
        </label>
        <div className=" mt-6 px-6">
          <div className=" border border-[#EAEBF0] rounded-[10px]">
            <table className="border-collapse border border-[#EAEBF0] rounded-[10px] w-full">
              <thead>
                <tr>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                    S/N
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                    Subject
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                    Test 1
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                    Test 2
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                    Test 3
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                    Total Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {testData.map((data, index) => (
                  <tr key={index}>
                    <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                      0{index + 1}
                    </td>
                    <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                      {data.subject}
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.test1}/10
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.test2}/10
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.test3}/10
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.test1 + data.test2 + data.test3}/30
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPerfomance;
