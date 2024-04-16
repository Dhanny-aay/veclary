import { createContext, useState } from "react";

export const TeacherActivePageContext = createContext();
export const TeacherSidebarContext = createContext();

const TeacherActivePageProvider = (props) => {

    const [activePage, setActivePage] = useState('Home');
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return ( 
        <>
        <TeacherActivePageContext.Provider value={{activePage, setActivePage}}>
            <TeacherSidebarContext.Provider value={{sidebarVisible, setSidebarVisible}}>
                {props.children}
            </TeacherSidebarContext.Provider>
        </TeacherActivePageContext.Provider>
        </>
     );
}
 
export default TeacherActivePageProvider;