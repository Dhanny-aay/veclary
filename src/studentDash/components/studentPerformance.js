import React, { useContext, useEffect, useState } from "react";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import nonoti from "./assets/nonoti.svg"; // Added for the no performance image
import { handleGetStudentPerformance } from "../../controllers/studentControllers/performanceController";
import { useSnackbar } from "notistack";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StudentPerfomance = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const data = await handleGetStudentPerformance();
        console.log(data);
        if (data && data.error === "No grades found for this student") {
          setPerformance({ error: data.error });
        } else if (data) {
          setPerformance(data);
        } else {
          setPerformance({ error: "Failed to fetch performance data" });
        }
      } catch (error) {
        console.error("Error fetching performance:", error);
        setPerformance({
          error: "An error occurred while fetching performance data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  console.log(performance);

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
      >
        <span
          onClick={() => handleClick("Home")}
          className="cursor-pointer w-full flex flex-row p-6 items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Performance
          </p>
        </span>

        {loading ? (
          <div className="w-full px-6 mt-8">
            <Skeleton height={40} width="20%" /> {/* Title placeholder */}
            <div className="mt-6">
              <div className="border border-[#EAEBF0] rounded-[10px]">
                <Skeleton height={300} width="100%" /> {/* Table placeholder */}
              </div>
            </div>
          </div>
        ) : performance?.error ? (
          <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center justify-center px-6 mt-8">
            <img src={nonoti} className="w-[20%] mt-4" alt="" />
            <p className="font-Outfit text-center font-medium mt-3 text-base">
              No Performance Yet
            </p>
            <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
              When you have performance records you’ll see them here
            </p>
          </div>
        ) : (
          <>
            <label
              htmlFor="Class Teacher"
              className="font-Outfit ml-6 flex flex-col text-[#272D37] text-xs font-medium"
            >
              Choose record option
              <select className="mt-2 text-[#272D37] text-sm w-[160px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5">
                <option value="">Test</option>
              </select>
            </label>
            <div className="mt-6 px-6">
              <div className="border border-[#EAEBF0] rounded-[10px]">
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
                    {performance.map((data, index) => (
                      <tr key={index}>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          0{index + 1}
                        </td>
                        <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.subject}
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.test1}/10
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.test2}/10
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.test3}/10
                        </td>
                        <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {(data.test1 + data.test2 + data.test3) / 30}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StudentPerfomance;
