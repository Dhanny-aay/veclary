import { useContext, useEffect, useState } from "react";
import LoadingTable from "../../utils/loadingTable";
import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import { handleGetSchoolSubjects } from "../../controllers/schoolControllers/subjectController";
import AddSubject from "./subjectSubComps/addSubject";
import DeleteSubject from "./subjectSubComps/deleteSubject";
import EditSubject from "./subjectSubComps/editSubject";

const ManageSubjects = () => {
  const { setSidebarVisible } = useContext(ManageSidebarContext);
  const { setActivePage } = useContext(ManageActivePageContext);
  const [addSubject, setAddSubject] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subjectID, setSubjectID] = useState("");
  const [deleteSubject, setDeleteSubject] = useState(false);
  const [editSubject, setEditSubject] = useState(false);

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const data = await handleGetSchoolSubjects();
      if (data) {
        setSubjects(data[0].subjects);
      } else {
        // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [trigger]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handleDeleteIconClick = (subjectId) => {
    setSubjectID(subjectId);
    setDeleteSubject(true);
  };

  const handleEditIconClick = (subjectId) => {
    setSubjectID(subjectId);
    setEditSubject(true);
  };

  // console.log(subjects);

  return (
    <>
      {addSubject && (
        <AddSubject setAddSubject={setAddSubject} triggerFetch={triggerFetch} />
      )}
      {deleteSubject && (
        <DeleteSubject
          setDeleteSubject={setDeleteSubject}
          subjectID={subjectID}
          triggerFetch={triggerFetch}
        />
      )}
      {editSubject && (
        <EditSubject
          setEditSubject={setEditSubject}
          subjectID={subjectID}
          triggerFetch={triggerFetch}
        />
      )}
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
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Subjects
          </p>
        </span>

        <div className=" w-full items-end flex flex-row px-6 mt-6 justify-between">
          <span className=" "></span>

          <span className=" flex items-start">
            <button
              onClick={() => {
                setAddSubject(true);
              }}
              className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add New Subject
            </button>
          </span>
        </div>

        <div className=" mt-6 px-6">
          <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
            <div className=" w-full overflow-x-auto">
              <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                <thead>
                  <tr>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      S/N
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Name
                    </th>
                    {/* <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Class
                    </th> */}
                    {/* <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Class Teacher
                    </th> */}
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6">
                        <LoadingTable rows={6} columns={6} />
                      </td>
                    </tr>
                  ) : subjects.length === 0 ? (
                    // Show if there are no subjects
                    <tr className=" w-full">
                      <td
                        colSpan="5"
                        className="px-4 py-3 text-center font-Outfit text-[#667085] text-sm w-full"
                      >
                        There are no subjects yet.
                      </td>
                    </tr>
                  ) : (
                    subjects.map((data, index) => (
                      <tr key={index}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          0{index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                          {data.name}
                        </td>
                        {/* <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.subject}
                        </td> */}
                        {/* <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                          {data.address}
                        </td> */}

                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center flex items-center justify-center space-x-3">
                          {/* <img
                            onClick={() => handleEditIconClick(data._id)}
                            className=" w-3 mt-2 cursor-pointer"
                            src={edit}
                            alt=""
                          /> */}
                          <img
                            onClick={() => handleDeleteIconClick(data._id)}
                            className=" w-3 mt-2 cursor-pointer"
                            src={trash}
                            alt=""
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className=" w-full py-3 px-3 flex justify-between items-center">
              <span className=" flex space-x-1">
                <img src={backArr} alt="" />
                <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Prev
                </p>
              </span>
              <span className=" flex items-end space-x-4">
                <p className=" font-Outfit text-sm text-[#0530A1]">1</p>
                <p className=" font-Outfit text-sm">2</p>
                <p className=" font-Outfit text-sm">...</p>
                <p className=" font-Outfit text-sm">5</p>
                <p className=" font-Outfit text-sm">6</p>
              </span>
              <span className=" flex space-x-1">
                <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                  Next
                </p>
                <img src={fwdArr} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSubjects;
