import { createContext, useState } from "react";

export const VendorActivePageContext = createContext();
export const VendorSidebarContext = createContext();
export const VendorUserType = createContext();

const VendorActivePageProvider = (props) => {
  const [activePage, setActivePage] = useState("Home");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userType, setUserType] = useState("Author");

  return (
    <>
      <VendorActivePageContext.Provider value={{ activePage, setActivePage }}>
        <VendorSidebarContext.Provider
          value={{ sidebarVisible, setSidebarVisible }}
        >
          <VendorUserType.Provider value={{ userType, setUserType }}>
            {props.children}
          </VendorUserType.Provider>
        </VendorSidebarContext.Provider>
      </VendorActivePageContext.Provider>
    </>
  );
};

export default VendorActivePageProvider;
