const SubmittedAssignment = () => {
  // Sample data for the table
  const subjects = [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
  ];
  const testData = [
    { subject: "Mathematics", test1: 8, test2: 5, test3: 10 },
    { subject: "English", test1: 9, test2: 4, test3: 10 },
    { subject: "Physics", test1: 10, test2: 7, test3: 2 },
    { subject: "Chemistry", test1: 7, test2: 9, test3: 10 },
    { subject: "Biology", test1: 3, test2: 10, test3: 10 },
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
                Test 1
              </th>
              <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                Test 2
              </th>
              <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">
                Test 3
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
                  {data.test1}/10
                </td>
                <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                  {data.test2}/10
                </td>
                <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                  {data.test3}/10
                </td>
                <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                  {data.test1 + data.test2 + data.test3}/30
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubmittedAssignment;
