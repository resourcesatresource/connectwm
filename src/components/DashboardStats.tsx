import React from "react";
import {
  Link01Icon,
  Calendar03Icon,
  ActivityIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Connection } from "../types";

interface DashboardStatsProps {
  connections: Connection[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ connections }) => {
  const formatLocalDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const totalLinks = connections.length;

  // Calculate activity in the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentActivity = connections.filter(
    (c) => new Date(c.updatedAt) >= sevenDaysAgo
  ).length;

  // Calculate profile health (percentage of links with descriptions)
  const linksWithDescription = connections.filter(
    (c) => c.description && c.description.trim().length > 0
  ).length;
  const profileHealth = totalLinks > 0
    ? Math.round((linksWithDescription / totalLinks) * 100)
    : 0;

  // Build a year-long (52-week) activity heatmap
  const numWeeks = 52;
  const heatmapDays = numWeeks * 7;
  const dayMs = 24 * 60 * 60 * 1000;
  
  // Start from the most recent Sunday/Monday to align grid
  // We'll start from the Sunday of the current week and go back 51 weeks + current week.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // 0 is Sunday, 1 is Monday. Let's align to Monday as the grid labels suggest.
  const dayOfWeek = today.getDay(); // 0-6 (Sun-Sat)
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  
  const endDate = new Date(today.getTime() + (6 - daysSinceMonday) * dayMs); // End of current week (Sunday)
  const startDate = new Date(endDate.getTime() - (heatmapDays - 1) * dayMs);

  const activityByDay = new Map<string, number>();
  const uniqueConnectionDayEvents = new Set<string>();

  connections.forEach((connection) => {
    [connection.createdAt, connection.updatedAt].forEach((timestamp) => {
      if (!timestamp) return;
      const parsedDate = new Date(timestamp);
      if (Number.isNaN(parsedDate.getTime())) return;

      parsedDate.setHours(0, 0, 0, 0);
      const dayKey = formatLocalDateKey(parsedDate);
      const uniqueEventKey = `${connection._id}:${dayKey}`;

      if (uniqueConnectionDayEvents.has(uniqueEventKey)) return;
      uniqueConnectionDayEvents.add(uniqueEventKey);

      activityByDay.set(dayKey, (activityByDay.get(dayKey) ?? 0) + 1);
    });
  });

  const heatmapData = Array.from({ length: heatmapDays }, (_, dayIndex) => {
    const date = new Date(startDate.getTime() + dayIndex * dayMs);
    const dateKey = formatLocalDateKey(date);
    return {
      date,
      dateKey,
      value: activityByDay.get(dateKey) ?? 0,
    };
  });

  const maxHeatmapValue = heatmapData.reduce(
    (maxValue, item) => Math.max(maxValue, item.value),
    0
  );
  
  const weeks = Array.from({ length: numWeeks }, (_, weekIndex) =>
    heatmapData.slice(weekIndex * 7, weekIndex * 7 + 7)
  );

  const monthLabels = weeks.reduce((acc: { label: string; weeks: number }[], week, i) => {
    const month = week[0].date.toLocaleString("default", { month: "short" });
    if (acc.length === 0 || acc[acc.length - 1].label !== month) {
      acc.push({ label: month, weeks: 1 });
    } else {
      acc[acc.length - 1].weeks++;
    }
    return acc;
  }, []);

  const getHeatmapCellClass = (value: number) => {
    if (value === 0) return "bg-muted/50 hover:bg-muted";
    if (maxHeatmapValue <= 1) return "bg-primary/30 hover:bg-primary/50";
    const intensity = value / maxHeatmapValue;
    if (intensity <= 0.25) return "bg-primary/20 hover:bg-primary/40";
    if (intensity <= 0.5) return "bg-primary/40 hover:bg-primary/60";
    if (intensity <= 0.75) return "bg-primary/65 hover:bg-primary/80";
    return "bg-primary/85 hover:bg-primary";
  };

  const stats = [
    {
      title: "Total Links",
      value: totalLinks,
      subtitle: "Active on profile",
      icon: Link01Icon,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Recent Activity",
      value: recentActivity,
      subtitle: "Updated in last 7d",
      icon: Calendar03Icon,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Profile Health",
      value: `${profileHealth}%`,
      subtitle: "Description completion",
      icon: ActivityIcon,
      color: profileHealth > 70 ? "text-green-500" : "text-yellow-500",
      bg: profileHealth > 70 ? "bg-green-500/10" : "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="min-w-0 border-border/60 bg-card/60 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
              <HugeiconsIcon icon={stat.icon} size={20} strokeWidth={1.8} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-foreground">
              {stat.value}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stat.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}

      <Card className="w-full min-w-0 border-border/60 bg-card/60 shadow-sm sm:col-span-2 lg:col-span-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Activity Heatmap
          </CardTitle>
          <CardDescription>
            Last 52 weeks based on connection creates and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TooltipProvider delayDuration={0}>
            <div className="overflow-x-auto pb-4">
              <div className="inline-flex flex-col min-w-full">
                {/* Month labels */}
                <div className="flex mb-2 ml-[44px] text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                  {monthLabels.map((m, i) => (
                    <div 
                      key={`${m.label}-${i}`} 
                      className="shrink-0"
                      style={{ width: `${m.weeks * 18}px` }}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  {/* Day labels */}
                  <div className="grid grid-rows-7 gap-1.5 text-[10px] text-muted-foreground font-semibold leading-[12px] w-8 uppercase">
                    <span className="flex items-center">Mon</span>
                    <span />
                    <span className="flex items-center">Wed</span>
                    <span />
                    <span className="flex items-center">Fri</span>
                    <span />
                    <span className="flex items-center">Sun</span>
                  </div>

                  {/* Heatmap Grid */}
                  <div className="flex gap-1.5 flex-1">
                    {weeks.map((week, weekIndex) => (
                      <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1.5 shrink-0" style={{ width: '12px' }}>
                        {week.map((day) => (
                          <Tooltip key={day.dateKey} delayDuration={0}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className={`size-[12px] rounded-[2.5px] transition-colors ${getHeatmapCellClass(
                                  day.value
                                )}`}
                              />
                            </TooltipTrigger>                            <TooltipContent className="text-[11px] px-2 py-1">
                              <span className="font-semibold">{day.value}</span>
                              {day.value === 1 ? " activity" : " activities"} on{" "}
                              {day.date.toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>

          <div className="flex items-center justify-between border-t border-border/40 pt-4">
            <div className="text-[11px] text-muted-foreground">
              Total activity recorded:{" "}
              <span className="font-semibold text-foreground">
                {Array.from(activityByDay.values()).reduce((a, b) => a + b, 0)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`size-3 rounded-[2.5px] ${
                      level === 0 ? "bg-muted/50" : getHeatmapCellClass(level)
                    }`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
