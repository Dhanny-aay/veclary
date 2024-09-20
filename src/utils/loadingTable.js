import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingTable = () => {
  const rows = 6; // Number of rows you want in your loading table
  const columns = 8; // Number of columns in your table

  return (
    <div className="min-w-full border border-[#EAEBF0] rounded-[10px] overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width={50} />
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width={150} />
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width={100} />
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width={100} />
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width={100} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(rows)
            .fill()
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array(columns)
                  .fill()
                  .map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 border-b text-left font-Inter text-[#5F6D7E] text-sm font-medium"
                    >
                      <Skeleton />
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingTable;
