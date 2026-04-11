import React, { useEffect, useState } from "react";
import { PlusSignIcon, RefreshIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import Header from "../components/layout/Header";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../context/AuthContext";
import { API } from "../configs";
import { Connection, CustomerDetails } from "../types";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

import { Card, CardContent } from "../components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../components/ui/empty";
import { Skeleton } from "../components/ui/skeleton";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!user?._id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API.BE.CUSTOMERS.PROD}/${user._id}`);
      
      if (!response.ok) {
        throw new Error("Unable to load your links. Please try again later.");
      }

      const data: CustomerDetails[] = await response.json();
      const customerDetails = data?.[0] ?? null;

      setConnections(customerDetails?.connections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user?._id]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_62%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8">
        <Header />

        <div className="flex flex-col gap-8">
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Management Dashboard
                </h1>
                <Badge variant="secondary" className="rounded-full px-3">
                  Admin
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Manage your shareable links and digital presence.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full shadow-sm"
                onClick={fetchDashboardData}
                disabled={isLoading}
              >
                <HugeiconsIcon
                  icon={RefreshIcon}
                  size={18}
                  strokeWidth={1.8}
                  className={isLoading ? "animate-spin" : ""}
                />
              </Button>
              <Button 
                className="rounded-2xl shadow-lg shadow-primary/20"
                onClick={() => toast.info("Add Link feature is coming soon!", {
                  description: "We're currently building the creation flow."
                })}
              >
                <HugeiconsIcon
                  icon={PlusSignIcon}
                  data-icon="inline-start"
                  size={18}
                  strokeWidth={2}
                />
                Add New Link
              </Button>
            </div>
          </header>

          <section className="flex-1">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden border-border/70 bg-card/80">
                    <CardContent className="flex flex-col gap-5 p-6">
                      <Skeleton className="h-14 w-14 rounded-2xl" />
                      <div className="flex flex-col gap-3">
                        <Skeleton className="h-6 w-1/2 rounded-full" />
                        <Skeleton className="h-4 w-3/4 rounded-full" />
                      </div>
                      <Skeleton className="h-20 rounded-2xl" />
                      <div className="grid grid-cols-2 gap-3">
                        <Skeleton className="h-10 rounded-2xl" />
                        <Skeleton className="h-10 rounded-2xl" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Alert variant="destructive" className="rounded-3xl border-destructive/50 bg-destructive/5">
                <AlertTitle className="text-lg">Connection Error</AlertTitle>
                <AlertDescription className="mt-2 text-base">
                  <p>{error}</p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-2xl border-destructive/20 hover:bg-destructive/10"
                    onClick={fetchDashboardData}
                  >
                    Retry Connection
                  </Button>
                </AlertDescription>
              </Alert>
            ) : connections.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {connections.map((connection) => (
                  <DashboardCard
                    key={connection._id}
                    platform={{
                      name: connection.name,
                      username: connection.description,
                      url: connection.url,
                    }}
                    onEdit={() => console.log("Edit:", connection._id)}
                    onDelete={() => console.log("Delete:", connection._id)}
                  />
                ))}
              </div>
            ) : (
              <Empty className="rounded-[2.5rem] border-border/80 bg-card/50 py-16">
                <EmptyHeader>
                  <EmptyMedia variant="icon" className="size-20 bg-primary/10 text-primary">
                    <HugeiconsIcon icon={PlusSignIcon} size={32} strokeWidth={1.5} />
                  </EmptyMedia>
                  <EmptyTitle className="text-2xl">No links added yet</EmptyTitle>
                  <EmptyDescription className="max-w-xs text-center text-base">
                    Start building your presence by adding your first important link here.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button 
                    size="lg" 
                    className="rounded-2xl px-8 shadow-xl shadow-primary/20"
                    onClick={() => toast.info("Add Link feature is coming soon!", {
                      description: "We're currently building the creation flow."
                    })}
                  >
                    Add My First Link
                  </Button>
                </EmptyContent>
              </Empty>
            )}

          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

