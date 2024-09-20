import { useContext, useEffect, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import SubmittedAssignment from "./submittedAssignmentComp";
import PresentAssignment from "./presentAssignmentComp";
import { handleGetAssignment } from "../../controllers/studentControllers/assignmentController";

const StudentAssignment = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const [activeDropdown, setActiveDropdown] = useState("submitted");
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignments] = useState([]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const dropdowns = [
    {
      label: "Present assignment",
      value: "present",
      component: <PresentAssignment handleClick={handleClick} />,
    },
    {
      label: "Submitted assignment",
      value: "submitted",
      component: <SubmittedAssignment handleClick={handleClick} />,
    },
  ];

  const handleSelectChange = (event) => {
    setActiveDropdown(event.target.value);
  };

  const activeComponent = dropdowns.find(
    (dropdown) => dropdown.value === activeDropdown
  )?.component;

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const data = await handleGetAssignment();
        if (data) {
          setAssignments(data);
        } else {
          // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // enqueueSnackbar("An error occurred while fetching profile data", {
        //   variant: "error",
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, []);

  console.log(assignment);

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
      >
        <span
          onClick={() => handleClick("Classroom")}
          className=" cursor-pointer w-full flex flex-row p-6 items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Assignments
          </p>
        </span>

        <div className=" w-full items-center flex px-6 justify-between">
          <label
            htmlFor="Class Teacher"
            className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
          >
            Choose assignment shown
            <select
              value={activeDropdown}
              onChange={handleSelectChange}
              className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[190px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
            >
              {dropdowns.map((dropdown) => (
                <option key={dropdown.value} value={dropdown.value}>
                  {dropdown.label}
                </option>
              ))}
            </select>
          </label>

          <button className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]">
            Upload Assignment
          </button>
        </div>

        <div className="mt-6 px-6">
          {/* Render the active component here */}
          {activeComponent}
        </div>
      </div>
    </>
  );
};

export default StudentAssignment;
