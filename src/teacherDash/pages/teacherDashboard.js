import { useContext, useEffect } from "react";
import TeacherHeadbar from "../components/teacherHeadbar";
import TeacherSidebar from "../components/teacherSidebar";
import TeacherHome from "../components/teacherhome";
import { TeacherActivePageContext, TeacherSidebarContext } from "../contexts/TeacherActivePageContext";
import TeacherRecords from "../components/teacherRecords";
import TeacherStudents from "../components/teacherStudents";
import TeacherProfile from "../components/teacherProfile";
import TeacherEditProfile from "../components/teacherEditProfile";
import TeacherSetting from "../components/teacherSetting";
import TeacherClasses from "../components/teacherClasses";
import TeacherSchedule from "../components/teacherSchedule";
import TeacherAttendance from "../components/teacherAttendance";

const TeacherDashboard = () => {

    const componentMap = {
        Home: <TeacherHome />,  
        Records: <TeacherRecords />,  
        Students: <TeacherStudents />,  
        Profile: <TeacherProfile />,  
        EditProfile: <TeacherEditProfile />,  
        Settings: <TeacherSetting />,  
        Classes: <TeacherClasses />,  
        Schedule: <TeacherSchedule />,  
        Attendance: <TeacherAttendance />,  
    };

    const { activePage } = useContext(TeacherActivePageContext);
    const { setSidebarVisible } = useContext(TeacherSidebarContext);

    useEffect(() => {
        setSidebarVisible(false);
    }, [activePage, setSidebarVisible]);


    const ComponentToRender = componentMap[activePage] || null;


    return ( 
        <>
        <div className=" relative">
            <TeacherHeadbar/>
            <TeacherSidebar/>
            {ComponentToRender}
        </div>
        </>
     );
}
 
export default TeacherDashboard;