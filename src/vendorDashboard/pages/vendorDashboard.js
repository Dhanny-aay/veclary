import { useContext, useEffect, useState } from "react";
import {
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";
import VendorSidebar from "../components/vendorSidebar";
import VendorHeadbar from "../components/vendorHeadbar";
import VendorHome from "../components/vendorHome";
import VendorProfile from "../components/VendorProfile";
import VectorAnalysis from "../components/vendorAnalysis";
import VendorMarket from "../components/vendorMarket";
import VendorAuthors from "../components/vendorAuthors";
import VendorAuthorProfile from "../components/vendorAuthorProfile";
import VendorBooks from "../components/vendorBooks";
import VendorSetting from "../components/vendorSettings";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  handleGetLoggedinUser,
  refreshToken,
} from "../../controllers/generalController/authController";
import { handleGetPublisherProfile } from "../../controllers/publisherController/authController";
import { handleGetAuthorProfile } from "../../controllers/authorController/authController";

const VendorDashboard = () => {
  const { activePage } = useContext(VendorActivePageContext);
  const { setSidebarVisible } = useContext(VendorSidebarContext);
  const [veclaryToken, setVeclaryToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the item from localStorage
    const storedItem = localStorage.getItem("veclary_token");
    // Set the token if it exists
    if (storedItem) {
      setVeclaryToken(storedItem);
      // console.log(storedItem);
    } else {
      navigate("/vendorlogin");
    }
  }, []);

  useEffect(() => {
    setSidebarVisible(false);
  }, [activePage, setSidebarVisible]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const data = await handleGetLoggedinUser();
        if (data) {
          setRole(data.role);
        } else {
          // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // enqueueSnackbar("An error occurred while fetching profile data", {
        //   variant: "error",
        // });
      } finally {
      }
    };

    fetchRole();
  }, []);

  // Fetch profile based on role
  useEffect(() => {
    if (role) {
      const fetchProfile = async () => {
        try {
          let data;
          if (role === "AUTHOR") {
            data = await handleGetAuthorProfile(); // Fetch author profile
          } else {
            data = await handleGetPublisherProfile(); // Fetch publisher profile
          }

          if (data) {
            setProfile(data.profile);
          } else {
            // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [role]); // Run this effect when the role is set

  const componentMap = {
    Home: <VendorHome profile={profile} role={role} loading={loading} />,
    Profile: <VendorProfile role={role} profile={profile} loading={loading} />,
    Analysis: <VectorAnalysis role={role} />,
    Marketing: <VendorMarket />,
    Authors: <VendorAuthors />,
    Author_Profile: <VendorAuthorProfile />,
    MyBooks: <VendorBooks role={role} />,
    Settings: <VendorSetting />,
  };

  const ComponentToRender = componentMap[activePage] || null;

  return (
    <>
      <div className=" relative">
        <VendorSidebar role={role} />
        <VendorHeadbar profile={profile} />
        {ComponentToRender}
      </div>
    </>
  );
};

export default VendorDashboard;
