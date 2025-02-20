import { useContext, useState } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import Pagination from "./Pagination";
import right from "./assets/right.svg";
import arrowBlue from "./assets/arrowblue.svg";
import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";
import file from "./assets/file.svg";
import down from "./assets/download.svg";
import AddNewSchoolModal from "./AddNewSchoolModal";
import SnackbarUtils from "../../utils/snackbarUtils";
import { SchoolService } from "../../services/adminService";

const OnboardedCustomers = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const [selectedOption, setSelectedOption] = useState("schData");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddNewSchool = async (newSchool) => {
    setIsSubmitting(true);
    try {
      if (!newSchool) throw new Error("New School data not found");

      const response = await SchoolService.registerSchool(newSchool);
      if (response.message) {
        SnackbarUtils.success("New School Registered Successful!");
      }
    } catch (error) {
      SnackbarUtils.error(
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const schData = [
    {
      regNo: "SCI-20-0102",
      name: "Federal Girls College",
      doe: "20/02/1990",
      sub: "Biology",
      doc: "Lookscout Resources",
    },
    {
      regNo: "SCI-20-0103",
      name: "Federal Girls College",
      doe: "20/02/1990",
      sub: "Biology",
      doc: "Lookscout Resources",
    },
    {
      regNo: "SCI-20-0104",
      name: "Federal Girls College",
      doe: "20/02/1990",
      sub: "Chemistry",
      doc: "Lookscout Resources",
    },
    {
      regNo: "SCI-20-0105",
      name: "Federal Girls College",
      doe: "20/02/1990",
      sub: "Chemistry",
      doc: "Lookscout Resources",
    },
    {
      regNo: "SCI-20-0106",
      name: "Federal Girls College",
      doe: "20/02/1990",
      sub: "Biology",
      doc: "Lookscout Resources",
    },
  ];

  const tchData = [
    {
      regNo: "SCI-20-0102",
      name: "Grand Rapids",
      school: "Federal Girls College",
      address: "123 Main St",
      doe: "20/02/1990",
      sub: "Biology",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0103",
      name: "Bell Gardens",
      school: "Federal Girls College",
      address: "456 Elm St",
      doe: "20/02/1990",
      sub: "Biology",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0104",
      name: "Broomfield",
      school: "Federal Girls College",
      address: "789 Oak St",
      doe: "20/02/1990",
      sub: "Chemistry",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0105",
      name: "Springfield",
      school: "Federal Girls College",
      address: "101 Maple St",
      doe: "20/02/1990",
      sub: "Chemistry",
      class: "JSS1",
    },
    {
      regNo: "SCI-20-0106",
      name: "Kalamazoo",
      school: "Federal Girls College",
      address: "202 Birch St",
      doe: "20/02/1990",
      sub: "Biology",
      class: "JSS1",
    },
  ];

  const stuData = [
    {
      regNo: "SCI-20-0102",
      name: "Grand Rapids",
      school: "Federal Girls College",
      address: "123 Main St",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0103",
      name: "Bell Gardens",
      school: "Federal Girls College",
      address: "456 Elm St",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0104",
      name: "Broomfield",
      school: "Federal Girls College",
      address: "789 Oak St",
      class: "SSS1",
    },
    {
      regNo: "SCI-20-0105",
      name: "Springfield",
      school: "Federal Girls College",
      address: "101 Maple St",
      class: "JSS1",
    },
    {
      regNo: "SCI-20-0106",
      name: "Kalamazoo",
      school: "Federal Girls College",
      address: "202 Birch St",
      class: "JSS1",
    },
  ];

  const columns = {
    schData: [
      "S/N",
      "Student Names",
      "Registration Number",
      "Date of Employment",
      "Subject Taught",
      "Uploaded Document",
    ],
    tchData: [
      "S/N",
      "Teacher Names",
      "School",
      "Address",
      "Date of Onboarding",
      "Subject Taught",
      "Class Taught",
    ],
    stuData: ["S/N", "Student Name", "School", "Address", "Class"],
  };

  const dataToRender =
    selectedOption === "schData"
      ? schData
      : selectedOption === "tchData"
      ? tchData
      : stuData;

  const totalItems = dataToRender.length;

  // Slice the data for the current page
  const currentData = dataToRender.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span className="mt-6 flex flex-row items-center">
          <img
            className="cursor-pointer "
            onClick={() => handleClick("Home")}
            src={arrowBlue}
            alt="Back Arrow"
          />
          <p
            onClick={() => handleClick("Home")}
            className="cursor-pointer font-Outfit text-[#0530A1] text-sm font-medium"
          >
            Back
          </p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            Onboarded Customers
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
                <option value="schData">Sort by School</option>
                <option value="tchData">Sort by Teacher</option>
                <option value="stuData">Sort by Student</option>
              </select>
            </label>
          </span>

          <span className="flex items-start">
            <button
              onClick={handleOpenModal}
              className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 md:px-6 rounded-[10px]"
            >
              Add New School
            </button>

            <AddNewSchoolModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleAddNewSchool}
              isSubmitting={isSubmitting}
            />
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
                  {currentData.map((data, index) => (
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
                            {data.regNo}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.doe}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.sub}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            <div className="w-full flex-row flex space-x-3">
                              <img src={file} alt="File" />
                              <span className="flex flex-col items-start">
                                <p className="text-sm font-Outfit text-[#272D37] font-medium">
                                  {data.doc}
                                </p>
                                <p className="text-xs text-[#272D37] font-Outfit font-medium">
                                  80.69 mb
                                </p>
                              </span>
                            </div>
                          </td>
                        </>
                      ) : selectedOption === "tchData" ? (
                        <>
                          <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                            {data.school}
                          </td>
                          <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                            {data.address}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.doe}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.sub}
                          </td>
                          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                            {data.class}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                            {data.school}
                          </td>
                          <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                            {data.address}
                          </td>
                          <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                            {data.class}
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
            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardedCustomers;
