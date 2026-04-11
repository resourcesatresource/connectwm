import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft01Icon,
  Logout01Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import BrandMark from "../BrandMark";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
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
        {!isHome && (
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
          <Button
            type="button"
            variant="ghost"
            className="rounded-full px-3 sm:px-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <HugeiconsIcon icon={Logout01Icon} strokeWidth={1.8} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        ) : (
          <Button asChild variant="ghost" className="rounded-full px-4">
            <Link to="/login">Login</Link>
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          className="rounded-full px-3 sm:px-4"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <HugeiconsIcon
            icon={theme === "dark" ? Sun03Icon : Moon02Icon}
            strokeWidth={1.8}
            className={theme === "dark" ? "text-yellow-500" : "text-primary"}
          />
          <span className="hidden sm:inline">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </Button>
      </div>

    </header>
  );
};

export default Header;
