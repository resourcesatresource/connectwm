import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface BrandMarkProps {
  subtitle: string;
}

function BrandMark({ subtitle }: BrandMarkProps) {
  return (
    <Button asChild variant="ghost" className="h-auto rounded-full px-2 py-1">
      <Link to="/">
        <Avatar className="size-10 rounded-2xl">
          <AvatarImage
            src={`${process.env.PUBLIC_URL}/icons/favicon.jpg`}
            alt="Connect With Me logo"
          />
          <AvatarFallback className="rounded-2xl text-xs font-semibold">
            CW
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex sm:flex-col">
          <span className="text-sm font-semibold text-foreground">ConnectWM</span>
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        </div>
      </Link>
    </Button>
  );
}

export default BrandMark;
