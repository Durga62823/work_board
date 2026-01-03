"use client";

import { useState } from "react";
import Image from "next/image";

interface UserProfileProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function UserProfile({ name, email, image }: UserProfileProps) {
  const [imageError, setImageError] = useState(false);
  const initial = (name || email)?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-muted/50">
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold overflow-hidden">
        {image && !imageError ? (
          <Image
            src={image}
            alt={name || email || "User"}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            unoptimized
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {name || email?.split('@')[0] || "User"}
        </p>
        <p className="text-xs text-muted-foreground truncate">{email || "No email"}</p>
      </div>
    </div>
  );
}
