import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import { useContext, useEffect, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import { handleGetSchoolTimetable } from "../../controllers/schoolControllers/timetableController";
import { handleGetSchoolSubjects } from "../../controllers/schoolControllers/subjectController";
import AddTimetable from "./timetableSubComps/addTimetable";
import LoadingTable from "../../utils/loadingTable";

const ManageTimetable = ({ dashboard }) => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(ManageSidebarContext);
  const { activePage, setActivePage } = useContext(ManageActivePageContext);
  const [timetableData, setTimetableData] = useState(null); // Changed to hold the full object or null
  const [subjects, setSubjects] = useState([]); // Store fetched subjects
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addTimetable, setAddTimetable] = useState(false);

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const response = await handleGetSchoolTimetable();
      if (response && response.data && response.data.length > 0) {
        // Assuming we display the first timetable found for now, or you might want a selector
        setTimetableData(response.data[0]);
      } else {
        setTimetableData(null);
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
    fetchSubjects();
  }, [trigger]);

  const fetchSubjects = async () => {
    try {
      const data = await handleGetSchoolSubjects();
      if (data && data.length > 0 && data[0].subjects) {
        setSubjects(data[0].subjects);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  // Generate array of days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Generate array of time slots dynamically based on data
  const timeSlots = [];
  let startHour = 8;
  // let endHour = 16; // Could extend if needed

  if (timetableData && timetableData.days) {
    const allPeriods = timetableData.days.flatMap((d) => d.periods);
    if (allPeriods.length > 0) {
      const hours = allPeriods.map((p) => parseInt(p.start.split(":")[0]));
      const minH = Math.min(...hours);
      // Start at the hour of the earliest class
      startHour = minH;
    }
  }

  // Generate 1-hour slots for better granularity
  for (let i = startHour; i <= 16; i += 1) {
    timeSlots.push(`${i}:00 - ${i + 1}:00`);
  }

  // Helper function to find subject for a specific day and time slot
  const getPeriodForSlot = (dayName, slotStartHour) => {
    if (!timetableData || !timetableData.days) return null;

    const dayData = timetableData.days.find(
      (d) => d.name.toLowerCase() === dayName.toLowerCase(),
    );
    if (!dayData) return null;

    // Check if period starts within this hour slot
    const period = dayData.periods.find((p) => {
      const [pHour, pMin] = p.start.split(":").map(Number);
      return pHour === slotStartHour;
    });

    if (!period) return null;

    let subjectName = "Unknown Subject";
    const subjectData = period.subjectId || period.subject;

    if (subjectData && typeof subjectData === "object" && subjectData.name) {
      subjectName = subjectData.name;
    } else if (typeof subjectData === "string") {
      const foundSubject = subjects.find((s) => s._id === subjectData);
      if (foundSubject) subjectName = foundSubject.name;
    }

    return { ...period, subjectName };
  };

  return (
    <>
      {addTimetable && (
        <AddTimetable
          setAddTimetable={setAddTimetable}
          triggerFetch={triggerFetch}
          dashboard={dashboard}
        />
      )}
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] px-6 top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Timetable
          </p>
        </span>

        {/* Filters / Header Controls */}
        <div className=" w-full md:items-end flex flex-wrap md:flex-row mt-6 justify-between">
          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col w-[48%] md:w-[130px] text-[#272D37] text-xs font-medium"
          >
            Timetable
            <select
              type="text"
              value={""}
              className=" mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">Subject Timetable</option>
              <option value="Jss1">Class</option>
            </select>
          </label>

          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col w-[48%] md:w-[130px] text-[#272D37] text-xs font-medium"
          >
            Class
            <select
              type="text"
              value={""}
              className=" mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">Jss1</option>
              <option value="Jss1">Class</option>
            </select>
          </label>

          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col w-[48%] md:w-[130px] text-[#272D37] text-xs font-medium"
          >
            Session
            <select
              type="text"
              value={""}
              className=" mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">2023/2024</option>
              <option value="Jss1">Class</option>
            </select>
          </label>

          <label
            htmlFor="Class Teacher"
            className=" font-Outfit flex flex-col w-[48%] md:w-[130px] text-[#272D37] text-xs font-medium"
          >
            Term
            <select
              type="text"
              value={""}
              className=" mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              <option value="">1st Term</option>
              <option value="Jss1">Class</option>
            </select>
          </label>

          <span className=" flex mt-6 md:mt-0 items-start">
            <button
              onClick={() => setAddTimetable(true)}
              className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add Timetable
            </button>
          </span>
        </div>

        {/* Timetable Grid */}
        <div className="w-full mt-8 border border-[#EAEBF0] rounded-[10px] overflow-x-scroll">
          <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
            <thead>
              <tr>
                <th className=" bg-[#BADAFE]"></th> {/* Empty corner cell */}
                {daysOfWeek.map((day, index) => (
                  <th
                    key={index}
                    className="border-b px-4 py-2 md:py-6 bg-[#BADAFE] text-black border-[#EAEBF0] font-semibold text-xs font-Outfit text-center"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={daysOfWeek.length + 1}>
                    <LoadingTable rows={5} columns={daysOfWeek.length + 1} />
                  </td>
                </tr>
              ) : !timetableData ? (
                <tr>
                  <td
                    colSpan={daysOfWeek.length + 1}
                    className="px-4 py-10 text-center font-Outfit text-[#667085] text-sm w-full"
                  >
                    No timetable found. Click "Add Timetable" to create one.
                  </td>
                </tr>
              ) : (
                timeSlots.map((timeSlot, index) => {
                  const startHour = parseInt(timeSlot.split(":")[0]);
                  const periodsInRow = daysOfWeek.map((day) =>
                    getPeriodForSlot(day, startHour),
                  );

                  return (
                    <tr key={index}>
                      <td className="border-y border-r border-[#EAEBF0] p-3 md:p-6 text-xs text-black bg-[#BADAFE] font-semibold font-Outfit text-center whitespace-nowrap">
                        {timeSlot}
                      </td>
                      {periodsInRow.map((periodData, dayIndex) => {
                        let cellContent = "-";
                        if (periodData) {
                          const startTime = periodData.start; // e.g. 07:30
                          // Calculate end time
                          const [h, m] = startTime.split(":").map(Number);
                          const duration = periodData.duration || 30;
                          const endM = m + duration;
                          const endH = h + Math.floor(endM / 60);
                          const finalM = endM % 60;
                          const endTime = `${endH.toString().padStart(2, "0")}:${finalM.toString().padStart(2, "0")}`;

                          cellContent = (
                            <div className="flex flex-col items-center">
                              <span className="font-medium text-black">
                                {periodData.subjectName}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {startTime} - {endTime}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <td
                            key={`${index}-${dayIndex}`}
                            className="border-y border-[#EAEBF0] px-2 text-xs font-normal font-Outfit text-center capitalize py-4"
                          >
                            {cellContent}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageTimetable;
