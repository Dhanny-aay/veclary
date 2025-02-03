import logo from "./assets/logo.svg";
import homeAc from "./assets/home.svg";
import home from "./assets/hme.svg";
import setting from "./assets/setting.svg";
import settingAc from "./assets/blueSetting.svg";
import logoutIcon from "./assets/logout.svg";
import clos from "./assets/clos.svg";
import { useContext } from "react";
import {
  AdminAccountTypeContext,
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import { useAuth } from "../contexts/AuthContext";

const AdminSidebar = () => {
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { accountType, setAccountType } = useContext(AdminAccountTypeContext);

  const sidebar = [
    { name: "Home", img: home, activeImg: homeAc, page: "Home" },
    { name: "Schools", img: home, activeImg: homeAc, page: "Schools" },
    { name: "Teachers", img: home, activeImg: homeAc, page: "Teachers" },
    { name: "Students", img: home, activeImg: homeAc, page: "Students" },
    { name: "Transaction", img: home, activeImg: homeAc, page: "Transaction" },
    { name: "Management", img: home, activeImg: homeAc, page: "Management" },

    {
      name: "Human Resources",
      img: home,
      activeImg: homeAc,
      page: "HumanResources",
    },
    { name: "Finance Team", img: home, activeImg: homeAc, page: "FinanceTeam" },
    {
      name: "Technical Team",
      img: home,
      activeImg: homeAc,
      page: "TechnicalTeam",
    },
    {
      name: "Salary",
      img: home,
      activeImg: homeAc,
      page: "Salary",
    },
    {
      name: "Paid Salary",
      img: home,
      activeImg: homeAc,
      page: "PaidSalary",
    },
    {
      name: "Paid Salary",
      img: home,
      activeImg: homeAc,
      page: "PaidSalaryCEO",
    },
    {
      name: "Pending Salary",
      img: home,
      activeImg: homeAc,
      page: "PendingSalary",
    },
    {
      name: "Pending Salary",
      img: home,
      activeImg: homeAc,
      page: "PendingSalaryCEO",
    },
    {
      name: "Publisher/Author’s Fee",
      img: home,
      activeImg: homeAc,
      page: "PublisherFee",
    },
    {
      name: "Complaints",
      img: home,
      activeImg: homeAc,
      page: "Complaints",
    },
    {
      name: "School Approvals",
      img: home,
      activeImg: homeAc,
      page: "schoolApprovals",
    },
    {
      name: "School Approvals",
      img: home,
      activeImg: homeAc,
      page: "schoolApprovalsPC",
    },
    {
      name: "Book Approvals",
      img: home,
      activeImg: homeAc,
      page: "bookApprovals",
    },
    {
      name: "Book Approvals",
      img: home,
      activeImg: homeAc,
      page: "bookApprovalsPC",
    },
    {
      name: "Customer Complaint",
      img: home,
      activeImg: homeAc,
      page: "customerComplaint",
    },
    {
      name: "Uploaded Books",
      img: home,
      activeImg: homeAc,
      page: "uploadedBooks",
    },
    {
      name: "Onboarded Customers",
      img: home,
      activeImg: homeAc,
      page: "onboardedCustomers",
    },

    {
      name: "Customer Service Team",
      img: home,
      activeImg: homeAc,
      page: "CustomerServiceTeam",
    },
    {
      name: "Website Control",
      img: home,
      activeImg: homeAc,
      page: "WebsiteControl",
    },
  ];

  const bottom = [
    { name: "Setting", img: setting, activeImg: settingAc, page: "Settings" },
    { name: "Logout", img: logoutIcon, action: "logout" },
  ];

  const allowedPages = {
    CustomerSupport: ["Home", "onboardedCustomers"],
    SalesOfficer: ["Home", "onboardedCustomers"],
    TitleOfficer: ["Home", "uploadedBooks"],
    Supervisor: ["Home", "Students", "Schools"],
    JuniorPC: ["Home", "bookApprovals", "schoolApprovals"],
    JuniorFinLead: ["Home", "Transaction"],
    Management: [
      "Home",
      "Schools",
      "Teachers",
      "Students",
      "HumanResources",
      "FinanceTeam",
      "TechnicalTeam",
      "PublisherFee",
      "Salary",
    ],
    FinLead: ["Home", "Transaction"],
    Technical: ["Home", "Complaints"],
    PCOfficer: ["Home", "bookApprovalsPC", "schoolApprovalsPC"],
    CEO: ["Home", "PaidSalaryCEO", "PendingSalaryCEO", "PublisherFee"],
    RemunerationManager: [
      "Home",
      "PaidSalary",
      "PendingSalary",
      "PublisherFee",
    ],
    ContentManager: ["Home"],
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  const filteredSidebar = sidebar.filter((item) =>
    allowedPages[accountType]?.includes(item.page)
  );

  const { logout } = useAuth();

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-[999] w-[80%] md:w-[40%] lg:w-[20%] h-[100vh] bg-[#F5F5F5] ${
          sidebarVisible
            ? "lg:translate-x-0 translate-x-0"
            : "lg:translate-x-0 -translate-x-full"
        } transition-transform`}
      >
        <div className=" w-full h-full relative">
          <div className=" w-full flex justify-between border-b py-3 h-[56px] px-6 border-[#EAEBF0]">
            <span className="flex items-center space-x-2">
              <img
                src={logo}
                className=" w-10 h-6"
                alt="Veclary:The Best System To Enhance Your Education"
              />
              <p className=" font-Outfit text-xl md:text-lg font-semibold text-[#121212]">
                Veclary
              </p>
            </span>
            <img
              src={clos}
              onClick={() => {
                setSidebarVisible(false);
              }}
              className=" lg:hidden w-5"
              alt=""
            />
          </div>

          <div className="mt-5">
            <div className="">
              {/* Sidebar content */}
              {filteredSidebar.map((item, index) => (
                <button
                  key={index}
                  className={`text-center py-2 px-6 flex flex-row space-x-4 items-center`}
                  onClick={() => handleClick(item.page)}
                >
                  <img
                    src={activePage === item.page ? item.activeImg : item.img}
                    className="w-4 h-4"
                    alt=""
                  />
                  <p
                    className={`font-Outfit text-xs ${
                      activePage === item.page
                        ? "text-[#0530A1]"
                        : "text-[#929292]"
                    }`}
                  >
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className=" w-full absolute bottom-12 lg:bottom-6">
            <div className=" mt-4">
              <div className="">
                {bottom.map((item, index) => (
                  <button
                    key={index}
                    className={`text-center py-2 px-6 flex flex-row space-x-4 items-center ${
                      activePage === item.page
                        ? "text-[#0530A1]"
                        : "text-[#929292]"
                    }`}
                    onClick={() => {
                      if (item.action === "logout") {
                        logout();
                      } else {
                        handleClick(item.page);
                      }
                    }}
                  >
                    <img
                      src={activePage === item.page ? item.activeImg : item.img}
                      className="w-4 h-4"
                      alt=""
                    />
                    <p className="font-Outfit text-xs">{item.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
