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
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import StudentPayment from "../components/studentPayment";
import McqView from "../components/mcqView";
import McqQuestions from "../components/mcqQuestions";
import BookReader from "../components/bookReader";
import StudentAssistant from "../components/studentAssistant";

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
    McqView: <McqView />,
    McqQuestions: <McqQuestions />,
    Notepad: <StudentNotepad />,
    Payments: <StudentPayment />,
    Reader: <BookReader />,
    Assistant: <StudentAssistant />,
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
        <Sidebar />
        <Headbar />
        {ComponentToRender}
      </div>
    </>
  );
};

export default Dashboard;
