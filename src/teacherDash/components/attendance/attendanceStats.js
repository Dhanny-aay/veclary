import { useMemo } from "react";

const AttendanceStats = ({ records }) => {
  const stats = useMemo(() => {
    const present = Object.values(records).filter(
      (status) => status === "present"
    ).length;
    const absent = Object.values(records).filter(
      (status) => status === "absent"
    ).length;
    const late = Object.values(records).filter(
      (status) => status === "late"
    ).length;
    const total = Object.keys(records).length;
    return { present, absent, late, total };
  }, [records]);

  return (
    <div className="bg-white p-4 rounded-lg border border-[#EAEBF0] flex justify-around items-center">
      <div className="text-center">
        <p className="font-Outfit text-lg font-bold text-green-600">
          {stats.present}
        </p>
        <p className="font-Outfit text-xs text-[#5F6D7E]">Present</p>
      </div>
      <div className="text-center">
        <p className="font-Outfit text-lg font-bold text-red-600">
          {stats.absent}
        </p>
        <p className="font-Outfit text-xs text-[#5F6D7E]">Absent</p>
      </div>
      <div className="text-center">
        <p className="font-Outfit text-lg font-bold text-yellow-600">
          {stats.late}
        </p>
        <p className="font-Outfit text-xs text-[#5F6D7E]">Late</p>
      </div>
      <div className="text-center">
        <p className="font-Outfit text-lg font-bold text-[#272D37]">
          {stats.total}
        </p>
        <p className="font-Outfit text-xs text-[#5F6D7E]">Total</p>
      </div>
    </div>
  );
};

export default AttendanceStats;
