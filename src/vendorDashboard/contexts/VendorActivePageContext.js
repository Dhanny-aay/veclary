import { createContext, useState } from "react";

export const VendorActivePageContext = createContext();
export const VendorSidebarContext = createContext();
export const VendorUserType = createContext();
export const CurrAuthorIDContext = createContext();

const VendorActivePageProvider = (props) => {
  const [activePage, setActivePage] = useState("Home");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userType, setUserType] = useState("Author");
  const [currAuthorID, setCurrAuthorID] = useState("");

  return (
    <>
      <CurrAuthorIDContext.Provider value={{ currAuthorID, setCurrAuthorID }}>
        <VendorActivePageContext.Provider value={{ activePage, setActivePage }}>
          <VendorSidebarContext.Provider
            value={{ sidebarVisible, setSidebarVisible }}
          >
            <VendorUserType.Provider value={{ userType, setUserType }}>
              {props.children}
            </VendorUserType.Provider>
          </VendorSidebarContext.Provider>
        </VendorActivePageContext.Provider>
      </CurrAuthorIDContext.Provider>
    </>
  );
};

export default VendorActivePageProvider;
