import {
  InformationCircleIcon,
  SquareArrowUpRightIcon,
  PencilEdit01Icon,
  Delete02Icon,
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
import { getPlatformMeta } from "../utils";

interface DashboardCardProps {
  platform: {
    name: string;
    username: string;
    url: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  platform,
  onEdit,
  onDelete,
}) => {
  const { name, username, url } = platform;
  const { icon: Icon, label } = getPlatformMeta(url, name);

  const handleAction = (action: string) => {
    toast.info(`${action} feature is coming soon!`, {
      description: "We're working hard to bring this feature to you.",
    });
  };

  return (
    <ShadcnCard className="group h-full overflow-hidden border-border/70 bg-card/90 transition-all duration-200 hover:shadow-xl">
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
          <CardDescription className="line-clamp-1 text-sm">
            {url.replace(/^https?:\/\//, "")}
          </CardDescription>
        </div>
      </CardHeader>
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
      <CardFooter className="flex flex-col gap-3">
        <div className="grid w-full grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="rounded-2xl border-border/70 hover:bg-primary/10 hover:text-primary"
            onClick={() => handleAction("Edit")}
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
            onClick={() => handleAction("Delete")}
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
        <Button asChild variant="secondary" className="w-full rounded-2xl">
          <a href={url} target="_blank" rel="noreferrer">
            View link
            <HugeiconsIcon
              icon={SquareArrowUpRightIcon}
              data-icon="inline-end"
              size={16}
              strokeWidth={1.8}
            />
          </a>
        </Button>
      </CardFooter>
    </ShadcnCard>
  );
};

export default DashboardCard;

