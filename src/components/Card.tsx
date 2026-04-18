import {
  InformationCircleIcon,
  SquareArrowUpRightIcon,
  CopyIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

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
import { getPlatformMeta, getDomain } from "../utils";

interface CardProps {
  platform: {
    name: string;
    username: string;
    url: string;
    iconName?: string;
  };
}

const Card: React.FC<CardProps> = ({ platform }) => {
  const { name, username, url, iconName } = platform;
  const { icon: Icon } = getPlatformMeta(url, name, iconName);

  return (
    <ShadcnCard className="group flex h-full flex-col overflow-hidden border-border/70 bg-card/90 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex flex-1 flex-col">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <HugeiconsIcon icon={Icon} size={24} strokeWidth={1.8} />
            </div>
            <Badge variant="outline" className="border-border/70 bg-secondary/40">
              {getDomain(url)}
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl text-foreground">{name}</CardTitle>
            <CardDescription className="line-clamp-2 text-sm">
              {url.replace(/^https?:\/\//, "")}
            </CardDescription>
          </div>
        </CardHeader>
        {username?.trim() && (
          <CardContent className="flex flex-col gap-3">
            <div className="rounded-2xl border border-border/80 bg-muted/50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Description
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground italic">
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  size={16}
                  strokeWidth={1.8}
                  className="text-muted-foreground"
                />
                {username}
              </p>
            </div>
          </CardContent>
        )}
      </div>

      <CardFooter className="flex flex-col gap-2 pt-0">
        <div className="grid w-full grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="rounded-2xl border-border/70 hover:bg-primary/5"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                toast.success("Link copied!");
              } catch (err) {
                toast.error("Failed to copy");
              }
            }}
          >
            <HugeiconsIcon icon={CopyIcon} data-icon="inline-start" size={16} strokeWidth={1.8} />
            Copy
          </Button>
          <Button asChild className="rounded-2xl">
            <a href={url} target="_blank" rel="noreferrer">
              Open Link
              <HugeiconsIcon
                icon={SquareArrowUpRightIcon}
                data-icon="inline-end"
                strokeWidth={1.8}
              />
            </a>
          </Button>
        </div>
      </CardFooter>
    </ShadcnCard>
  );
};

export default Card;
