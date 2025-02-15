import { createContext, useState } from "react";

export const AdminActivePageContext = createContext();
export const AdminSidebarContext = createContext();
export const AdminAccountTypeContext = createContext();

const AdminActivePageProvider = (props) => {
  const [activePage, setActivePage] = useState("Home");
  const [accountType, setAccountType] = useState("CEO"); //SalesOfficer || JuniorPC || TitleOfficer || Supervisor || JuniorFinLead || Management || FinLead || Technical || PCOfficer || RemunerationManager || CustomerSupport || CEO || ContentManager
  const [sidebarVisible, setSidebarVisible] = useState(false);

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
