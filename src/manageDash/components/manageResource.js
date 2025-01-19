import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
import { useContext, useEffect, useState } from "react";
import { handleGetSchoolResources } from "../../controllers/schoolControllers/resourcesController";
import AddResources from "./resourcesSubComps/addResources";

const ManageResource = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(ManageSidebarContext);
  const { activePage, setActivePage } = useContext(ManageActivePageContext);
  const [resources, setResources] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addResource, setAddResource] = useState(false);
  const [editResource, setEditResource] = useState(false);
  const [deleteResource, setDeleteResource] = useState(false);

  const triggerFetch = () => {
    setTrigger(!trigger); // Toggle trigger to true or false
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await handleGetSchoolResources();
      if (data) {
        setResources(data);
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
    fetchResources();
  }, [trigger]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const testData = [
    {
      regNo: "SCI-20-0102",
      sub: "Biology",
      session: "2019/2020",
      term: "1st & 2nd Term",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0103",
      sub: "Biology",
      session: "2019/2020",
      term: "1st & 2nd Term",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0104",
      sub: "Physics",
      session: "2019/2020",
      term: "1st & 2nd Term",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0105",
      sub: "Physics",
      session: "2019/2020",
      term: "1st & 2nd Term",
      class: "Jss1",
    },
    {
      regNo: "SCI-20-0106",
      sub: "Biology",
      session: "2019/2020",
      term: "1st Term",
      class: "Jss1",
    },
  ];

  return (
    <>
      {addResource && (
        <AddResources
          setAddResource={setAddResource}
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
            Resources
          </p>
        </span>

        <div className=" w-full md:items-end flex flex-col md:flex-row px-6 mt-6 justify-between">
          <span className=" flex">
            <label
              htmlFor="Class Teacher"
              className=" font-Outfit flex flex-col text-[#272D37] text-xs font-medium"
            >
              Class
              <select
                type="text"
                value={""}
                className=" mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5"
              >
                <option value="">Jss1</option>
                <option value="">SSS1</option>
              </select>
            </label>
          </span>

          <span className=" flex  mt-6 md:mt-0 items-end space-x-3">
            <button className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]">
              Add New Subject
            </button>

            <button
              onClick={() => {
                setAddResource(true);
              }}
              className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add Resource
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
                      Subject
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Session
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Term
                    </th>
                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                      Action
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
                        {data.sub}
                      </td>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {data.session}
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {data.term}
                      </td>

                      <td className="  py-4 border-t mx-6 md:mx-0 border-[#EAEBF0] text-center flex justify-center items-center space-x-3">
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

export default ManageResource;
