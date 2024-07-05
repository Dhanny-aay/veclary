import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";
import trash from "./assets/trash.svg";
import vis from "./assets/vis.svg";
import check from "./assets/check.svg";

const StudentFeesDue = () => {
  const testData = [
    {
      sess: "2019/2020",
      term: "1st & 2nd Term",
      Status: "Pending",
      Amount: "$10,000",
      id: "DF11CA4",
      type: "School Fee",
      class: "SSS1",
    },
    {
      sess: "2019/2020",
      term: "1st & 2nd Term",
      Status: "Pending",
      Amount: "$10,000",
      id: "DF11CA4",
      type: "School Fee",
      class: "SSS1",
    },
    {
      sess: "2019/2020",
      term: "1st & 2nd Term",
      Status: "Pending",
      Amount: "$10,000",
      id: "DF11CA4",
      type: "School Fee",
      class: "SSS1",
    },
    {
      sess: "2019/2020",
      term: "1st & 2nd Term",
      Status: "Pending",
      Amount: "$10,000",
      id: "DF11CA4",
      type: "School Fee",
      class: "Jss1",
    },
    {
      sess: "2019/2020",
      term: "1st & 2nd Term",
      Status: "Pending",
      Amount: "$10,000",
      id: "DF11CA4",
      type: "School Fee",
      class: "Jss1",
    },
  ];

  return (
    <>
      <div className=" mt-6 px-6">
        <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
          <div className=" w-full overflow-x-auto">
            <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
              <thead>
                <tr>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    S/N
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Fees Title
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Class
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Status
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Amount
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Transaction ID
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Session
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Session
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Action
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
                      {data.type}
                    </td>
                    <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                      {data.class}
                    </td>
                    <td className=" font-Outfit py-4 border-t flex justify-center items-center border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                      <p className=" py-1 px-2 w-[71px] text-sm bg-[#FFA1141A] rounded-[20px] text-[#FFA114]">
                        {data.Status}
                      </p>
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.Amount}
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.id}
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.term}
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.sess}
                    </td>

                    <td className="  py-4 border-t border-[#EAEBF0] text-center flex justify-center items-center space-x-3">
                      <button className=" px-3 py-2 text-white font-Outfit font-normal text-xs bg-[#0530A1] rounded-[10px]">
                        Pay Now
                      </button>
                      <img src={vis} className=" w-3" alt="" />
                      <img src={trash} className=" w-3" alt="" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" w-full py-3 px-3 flex justify-between items-center">
            <span className=" flex space-x-1">
              <img src={backArr} alt="" />
              <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                Prev
              </p>
            </span>
            <span className=" flex items-end space-x-4">
              <p className=" font-Outfit text-sm text-[#0530A1]">1</p>
              <p className=" font-Outfit text-sm">2</p>
              <p className=" font-Outfit text-sm">...</p>
              <p className=" font-Outfit text-sm">5</p>
              <p className=" font-Outfit text-sm">6</p>
            </span>
            <span className=" flex space-x-1">
              <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">
                Next
              </p>
              <img src={fwdArr} alt="" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentFeesDue;
