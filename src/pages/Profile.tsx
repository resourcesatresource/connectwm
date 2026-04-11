import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Logout01Icon,
  Menu02Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import Assets from "../assets";
import BrandMark from "../components/BrandMark";
import CardList from "../components/CardList";
import { API } from "../configs";
import { useTheme } from "../components/theme-provider";
import { Connection, CustomerDetails } from "../types";
import { useAuth } from "../context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/empty";
import { Skeleton } from "../components/ui/skeleton";

function Profile() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const fallbackCustomerId = "679c9f686c20cfe813435e8b";
  const { customerId: paramId } = useParams<{ customerId: string }>();
  const [connectionList, setConnectionList] = useState<Connection[]>([]);
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConnections = async (id: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${API.BE.CUSTOMERS.PROD}/${id}`);

      if (!response.ok) {
        throw new Error("Unable to load this profile right now.");
      }

      const data: CustomerDetails[] = await response.json();
      const customerDetails = data?.[0] ?? null;

      setCustomer(customerDetails);
      setConnectionList(customerDetails?.connections ?? []);
    } catch (error) {
      setCustomer(null);
      setConnectionList([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while loading this profile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections(paramId || fallbackCustomerId);
  }, [paramId]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,_hsl(var(--accent)/0.22),_transparent_70%)]" />
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex items-center justify-between gap-3 rounded-full border border-border/70 bg-background/80 px-3 py-2 shadow-sm backdrop-blur sm:px-4">
          <BrandMark subtitle="Connect With Me in one shareable link" />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-4"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <HugeiconsIcon
                icon={theme === "dark" ? Sun03Icon : Moon02Icon}
                data-icon="inline-start"
                strokeWidth={1.8}
              />
              {theme === "dark" ? "Light" : "Dark"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="rounded-full px-4">
                  <HugeiconsIcon
                    icon={Menu02Icon}
                    data-icon="inline-start"
                    strokeWidth={1.8}
                  />
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => scrollToSection("profile-overview")}>
                    Profile overview
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => scrollToSection("social-links")}>
                    Social links
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => fetchConnections(paramId || fallbackCustomerId)}
                  >
                    Refresh profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {isAuthenticated && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onSelect={handleLogout}
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                      >
                        <HugeiconsIcon icon={Logout01Icon} data-icon="inline-start" strokeWidth={1.8} />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Card
          id="profile-overview"
          className="overflow-hidden border-border/70 bg-card/80"
        >
          <CardContent className="grid gap-8 p-6 md:grid-cols-[220px_minmax(0,1fr)] md:p-8">
            <div className="relative mx-auto flex w-full max-w-[220px] items-center justify-center">
              <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle,_hsl(var(--primary)/0.24),_transparent_70%)] blur-2xl" />
              <Avatar className="relative h-40 w-40 rounded-[2rem] shadow-2xl ring-4 ring-background/80 sm:h-48 sm:w-48">
                <AvatarImage
                  src={Assets.images.avatar}
                  alt={customer?.name || "Profile avatar"}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-[2rem] text-3xl font-semibold">
                  {(customer?.name || "Connect profile").slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-center gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full px-4 py-1.5">Digital profile</Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-border/70 bg-background/70 px-4 py-1.5"
                >
                  {isLoading
                    ? "Loading links"
                    : `${connectionList.length} ${
                        connectionList.length === 1 ? "link" : "links"
                      }`}
                </Badge>
              </div>
              <CardHeader className="flex flex-col gap-3 p-0">
                <CardTitle className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {isLoading ? "Loading profile..." : customer?.name || "Connect profile"}
                </CardTitle>
                <CardDescription className="max-w-2xl text-base leading-7 sm:text-lg">
                  {errorMessage
                    ? "The profile could not be loaded. You can retry the request below."
                    : "A single page with the most important places to follow, watch, buy, book, or get in touch."}
                </CardDescription>
              </CardHeader>
            </div>
          </CardContent>
        </Card>

        <section id="social-links" className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                Social links
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                Everything this creator wants you to reach, gathered in one place.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={`loading-${index}`}
                  className="overflow-hidden border-border/70 bg-card/75"
                >
                  <CardContent className="flex flex-col gap-5 p-6">
                    <Skeleton className="h-14 w-14 rounded-2xl" />
                    <div className="flex flex-col gap-3">
                      <Skeleton className="h-6 rounded-full" />
                      <Skeleton className="h-4 w-3/4 rounded-full" />
                    </div>
                    <Skeleton className="h-20 rounded-2xl" />
                    <Skeleton className="h-11 rounded-2xl" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : errorMessage ? (
            <Alert variant="destructive" className="rounded-3xl">
              <AlertTitle>Unable to load social links</AlertTitle>
              <AlertDescription className="flex flex-col gap-4 sm:text-base">
                <p>{errorMessage}</p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-fit rounded-2xl"
                  onClick={() => fetchConnections(paramId || fallbackCustomerId)}
                >
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          ) : connectionList.length ? (
            <CardList list={connectionList} />
          ) : (
            <Empty className="rounded-3xl border-border/80 bg-card/70">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon icon={Menu02Icon} strokeWidth={1.8} />
                </EmptyMedia>
                <EmptyTitle>No connections yet</EmptyTitle>
                <EmptyDescription>
                  No connections are available for this profile yet.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-2xl"
                  onClick={() => fetchConnections(paramId || fallbackCustomerId)}
                >
                  Refresh profile
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </section>
      </div>
    </main>
  );
}

export default Profile;
