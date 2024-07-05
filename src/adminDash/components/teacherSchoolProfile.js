import backArr from "./assets/backArr.svg";
import fwdArr from "./assets/fwdArr.svg";

const TeacherSchoolProfile = () => {
  const authors = [
    {
      name: "Grand Rapids",
      doe: "20/02/1990",
      class: "SS1",
      regStu: "SCI-20-0102",
      sub: "Biology",
    },
    {
      name: "Grand Rapids",
      doe: "20/02/1990",
      class: "SS1",
      regStu: "SCI-20-0102",
      sub: "Biology",
    },
    {
      name: "Grand Rapids",
      doe: "20/02/1990",
      class: "SS1",
      regStu: "SCI-20-0102",
      sub: "Chemistry",
    },
    {
      name: "Grand Rapids",
      doe: "20/02/1990",
      class: "SS1",
      regStu: "SCI-20-0102",
      sub: "Chemistry",
    },
    {
      name: "Grand Rapids",
      doe: "20/02/1990",
      class: "SS1",
      regStu: "SCI-20-0102",
      sub: "Biology",
    },
  ];

  return (
    <>
      <div className=" mt-6">
        <div className=" border border-[#EAEBF0] px-3 rounded-[10px]">
          <div className=" w-full overflow-x-auto">
            <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
              <thead>
                <tr>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    S/N
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Teachers Name
                  </th>

                  <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Address
                  </th>
                  <th className="border-b  font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Date of Employment
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Subject Taught
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">
                    Class Taught
                  </th>
                  <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4"></th>
                </tr>
              </thead>
              <tbody>
                {authors.map((data, index) => (
                  <tr key={index}>
                    <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">
                      0{index + 1}
                    </td>
                    <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                      {data.name}
                    </td>

                    <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">
                      {data.regStu}
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.doe}
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.sub}
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      {data.class}
                    </td>
                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">
                      <button className="text-center text-sm font-Outfit font-medium text-white bg-[#0530A1] py-2 px-3 rounded-[10px]">
                        View Profile
                      </button>
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

export default TeacherSchoolProfile;
