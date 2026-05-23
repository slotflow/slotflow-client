import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LoaderCircle,
  Info,
  LucideIcon,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "../ui/badge";

interface ChartData {
  date: string;
  value: number;
}

interface StatCardProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  error?: any;
  data: number | boolean;
  Icon: LucideIcon;

  percentage?: number;
  days?: number;
  chartData?: ChartData[];

  bgColour?: string;
  main?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  isLoading,
  isError,
  error,
  data,
  Icon,
  percentage,
  days,
  chartData = [],
  bgColour,
  main,
}) => {
  const isPositive = (percentage ?? 0) >= 0;

  return (
    <Card
      className={`rounded-2xl shadow-sm overflow-hidden ${bgColour ? `${bgColour} text-white` : ""
        }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-end gap-4">
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="w-5 h-5 animate-spin" />
              <span className="shimmer h-2 w-10"></span>
            </div>
          ) : (isError && error) ? (
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              <span>Failed to fetch</span>
            </div>
          ) : (
            <>
              {typeof data === "number" && (
                <div>
                  <span
                    className={`text-3xl md:text-4xl ${main ? "font-bold" : "font-semibold"
                      }`}
                  >
                    {data}
                  </span>
                </div>
              )}

              {typeof data === "boolean" && (
                <Badge
                  variant="outline"
                  className={`px-2 py-1 flex items-center gap-1.5 rounded-full font-medium ${data
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                    }`}
                >
                  {data ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" /> Inactive
                    </>
                  )}
                </Badge>
              )}

              {percentage !== undefined && days !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}

                  <span
                    className={
                      isPositive ? "text-green-500" : "text-red-600"
                    }
                  >
                    {isPositive ? "+" : ""}
                    {percentage}%
                  </span>

                  <span className={`${bgColour ? "text-white" : "text-slate-400"}`}>
                    ({days} days)
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* RIGHT SIDE → SPARKLINE */}
        {chartData.length > 0 && (
          <div className="w-[100px] h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="currentColor"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;