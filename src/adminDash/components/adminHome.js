import { useContext } from "react";
import {
  AdminAccountTypeContext,
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import CustomerSupport from "./subcomponents/customerSupport";
import SalesOfficer from "./subcomponents/salesOfficer";
import TitleOfficer from "./subcomponents/titleOfficer";
import Supervisor from "./subcomponents/supervisor";
import JuniorPC from "./subcomponents/juniorPC";
import JuniorFinLead from "./subcomponents/juniorFinLead";
import Management from "./subcomponents/management";

const AdminHome = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { accountType, setAccountType } = useContext(AdminAccountTypeContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const renderComponent = () => {
    switch (accountType) {
      case "CustomerSupport":
        return <CustomerSupport />;
      case "SalesOfficer":
        return <SalesOfficer />;
      case "TitleOfficer":
        return <TitleOfficer />;
      case "Supervisor":
        return <Supervisor />;
      case "JuniorPC":
        return <JuniorPC />;
      case "JuniorFinLead":
        return <JuniorFinLead />;
      case "Management":
        return <Management />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        {renderComponent()}
      </div>
    </>
  );
};

export default AdminHome;
