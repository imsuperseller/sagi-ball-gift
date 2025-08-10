"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export type AttendancePoint = { date: string; arrived: number; total: number };

export default function AttendanceChart({ data }: { data: AttendancePoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorArrived" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0C7C59" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#0C7C59" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
          <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip contentStyle={{ borderRadius: 12 }} />
          <Area type="monotone" dataKey="arrived" stroke="#0C7C59" fillOpacity={1} fill="url(#colorArrived)" name="Arrived" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
