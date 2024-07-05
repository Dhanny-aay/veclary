import { useContext, useEffect } from "react";
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

const VendorDashboard = () => {
  const componentMap = {
    Home: <VendorHome />,
    Profile: <VendorProfile />,
    Analysis: <VectorAnalysis />,
    Marketing: <VendorMarket />,
    Authors: <VendorAuthors />,
    Author_Profile: <VendorAuthorProfile />,
    MyBooks: <VendorBooks />,
    Settings: <VendorSetting />,
  };

  const { activePage } = useContext(VendorActivePageContext);
  const { setSidebarVisible } = useContext(VendorSidebarContext);

  useEffect(() => {
    setSidebarVisible(false);
  }, [activePage, setSidebarVisible]);

  const ComponentToRender = componentMap[activePage] || null;

  return (
    <>
      <div className=" relative">
        <VendorSidebar />
        <VendorHeadbar />
        {ComponentToRender}
      </div>
    </>
  );
};

export default VendorDashboard;
