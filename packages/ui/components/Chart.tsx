"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartProps = {
  data: object[];
  width: number;
  height: number;
  line1Key: string;
};

export function Chart({ data, width, height, line1Key }: ChartProps) {
  return (
    <AreaChart width={width} height={height} data={data}>
      <defs>
        <linearGradient id={line1Key} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        type="number"
        dataKey="fetchNum"
        ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        domain={[1, 10]}
      />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip
        isAnimationActive={false}
        content={<CustomTooltip line1={line1Key} />}
      />
      <Area
        type="linear"
        dataKey={line1Key}
        stroke="#8884d8"
        fillOpacity={1}
        fill={`url(#${line1Key})`}
        name="serverless"
        dot={true}
        isAnimationActive={false}
      />
    </AreaChart>
  );
}

function CustomTooltip({ active, payload, line1 }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="py-2 pl-4 pr-8 bg-white border rounded-sm">
        <p>#{payload[0].payload.fetchNum}</p>
        <div className="py-1"></div>
        <p className="text-[#82ca9d]">
          Serverless: {payload[0].payload[line1]}
        </p>
        <p className="text-[#82ca9d]">
          Cold start: {payload[0].payload.serverless_coldStart.toString()}
        </p>
      </div>
    );
  }

  return null;
}
