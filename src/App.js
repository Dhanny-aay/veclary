import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./landing/pages/landing";
import Welcome from "./landing/pages/welcome";
import Login from "./studentDash/pages/login";
import StudentSignup from "./studentDash/pages/signup";
import Dashboard from "./studentDash/pages/dashboard";
import { CustomProvider, Container } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import TeacherLogin from "./teacherDash/pages/teacherLogin";
import TeacherSignup from "./teacherDash/pages/teacherSignup";
import TeacherDashboard from "./teacherDash/pages/teacherDashboard";
import ManageLogin from "./manageDash/pages/manageLogin";
import ManageSignup from "./manageDash/pages/manageSignup";
import ManageDashboard from "./manageDash/pages/manageDashboard";

function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <>
    <CustomProvider theme="light">
      <Container>
        <Routes>
          <Route path="/" element={ <Landing/> }/>
          <Route path="/getStarted" element={ <Welcome/> }/>
          <Route path="/studentlogin" element={ <Login/> }/>
          <Route path="/studentSignup" element={ <StudentSignup/> }/>
          <Route path="/studentDashboard" element={ <Dashboard/> }/>
          <Route path="/teacherslogin" element={ <TeacherLogin/> }/>
          <Route path="/teachersSignup" element={ <TeacherSignup/> }/>
          <Route path="/teachersDashboard" element={ <TeacherDashboard/> }/>
          <Route path="/managementlogin" element={ <ManageLogin/> }/>
          <Route path="/managementSignup" element={ <ManageSignup/> }/>
          <Route path="/managementDashboard" element={ <ManageDashboard/> }/>
        </Routes>
      </Container>
    </CustomProvider>
    </>
  );
}

export default App;
