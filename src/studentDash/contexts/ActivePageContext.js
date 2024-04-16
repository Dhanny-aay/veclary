import { createContext, useState } from "react";

export const ActivePageContext = createContext();
export const SidebarContext = createContext();

const ActivePageProvider = (props) => {

    const [activePage, setActivePage] = useState('Home');
    const [sidebarVisible, setSidebarVisible] = useState(false);
 
    return ( 
        <>
        <ActivePageContext.Provider value={{activePage, setActivePage}}>
            <SidebarContext.Provider value={{sidebarVisible, setSidebarVisible}}>
                {props.children}
            </SidebarContext.Provider>
        </ActivePageContext.Provider>
        </>
     );
}
 
export default ActivePageProvider;