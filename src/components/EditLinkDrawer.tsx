import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loading03Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
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
import { Connection } from "../types";
import { getPlatformMeta, ICON_OPTIONS } from "../utils";
import IconSelectorTray from "./IconSelectorTray";

interface EditLinkDrawerProps {
  connection: Connection | null;
  onClose: () => void;
  onSuccess: (updated: Connection) => void;
}

const EditLinkDrawer: React.FC<EditLinkDrawerProps> = ({
  connection,
  onClose,
  onSuccess,
}) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isIconTrayOpen, setIsIconTrayOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    iconName: "",
  });

  useEffect(() => {
    if (connection) {
      setFormData({
        name: connection.name,
        description: connection.description ?? "",
        url: connection.url,
        iconName: connection.iconName ?? "",
      });
    }
  }, [connection]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url || !connection) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API.BE.CUSTOMERS.PROD}/connections/${connection._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token || "",
          },
          body: JSON.stringify({
            name: formData.name,
            url: formData.url,
            ...(formData.description && { description: formData.description }),
            ...(formData.iconName && { iconName: formData.iconName }),
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update link");
      }

      toast.success("Link updated!", {
        description: `${formData.name} has been saved.`,
      });
      onSuccess({ ...connection, ...formData });
      onClose();
    } catch (error) {
      toast.error("Error updating link", {
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedIconOption = ICON_OPTIONS.find(
    (o) => o.name === formData.iconName,
  );
  const previewIcon = getPlatformMeta(
    formData.url,
    formData.name,
    formData.iconName || undefined,
  ).icon;

  return (
    <>
      <Drawer open={!!connection} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="mx-auto max-w-2xl px-4 pb-8">
          <DrawerHeader className="text-left sm:text-center">
            <DrawerTitle className="text-2xl font-bold">Edit Link</DrawerTitle>
            <DrawerDescription>
              Update the details of your connection.
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Icon</Label>
              <button
                type="button"
                onClick={() => setIsIconTrayOpen(true)}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <HugeiconsIcon
                    icon={previewIcon}
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {selectedIconOption
                    ? selectedIconOption.label
                    : "Auto-detect or choose manually"}
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">
                Link Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-name"
                name="name"
                placeholder="e.g. My Portfolio, Instagram, GitHub"
                value={formData.name}
                onChange={handleChange}
                className="rounded-2xl border-border/70 focus-visible:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="edit-description"
                name="description"
                placeholder="A short tagline or description"
                value={formData.description}
                onChange={handleChange}
                className="rounded-2xl border-border/70 focus-visible:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-url" className="text-sm font-medium">
                Link URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-url"
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
                    <HugeiconsIcon
                      icon={Loading03Icon}
                      className="mr-2 animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={PencilEdit01Icon} className="mr-2" />
                    Save Changes
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

      <IconSelectorTray
        isOpen={isIconTrayOpen}
        onClose={() => setIsIconTrayOpen(false)}
        selectedIcon={formData.iconName}
        onSelect={(iconName) => setFormData((prev) => ({ ...prev, iconName }))}
      />
    </>
  );
};

export default EditLinkDrawer;
