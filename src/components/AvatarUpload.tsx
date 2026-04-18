import React, { useRef, useState } from "react";
import { ImageUploadIcon, Camera01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { API } from "../configs";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

const MAX_SIZE = 800; // px
const QUALITY = 0.7;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", QUALITY));
    };
    img.onerror = reject;
    img.src = url;
  });
}

interface AvatarUploadProps {
  name: string;
  currentImage?: string;
  className?: string;
  avatarClassName?: string;
  fallbackClassName?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  name,
  currentImage,
  className,
  avatarClassName,
  fallbackClassName,
}) => {
  const { token } = useAuth();
  const { refreshProfile } = useProfile();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentImage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const base64 = await compressImage(file);
      setPreview(base64);

      const response = await fetch(API.BE.ME.PROD, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({ profileImage: base64 }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Upload failed");
      }

      await refreshProfile();
      toast.success("Profile picture updated!");
    } catch (err) {
      setPreview(currentImage);
      toast.error("Failed to update picture", {
        description: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setIsUploading(false);
      // reset so same file can be re-selected
      e.target.value = "";
    }
  };

  return (
    <div className={`relative cursor-pointer ${className ?? ""}`} onClick={() => inputRef.current?.click()}>
      <Avatar className={avatarClassName}>
        <AvatarImage src={preview} alt={name} />
        <AvatarFallback className={fallbackClassName}>
          {name.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-black/40 opacity-0 transition-opacity hover:opacity-100">
        {isUploading ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <HugeiconsIcon icon={ImageUploadIcon} size={22} className="text-white" strokeWidth={1.8} />
        )}
      </div>

      {/* always-visible camera badge */}
      {!isUploading && (
        <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md">
          <HugeiconsIcon icon={Camera01Icon} size={13} strokeWidth={2} />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUpload;
