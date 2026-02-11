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
import {
  handleGetSchoolResources,
  handleDeleteSchoolResource,
} from "../../controllers/schoolControllers/resourcesController";
import AddResources from "./resourcesSubComps/addResources";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import SnackbarUtils from "../../utils/snackbarUtils";
import empty from "./assets/nofeed.svg";

const ManageResource = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(ManageSidebarContext);
  const { activePage, setActivePage } = useContext(ManageActivePageContext);
  const [resources, setResources] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addResource, setAddResource] = useState(false);

  // Pagination states if needed, but for now assuming simple list or client-side pagination
  // The UI shows pagination controls, so ideally we should implement it, but let's start with displaying data.

  const triggerFetch = () => {
    setTrigger(!trigger);
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await handleGetSchoolResources();
      if (data) {
        setResources(data);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [trigger]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      handleDeleteSchoolResource(
        id,
        () => {
          SnackbarUtils.success("Resource deleted successfully");
          triggerFetch();
        },
        (error) => {
          SnackbarUtils.error("Failed to delete resource");
          console.error(error);
        },
      );
    }
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

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
            {/* Filter implementation can be added here later */}
          </span>

          <span className=" flex  mt-6 md:mt-0 items-end ">
            {resources.length > 0 && (
              <button
                onClick={() => {
                  setAddResource(true);
                }}
                className=" text-center  text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
              >
                Add Resource
              </button>
            )}
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
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-4">
                        <GenericLoadingSkeleton
                          count={3}
                          width="100%"
                          height={40}
                        />
                      </td>
                    </tr>
                  ) : resources.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={empty}
                            alt="No resources"
                            className="w-48 mb-4 opacity-50"
                          />
                          <p className="font-Outfit text-[#5F6D7E] text-lg">
                            No resources found
                          </p>
                          <button
                            onClick={() => setAddResource(true)}
                            className="mt-6 text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-6 rounded-[10px]"
                          >
                            Add your first resource
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    resources.map((data, index) => (
                      <tr key={index}>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                          {index + 1}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                          {data.name}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center capitalize">
                          {data.subjectId?.name || "N/A"}
                        </td>
                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                          {data.sessionId?.name || "N/A"}
                        </td>
                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
                          {data.termId?.name || "N/A"}
                        </td>

                        <td className="  py-4 border-t mx-6 md:mx-0 border-[#EAEBF0] text-center flex justify-center items-center space-x-3">
                          <a
                            href={data.file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className=" px-2 py-1 font-medium font-Outfit text-xs text-white bg-[#0530A1] rounded-[10px]">
                              View
                            </button>
                          </a>

                          <button
                            onClick={() => handleDelete(data._id)}
                            className=" px-2 py-1 font-medium font-Outfit text-xs text-black bg-[#F5F5F5] rounded-[10px]"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls can remain or be conditionally rendered */}
            {resources.length > 0 && (
              <div className=" w-full py-3 px-3 flex justify-between items-center">
                <span className=" flex space-x-1">
                  <img src={backArr} alt="" />
                  <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                    Prev
                  </p>
                </span>
                <span className=" flex items-end space-x-4">
                  <p className=" font-Outfit text-sm text-[#0530A1]">1</p>
                </span>
                <span className=" flex space-x-1">
                  <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                    Next
                  </p>
                  <img src={fwdArr} alt="" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageResource;
