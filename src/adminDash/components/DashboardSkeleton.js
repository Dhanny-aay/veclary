const DashboardSkeleton = () => {
    return (
      <div className="w-full flex">
        {/* Sidebar Skeleton */}
        <div className="hidden sm:hidden md:block w-1/5 h-screen bg-gray-200 animate-pulse"></div>
        
        {/* Main Content */}
        <div className="w-full md:w-4/5 p-4 space-y-6">
          {/* Header Skeleton */}
          <div className="h-12 w-2/5 bg-gray-200 rounded-md animate-pulse"></div>
  
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-24 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
  
          {/* Recent Transactions Skeleton */}
          <div className="w-full border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-6 w-1/4 bg-gray-200 rounded-md mb-4"></div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-14 w-full bg-gray-200 rounded-md mb-3"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardSkeleton;
  