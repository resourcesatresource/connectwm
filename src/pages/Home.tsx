import CardList from "../components/CardList";
import Assets from "../assets";
import { API } from "../configs/index";
import { Connection, CustomerDetails } from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function Home() {
  const fallbackCustomerId = "679c9f686c20cfe813435e8b";
  const { customerId: paramId } = useParams<{ customerId: string }>();
  const [connectionList, setConnectionList] = useState<Connection[]>([]);
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchConnections = async (id: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${API.BE.PROD}/${id}`);

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
    const id = paramId || fallbackCustomerId;
    fetchConnections(id);
  }, [paramId]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(241,245,249,0.92)_35%,_rgba(226,232,240,0.85)_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <Card className="overflow-hidden border-white/60 bg-white/80">
          <CardContent className="grid gap-8 p-6 md:grid-cols-[220px_minmax(0,1fr)] md:p-8">
            <div className="relative mx-auto flex w-full max-w-[220px] items-center justify-center">
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-slate-950 via-slate-700 to-slate-400 opacity-15 blur-2xl" />
              <img
                src={Assets.images.avatar}
                alt={customer?.name || "Profile avatar"}
                className="relative h-40 w-40 rounded-[2rem] object-cover shadow-2xl shadow-slate-950/15 ring-4 ring-white/80 sm:h-48 sm:w-48"
              />
            </div>
            <div className="flex flex-col justify-center gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-slate-950 px-4 py-1.5 text-slate-50">
                  Digital profile
                </Badge>
                <Badge variant="outline" className="rounded-full border-slate-200 bg-white/70 px-4 py-1.5">
                  {isLoading
                    ? "Loading links"
                    : `${connectionList.length} ${
                        connectionList.length === 1 ? "link" : "links"
                      }`}
                </Badge>
              </div>
              <CardHeader className="space-y-3 p-0">
                <CardTitle className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  {isLoading ? "Loading profile..." : customer?.name || "Connect profile"}
                </CardTitle>
                <CardDescription className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  {errorMessage
                    ? "The profile could not be loaded. You can retry the request below."
                    : "A modern contact hub for social profiles, content channels, and important destinations."}
                </CardDescription>
              </CardHeader>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950 sm:text-2xl">
                Social links
              </h2>
              <p className="text-sm text-slate-500 sm:text-base">
                Fast access to every active platform in one responsive layout.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={`loading-${index}`}
                  className="overflow-hidden border-white/60 bg-white/75"
                >
                  <CardContent className="space-y-5 p-6">
                    <div className="h-14 w-14 animate-pulse rounded-2xl bg-slate-200" />
                    <div className="space-y-3">
                      <div className="h-6 animate-pulse rounded-full bg-slate-200" />
                      <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-100" />
                    </div>
                    <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                    <div className="h-11 animate-pulse rounded-2xl bg-slate-200" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : errorMessage ? (
            <Card className="border-red-200/80 bg-red-50/80">
              <CardContent className="flex min-h-40 flex-col items-center justify-center gap-4 p-6 text-center">
                <div className="space-y-2">
                  <p className="text-base font-semibold text-red-900">
                    Unable to load social links
                  </p>
                  <p className="text-sm text-red-700 sm:text-base">{errorMessage}</p>
                </div>
                <Button
                  type="button"
                  className="rounded-2xl bg-red-900 text-white hover:bg-red-800"
                  onClick={() => fetchConnections(paramId || fallbackCustomerId)}
                >
                  Try again
                </Button>
              </CardContent>
            </Card>
          ) : connectionList.length ? (
            <CardList list={connectionList} />
          ) : (
            <Card className="border-dashed border-slate-300/80 bg-white/70">
              <CardContent className="flex min-h-40 items-center justify-center p-6 text-center text-sm text-slate-500 sm:text-base">
                No connections are available for this profile yet.
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
