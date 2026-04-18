import React from "react";
import {
  GithubIcon,
  GlobalIcon,
  Briefcase01Icon,
  Location01Icon,
  CodeIcon,
  Layers01Icon,
  DatabaseIcon,
  Settings01Icon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons";




import { HugeiconsIcon } from "@hugeicons/react";
import Assets from "../assets";


import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const DeveloperSection: React.FC = () => {
  const techStack = [
    {
      category: "Frontend",
      icon: Layers01Icon,
      skills: ["React", "React Native", "TypeScript", "Vue", "Tailwind", "Bootstrap", "Stencil"],
    },
    {
      category: "Backend",
      icon: CodeIcon,
      skills: ["Go (Fiber)", "Node.js (Express)", "REST", "gRPC"],
    },
    {
      category: "Database",
      icon: DatabaseIcon,
      skills: ["PostgreSQL", "MongoDB"],
    },
    {
      category: "DevOps / Tools",
      icon: Settings01Icon,
      skills: ["Docker", "GitHub Actions", "Netlify", "Render"],
    },
    {
      category: "Version Control",
      icon: GithubIcon,
      skills: ["Git", "GitHub"],
    },

  ];

  return (
    <section className="mt-12 flex flex-col gap-8 pb-12">
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Meet the Developer
        </h2>
        <p className="text-lg text-muted-foreground">
          Basically just a human that converts <strong>Diet Coke</strong> into these features.
        </p>

      </div>

      <Card className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-2xl">
        <CardHeader className="relative border-b border-border/50 bg-muted/30 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <Avatar className="h-16 w-16 shrink-0 rounded-[1.5rem] border-2 border-background shadow-xl">
                <AvatarImage src={Assets.images.avatar} alt="Saurav Sanjay" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  SS
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1.5">
                <CardTitle className="text-2xl sm:text-3xl">Saurav Sanjay</CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    <HugeiconsIcon icon={Briefcase01Icon} size={12} className="mr-1.5" />
                    Software Engineer
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-border/70 bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                    <HugeiconsIcon icon={Location01Icon} size={12} className="mr-1.5" />
                    India
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild size="sm" variant="outline" className="rounded-full border-border/70 group">
                <a href="https://github.com/saurav-sanjay" target="_blank" rel="noreferrer">
                  <HugeiconsIcon icon={GithubIcon} size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                  GitHub
                </a>
              </Button>
              <Button asChild size="sm" className="rounded-full shadow-lg shadow-primary/20 group">
                <a href="https://saurav-sanjay.github.io" target="_blank" rel="noreferrer">
                  <HugeiconsIcon icon={GlobalIcon} size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                  Portfolio
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-8 p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-widest text-[11px]">
              About the Creator
            </h3>
            <p className="text-base leading-7 text-muted-foreground">
              Currently working at <span className="font-semibold text-foreground">Unthinkable Solutions LLP</span> as an Associate Software Engineer. 
              Saurav is deeply passionate about building scalable, modern applications that create real-world impact. 
              He loves creating well-structured projects where clean code, consistent architecture, and maintainable design patterns are the priority.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-widest text-[11px]">
              Tech Stack & Expertise
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((category) => (
                <div key={category.category} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/40 p-5 transition-colors hover:bg-background/60">
                  <div className="flex items-center gap-3 text-primary">
                    <HugeiconsIcon icon={category.icon} size={18} strokeWidth={2} />
                    <span className="text-sm font-bold">{category.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-transparent text-[10px] font-medium uppercase tracking-wider">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 rounded-3xl border border-primary/20 bg-primary/5 p-6 text-center">
            <HugeiconsIcon icon={FavouriteIcon} size={20} className="text-primary/40" strokeWidth={2} />
            <p className="text-sm font-medium italic text-primary">
              "Each project tells a part of my learning journey. Thanks for stopping by!"
            </p>
          </div>




        </CardContent>
      </Card>
    </section>
  );
};

export default DeveloperSection;
