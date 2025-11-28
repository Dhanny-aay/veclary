import React, { useState } from "react";
import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";
import Pagination from "../../Pagination";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const dummyData = [
    {
      id: 1,
      title: "Innovative Strategies for Educational Program Coordination",
      date: "April 15th, 2024",
      time: "2:30 PM",
    },
    {
      id: 2,
      title: "Crafting the Future: A Guide to Curriculum Development",
      date: "June 30th, 2024",
      time: "9:15 AM",
    },
    {
      id: 3,
      title: "Designing Engaging Learning Experiences: Tips and Tricks",
      date: "August 5th, 2024",
      time: "4:45 PM",
    },
    {
      id: 4,
      title: "Boosting Student Engagement: Creative Approaches That Work",
      date: "September 12th, 2024",
      time: "11:00 AM",
    },
    {
      id: 5,
      title: "Pathways to Academic Success: Insights from Top Advisors",
      date: "November 22nd, 2024",
      time: "3:20 PM",
    },
    {
      id: 6,
      title: "Mastering Online Course Facilitation: Best Practices",
      date: "January 10th, 2024",
      time: "8:05 AM",
    },
    {
      id: 7,
      title: "Harnessing Technology in Education: A Consultant's Perspective",
      date: "March 3rd, 2024",
      time: "1:50 PM",
    },
    {
      id: 8,
      title: "Expanding Horizons: Effective Education Outreach Strategies",
      date: "February 18th, 2024",
      time: "10:30 AM",
    },
    {
      id: 9,
      title: "The Art of Assessment: Evaluating Educational Outcomes",
      date: "December 25th, 2024",
      time: "5:15 PM",
    },
  ];

  const columns = ["S/N", "Blog Title", "Date Posted", "Time Posted", ""];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-6">
        <button className="bg-[#0530A1] text-white font-Outfit text-sm font-medium py-3 px-6 rounded-[5px]">
          Add New Blog
        </button>
      </div>

      <div className="border border-[#EAEBF0] px-3 rounded-[10px] bg-white">
        <div className="w-full overflow-x-auto">
          <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-4 text-left px-4"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={data.id}>
                  <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-left px-4">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-left px-4">
                    {data.title}
                  </td>
                  <td className="font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-left px-4">
                    {data.date}
                  </td>
                  <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-left px-4">
                    {data.time}
                  </td>
                  <td className="font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-right px-4">
                    <div className="flex items-center justify-end space-x-4">
                      <img
                        className="w-4 cursor-pointer"
                        src={edit}
                        alt="Edit"
                      />
                      <img
                        className="w-4 cursor-pointer"
                        src={trash}
                        alt="Delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={dummyData.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Blog;
