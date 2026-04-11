import React, { useState } from "react";
import { toast } from "sonner";
import { PlusSignIcon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
import { Label } from "./ui/label";
import { API } from "../configs";
import { useAuth } from "../context/AuthContext";

interface AddLinkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddLinkDrawer: React.FC<AddLinkDrawerProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url) {
      toast.error("Please fill in the required fields", {
        description: "Link name and URL are mandatory.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API.BE.CUSTOMERS.PROD}/connections`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add link");
      }

      toast.success("Link added successfully!", {
        description: `${formData.name} has been added to your profile.`,
      });
      
      setFormData({ name: "", description: "", url: "" });
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Error adding link", {
        description: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="mx-auto max-w-2xl px-4 pb-8">
        <DrawerHeader className="text-left sm:text-center">
          <DrawerTitle className="text-2xl font-bold">Add New Link</DrawerTitle>
          <DrawerDescription>
            Enter the details of the social link or website you want to share.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Link Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. My Portfolio, Instagram, GitHub"
              value={formData.name}
              onChange={handleChange}
              className="rounded-2xl border-border/70 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="A short tagline or description"
              value={formData.description}
              onChange={handleChange}
              className="rounded-2xl border-border/70 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="url" className="text-sm font-medium">
              Link URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
              className="rounded-2xl border-border/70 focus-visible:ring-primary"
            />
          </div>

          <DrawerFooter className="px-0 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-2xl text-base shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <>
                  <HugeiconsIcon icon={Loading03Icon} className="mr-2 animate-spin" />
                  Adding Link...
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={PlusSignIcon} className="mr-2" />
                  Save Link
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="h-12 w-full rounded-2xl text-muted-foreground"
            >
              Cancel
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddLinkDrawer;
