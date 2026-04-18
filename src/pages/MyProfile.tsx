import React from "react";
import {
  UserIcon,
  Mail01Icon,
  AtIcon,
  Calendar03Icon,
  Shield01Icon,
  Edit01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import Header from "../components/layout/Header";
import { useProfile } from "../context/ProfileContext";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import ProfileEditDrawer from "../components/ProfileEditDrawer";
import AvatarUpload from "../components/AvatarUpload";

const MyProfile: React.FC = () => {
  const { userProfile: user, isLoading } = useProfile();
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  if (isLoading && !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_62%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8">
        <Header />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your personal information and account settings.
            </p>
          </div>

          <Card className="overflow-hidden border-border/60 bg-card/60 shadow-sm">
            <CardHeader className="border-b border-border/40 bg-muted/20 pb-8 pt-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <AvatarUpload
                  name={user.name}
                  currentImage={user.profileImage}
                  avatarClassName="h-24 w-24 rounded-3xl border-4 border-background shadow-xl sm:h-32 sm:w-32"
                  fallbackClassName="bg-primary text-3xl font-bold text-primary-foreground sm:text-4xl"
                />
                
                <div className="flex flex-1 flex-col items-center gap-4 sm:items-start sm:pt-2">
                  <div className="flex flex-col items-center gap-2 sm:items-start">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                        {user.name}
                      </h2>
                      {user.isAdmin && (
                        <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                          Admin
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HugeiconsIcon icon={AtIcon} size={16} />
                      <span className="text-sm font-medium">{user.username || "no-username"}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="rounded-2xl border-border/70"
                    onClick={() => setIsEditOpen(true)}
                  >
                    <HugeiconsIcon icon={Edit01Icon} data-icon="inline-start" size={16} />
                    Edit Profile Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="grid gap-8 p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <HugeiconsIcon icon={Mail01Icon} size={14} />
                    Email Address
                  </div>
                  <p className="text-base font-medium text-foreground">{user.email}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <HugeiconsIcon icon={UserIcon} size={14} />
                    Display Name
                  </div>
                  <p className="text-base font-medium text-foreground">{user.name}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <HugeiconsIcon icon={Calendar03Icon} size={14} />
                    Account ID
                  </div>
                  <p className="font-mono text-sm font-medium text-foreground">{user._id}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <HugeiconsIcon icon={Shield01Icon} size={14} />
                    Account Status
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm font-medium text-foreground">Active</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-border/40" />

              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Security & Privacy
                </h3>
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">
                    Your account is secured with standard encryption. You can update your profile information anytime to change how you appear on your public profile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProfileEditDrawer 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
      />
    </main>
  );
};

export default MyProfile;
