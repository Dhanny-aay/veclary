import React, { useEffect, useState } from "react";
import file from "./assets/file.svg";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import { handleGetAuthorBooks } from "../../controllers/authorController/generalContoller";

const StudyResources = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noBooks, setNoBooks] = useState(false);

  useEffect(() => {
    // Commented out actual fetching for dummy data to view UI
    // const fetchBooks = async () => {
    //   setLoading(true);
    //   try {
    //     // Using handleGetAuthorBooks as a placeholder for fetching general resources
    //     const data = await handleGetAuthorBooks();
    //     if (data && data.message === "No books found") {
    //       setNoBooks(true);
    //       setBooks([]);
    //     } else if (data) {
    //       setBooks(data);
    //       setNoBooks(false);
    //     } else {
    //       setNoBooks(true);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching resources:", error);
    //     setNoBooks(true);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchBooks();

    // Dummy data for UI viewing
    setLoading(true);
    setTimeout(() => {
      // Simulate loading delay
      const dummyBooks = [
        {
          _id: "1",
          title: "Mathematics Textbook",
          description: "Comprehensive guide to algebra and geometry.",
        },
        {
          _id: "2",
          title: "Science Workbook",
          description: "Interactive exercises for physics and chemistry.",
        },
        {
          _id: "3",
          title: "History Notes",
          description: "Key events and timelines from world history.",
        },
        {
          _id: "4",
          title: "English Literature",
          description: "Classic novels and poetry analysis.",
        },
      ];
      setBooks(dummyBooks);
      setNoBooks(false);
      setLoading(false);
    }, 1000); // 1 second delay to simulate loading
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <GenericLoadingSkeleton count={3} height={100} />
      ) : noBooks ? (
        <div className="text-center p-8">
          <p className="font-Outfit text-[#667085] text-base">
            No study resources found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((item) => (
            <div
              key={item._id}
              className="w-full border border-[#EAEBF0] rounded-[10px] p-4 flex flex-col"
            >
              <div className="flex flex-row space-x-4 items-start">
                <img
                  src={file}
                  alt={item.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex flex-col">
                  <p className="font-Outfit font-medium text-[#272D37] text-sm capitalize">
                    {item.title}
                  </p>
                  <p className="font-Outfit text-[10px] text-[#5F6D7E] mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
              <button className="mt-4 ml-auto bg-[#0530A1] text-white font-Outfit text-xs font-medium py-2 px-4 rounded-md">
                View Resource
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyResources;
