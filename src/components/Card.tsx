import React from "react";
import { AtIcon, SquareArrowUpRightIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getPlatformMeta } from "../utils";

interface CardProps {
  platform: {
    name: string;
    username: string;
    url: string;
  };
}

const Card: React.FC<CardProps> = ({ platform }) => {
  const { name, username, url } = platform;
  const { icon: Icon, label } = getPlatformMeta(url, name);

  return (
    <ShadcnCard className="group h-full overflow-hidden border-white/60 bg-white/85 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-50 shadow-lg shadow-slate-950/15">
            <HugeiconsIcon icon={Icon} size={24} strokeWidth={1.8} />
          </div>
          <Badge variant="outline" className="border-slate-200 bg-slate-50/80">
            {label}
          </Badge>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl text-slate-950">{name}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm text-slate-500">
            {url.replace(/^https?:\/\//, "")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
            Username
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
            <HugeiconsIcon
              icon={AtIcon}
              size={16}
              strokeWidth={1.8}
              className="text-slate-400"
            />
            {username}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full rounded-2xl bg-slate-950 text-slate-50 hover:bg-slate-800">
          <a href={url} target="_blank" rel="noreferrer">
            Open profile
            <HugeiconsIcon icon={SquareArrowUpRightIcon} size={16} strokeWidth={1.8} />
          </a>
        </Button>
      </CardFooter>
    </ShadcnCard>
  );
};

export default Card;
