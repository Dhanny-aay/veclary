import { useContext, useEffect, useState } from "react";
import {
  ManageActivePageContext,
  ManageSidebarContext,
} from "../contexts/ManageActivePageContext";
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
import { handleGetSchoolDashboard } from "../../controllers/schoolControllers/schoolAUthController";
import { refreshToken } from "../../controllers/generalController/authController";
import ManageCalendar from "../components/manageCalendar";
import ManageViewCalendar from "../components/manageViewCalendar";
import ManageClasses from "../components/manageClasses";
import ManageSubjects from "../components/manageSubjects";

const ManageDashboard = () => {
  const { activePage } = useContext(ManageActivePageContext);
  const { setSidebarVisible } = useContext(ManageSidebarContext);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    setSidebarVisible(false);
  }, [activePage, setSidebarVisible]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await handleGetSchoolDashboard();
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

  console.log(dashboard);

  const componentMap = {
    Home: <ManageHome dashboard={dashboard} loading={loading} />,
    Students: <ManageStudents />,
    Subjects: <ManageSubjects />,
    Classes: <ManageClasses />,
    Teachers: <ManageTeachers />,
    Timetable: <ManageTimetable />,
    Resources: <ManageResource />,
    Settings: <ManageSetting />,
    Bursary: <ManageBursary />,
    Calendar: <ManageCalendar dashboard={dashboard} />,
    AddResources: <ManageAddResources />,
    viewCalendar: <ManageViewCalendar />,
    viewCalendar: <ManageViewCalendar />,
  };

  const ComponentToRender = componentMap[activePage] || null;

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className=" relative">
        <ManageHeadbar />
        <ManageSidebar />
        {ComponentToRender}
      </div>
    </>
  );
};

export default ManageDashboard;
