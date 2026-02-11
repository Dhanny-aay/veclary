import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CustomProvider, Container } from "rsuite";
import "rsuite/dist/rsuite.min.css";

// Public Pages
import Landing from "./landing/pages/landing";
import TermsCond from "./landing/pages/termsCond";
import Blogpage from "./landing/pages/blogPage";
import DetailedBlog from "./landing/pages/detailedBlog";
import Contactus from "./landing/pages/contact";
import Libary from "./landing/pages/liibary";
import AboutPage from "./landing/pages/aboutPage";
import Career from "./landing/pages/career";
import DetailedCareer from "./landing/pages/detailedCareer";
import Application from "./landing/pages/application";

// General Auth & Welcome
import Welcome from "./landing/pages/welcome";
import Signin from "./landing/pages/signin";
import ForgotPassword from "./landing/pages/forgotPassword";
import NewPassword from "./landing/pages/newPassword";
import VerifyEmail from "./landing/pages/verifyEmail";

// Student
import Login from "./studentDash/pages/login"; // Student Login
import StudentSignup from "./studentDash/pages/signup";
import Dashboard from "./studentDash/pages/dashboard";

// Teacher
import TeacherLogin from "./teacherDash/pages/teacherLogin";
import TeacherSignup from "./teacherDash/pages/teacherSignup";
import TeacherDashboard from "./teacherDash/pages/teacherDashboard";

// Management (School)
import ManageLogin from "./manageDash/pages/manageLogin";
import ManageSignup from "./manageDash/pages/manageSignup";
import ManageDashboard from "./manageDash/pages/manageDashboard";

// Vendor
import VendorLogin from "./vendorDashboard/pages/vendorLogin";
import VendorSignup from "./vendorDashboard/pages/vendorSignup";
import VendorDashboard from "./vendorDashboard/pages/vendorDashboard";

// Admin
import AdminSelect from "./adminDash/pages/adminselect";
import AdminSignup from "./adminDash/pages/adminSignup";
import AdminLogin from "./adminDash/pages/adminLogin";
import AdminDashBoard from "./adminDash/pages/adminDashboard";
import ProtectedRoute from "./adminDash/components/ProtectedRoute";

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
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/Terms&condition" element={<TermsCond />} />
            <Route path="/Blog" element={<Blogpage />} />
            <Route path="/detailedBlog" element={<DetailedBlog />} />
            <Route path="/Contact" element={<Contactus />} />
            <Route path="/Libary" element={<Libary />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Career" element={<Career />} />
            <Route path="/DetailedCareer" element={<DetailedCareer />} />
            <Route path="/application" element={<Application />} />

            {/* General Auth & Welcome */}
            <Route path="/get-started" element={<Welcome />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Student Routes */}
            <Route path="/student-login" element={<Login />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/student-dashboard" element={<Dashboard />} />

            {/* Teacher Routes */}
            <Route path="/teachers-login" element={<TeacherLogin />} />
            <Route path="/teachers-signup" element={<TeacherSignup />} />
            <Route path="/teachers-dashboard" element={<TeacherDashboard />} />

            {/* Management (School) Routes */}
            <Route path="/management-login" element={<ManageLogin />} />
            <Route path="/management-signup" element={<ManageSignup />} />
            <Route path="/management-dashboard" element={<ManageDashboard />} />

            {/* Vendor Routes */}
            <Route path="/vendor-login" element={<VendorLogin />} />
            <Route path="/vendor-signup" element={<VendorSignup />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />

            {/* Admin Routes */}
            <Route path="/admin-select" element={<AdminSelect />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin-dashboard/*" element={<ProtectedRoute />}>
              <Route index element={<AdminDashBoard />} />
            </Route>
          </Routes>
        </Container>
      </CustomProvider>
    </>
  );
}

export default App;
