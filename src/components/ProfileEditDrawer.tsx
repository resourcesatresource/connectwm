import React, { useState, useEffect } from "react";
import { UserIcon, Edit01Icon, AtIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { API } from "../configs";

interface ProfileEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProfileValues = {
  name: string;
  username: string;
};

type ProfileErrors = Partial<Record<keyof ProfileValues, string>>;

const ProfileEditDrawer: React.FC<ProfileEditDrawerProps> = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const { userProfile, refreshProfile } = useProfile();
  const [name, setName] = useState(userProfile?.name || "");
  const [username, setUsername] = useState(userProfile?.username || "");
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && userProfile) {
      setName(userProfile.name);
      setUsername(userProfile.username || "");
      setErrors({});
    }
  }, [isOpen, userProfile]);

  const validateForm = () => {
    const nextErrors: ProfileErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Display name is required.";
    }

    if (!username.trim()) {
      nextErrors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      nextErrors.username = "Username can only contain letters, numbers, and underscores.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API.BE.USERS.PROD}/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ name, username }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (errorData.message && errorData.message.toLowerCase().includes("username")) {
          setErrors({ username: errorData.message });
          return;
        }
        
        throw new Error(errorData.message || "Failed to update profile.");
      }

      await refreshProfile();
      toast.success("Profile updated successfully");
      onClose();
    } catch (err) {
      toast.error("Error updating profile", {
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="mx-auto max-w-lg rounded-t-[2.5rem] border-border/70 bg-background">
        <div className="flex max-h-[85vh] flex-col overflow-y-auto px-6 py-4 scrollbar-none">
          <DrawerHeader className="px-0 pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HugeiconsIcon icon={UserIcon} size={32} strokeWidth={1.5} />
            </div>
            <DrawerTitle className="text-center text-2xl font-bold">Edit Profile</DrawerTitle>
            <DrawerDescription className="text-center text-base">
              Update your display name and choose a unique username.
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4">
            <FieldGroup className="flex flex-col gap-6">
              <Field data-invalid={!!errors.name}>
                <FieldLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Display Name
                </FieldLabel>
                <div className="relative mt-2">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                    <HugeiconsIcon icon={Edit01Icon} size={18} strokeWidth={2} />
                  </div>
                  <Input
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    className="h-12 rounded-2xl border-border/70 bg-muted/30 pl-11 text-base focus:ring-primary/20"
                    aria-invalid={!!errors.name}
                  />
                </div>
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.username}>
                <FieldLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Username
                </FieldLabel>
                <div className="relative mt-2">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                    <HugeiconsIcon icon={AtIcon} size={18} strokeWidth={2} />
                  </div>
                  <Input
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Choose a username"
                    className="h-12 rounded-2xl border-border/70 bg-muted/30 pl-11 text-base focus:ring-primary/20"
                    aria-invalid={!!errors.username}
                  />
                </div>
                {errors.username ? (
                  <FieldError>{errors.username}</FieldError>
                ) : (
                  <FieldDescription className="mt-2 text-xs text-muted-foreground">
                    This is your unique handle (e.g., @{username || "username"}). URL support for usernames is coming soon.
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            <DrawerFooter className="mt-4 px-0 pb-4">
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-2xl text-base font-semibold shadow-lg shadow-primary/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving changes..." : "Save Profile Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-2xl border-border/70 text-base font-semibold"
                onClick={onClose}
              >
                Cancel
              </Button>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileEditDrawer;
