import { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const AdminActivePageContext = createContext();
export const AdminSidebarContext = createContext();
export const AdminAccountTypeContext = createContext();

const AdminActivePageProvider = (props) => {
  const { user } = useAuth();

  const [activePage, setActivePage] = useState("Home");
  const [accountType, setAccountType] = useState("super"); //SalesOfficer || JuniorPC || TitleOfficer || Supervisor || JuniorFinLead || Management || FinLead || Technical || PCOfficer || RemunerationManager || CustomerSupport || CEO || ContentManager || super

  const [sidebarVisible, setSidebarVisible] = useState(false);

  // useEffect(() => {
  //   switch (user?.position) {
  //     case "Sales Officer":
  //       setAccountType("SalesOfficer");
  //       break;
  //     case "Junior P & C Officer":
  //       setAccountType("JuniorPC");
  //       break;
  //     case "Title Manager":
  //       setAccountType("TitleOfficer");
  //       break;
  //     case "Supervisor":
  //       setAccountType("Supervisor");
  //       break;
  //     case "Junior Finance Lead":
  //       setAccountType("JuniorFinLead");
  //       break;
  //     case "Management":
  //       setAccountType("Management");
  //       break;
  //     case "Chief Financial Officer":
  //       setAccountType("FinLead");
  //       break;
  //     case "Technical":
  //       setAccountType("Technical");
  //       break;
  //     case "Partnership & Compliance Officer":
  //       setAccountType("PCOfficer");
  //       break;
  //     case "Remuneration Manager":
  //       setAccountType("RemunerationManager");
  //       break;
  //     case "Customer Relation Officer":
  //       setAccountType("CustomerSupport");
  //       break;
  //     case "CEO":
  //       setAccountType("CEO");
  //       break;
  //     case "ContentManager":
  //       setAccountType("ContentManager");
  //       break;

  //     default:
  //       break;
  //   }
  // }, [user]);

  return (
    <>
      <AdminActivePageContext.Provider value={{ activePage, setActivePage }}>
        <AdminAccountTypeContext.Provider
          value={{ accountType, setAccountType }}
        >
          <AdminSidebarContext.Provider
            value={{ sidebarVisible, setSidebarVisible }}
          >
            {props.children}
          </AdminSidebarContext.Provider>
        </AdminAccountTypeContext.Provider>
      </AdminActivePageContext.Provider>
    </>
  );
};

export default AdminActivePageProvider;
