import { useContext, useEffect } from "react";
import Headbar from "../components/headbar";
import Sidebar from "../components/sidebar";
import StudentAssignment from "../components/studentAssignment";
import StudentClassroom from "../components/studentClassroom";
import StudentEditProfile from "../components/studentEditProfile";
import StudentNotepad from "../components/studentNotepad";
import StudentPerfomance from "../components/studentPerformance";
import StudentSettings from "../components/studentSetting";
import StudentHome from "../components/studenthome";
import StudentLib from "../components/studentlib";
import StudentProfile from "../components/studentprofile";
import StudentSub from "../components/studentsub";
import { ActivePageContext, SidebarContext } from "../contexts/ActivePageContext";

const Dashboard = () => {


    const componentMap = {
        Home: <StudentHome />,
        Lib: <StudentLib />,
        Subject: <StudentSub />,
        Profile: <StudentProfile />,
        Settings: <StudentSettings />,
        Classroom: <StudentClassroom />,
        EditProfile: <StudentEditProfile />,
        Performance: <StudentPerfomance />,
        Assignment: <StudentAssignment />,
        Notepad: <StudentNotepad />,
    };

    const { activePage } = useContext(ActivePageContext);
    const { setSidebarVisible } = useContext(SidebarContext);

    useEffect(() => {
        setSidebarVisible(false);
    }, [activePage, setSidebarVisible]);


    const ComponentToRender = componentMap[activePage] || null;

    return ( 
        <>
        <div className=" relative">
            <Sidebar/>
            <Headbar/>
            {ComponentToRender}
        </div>
        </>
     );
}
 
export default Dashboard;