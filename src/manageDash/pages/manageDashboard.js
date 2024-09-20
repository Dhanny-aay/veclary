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
      }
    };

    fetchDashboard();
  }, []);

  console.log(dashboard);

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
