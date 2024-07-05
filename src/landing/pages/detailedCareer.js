import Banner from "../components/banner";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";
import lines from "./assets/lines.svg";

const DetailedCareer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
    };

    // Initial check on mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        style={
          isMobile
            ? {
                backgroundImage: `url(${vector})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {}
        }
      >
        <Navbar />
        <div
          style={
            isMobile
              ? {}
              : {
                  backgroundImage: `url(${lines})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
          }
          className="w-full flex flex-col items-center justify-center py-8 px-4 font-Outfit md:py-16 md:px-20 text-black"
        >
          <p className=" text-center font-Outfit font-semibold text-2xl md:text-[55px] text-[#101828] md:leading-[82px]">
            Senior Accountant
          </p>

          <div className=" flex items-center flex-row space-x-8 mt-6">
            <p className=" text-[#676767] font-Outfit font-medium text-xl">
              Lagos, Nigeria
            </p>
            <p className=" text-[#676767] font-Outfit font-medium text-xl -mt-0">
              Posted: 10/11/2023
            </p>
          </div>
          {/* buttons  */}
          <div className=" flex items-center flex-row space-x-3 mt-6">
            <button className=" py-2 px-6 bg-[#F5F5F4] rounded-[8px] text-[#121212] font-Outfit -mt-0 text-base font-normal">
              Refer a friend
            </button>
            <button className=" py-2 px-6 bg-[#0530A1] rounded-[8px] text-[#FFFFFF] font-Outfit -mt-0 text-base font-normal">
              I am interested
            </button>
          </div>

          <div className=" w-full mt-16">
            <p className=" font-Outfit text-center text-[#121212] font-semibold text-2xl">
              Job Description
            </p>
            <p className=" mt-3 text-[#676767] font-normal text-base font-Outfit">
              As a Senior Accountant you will play a key role in managing the
              company's financial transactions, ensuring compliance with
              accounting standards and contributing to the financial success of
              the organization. The ideal candidate will have a strong
              background in accounting principles, exceptional analytical
              skills, strong collaborative skills and the ability to lead and
              mentor junior accounting staff.
            </p>
            <p className=" font-Outfit text-center text-[#121212] mt-6 font-semibold text-2xl">
              Job Information
            </p>
            <div className=" flex items-center justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-6 md:mt-3 text-[#676767]">
              <span className=" flex flex-row space-x-2 items-center">
                <p className=" font-Outfit text-[#676767]">Salary:</p>
                <p className=" font-Outfit text-[#121212] md:text-base text-sm font-normal -mt-0">
                  80k - 100k
                </p>
              </span>
              <span className=" flex flex-row space-x-2 selectedCareer items-center">
                <p className=" font-Outfit text-[#676767]">City:</p>
                <p className=" font-Outfit text-[#121212] md:text-base text-sm font-normal -mt-0">
                  Lagos
                </p>
              </span>
              <span className=" flex flex-row space-x-2 selectedCareer items-center">
                <p className=" font-Outfit text-[#676767]">Country:</p>
                <p className=" font-Outfit text-[#121212] md:text-base text-sm font-normal -mt-0">
                  Nigeria
                </p>
              </span>
              <span className=" flex flex-row space-x-2 selectedCareer items-center">
                <p className=" font-Outfit text-[#676767]"> State/Province:</p>
                <p className=" font-Outfit text-[#121212] md:text-base text-sm font-normal -mt-0">
                  Lagos
                </p>
              </span>
            </div>

            <div className=" mt-6">
              <h2 className="font-semiblod text-2xl">
                Specific Responsibilities:
              </h2>
              <div className="mt-6">
                <h3 className="font-semibold text-[#676767] text-base">
                  Management Reporting
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>
                    Ensure that the monthly management report is submitted in a
                    timely manner
                  </li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  Financial Reporting and Analysis
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>
                    Prepare and review monthly, quarterly, and annual financial
                    statements
                  </li>
                  <li>
                    Provide analysis for financial performance, including
                    variance analysis and trend identification
                  </li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  Budgeting and Forecasting
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>
                    Gather information required for budgeting purposes in a
                    timely and efficient manner
                  </li>
                  <li>
                    Develop budgets and forecasts for each financial year and
                    provide relevant budget projections
                  </li>
                  <li>
                    Work closely with team leaders to develop realistic budget
                    forecasts based on current performance
                  </li>
                  <li>
                    Analyze budget-to-actual performance and explain variances
                    from budget estimates
                  </li>
                  <li>
                    Prepare long-term financial forecasts to support strategic
                    business planning, investment decisions, and other factors
                  </li>
                  <li>
                    Update budgets and forecasts based on updated business
                    expectations as required
                  </li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  General Ledger Management
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>Maintain the accuracy of the general ledger accounts</li>
                  <li>
                    Monitor transactions and update preparation of financial
                    records
                  </li>
                  <li>Update the chart of accounts</li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  Treasury, Cash, and Working Capital Management
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>Maintain cash flow and ensure sufficient liquidity</li>
                  <li>Manage working capital and optimize cash utilization</li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  Audit and Compliance
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>
                    Ensure compliance with accounting standards and regulations
                  </li>
                  <li>Coordinate internal and external audit processes</li>
                  <li>
                    Support the development, implementation, and monitoring of
                    internal control and risk compliance areas and drive
                    improvement of the ICS framework to ensure that business
                    risks are managed effectively
                  </li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  Taxation
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>
                    Ensure compliance with tax accounting policies and practices
                    compliance at a group level
                  </li>
                  <li>
                    Handle the accurate and timely filing of all local, state,
                    provincial, and federal tax forms
                  </li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  Month-end and Year-end Closing
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>Lead the monthly and year-end closing process</li>
                  <li>Ensure timely and accurate financial reporting</li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  Financial Systems and Technology
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>
                    Implement and oversee the development of streamlined
                    financial processes
                  </li>
                  <li>
                    Manage financial systems to improve performance and
                    automation
                  </li>
                  <li>
                    Provide training and assistance to finance team members on
                    systems and procedures
                  </li>
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-[#676767] text-base">
                  Team Leadership and Mentoring
                </h3>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>
                    Provide guidance and support to junior accounting staff and
                    finance teams as required
                  </li>
                  <li>
                    Foster a collaborative and high-performance culture within
                    the team
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-[#676767] text-base">
                  Requirements
                </h2>
                <ul className="list-disc list-inside ml-4 text-[#676767] font-Outfit">
                  <li>Bachelor’s degree in business administration</li>
                  <li>Accounting qualification, e.g., ACA, CIMA, or ACCA</li>
                  <li>
                    Minimum of 10 years of experience in a senior finance
                    department with on-and off-road knowledge of all finance
                    processes in a growing entity
                  </li>
                  <li>
                    Prior experience in transformation processes would be an
                    added advantage
                  </li>
                  <li>Strong technical accounting skills</li>
                  <li>Excellent financial analysis and forecasting skills</li>
                  <li>Proficiency in ERP systems</li>
                  <li>Advanced proficiency in MS Excel</li>
                  <li>Strong leadership skills</li>
                  <li>Excellent written and verbal communication skills</li>
                  <li>Excellent interpersonal skills</li>
                </ul>
              </div>
            </div>
            <button className=" py-2 px-6 bg-[#0530A1] rounded-[8px] text-[#FFFFFF] font-Outfit mt-8 text-base font-normal">
              I am interested
            </button>
          </div>
        </div>
        <Banner />
        <Footer />
      </div>
    </>
  );
};

export default DetailedCareer;
