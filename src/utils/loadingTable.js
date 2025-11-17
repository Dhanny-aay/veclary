import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingTable = ({ rows = 6, columns = 3 }) => {
  return (
    <div className="w-full">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {/* Dynamically generate header skeletons based on the columns prop */}
            {Array(columns)
              .fill()
              .map((_, colIndex) => (
                <th
                  key={colIndex}
                  className="px-4 py-2 border-b text-center font-Outfit text-xs font-semibold text-black"
                >
                  <Skeleton
                    width={
                      colIndex === 0
                        ? "40px"
                        : colIndex === columns - 1
                        ? "40px"
                        : "100px"
                    }
                  />
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(rows)
            .fill()
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                {/* Dynamically generate body skeletons based on the columns prop */}
                {Array(columns)
                  .fill()
                  .map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 border-b text-center font-Outfit text-[#5F6D7E] text-sm font-medium"
                    >
                      {/* Special handling for the last column to display two circular skeletons */}
                      {colIndex === columns - 1 ? (
                        <div className="flex justify-center space-x-2">
                          <Skeleton circle={true} height={16} width={16} />
                          <Skeleton circle={true} height={16} width={16} />
                        </div>
                      ) : (
                        <Skeleton width={colIndex === 0 ? "25px" : "80px"} />
                      )}
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
