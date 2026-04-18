import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";

import { ICON_OPTIONS } from "../utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "./ui/drawer";
import { cn } from "../lib/utils";

interface IconSelectorTrayProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIcon?: string;
  onSelect: (iconName: string) => void;
}

const IconSelectorTray: React.FC<IconSelectorTrayProps> = ({
  isOpen,
  onClose,
  selectedIcon,
  onSelect,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="mx-auto max-w-2xl px-4 pb-8">
        <DrawerHeader className="text-left sm:text-center">
          <DrawerTitle className="text-xl font-bold">Choose an Icon</DrawerTitle>
          <DrawerDescription>
            Select an icon to represent this connection.
          </DrawerDescription>
        </DrawerHeader>

        <div className="grid grid-cols-4 gap-3 p-4 sm:grid-cols-6">
          {ICON_OPTIONS.map((option) => {
            const isSelected = selectedIcon === option.name;
            return (
              <button
                key={option.name}
                onClick={() => {
                  onSelect(option.name);
                  onClose();
                }}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/70 bg-card hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                {isSelected && (
                  <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <HugeiconsIcon icon={Tick01Icon} size={10} strokeWidth={2.5} />
                  </span>
                )}
                <HugeiconsIcon icon={option.icon} size={22} strokeWidth={1.8} />
                <span className="text-center text-[10px] font-medium leading-tight text-muted-foreground">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default IconSelectorTray;
