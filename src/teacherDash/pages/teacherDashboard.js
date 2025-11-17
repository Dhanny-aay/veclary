import { useContext, useEffect, useState } from "react";
import TeacherHeadbar from "../components/teacherHeadbar";
import TeacherSidebar from "../components/teacherSidebar";
import TeacherHome from "../components/teacherhome";
import {
  TeacherActivePageContext,
  TeacherSidebarContext,
} from "../contexts/TeacherActivePageContext";
import TeacherRecords from "../components/teacherRecords";
import TeacherStudents from "../components/teacherStudents";
import TeacherProfile from "../components/teacherProfile";
import TeacherEditProfile from "../components/teacherEditProfile";
import TeacherSetting from "../components/teacherSetting";
import TeacherClasses from "../components/teacherClasses";
import TeacherSchedule from "../components/teacherSchedule";
import TeacherAttendance from "../components/teacherAttendance";
import TeacherAssistant from "../components/teacherAssistant";
import { handleGetTeacherDashboard } from "../../controllers/teacherControllers/teacherAuthController";
import TeacherResources from "../components/teacherResources";

const TeacherDashboard = () => {
  const { activePage } = useContext(TeacherActivePageContext);
  const { setSidebarVisible } = useContext(TeacherSidebarContext);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    setSidebarVisible(false);
  }, [activePage, setSidebarVisible]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await handleGetTeacherDashboard();
        if (data) {
          setDashboard(data);
        } else {
          // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching Dashboard:", error);
        // enqueueSnackbar("An error occurred while fetching profile data", {
        //   variant: "error",
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const componentMap = {
    Home: <TeacherHome loading={loading} dashboard={dashboard} />,
    Records: <TeacherRecords />,
    Resources: <TeacherResources dashboard={dashboard} />,
    Students: <TeacherStudents />,
    Profile: <TeacherProfile />,
    EditProfile: <TeacherEditProfile />,
    Settings: <TeacherSetting />,
    Classes: <TeacherClasses />,
    Schedule: <TeacherSchedule />,
    Attendance: <TeacherAttendance dashboard={dashboard} />,
    Assistant: <TeacherAssistant />,
  };
  const ComponentToRender = componentMap[activePage] || null;

  return (
    <>
      <div className=" relative">
        <TeacherHeadbar />
        <TeacherSidebar />
        {ComponentToRender}
      </div>
    </>
  );
};

export default TeacherDashboard;
