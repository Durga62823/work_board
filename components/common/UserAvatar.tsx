"use client";

import { useState } from "react";
import Image from "next/image";

interface UserAvatarProps {
  image?: string | null;
  name?: string | null;
  email?: string | null;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ image, name, email, size = "lg" }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "h-12 w-12 text-xl",
    md: "h-20 w-20 text-2xl",
    lg: "h-24 w-24 md:h-32 md:w-32 text-3xl md:text-4xl",
  };

  const initial = (name || email)?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} rounded-full bg-primary-foreground/20 backdrop-blur-sm border-4 border-primary-foreground/30 flex items-center justify-center text-primary-foreground font-bold overflow-hidden shadow-2xl`}>
        {image && !imageError ? (
          <Image
            src={image}
            alt={name || email || "User"}
            width={128}
            height={128}
            className="w-full h-full object-cover"
            unoptimized
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-background shadow-lg">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
      </div>
    </div>
  );
}
