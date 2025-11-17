import { format } from "date-fns";
import nofeed from "../assets/nofeed.svg";
import backArr from "../assets/backArr.svg";
import fwdArr from "../assets/fwdArr.svg";
import { useMemo } from "react";

const AttendanceTable = ({ attendance, loading, initialLoad }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Flatten the nested attendance data into a simple array of records
  const flattenedAttendance = useMemo(() => {
    if (!attendance || attendance.length === 0) {
      return [];
    }

    return attendance.flatMap((student) =>
      student.weeks.flatMap((week) =>
        week.days.map((day) => ({
          // Create a unique ID for each record for the key prop
          _id: `${student.studentId}-${day.date}`,
          studentName: student.studentName,
          date: day.date,
          status: day.status,
        }))
      )
    );
  }, [attendance]);

  return (
    <div className="border border-[#EAEBF0] rounded-[10px] w-full">
      {initialLoad ? (
        <div className="py-20 text-center">
          <img src={nofeed} alt="Empty" className="w-24 h-24 mx-auto" />
          <p className="font-Outfit text-[#5F6D7E] mt-4">
            Please select your filters and click "View Records".
          </p>
        </div>
      ) : loading ? (
        <div className="py-20 text-center">
          <p className="font-Outfit text-[#5F6D7E]">
            Loading historical attendance...
          </p>
        </div>
      ) : flattenedAttendance.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#EAEBF0] font-Outfit">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5F6D7E] uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5F6D7E] uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5F6D7E] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#5F6D7E] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#EAEBF0]">
                {flattenedAttendance.map((record, index) => (
                  <tr key={record._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#272D37]">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#272D37]">
                      {record.studentName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6D7E]">
                      {format(new Date(record.date), "PPP")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination for viewing attendance */}
          <div className="w-full py-3 px-3 flex justify-between items-center">
            <span className="flex space-x-1 cursor-pointer">
              <img src={backArr} alt="" />
              <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                Prev
              </p>
            </span>
            <span className="flex items-end space-x-4">
              <p className="font-Outfit text-sm text-[#0530A1]">1</p>
            </span>
            <span className="flex space-x-1 cursor-pointer">
              <p className="font-Outfit font-medium text-[#5F6D7E] text-sm">
                Next
              </p>
              <img src={fwdArr} alt="" />
            </span>
          </div>
        </>
      ) : (
        <div className="py-20 text-center">
          <img src={nofeed} alt="Empty" className="w-24 h-24 mx-auto" />
          <p className="font-Outfit text-[#5F6D7E] mt-4">
            No attendance records found for the selected criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
