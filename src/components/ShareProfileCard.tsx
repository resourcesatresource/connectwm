import React from "react";
import { CopyIcon, Share01Icon, Link01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ShareProfileCardProps {
  customerId: string;
  username?: string;
}

const ShareProfileCard: React.FC<ShareProfileCardProps> = ({ customerId, username }) => {
  const profileUrl = `${window.location.origin}/u/${username || customerId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Link copied to clipboard!", {
        description: "You can now share it with anyone.",
      });
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Connect with me",
          text: "Check out my shareable links!",
          url: profileUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Sharing failed");
        }
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Card className="overflow-hidden border-primary/20 bg-primary/5 shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HugeiconsIcon icon={Link01Icon} size={22} strokeWidth={1.8} />
          </div>
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Your Public Profile
            </h3>
            <p className="truncate text-sm font-medium text-muted-foreground">
              {profileUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex-1 rounded-xl border-border/70 hover:bg-primary/5 sm:flex-none"
            onClick={copyToClipboard}
          >
            <HugeiconsIcon
              icon={CopyIcon}
              data-icon="inline-start"
              size={16}
              strokeWidth={1.8}
            />
            Copy
          </Button>
          <Button
            className="flex-1 rounded-xl shadow-lg shadow-primary/20 sm:flex-none"
            onClick={handleShare}
          >
            <HugeiconsIcon
              icon={Share01Icon}
              data-icon="inline-start"
              size={16}
              strokeWidth={1.8}
            />
            Share Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareProfileCard;
