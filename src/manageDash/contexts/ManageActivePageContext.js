import { createContext, useState } from "react";

export const ManageActivePageContext = createContext();
export const ManageSidebarContext = createContext();

const ManageActivePageProvider = (props) => {

    const [activePage, setActivePage] = useState('Home');
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return ( 
        <>
        <ManageActivePageContext.Provider value={{activePage, setActivePage}}>
            <ManageSidebarContext.Provider value={{sidebarVisible, setSidebarVisible}}>
                {props.children}
            </ManageSidebarContext.Provider>
        </ManageActivePageContext.Provider>
        </>
     );
}
 
export default ManageActivePageProvider;