import { useContext, useEffect } from "react";
import { ManageSidebarContext } from "../../manageDash/contexts/ManageActivePageContext";
import AdminHeadbar from "../components/adminHeadbar";
import AdminHome from "../components/adminHome";
import AdminSidebar from "../components/adminSidebar";
import { AdminActivePageContext } from "../contexts/AdminActivePageContext";
import CustomerComplaint from "../components/customerComplaint";
import OnboardedCustomers from "../components/onboardedCustomers";
import UploadedBooks from "../components/uploadedBooks";
import AdminSchools from "../components/adminSchools";
import AdminStudents from "../components/adminStudents";
import AdminSchoolProfile from "../components/adminSchoolProfile";
import SchoolApprovals from "../components/schoolApprovals";
import SchoolProfile from "../components/schoolProfile";
import BookApprovals from "../components/bookApprovals";
import BookDetails from "../components/bookDetails";
import AdminTransactions from "../components/adminTransactions";
import HRTeam from "../components/HRTeam";
import FinanceTeam from "../components/FinanceTeam";
import TechnicalTeam from "../components/technicalTeam";
import AdminTeacher from "../components/adminTeacher";
import PublisherFee from "../components/publisherFee";
import Salary from "../components/salary";
import AdminComplaints from "../components/adminComplaints";
import SchoolProfilePC from "../components/SchoolProfilePC";
import SchoolApprovalsPC from "../components/schoolApprovalPC";
import BookApprovalsPC from "../components/bookApprovalsPC";
import BookDetailsPC from "../components/bookDetailsPC";
import PaidSalary from "../components/paidSalary";
import PendingSalary from "../components/pendingSalary";
import PaidSalaryCEO from "../components/PaidSalaryCEO";
import PendingSalaryCEO from "../components/PendingSalaryCEO";

const AdminDashBoard = () => {
  const componentMap = {
    Home: <AdminHome />,
    customerComplaint: <CustomerComplaint />,
    onboardedCustomers: <OnboardedCustomers />,
    uploadedBooks: <UploadedBooks />,
    Schools: <AdminSchools />,
    Students: <AdminStudents />,
    schoolProfile: <AdminSchoolProfile />,
    schoolProfileApprovals: <SchoolProfile />,
    schoolApprovals: <SchoolApprovals />,
    bookApprovals: <BookApprovals />,
    bookApprovalsPC: <BookApprovalsPC />,
    BookDetails: <BookDetails />,
    BookDetailsPC: <BookDetailsPC />,
    Transaction: <AdminTransactions />,
    HumanResources: <HRTeam />,
    FinanceTeam: <FinanceTeam />,
    TechnicalTeam: <TechnicalTeam />,
    Teachers: <AdminTeacher />,
    PublisherFee: <PublisherFee />,
    Salary: <Salary />,
    Complaints: <AdminComplaints />,
    schoolApprovalsPC: <SchoolApprovalsPC />,
    SchoolProfilePC: <SchoolProfilePC />,
    PaidSalary: <PaidSalary />,
    PendingSalary: <PendingSalary />,
    PaidSalaryCEO: <PaidSalaryCEO />,
    PendingSalaryCEO: <PendingSalaryCEO />,
  };

  const { activePage } = useContext(AdminActivePageContext);
  const { setSidebarVisible } = useContext(ManageSidebarContext);

  useEffect(() => {
    setSidebarVisible(false);
  }, [activePage, setSidebarVisible]);

  const ComponentToRender = componentMap[activePage] || null;

  return (
    <>
      <div className=" relative">
        <AdminHeadbar />
        <AdminSidebar />
        {ComponentToRender}
      </div>
    </>
  );
};

export default AdminDashBoard;
