import React, { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FinancialService } from "../../services/adminService";

const RevenueStatsCard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState("$");

  useEffect(() => {

    const fetchRevenueData = async () => {
      try {
        setIsLoading(true);

        const response = await FinancialService.getRevenue();

        setRevenueData(response.dailyData);
        setTotalRevenue(response.totalRevenue);
        setCurrency(response.currency || "$");

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
        setIsLoading(false);

        // Fallback if API fails
        setRevenueData([
          { day: "Mon", value: 0 },
          { day: "Tue", value: 0 },
          { day: "Wed", value: 0 },
          { day: "Thu", value: 0 },
          { day: "Fri", value: 0 },
          { day: "Sat", value: 0 },
          { day: "Sun", value: 0 },
        ]);
        setTotalRevenue(0);
      }
    };

    fetchRevenueData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
          <p className="font-Outfit text-sm">
            {`${payload[0].payload.day}: ${currency}${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      <Card className="border border-[#EAEBF0] rounded-[10px] p-4">
        <CardHeader className="space-y-2 p-0">
          <CardTitle className="font-Outfit font-medium text-[#272D37] text-base">
            Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-20 w-full flex flex-row justify-between mt-2 items-end">
            <div className="w-[40%]">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded mt-2"></div>
                </div>
              ) : (
                <>
                  <p className="font-Outfit text-[#272D37] text-xl font-semibold">
                    {currency}
                    {totalRevenue}
                  </p>
                  <p className="font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">
                    Weekly stats
                  </p>
                </>
              )}
            </div>

            <ResponsiveContainer width="59%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 5, right: 0, left: 0, bottom: 8 }}
              >
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2196F3"
                  strokeWidth={3}
                  fill="url(#revenueColorGradient)"
                  fillOpacity={0.5}
                  legendType="square"
                />
                <defs>
                  <linearGradient
                    id="revenueColorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="20%" stopColor="#2196F3" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2196F3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueStatsCard;
