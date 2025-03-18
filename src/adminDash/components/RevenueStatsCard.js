import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const data = [
  { value: 5 },
  { value: 75 },
  { value: 70 },
  { value: 80 },
  { value: 100 },
  { value: 85 },
  { value: 80 },
  { value: 70 },
  { value: 60 },
];

const RevenueStatsCard = () => {
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
            <div className=" w-[40%]">
              <p className=" font-Outfit text-[#272D37] text-xl font-semibold">
                $300
              </p>
              <p className=" font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">
                Weekly stats
              </p>
            </div>

            <ResponsiveContainer width="59%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
              >
                <Area
                  type="natural"
                  dataKey="value"
                  stroke="#2196F3"
                  strokeWidth={3}
                  fill="url(#revenueColorGradient)"
                  fillOpacity={0.5}
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
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueStatsCard;
