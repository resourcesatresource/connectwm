import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Menu02Icon,
  UserIcon,
  Link01Icon,
  RefreshIcon,
  DashboardSpeed01Icon,
  EyeIcon,
} from "@hugeicons/core-free-icons";



import { HugeiconsIcon } from "@hugeicons/react";

import Header from "../components/layout/Header";
import CardList from "../components/CardList";
import { API } from "../configs";
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
  const { isAuthenticated, user } = useAuth();
  const fallbackCustomerId = "679c9f686c20cfe813435e8b";

  const { customerId: paramId } = useParams<{ customerId: string }>();
  const [connectionList, setConnectionList] = useState<Connection[]>([]);
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 100; // Offset for header and spacing
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
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
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 pb-12">
        {isAuthenticated && (
          <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 shadow-sm sm:px-6">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <HugeiconsIcon 
                icon={user?._id === (paramId || customer?._id || fallbackCustomerId) ? EyeIcon : DashboardSpeed01Icon} 
                size={16} 
                strokeWidth={2} 
              />
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
              <p className="text-sm font-medium text-foreground">
                <span className="font-bold text-primary">
                  {user?._id === (paramId || customer?._id || fallbackCustomerId) ? "Public View:" : "Authenticated:"}
                </span>{" "}
                {user?._id === (paramId || customer?._id || fallbackCustomerId) 
                  ? "This is how others see your profile." 
                  : `Viewing ${customer?.name || "this"} profile.`}
              </p>
              <Link 
                to="/dashboard" 
                className="text-xs font-semibold text-primary underline-offset-4 hover:underline"
              >
                Go to My Dashboard
              </Link>
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex-1">
            <Header />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" className="h-[54px] w-full rounded-full border-border/70 bg-background/80 px-6 shadow-sm backdrop-blur sm:w-auto">
                <HugeiconsIcon
                  icon={Menu02Icon}
                  data-icon="inline-start"
                  strokeWidth={1.8}
                />
                Page Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl border-border/70 shadow-xl">
              <DropdownMenuLabel className="font-semibold uppercase tracking-wider text-[10px] text-muted-foreground px-3 py-2">
                Quick actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => scrollToSection("profile-overview")} className="rounded-xl cursor-pointer mx-1">
                  <HugeiconsIcon icon={UserIcon} size={16} className="mr-2.5" strokeWidth={1.8} />
                  Profile overview
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => scrollToSection("social-links")} className="rounded-xl cursor-pointer mx-1">
                  <HugeiconsIcon icon={Link01Icon} size={16} className="mr-2.5" strokeWidth={1.8} />
                  Social links
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => fetchConnections(paramId || fallbackCustomerId)}
                  className="rounded-xl cursor-pointer mx-1"
                >
                  <HugeiconsIcon icon={RefreshIcon} size={16} className="mr-2.5" strokeWidth={1.8} />
                  Refresh profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card
          id="profile-overview"
          className="overflow-hidden border-border/70 bg-card/80"
        >
          <CardContent className="grid gap-8 p-6 md:grid-cols-[220px_minmax(0,1fr)] md:p-8">
            <div className="relative mx-auto flex w-full max-w-[220px] items-center justify-center">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,_hsl(var(--primary)),_transparent_70%)] opacity-20 blur-3xl animate-pulse" />
              <Avatar className="relative h-44 w-44 rounded-[2.5rem] shadow-2xl ring-1 ring-border/50 sm:h-52 sm:w-52 overflow-hidden border-4 border-background/50 backdrop-blur-xl">
                <AvatarFallback className="flex h-full w-full items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/80 to-accent text-5xl font-bold text-primary-foreground shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_white/20,_transparent_40%)]" />
                  {isLoading ? (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-foreground/20 border-t-primary-foreground" />
                    </div>
                  ) : (
                    (customer?.name || "Connect").slice(0, 1).toUpperCase()
                  )}
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

        <footer className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-border/40 pt-12 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Powered by</span>
            <Link to="/" className="flex items-center gap-2 font-bold text-foreground transition-all hover:text-primary">
              <Avatar className="size-6 rounded-lg">
                <AvatarImage
                  src={`${process.env.PUBLIC_URL}/icons/favicon.jpg`}
                  alt="ConnectWM logo"
                />
                <AvatarFallback className="rounded-lg bg-primary text-[8px] text-primary-foreground">
                  CW
                </AvatarFallback>
              </Avatar>
              ConnectWM
            </Link>
          </div>
          <p className="max-w-xs text-[11px] leading-relaxed text-muted-foreground/60">
            Create your own professional digital presence in seconds. One link for everything that matters.
          </p>
          {!isAuthenticated && (
            <Button asChild variant="outline" size="sm" className="mt-2 rounded-full border-border/70 text-xs text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all">
              <Link to="/register">Create My Profile</Link>
            </Button>
          )}
        </footer>
      </div>
    </main>
  );
}

export default Profile;
