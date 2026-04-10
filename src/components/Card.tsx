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
    <ShadcnCard className="group h-full overflow-hidden border-border/70 bg-card/90 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <HugeiconsIcon icon={Icon} size={24} strokeWidth={1.8} />
          </div>
          <Badge variant="outline" className="border-border/70 bg-secondary/40">
            {label}
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl text-foreground">{name}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {url.replace(/^https?:\/\//, "")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="rounded-2xl border border-border/80 bg-muted/50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Username
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <HugeiconsIcon
              icon={AtIcon}
              size={16}
              strokeWidth={1.8}
              className="text-muted-foreground"
            />
            {username}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full rounded-2xl">
          <a href={url} target="_blank" rel="noreferrer">
            Open profile
            <HugeiconsIcon
              icon={SquareArrowUpRightIcon}
              data-icon="inline-end"
              strokeWidth={1.8}
            />
          </a>
        </Button>
      </CardFooter>

    </ShadcnCard>
  );
};

export default Card;
