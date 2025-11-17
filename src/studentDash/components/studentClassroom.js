// import React, { useContext, useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import arrowBlue from "./assets/arrowblue.svg";
// import nonoti from "./assets/nonoti.svg";
// import nofeed from "./assets/nofeed.svg";
// import send from "./assets/send.svg";
// import noreso from "./assets/noreso.svg";
// import {
//   ActivePageContext,
//   SidebarContext,
// } from "../contexts/ActivePageContext";
// import { handleGetClassroom } from "../../controllers/studentControllers/classroomController";

// const StudentClassroom = () => {
//   const { activePage, setActivePage } = useContext(ActivePageContext);
//   const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
//   const [loading, setLoading] = useState(true);
//   const [classRoom, setClassroom] = useState(null); // Changed to null to handle undefined case

//   const handleClick = (page) => {
//     setActivePage(page);
//   };

//   // Generate array of days of the week
//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   // Generate array of time slots
//   const timeSlots = [];
//   for (let i = 8; i <= 16; i += 2) {
//     timeSlots.push(`${i}:00 - ${i + 2}:00`);
//   }

//   // Sample subjects
//   const subjects = [
//     "Biology",
//     "Physics",
//     "Chemistry",
//     "Mathematics",
//     "History",
//   ];

//   useEffect(() => {
//     const fetchClassroom = async () => {
//       try {
//         const data = await handleGetClassroom();
//         if (data && data.message === "not a school student, no class found") {
//           setClassroom({ message: data.message }); // Store the specific message
//         } else if (data) {
//           setClassroom(data);
//         } else {
//           // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         // enqueueSnackbar("An error occurred while fetching profile data", {
//         //   variant: "error",
//         // });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClassroom();
//   }, []);

//   // console.log(classRoom);

//   return (
//     <>
//       <div
//         onClick={() => {
//           setSidebarVisible(false);
//         }}
//         className="absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
//       >
//         <span
//           onClick={() => handleClick("Home")}
//           className="cursor-pointer w-full flex flex-row p-6 items-center"
//         >
//           <img src={arrowBlue} alt="" />
//           <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
//           <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
//             Classroom
//           </p>
//         </span>

//         {loading ? (
//           <div className="w-full px-6 mt-8">
//             <Skeleton height={40} width="20%" /> {/* Title placeholder */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               {Array(4)
//                 .fill()
//                 .map((_, index) => (
//                   <div
//                     key={index}
//                     className="w-full border border-[#EAEBF0] rounded-[10px] p-4"
//                   >
//                     <Skeleton height={20} width="40%" /> {/* Section title */}
//                     <div className="flex flex-col items-center justify-center mt-4">
//                       <Skeleton height={50} width="20%" />{" "}
//                       {/* Image placeholder */}
//                       <Skeleton height={15} width="60%" className="mt-2" />
//                       <Skeleton height={10} width="50%" className="mt-1" />
//                     </div>
//                   </div>
//                 ))}
//               <div className="w-full border border-[#EAEBF0] rounded-[10px] mt-6 overflow-x-scroll">
//                 <Skeleton height={200} width="100%" /> {/* Table placeholder */}
//               </div>
//             </div>
//           </div>
//         ) : classRoom?.message === "not a school student, no class found" ? (
//           <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center justify-center px-6 mt-8">
//             <img src={nonoti} className="w-[20%] mt-4" alt="" />
//             <p className="font-Outfit text-center font-medium mt-3 text-base">
//               No Classes Assigned Yet
//             </p>
//             <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
//               When you are assigned to a class you’ll see them here
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="w-full items-start flex px-6 justify-between">
//               <label
//                 htmlFor="Class Teacher"
//                 className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
//               >
//                 Class Teacher
//                 <input
//                   type="text"
//                   value={"Mr Veek"}
//                   className="mt-2 text-[#272D37] text-sm w-[120px] md:w-auto font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
//                 />
//               </label>
//               <button
//                 onClick={() => handleClick("Assignment")}
//                 className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
//               >
//                 Assignments
//               </button>
//             </div>
//             <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mt-8">
//               <div className="w-full p-4 border border-[#EAEBF0] rounded-[10px]">
//                 <p className="font-Outfit text-lg font-semibold">
//                   Class Announcements
//                 </p>
//                 <div className="w-full flex flex-col items-center justify-center">
//                   <img src={nonoti} className="w-[20%] mt-4" alt="" />
//                   <p className="font-Outfit text-center text-base font-semibold mt-2">
//                     No Announcement
//                   </p>
//                   <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
//                     When you have an announcement you’ll see them here
//                   </p>
//                 </div>
//               </div>
//               <div className="p-4 border border-[#EAEBF0] rounded-[10px]">
//                 <p className="font-Outfit text-lg font-semibold">Feedback</p>
//                 <div className="w-full flex flex-col items-center justify-center">
//                   <img src={nofeed} className="w-[20%] mt-4" alt="" />
//                   <p className="font-Outfit text-center text-base font-semibold mt-2">
//                     No Sent Feedback
//                   </p>
//                   <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
//                     When you send a feedback to your teacher you’ll see them
//                     here with answers
//                   </p>
//                   <span className="w-full flex items-center justify-between mt-2 rounded-[15px] bg-[#F5F5F5]">
//                     <input
//                       type="text"
//                       className="w-full bg-transparent p-2.5 font-Outfit text-sm font-normal text-[#00000080]"
//                       placeholder="Send a feedback......"
//                       name=""
//                       id=""
//                     />
//                     <img src={send} alt="" />
//                   </span>
//                 </div>
//               </div>
//               <div className="w-full p-4 border border-[#EAEBF0] rounded-[10px]">
//                 <p className="font-Outfit text-lg font-semibold">
//                   Class Resources
//                 </p>
//                 <div className="w-full flex flex-col items-center h-full justify-center">
//                   <img src={noreso} className="w-[20%] mt-4" alt="" />
//                   <p className="font-Outfit text-center text-base font-semibold mt-2">
//                     No Available Resource
//                   </p>
//                   <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center md:w-[190px] mt-2">
//                     When you have any resource you’ll see them here
//                   </p>
//                 </div>
//               </div>

//               <div className="w-full border border-[#EAEBF0] rounded-[10px] overflow-x-scroll">
//                 <table className="border-collapse border border-[#EAEBF0] rounded-[10px] w-full">
//                   <thead>
//                     <tr>
//                       <th className="bg-[#BADAFE]"></th>{" "}
//                       {/* Empty corner cell */}
//                       {daysOfWeek.map((day, index) => (
//                         <th
//                           key={index}
//                           className="border-b px-4 py-2 border-x bg-[#BADAFE] border-[#EAEBF0] font-medium text-xs font-Outfit text-center"
//                         >
//                           {day}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {timeSlots.map((timeSlot, index) => (
//                       <tr key={index}>
//                         <td className="border-y border-r border-[#EAEBF0] p-3 text-xs bg-[#BADAFE] font-medium font-Outfit text-center">
//                           {timeSlot}
//                         </td>
//                         {daysOfWeek.map((day, dayIndex) => (
//                           <td
//                             key={`${index}-${dayIndex}`}
//                             className="border border-[#EAEBF0] px-2 text-xs font-normal font-Outfit text-center"
//                           >
//                             {
//                               subjects[
//                                 Math.floor(Math.random() * subjects.length)
//                               ]
//                             }
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default StudentClassroom;

import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import arrowBlue from "./assets/arrowblue.svg";
import nonoti from "./assets/nonoti.svg";
import nofeed from "./assets/nofeed.svg";
import send from "./assets/send.svg";
import noreso from "./assets/noreso.svg";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import { handleGetClassroom } from "../../controllers/studentControllers/classroomController";

const StudentClassroom = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const [loading, setLoading] = useState(true);
  const [classRoom, setClassroom] = useState(null);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [];
  for (let i = 8; i <= 16; i += 2) {
    timeSlots.push(`${i}:00 - ${i + 2}:00`);
  }

  const subjects = [
    "Biology",
    "Physics",
    "Chemistry",
    "Mathematics",
    "History",
  ];

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const data = await handleGetClassroom();
        if (data && data.message === "not a school student, no class found") {
          setClassroom({ message: data.message });
        } else if (data) {
          setClassroom(data);
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

    fetchClassroom();
  }, []);

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
          <img src={arrowBlue} alt="Back" className="mr-2" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Classroom
          </p>
        </span>

        {loading ? (
          <div className="w-full px-6 mt-8">
            <Skeleton height={40} width="20%" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-full border border-[#EAEBF0] rounded-[10px] p-4"
                  >
                    <Skeleton height={20} width="40%" />
                    <div className="flex flex-col items-center justify-center mt-4">
                      <Skeleton height={50} width="20%" />
                      <Skeleton height={15} width="60%" className="mt-2" />
                      <Skeleton height={10} width="50%" className="mt-1" />
                    </div>
                  </div>
                ))}
              <div className="w-full border border-[#EAEBF0] rounded-[10px] mt-6 overflow-x-scroll">
                <Skeleton height={200} width="100%" />
              </div>
            </div>
          </div>
        ) : classRoom?.message === "not a school student, no class found" ? (
          <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center justify-center px-6 mt-8">
            <img src={nonoti} className="w-[20%] mt-4" alt="No classes" />
            <p className="font-Outfit text-center font-medium mt-3 text-base">
              No Classes Assigned Yet
            </p>
            <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
              When you are assigned to a class you’ll see them here
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-between px-6 py-4 bg-[#F5F5F5] rounded-t-[10px]">
              <label
                htmlFor="Class Teacher"
                className="font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
              >
                Class Teacher
                <input
                  type="text"
                  value={"Mr Veek"}
                  className="mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0530A1]"
                />
              </label>
              <button
                onClick={() => handleClick("Assignment")}
                className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-4 md:px-6 rounded-[10px] hover:bg-[#04268A] transition-colors duration-200"
              >
                Assignments
              </button>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mt-6">
              <div className="w-full p-4 border border-[#EAEBF0] rounded-[10px] shadow-sm hover:shadow-md transition-shadow duration-200">
                <p className="font-Outfit text-lg font-semibold text-[#272D37]">
                  Class Announcements
                </p>
                <div className="w-full flex flex-col items-center justify-center h-[200px]">
                  <img
                    src={nonoti}
                    className="w-[20%] mt-4"
                    alt="No announcement"
                  />
                  <p className="font-Outfit text-center text-base font-semibold mt-2 text-[#444]">
                    No Announcement
                  </p>
                  <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
                    When you have an announcement you’ll see them here
                  </p>
                </div>
              </div>
              <div className="p-4 border border-[#EAEBF0] rounded-[10px] shadow-sm hover:shadow-md transition-shadow duration-200">
                <p className="font-Outfit text-lg font-semibold text-[#272D37]">
                  Feedback
                </p>
                <div className="w-full flex flex-col items-center justify-center h-[200px]">
                  <img
                    src={nofeed}
                    className="w-[20%] mt-4"
                    alt="No feedback"
                  />
                  <p className="font-Outfit text-center text-base font-semibold mt-2 text-[#444]">
                    No Sent Feedback
                  </p>
                  <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center mt-2">
                    When you send a feedback to your teacher you’ll see them
                    here with answers
                  </p>
                  <span className="w-full flex items-center justify-between mt-4 rounded-[15px] bg-[#F5F5F5] p-2">
                    <input
                      type="text"
                      className="w-full bg-transparent p-2 font-Outfit text-sm font-normal text-[#00000080] placeholder-gray-500 focus:outline-none"
                      placeholder="Send a feedback..."
                    />
                    <img
                      src={send}
                      alt="Send"
                      className="ml-2 cursor-pointer"
                    />
                  </span>
                </div>
              </div>
              <div className="w-full p-4 border border-[#EAEBF0] rounded-[10px] shadow-sm hover:shadow-md transition-shadow duration-200">
                <p className="font-Outfit text-lg font-semibold text-[#272D37]">
                  Class Resources
                </p>
                <div className="w-full flex flex-col items-center justify-center h-[200px]">
                  <img
                    src={noreso}
                    className="w-[20%] mt-4"
                    alt="No resources"
                  />
                  <p className="font-Outfit text-center text-base font-semibold mt-2 text-[#444]">
                    No Available Resource
                  </p>
                  <p className="font-normal text-xs font-Outfit text-[#9E9E9E] text-center md:w-[190px] mt-2">
                    When you have any resource you’ll see them here
                  </p>
                </div>
              </div>
              <div className="w-full border border-[#EAEBF0] rounded-[10px] overflow-x-scroll shadow-sm hover:shadow-md transition-shadow duration-200">
                <table className="border-collapse border border-[#EAEBF0] rounded-[10px] w-full min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="bg-[#BADAFE]"></th>
                      {daysOfWeek.map((day, index) => (
                        <th
                          key={index}
                          className="border-b px-4 py-2 border-x bg-[#BADAFE] border-[#EAEBF0] font-medium text-xs font-Outfit text-center text-[#272D37]"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((timeSlot, index) => (
                      <tr key={index}>
                        <td className="border-y border-r border-[#EAEBF0] p-3 text-xs bg-[#BADAFE] font-medium font-Outfit text-center text-[#272D37]">
                          {timeSlot}
                        </td>
                        {daysOfWeek.map((day, dayIndex) => (
                          <td
                            key={`${index}-${dayIndex}`}
                            className="border border-[#EAEBF0] px-2 py-3 text-xs font-normal font-Outfit text-center text-[#444]"
                          >
                            {
                              subjects[
                                Math.floor(Math.random() * subjects.length)
                              ]
                            }
                          </td>
                        ))}
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

export default StudentClassroom;
