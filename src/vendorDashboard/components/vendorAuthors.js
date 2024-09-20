import { useContext, useEffect, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import {
  CurrAuthorIDContext,
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";
import { handleGetPublisherAuthors } from "../../controllers/publisherController/authorController";
import LoadingTable from "../../utils/loadingTable";
import AddAuthor from "./addAuthor";

const VendorAuthors = () => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noAuthors, setNoAuthors] = useState(false);
  const [makeModalVisible, setMakeModalVisible] = useState(false);
  const { setCurrAuthorID } = useContext(CurrAuthorIDContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  console.log(authors);

  const fetchAuthors = async () => {
    setLoading(true); // Start loading when fetching authors
    try {
      const data = await handleGetPublisherAuthors();
      if (data && data.message === "No authors found") {
        setNoAuthors(true); // Set noAuthors to true if no authors found
        setAuthors([]); // Clear the authors array
      } else {
        setAuthors(data); // Set the authors if data is available
        setNoAuthors(false); // Reset noAuthors if authors are found
      }
    } catch (error) {
      setNoAuthors(true); // Set noAuthors to true in case of error
    } finally {
      setLoading(false); // Stop loading when fetch is complete
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <>
      {makeModalVisible && (
        <AddAuthor
          setMakeModalVisible={setMakeModalVisible}
          fetchAuthors={fetchAuthors}
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
            Authors
          </p>
        </span>

        <span className=" px-6">
          <button
            onClick={() => {
              setMakeModalVisible(true);
            }}
            className=" px-4 py-2 mt-6 rounded-[10px] bg-[#0530A1] font-medium font-Outfit text-sm text-white"
          >
            Add New Author
          </button>
        </span>

        <div className=" px-6">
          <div className=" w-full rounded-[10px] border mt-6 border-[#EAEBF0]">
            <div className=" overflow-x-auto">
              <table className="border-collapse w-full">
                <thead>
                  <tr className="border-b border-[#eaecf0] px-4 py-3">
                    <th className="font-Outfit font-medium text-[#667085] w-[50px] text-xs text-left py-2 px-4">
                      S/N
                    </th>
                    <th className="font-Outfit font-medium text-[#667085] text-xs text-left py-2 px-4">
                      Names of Authors
                    </th>
                    <th className="font-Outfit font-medium text-[#667085] text-xs py-2 px-4">
                      Email
                    </th>
                    <th className="font-Outfit font-medium text-[#667085] text-xs py-2 px-4">
                      Uploaded Books
                    </th>
                    <th className="font-Outfit font-medium text-[#667085] text-xs text-center  py-2 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Show loading spinner while fetching data
                    <tr>
                      <td colSpan="6">
                        <LoadingTable />
                      </td>
                    </tr>
                  ) : noAuthors ? (
                    // Show "No authors found" message

                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-3 text-center font-Outfit text-[#667085] text-sm"
                      >
                        There are no authors yet.
                      </td>
                    </tr>
                  ) : (
                    // Show authors if they exist
                    authors.map((item, index) => (
                      <tr key={item._id} className="border-b border-[#EAECF0]">
                        <td className="text-left w-[50px] py-2 px-4">
                          0{index + 1}
                        </td>
                        <td className="text-left py-2 px-4 flex flex-col">
                          <p className="font-Outfit text-[#101828] capitalize text-sm font-medium">
                            {item.userId.name}
                          </p>
                        </td>

                        <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4">
                          {item.userId.email}
                        </td>
                        <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4">
                          0
                        </td>
                        {/* <td className="text-sm font-Outfit text-[#667085] text-center py-2 space-x-2 px-4">
                          {item.genre.map((genreItem, genreIndex) => (
                            <button
                              key={genreIndex}
                              className=" py-1 px-2 rounded-[15px] bg-[#17BD8D1A] text-[#17BD8D] font-Outfit text-xs font-normal"
                            >
                              {genreItem}
                            </button>
                          ))}
                        </td> */}
                        {/* <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4">
                          {item.uploaded}
                        </td> */}
                        <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4 flex space-x-3 justify-center items-center">
                          <button
                            onClick={() => {
                              setCurrAuthorID(item._id); // Set the current author ID
                              handleClick("Author_Profile"); // Navigate to the Author Profile page
                            }}
                            className="px-2 py-1 font-medium font-Outfit text-xs text-white bg-[#0530A1] rounded-[10px]"
                          >
                            View Profile
                          </button>

                          <button className=" px-2 py-1 font-medium font-Outfit text-xs text-black bg-[#F5F5F5] rounded-[10px]">
                            Request Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {!noAuthors && (
              <div className=" w-full py-3 px-3 flex justify-between items-end">
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorAuthors;
