import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft01Icon,
  Home01Icon,
  Search01Icon,
  GlobalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "../components/ui/button";
import Header from "../components/layout/Header";

const NotFound: React.FC = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8">
      {/* Dynamic Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.1),_transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] animate-pulse" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8">
        <Header />

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <span className="text-[200px] font-black tracking-tighter sm:text-[300px]">404</span>
            </div>
            
            <div className="relative flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl backdrop-blur-xl sm:h-44 sm:w-44">
              <div className="absolute inset-0 animate-spin-slow opacity-20">
                <HugeiconsIcon icon={GlobalIcon} size={120} className="text-primary" strokeWidth={1} />
              </div>
              <HugeiconsIcon icon={Search01Icon} size={64} className="relative text-primary sm:size-80" strokeWidth={1.5} />
            </div>
          </div>

          <div className="flex max-w-md flex-col gap-3 px-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Lost in the digital void?
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
              We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-2xl px-8 shadow-lg shadow-primary/20">
              <Link to="/">
                <HugeiconsIcon icon={Home01Icon} data-icon="inline-start" size={18} strokeWidth={2} />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-2xl border-border/70 px-8">
              <button onClick={() => window.history.back()} type="button">
                <HugeiconsIcon icon={ArrowLeft01Icon} data-icon="inline-start" size={18} strokeWidth={2} />
                Go Back
              </button>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 opacity-40 sm:grid-cols-4">
            <div className="flex flex-col items-center gap-2">
              <div className="h-1 w-12 rounded-full bg-primary/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Broken link</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-1 w-12 rounded-full bg-primary/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Misspelled URL</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-1 w-12 rounded-full bg-primary/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Outdated bookmark</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-1 w-12 rounded-full bg-primary/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Digital ghost</span>
            </div>
          </div>
        </div>
        
        <footer className="mt-auto pb-8 text-center">
          <p className="text-xs text-muted-foreground/50">
            &copy; {new Date().getFullYear()} ConnectWM. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default NotFound;
