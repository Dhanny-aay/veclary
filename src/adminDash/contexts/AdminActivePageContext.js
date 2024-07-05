import { createContext, useState } from "react";

export const AdminActivePageContext = createContext();
export const AdminSidebarContext = createContext();
export const AdminAccountTypeContext = createContext();

const AdminActivePageProvider = (props) => {
  const [activePage, setActivePage] = useState("Home");
  const [accountType, setAccountType] = useState("Management"); //SalesOfficer || JuniorPC || TitleOfficer || Supervisor || JuniorFinLead || Management
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
