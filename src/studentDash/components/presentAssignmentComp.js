const PresentAssignment = ({ handleClick }) => {
  // Sample data for the table
  const subjects = [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
  ];
  const testData = [
    {
      subject: "Mathematics",
      Type: "MCQ",
      date: "May 2, 2024",
      submission: "May 22, 2024",
      action: "Start Now",
    },
    {
      subject: "English",
      Type: "MHand-written",
      date: "May 2, 2024",
      submission: "May 22, 2024",
      action: "View Now",
    },
    {
      subject: "Physics",
      Type: "Theory",
      date: "May 2, 2024",
      submission: "May 22, 2024",
      action: "View Now",
    },
    {
      subject: "Chemistry",
      Type: "MCQ",
      date: "May 2, 2024",
      submission: "May 22, 2024",
      action: "Start Now",
    },
    {
      subject: "Biology",
      Type: "Hand-written",
      date: "May 2, 2024",
      submission: "May 22, 2024",
      action: "View Now",
    },
  ];

  return (
    <>
      <div className=" border border-[#EAEBF0] rounded-[10px]">
        <table className="border-collapse border border-[#EAEBF0] rounded-[10px] w-full">
          <thead>
            <tr>
              <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                S/N
              </th>
              <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                Subject
              </th>
              <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                Assignment Type
              </th>
              <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                Date Given
              </th>
              <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                Submission Date
              </th>
              <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                Total Score
              </th>
            </tr>
          </thead>
          <tbody>
            {testData.map((data, index) => (
              <tr key={index}>
                <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                  0{index + 1}
                </td>
                <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                  {data.subject}
                </td>
                <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                  {data.Type}
                </td>
                <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                  {data.date}
                </td>
                <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                  {data.submission}
                </td>
                <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                  <button
                    onClick={() => handleClick("McqView")}
                    className=" px-3 py-2 bg-[#0530A1] rounded-[10px] text-center font-Outfit text-white font-medium text-xs"
                  >
                    {data.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PresentAssignment;
