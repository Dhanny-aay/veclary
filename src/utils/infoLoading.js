import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InfoLoading = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <Skeleton width={120} height={24} className="mt-6" />
      <Skeleton width={180} height={16} className="mt-1" />

      {/* Book List Skeleton */}
      <div className="mt-6 border border-[#E4E7EC] rounded-[12px] w-full">
        {/* Repeat the following block for each skeleton row */}
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="w-full border-b border-[#E4E7EC] p-6 flex justify-between items-center"
          >
            {/* PDF Icon Skeleton */}
            <Skeleton width={40} height={40} borderRadius={4} />

            {/* Book Title and Genre Skeleton */}
            <div className="flex-1 ml-4">
              <Skeleton width={180} height={20} />
              <Skeleton width={120} height={16} className="mt-2" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex space-x-3">
              <Skeleton width={30} height={30} borderRadius={6} />
              <Skeleton width={30} height={30} borderRadius={6} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoLoading;
