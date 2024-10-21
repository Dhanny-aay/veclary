import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingTable = ({ rows = 6, columns = 6 }) => {
  return (
    <div className="w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width="20%" /> {/* Adjusts to 20% of parent width */}
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width="40%" /> {/* Adjusts to 40% of parent width */}
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width="30%" />
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width="30%" />
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width="30%" />
            </th>
            <th className="px-4 py-2 border-b text-left font-Cabin text-xs font-semibold text-black">
              <Skeleton width="30%" />
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
                      {/* Skeleton takes the full width of the parent td */}
                      <Skeleton width="100%" height={20} />
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
