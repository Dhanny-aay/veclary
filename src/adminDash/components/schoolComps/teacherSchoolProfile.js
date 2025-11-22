import { useState } from "react";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import nofeed from "../assets/nofeed.svg";
import Pagination from "../Pagination";

const TeacherSchoolProfile = ({ teachers, loading, onOpenAddTeacherModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teachers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const statusStyles = {
    PENDING: "text-[#E2341D] bg-[#FFF2F0]",
    APPROVED: "text-[#2D8A39] bg-[#F0FAF0]",
    COMPLETED: "text-[#2D8A39] bg-[#F0FAF0]",
    default: "text-gray-600 bg-gray-100",
  };

  const getStatusClass = (status) => {
    return statusStyles[status] || statusStyles.default;
  };

  return (
    <>
      <div className=" mt-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={onOpenAddTeacherModal}
            className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-4 rounded-[10px]"
          >
            Add New Teacher
          </button>
        </div>
        <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
          <div className=" w-full overflow-x-auto">
            <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
              <thead>
                <tr>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    S/N
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Teachers Name
                  </th>

                  <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Address
                  </th>
                  <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Date of Employment
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Subject Taught
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Status
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7">
                      <GenericLoadingSkeleton count={5} height={40} />
                    </td>
                  </tr>
                ) : teachers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8">
                      <img
                        src={nofeed}
                        alt="No teachers"
                        className="mx-auto w-24 h-24"
                      />
                      <p className="font-Outfit text-[#5F6D7E] mt-4">
                        No teachers found for this school.
                      </p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((teacher, index) => (
                    <tr key={teacher._id}>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                        {index + 1}
                      </td>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {teacher.name || "N/A"}
                      </td>
                      <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                        {teacher.address || "N/A"}
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        {new Date(teacher.createdAt).toLocaleDateString()}
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center capitalize">
                        {teacher.subject || "N/A"}
                      </td>
                      <td
                        className={`font-Outfit text-sm py-4 border-t border-[#EAEBF0] text-center`}
                      >
                        <p
                          className={`-mt-0 font-Outfit font-medium text-[13px] rounded-[5px] w-fit mx-auto py-[2px] px-2 capitalize ${getStatusClass(
                            teacher.status
                          )}`}
                        >
                          {teacher.status?.toLowerCase() || "N/A"}
                        </p>
                      </td>
                      <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                        <button className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 rounded-[10px]">
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={teachers.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default TeacherSchoolProfile;
