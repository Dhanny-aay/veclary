import { useContext, useEffect, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import chart from "./assets/chart.svg";
import chart1 from "./assets/chart1.svg";
import chart2 from "./assets/chart2.svg";
import {
  VendorActivePageContext,
  VendorSidebarContext,
} from "../contexts/VendorActivePageContext";
import {
  handleGetPublisherAnalysis,
  handleGetPublisherEarnings,
} from "../../controllers/publisherController/generalController";

export const PublisherAnalysis = ({ role }) => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);
  const [analysis, setAnalysis] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [combinedBookData, setCombinedBookData] = useState([]);
  const [combinedAuthorData, setCombinedAuthorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEarnings, setLoadingEarnings] = useState(true);
  const [noAnalysis, setNoAnalysis] = useState(false);
  const [noEarnings, setNoEarnings] = useState(false);
  const [perBookSales, setPerBookSales] = useState([]);
  const [perAuthorSales, setPerAuthorSales] = useState([]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      const data = await handleGetPublisherAnalysis();
      if (data && data.message === "No analysis found") {
        setNoAnalysis(true);
        setAnalysis([]);
        setPerBookSales([]);
        setPerAuthorSales([]);
      } else {
        const transformedAnalysis = [
          {
            name: "Total Books Sold",
            percentage: data.totalCountOfBooksSold.toString(),
            stat: "All Time",
            img: chart,
          },
          {
            name: "Top Author Sales",
            percentage: data.perAuthor.length
              ? Math.max(
                  ...data.perAuthor.map((author) => author.count)
                ).toString()
              : "0",
            stat:
              data.perAuthor.find(
                (author) =>
                  author.count ===
                  Math.max(...data.perAuthor.map((author) => author.count))
              )?.name || "N/A",
            img: chart1,
          },
          {
            name: "Total Authors",
            percentage: data.perAuthor.length.toString(),
            stat: "All Time",
            img: chart2,
          },
        ];
        setAnalysis(transformedAnalysis);
        setPerBookSales(data.perBook);
        setPerAuthorSales(data.perAuthor);
        setNoAnalysis(false);
      }
    } catch (error) {
      setNoAnalysis(true);
      setAnalysis([]);
      setPerBookSales([]);
      setPerAuthorSales([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEarnings = async () => {
    setLoadingEarnings(true);
    try {
      const data = await handleGetPublisherEarnings();
      if (data && data.message === "No earnings found") {
        setNoEarnings(true);
        setEarnings([]);
      } else {
        setEarnings(data);
        setNoEarnings(false);
      }
    } catch (error) {
      setNoEarnings(true);
      setEarnings([]);
    } finally {
      setLoadingEarnings(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
    fetchEarnings();
  }, []);

  useEffect(() => {
    if (perBookSales.length || earnings.perBook?.length) {
      const earningsMap = new Map(
        earnings.perBook?.map((e) => [e.title._id, e.earnings]) || []
      );
      const salesMap = new Map(perBookSales.map((s) => [s.title._id, s.count]));

      const allBookIds = new Set([
        ...perBookSales.map((s) => s.title._id),
        ...(earnings.perBook?.map((e) => e.title._id) || []),
      ]);

      const allBooks = [
        ...perBookSales.map((s) => s.title),
        ...(earnings.perBook?.map((e) => e.title) || []),
      ].filter(
        (book, index, self) =>
          index === self.findIndex((b) => b._id === book._id)
      );

      const combined = Array.from(allBookIds).map((id) => {
        const bookTitle = allBooks.find((b) => b._id === id);
        return {
          title: bookTitle,
          count: salesMap.get(id) || 0,
          earnings: earningsMap.get(id) || 0,
        };
      });
      setCombinedBookData(combined);
    }
  }, [perBookSales, earnings.perBook]);

  const AnalysisSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border border-[#EAEBF0] rounded-[10px] p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex flex-row justify-between items-end">
            <div className="w-[40%]">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="w-[59%] h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const TableSkeleton = () => (
    <div className="overflow-x-auto animate-pulse">
      <table className="border-collapse w-full">
        <thead>
          <tr className="border-b bg-[#F9FAFB] px-4 py-3">
            {["Author Name", "Books Sold", "Earnings"].map((header, index) => (
              <th
                key={index}
                className="font-Outfit text-[#667085] text-xs text-left py-2 px-4"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b border-[#EAECF0]">
              {[...Array(3)].map((_, cellIndex) => (
                <td key={cellIndex} className="text-left py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const BookTableSkeleton = () => (
    <div className="overflow-x-auto animate-pulse">
      <table className="border-collapse w-full">
        <thead>
          <tr className="border-b bg-[#F9FAFB] px-4 py-3">
            {[
              "Book Title",
              "Sales Count",
              "Earnings",
              "Status",
              "Created At",
            ].map((header, index) => (
              <th
                key={index}
                className="font-Outfit text-[#667085] text-xs text-left py-2 px-4"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b border-[#EAECF0]">
              {[...Array(5)].map((_, cellIndex) => (
                <td key={cellIndex} className="text-left py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  useEffect(() => {
    if (perAuthorSales.length > 0 || earnings.perAuthor?.length > 0) {
      const earningsMap = new Map(
        earnings.perAuthor?.map((e) => [e.name, e.earnings]) || []
      );
      const salesMap = new Map(perAuthorSales.map((s) => [s.name, s.count]));

      const allAuthorNames = new Set([
        ...perAuthorSales.map((s) => s.name),
        ...(earnings.perAuthor?.map((e) => e.name) || []),
      ]);

      const combined = Array.from(allAuthorNames).map((name) => ({
        name,
        count: salesMap.get(name) || 0,
        earnings: earningsMap.get(name) || 0,
      }));

      setCombinedAuthorData(combined);
    }
  }, [perAuthorSales, earnings.perAuthor]);

  return (
    <div
      onClick={() => setSidebarVisible(false)}
      className="absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
    >
      <span
        onClick={() => handleClick("Home")}
        className="cursor-pointer px-6 mt-6 flex flex-row items-center"
      >
        <img src={arrowBlue} alt="back arrow" />
        <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
        <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
          Publisher Analytics
        </p>
      </span>

      <div className="mt-6 px-6">
        {loading || loadingEarnings ? (
          <AnalysisSkeleton />
        ) : noAnalysis || noEarnings ? (
          <div className="text-center p-4">
            <p className="font-Outfit text-[#667085] text-base">
              No analysis data available
            </p>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.map((item, index) => (
              <div
                key={index}
                className="border border-[#EAEBF0] rounded-[10px] p-4"
              >
                <p className="font-Outfit font-medium text-[#272D37] text-base">
                  {item.name}
                </p>
                <div className="w-full flex flex-row justify-between mt-2 items-end">
                  <div className="w-[40%]">
                    <p className="font-Outfit text-[#272D37] text-xl font-semibold">
                      {item.percentage}
                    </p>
                    <p className="font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">
                      {item.stat}
                    </p>
                  </div>
                  <div className="w-[59%]">
                    <img
                      src={item.img}
                      className="w-[100%] h-full"
                      alt={`${item.name} chart`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 mt-6">
        <div className="border border-[#EAECF0] rounded-[8px]">
          <div className="w-full p-4">
            <p className="font-Outfit text-lg text-[#101828] font-medium">
              Book Sales
            </p>
          </div>
          {loading ? (
            <BookTableSkeleton />
          ) : combinedBookData.length === 0 ? (
            <div className="text-center p-4">
              <p className="font-Outfit text-[#667085] text-base">
                No book sales data available
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="border-collapse w-full">
                <thead>
                  <tr className="border-b bg-[#F9FAFB] px-4 py-3">
                    <th className="font-Outfit text-[#667085] text-xs text-left py-2 px-4">
                      Book Title
                    </th>
                    <th className="font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">
                      Sales Count
                    </th>
                    <th className="font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">
                      Earnings
                    </th>
                    <th className="font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">
                      Status
                    </th>
                    <th className="font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {combinedBookData.map((book, index) => (
                    <tr key={index} className="border-b border-[#EAECF0]">
                      <td className="text-left py-2 px-4 flex flex-col">
                        <p className="font-Outfit text-[#101828] text-sm font-semibold">
                          {book.title.title}
                        </p>
                        <p className="font-Outfit text-[#667085] -mt-[2px] text-xs">
                          {book.title.description}
                        </p>
                      </td>
                      <td className="text-sm font-Outfit text-[#667085] text-left w-[160px] py-2 px-4">
                        {book.count}
                      </td>
                      <td className="text-sm font-Outfit text-[#667085] text-left w-[160px] py-2 px-4">
                        ${book.earnings.toFixed(2)}
                      </td>
                      <td className="text-left w-[160px] py-2 px-4">
                        <button
                          className={`py-1 px-2 text-xs font-medium font-Outfit rounded-[18px] flex items-center space-x-2 ${
                            book.title.status === "PENDING"
                              ? "text-[#344054] bg-[#3440541a]"
                              : book.title.status === "PUBLISHED"
                              ? "text-[#027A48] bg-[#027A481a]"
                              : "text-[#B42318] bg-[#B423181a]"
                          }`}
                        >
                          <span
                            className={`w-[6px] h-[6px] rounded-[50%] ${
                              book.title.status === "PENDING"
                                ? "bg-[#344054]"
                                : book.title.status === "PUBLISHED"
                                ? "bg-[#027A48]"
                                : "bg-[#B42318]"
                            }`}
                          ></span>
                          <p>
                            {book.title.status === "PENDING"
                              ? "Pending approval"
                              : book.title.status}
                          </p>
                        </button>
                      </td>
                      <td className="text-sm font-Outfit text-[#667085] text-left w-[160px] py-2 px-4">
                        {new Date(book.title.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 mt-6">
        <div className="border border-[#EAECF0] rounded-[8px]">
          <div className="w-full p-4">
            <p className="font-Outfit text-lg text-[#101828] font-medium capitalize">
              Author Sales
            </p>
          </div>
          {loading || loadingEarnings ? (
            <TableSkeleton />
          ) : combinedAuthorData.length === 0 ? (
            <div className="text-center p-4">
              <p className="font-Outfit text-[#667085] text-base">
                No author sales data available
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="border-collapse w-full">
                <thead>
                  <tr className="border-b bg-[#F9FAFB] px-4 py-3">
                    <th className="font-Outfit text-[#667085] text-xs text-left py-2 px-4">
                      Author Name
                    </th>
                    <th className="font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">
                      Books Sold
                    </th>
                    <th className="font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">
                      Earnings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {combinedAuthorData.map((author, index) => (
                    <tr key={index} className="border-b border-[#EAECF0]">
                      <td className="text-left py-2 px-4">
                        <p className="font-Outfit text-[#101828] text-sm font-semibold">
                          {author.name}
                        </p>
                      </td>
                      <td className="text-sm font-Outfit text-[#667085] text-left w-[160px] py-2 px-4">
                        {author.count}
                      </td>
                      <td className="text-sm font-Outfit text-[#667085] text-left w-[160px] py-2 px-4">
                        ${author.earnings.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
