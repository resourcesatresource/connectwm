import React from "react";
import {
  Link01Icon,
  Calendar03Icon,
  ActivityIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Connection } from "../types";

interface DashboardStatsProps {
  connections: Connection[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ connections }) => {
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/60 bg-card/60 shadow-sm transition-all duration-200 hover:shadow-md">
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
    </div>
  );
};

export default DashboardStats;
