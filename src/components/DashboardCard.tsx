import { useState } from "react";
import {
  InformationCircleIcon,
  SquareArrowUpRightIcon,
  PencilEdit01Icon,
  Delete02Icon,
  CopyIcon,
  PencilEdit02Icon,
  Clock01Icon,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { getPlatformMeta, getDomain } from "../utils";
import IconSelectorTray from "./IconSelectorTray";

interface DashboardCardProps {
  platform: {
    name: string;
    username: string;
    url: string;
    iconName?: string;
    updatedAt?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onIconChange?: (iconName: string) => void;
}

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function formatFull(dateStr: string): string {
  return new Date(dateStr).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  platform,
  onEdit,
  onDelete,
  onIconChange,
}) => {
  const { name, username, url, iconName, updatedAt } = platform;
  const { icon: Icon } = getPlatformMeta(url, name, iconName);
  const [isIconTrayOpen, setIsIconTrayOpen] = useState(false);

  return (
    <>
      <ShadcnCard className="group flex h-full flex-col overflow-hidden border-border/70 bg-card/90 transition-all duration-200 hover:shadow-xl">
        <div className="flex flex-1 flex-col">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              {/* Icon with edit overlay */}
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                  <HugeiconsIcon icon={Icon} size={24} strokeWidth={1.8} />
                </div>
                <button
                  onClick={() => setIsIconTrayOpen(true)}
                  className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-secondary text-secondary-foreground shadow-sm transition-opacity hover:bg-primary hover:text-primary-foreground"
                  title="Change icon"
                >
                  <HugeiconsIcon icon={PencilEdit02Icon} size={11} strokeWidth={2} />
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-1.5">
                <Badge variant="outline" className="border-border/70 bg-secondary/40">
                  {getDomain(url)}
                </Badge>
                {updatedAt && (
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="secondary"
                          className="cursor-default gap-1 text-[10px] font-normal text-muted-foreground"
                        >
                          <HugeiconsIcon icon={Clock01Icon} size={10} strokeWidth={2} />
                          {formatRelative(updatedAt)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        Updated {formatFull(updatedAt)}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl text-foreground">{name}</CardTitle>
              <CardDescription className="line-clamp-1 text-sm">
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

        <CardFooter className="flex flex-col gap-3 pt-0">
          <div className="grid w-full grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="rounded-2xl border-border/70 hover:bg-primary/10 hover:text-primary"
              onClick={onEdit}
            >
              <HugeiconsIcon
                icon={PencilEdit01Icon}
                data-icon="inline-start"
                size={16}
                strokeWidth={1.8}
              />
              Edit
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-border/70 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onDelete}
            >
              <HugeiconsIcon
                icon={Delete02Icon}
                data-icon="inline-start"
                size={16}
                strokeWidth={1.8}
              />
              Delete
            </Button>
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <Button
              variant="secondary"
              className="rounded-2xl border-border/70"
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
            <Button asChild className="rounded-2xl shadow-lg shadow-primary/10">
              <a href={url} target="_blank" rel="noreferrer">
                Open Link
                <HugeiconsIcon
                  icon={SquareArrowUpRightIcon}
                  data-icon="inline-end"
                  size={16}
                  strokeWidth={1.8}
                />
              </a>
            </Button>
          </div>
        </CardFooter>
      </ShadcnCard>

      <IconSelectorTray
        isOpen={isIconTrayOpen}
        onClose={() => setIsIconTrayOpen(false)}
        selectedIcon={iconName}
        onSelect={(name) => onIconChange?.(name)}
      />
    </>
  );
};

export default DashboardCard;
