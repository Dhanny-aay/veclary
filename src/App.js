import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./landing/pages/landing";
import Welcome from "./landing/pages/welcome";
import Login from "./studentDash/pages/login";
import StudentSignup from "./studentDash/pages/signup";
import Dashboard from "./studentDash/pages/dashboard";
import { CustomProvider, Container } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import TeacherLogin from "./teacherDash/pages/teacherLogin";
import TeacherSignup from "./teacherDash/pages/teacherSignup";
import TeacherDashboard from "./teacherDash/pages/teacherDashboard";
import ManageLogin from "./manageDash/pages/manageLogin";
import ManageSignup from "./manageDash/pages/manageSignup";
import ManageDashboard from "./manageDash/pages/manageDashboard";
import VendorLogin from "./vendorDashboard/pages/vendorLogin";
import VendorSignup from "./vendorDashboard/pages/vendorSignup";
import VendorDashboard from "./vendorDashboard/pages/vendorDashboard";
import AdminSignup from "./adminDash/pages/adminSignup";
import AdminSelect from "./adminDash/pages/adminselect";
import AdminLogin from "./adminDash/pages/adminLogin";
import AdminDashBoard from "./adminDash/pages/adminDashboard";
import TermsCond from "./landing/pages/termsCond";
import Blogpage from "./landing/pages/blogPage";
import Contactus from "./landing/pages/contact";
import Libary from "./landing/pages/liibary";
import AboutPage from "./landing/pages/aboutPage";
import DetailedBlog from "./landing/pages/detailedBlog";
import Career from "./landing/pages/career";
import DetailedCareer from "./landing/pages/detailedCareer";
import Application from "./landing/pages/application";
import ForgotPassword from "./landing/pages/forgotPassword";

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
            <Route path="/" element={<Landing />} />
            <Route path="/Terms&condition" element={<TermsCond />} />
            <Route path="/Blog" element={<Blogpage />} />
            <Route path="/Contact" element={<Contactus />} />
            <Route path="/Libary" element={<Libary />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Career" element={<Career />} />
            <Route path="/application" element={<Application />} />
            <Route path="/DetailedCareer" element={<DetailedCareer />} />
            <Route path="/detailedBlog" element={<DetailedBlog />} />
            <Route path="/getStarted" element={<Welcome />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/studentlogin" element={<Login />} />
            <Route path="/studentSignup" element={<StudentSignup />} />
            <Route path="/studentDashboard" element={<Dashboard />} />
            <Route path="/teacherslogin" element={<TeacherLogin />} />
            <Route path="/teachersSignup" element={<TeacherSignup />} />
            <Route path="/teachersDashboard" element={<TeacherDashboard />} />
            <Route path="/managementlogin" element={<ManageLogin />} />
            <Route path="/managementSignup" element={<ManageSignup />} />
            <Route path="/managementDashboard" element={<ManageDashboard />} />
            <Route path="/vendorlogin" element={<VendorLogin />} />
            <Route path="/vendorSignup" element={<VendorSignup />} />
            <Route path="/vendorDashboard" element={<VendorDashboard />} />
            <Route path="/adminSelect" element={<AdminSelect />} />
            <Route path="/adminSignup" element={<AdminSignup />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminDashboard" element={<AdminDashBoard />} />
          </Routes>
        </Container>
      </CustomProvider>
    </>
  );
}

export default App;
