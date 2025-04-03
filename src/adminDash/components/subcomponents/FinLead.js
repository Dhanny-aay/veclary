import { useContext, useState } from "react";
import { AdminActivePageContext } from "../../contexts/AdminActivePageContext";
import { useAuth } from "../../contexts/AuthContext";
import AdminDashMiniHeader from "../AdminDashMiniHeader";
import SnackbarUtils from "../../../utils/snackbarUtils";
import RevenueStatsCard from "../RevenueStatsCard";
import IncomeStatsCard from "../IncomeStatsCard";
import PaidStatsCard from "../PaidStatsCard";
import { AnnouncementService } from "../../../services/adminService";
import RecentTransactions from "../RecentTransactions";
import AnnouncementSection from "../AnnouncementSection";

const FinanceLead = () => {
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { user } = useAuth();

  const handleClick = (page) => {
    setActivePage(page);
  };

  const handleSubmitAnnouncement = async (announcement) => {
    // submit announcement logic
    const response = await AnnouncementService.createAnnouncement(announcement);

    SnackbarUtils.success("Announcement Submitted");
  };

  return (
    <>
      <AdminDashMiniHeader
        name={user?.name}
        bodyText={"Stay on top of Veclary with real-time data and insights."}
      />

      <div className=" mt-6">
        <p className=" font-Outfit text-lg font-semibold">Analysis</p>
        <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RevenueStatsCard />
          <IncomeStatsCard />
          <PaidStatsCard />
        </div>
      </div>

      {/* row 2 */}
      <div className=" mt-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between w-full">
        <AnnouncementSection submitAnnouncement={handleSubmitAnnouncement} />

        <RecentTransactions handleClick={() => handleClick("Transaction")} />
      </div>
    </>
  );
};

export default FinanceLead;
