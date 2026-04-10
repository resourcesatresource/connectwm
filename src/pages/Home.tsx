import { Link } from "react-router-dom";
import {
  ArrowRight01Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import BrandMark from "../components/BrandMark";
import { useTheme } from "../components/theme-provider";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../components/ui/card";

function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.2),_transparent_60%)]" />
        <div className="absolute bottom-0 left-1/2 h-[28rem] w-full max-w-6xl -translate-x-1/2 bg-[radial-gradient(circle,_hsl(var(--accent)/0.18),_transparent_68%)]" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6">
        <header className="flex items-center justify-between gap-3 rounded-full border border-border/70 bg-background/80 px-3 py-2 shadow-sm backdrop-blur sm:px-4">
          <BrandMark subtitle="Connect With Me in one shareable link" />

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="rounded-full px-4">
              <Link to="/login">Login</Link>
            </Button>
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
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </Button>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-6 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card className="overflow-hidden border-border/70 bg-card/80">
            <CardHeader className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit rounded-full px-4 py-1.5">
                Connect With Me
              </Badge>
              <CardTitle className="max-w-3xl text-4xl leading-tight sm:text-6xl">
                One page for everything you want people to reach.
              </CardTitle>
              <CardDescription className="max-w-2xl text-base leading-7 sm:text-lg">
                Connect With Me helps you turn scattered links into one polished
                destination for your socials, work, content, products, and contact points.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-2xl">
                  <Link to="/users">
                    Get started
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      data-icon="inline-end"
                      strokeWidth={1.8}
                    />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl">
                  <Link to="/login">Login</Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="border-border/70 bg-background/60">
                  <CardContent className="flex flex-col gap-2 p-5">
                    <p className="text-sm font-medium text-foreground">Curated links</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Bring your social profiles, stores, videos, booking pages, and key destinations together.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/70 bg-background/60">
                  <CardContent className="flex flex-col gap-2 p-5">
                    <p className="text-sm font-medium text-foreground">One public URL</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Share one clean profile instead of sending people through a trail of separate links.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/70 bg-background/60">
                  <CardContent className="flex flex-col gap-2 p-5">
                    <p className="text-sm font-medium text-foreground">Fast updates</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Update your page once and every shared profile stays current everywhere it lives.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/90">
            <CardHeader className="flex flex-col gap-3">
              <CardTitle>How it works</CardTitle>
              <CardDescription>
                A simple flow for creators, professionals, and brands who want to be easier to discover.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <Card className="border-border/70 bg-background/60">
                <CardContent className="flex flex-col gap-2 p-5">
                  <Badge className="w-fit rounded-full px-3 py-1">1</Badge>
                  <p className="text-base font-semibold text-foreground">Create your page</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Start with a profile that represents you clearly and professionally.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/70 bg-background/60">
                <CardContent className="flex flex-col gap-2 p-5">
                  <Badge className="w-fit rounded-full px-3 py-1">2</Badge>
                  <p className="text-base font-semibold text-foreground">Add your best links</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Highlight the channels, offers, content, and contact points that matter most.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/70 bg-background/60">
                <CardContent className="flex flex-col gap-2 p-5">
                  <Badge className="w-fit rounded-full px-3 py-1">3</Badge>
                  <p className="text-base font-semibold text-foreground">Share everywhere</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Give people one place to connect with you, discover your work, and take action.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-3">
              <Button asChild variant="outline" className="rounded-2xl">
                <Link to="/u/679c9f686c20cfe813435e8b">View sample page</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default Home;
