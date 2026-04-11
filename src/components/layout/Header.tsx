import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft01Icon,
  Logout01Icon,
  Moon02Icon,
  Sun03Icon,
  UserIcon,
  DashboardSpeed01Icon,
  Menu02Icon,
  Link01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import BrandMark from "../BrandMark";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { userProfile: user } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isHome = location.pathname === "/";

  return (
    <header className="flex items-center justify-between gap-3 rounded-full border border-border/70 bg-background/80 px-3 py-2 shadow-sm backdrop-blur sm:px-4">
      <div className="flex items-center gap-2">
        {!isHome && !isAuthenticated && (
          <Button asChild variant="ghost" className="rounded-full px-3">
            <Link to="/">
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                data-icon="inline-start"
                strokeWidth={1.8}
              />
              Back
            </Link>
          </Button>
        )}
        <BrandMark subtitle="Connect With Me in one shareable link" />
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 rounded-full pl-2 pr-4 gap-2 hover:bg-muted/50">
                <Avatar className="h-7 w-7 rounded-full border border-border/50">
                  <AvatarFallback className="bg-primary/10 text-[10px] font-bold text-primary">
                    {user?.name?.slice(0, 1).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">
                  {user?.name?.split(" ")[0] || "Account"}
                </span>
                <HugeiconsIcon icon={Menu02Icon} size={14} className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1 rounded-2xl border-border/70 shadow-xl">
              <DropdownMenuLabel className="flex flex-col gap-0.5 px-3 py-2">
                <span className="text-xs font-semibold text-foreground">{user?.name}</span>
                <span className="text-[10px] font-medium text-muted-foreground truncate">{user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer mx-1">
                  <Link to="/my-profile" className="flex items-center gap-2.5 w-full">
                    <HugeiconsIcon icon={UserIcon} size={16} strokeWidth={1.8} />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer mx-1">
                  <Link to="/dashboard" className="flex items-center gap-2.5 w-full">
                    <HugeiconsIcon icon={DashboardSpeed01Icon} size={16} strokeWidth={1.8} />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {user && (
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer mx-1">
                    <Link to={`/u/${user._id}`} className="flex items-center gap-2.5 w-full">
                      <HugeiconsIcon icon={Link01Icon} size={16} strokeWidth={1.8} />
                      Public Profile
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={handleLogout}
                className="rounded-xl cursor-pointer mx-1 text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <HugeiconsIcon icon={Logout01Icon} size={16} strokeWidth={1.8} className="mr-2.5" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="ghost" className="rounded-full px-4">
            <Link to="/login">Login</Link>
          </Button>
        )}
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full size-10 border-border/70 hover:bg-muted/50"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <HugeiconsIcon
            icon={theme === "dark" ? Sun03Icon : Moon02Icon}
            size={18}
            strokeWidth={1.8}
            className={theme === "dark" ? "text-yellow-500" : "text-primary"}
          />
        </Button>
      </div>
    </header>
  );
};

export default Header;
