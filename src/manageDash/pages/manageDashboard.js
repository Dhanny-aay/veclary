import { useContext, useEffect } from "react";
import { ManageActivePageContext, ManageSidebarContext } from "../contexts/ManageActivePageContext";
import ManageHeadbar from "../components/manageHeadbar";
import ManageSidebar from "../components/manageSidebar";
import ManageHome from "../components/manageHome";
import ManageStudents from "../components/manageStudents";
import ManageTeachers from "../components/manageTeachers";
import ManageTimetable from "../components/manageTimetable";
import ManageResource from "../components/manageResource";
import ManageSetting from "../components/manageSettings";
import ManageBursary from "../components/manageBursary";
import ManageAddResources from "../components/manageAddResources";

const ManageDashboard = () => {


    const componentMap = {
        Home: <ManageHome />,
        Students: <ManageStudents />,
        Teachers: <ManageTeachers />,
        Timetable: <ManageTimetable />,
        Resources: <ManageResource />,
        Settings: <ManageSetting />,
        Bursary: <ManageBursary />,
        AddResources: <ManageAddResources />,
    };

    const { activePage } = useContext(ManageActivePageContext);
    const { setSidebarVisible } = useContext(ManageSidebarContext);

    useEffect(() => {
        setSidebarVisible(false);
    }, [activePage, setSidebarVisible]);


    const ComponentToRender = componentMap[activePage] || null;

    return ( 
        <>
        <div className=" relative">
            <ManageHeadbar/>
            <ManageSidebar/>
            {ComponentToRender}
        </div>
        </>
     );
}
 
export default ManageDashboard;