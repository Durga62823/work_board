"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiUser, HiCog6Tooth, HiArrowRightOnRectangle } from "react-icons/hi2";
import { UserProfile } from "./UserProfile";
import { LogoutButton } from "./LogoutButton";
import Image from "next/image";

export function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  const user = session?.user;
  const name = user?.name;
  const email = user?.email;
  const image = user?.image;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
    return undefined;
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold overflow-hidden">
          {image && !imageError ? (
            <Image
              src={image}
              alt={name || email || "User"}
              width={32}
              height={32}
              className="w-full h-full object-cover"
              unoptimized
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-sm">{(name || email)?.charAt(0).toUpperCase() || "U"}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-12 bottom-0 mb-0 w-64 bg-card rounded-lg shadow-lg border border-border z-50">
          <div className="p-4 border-b border-border">
            <UserProfile name={name} email={email} image={image} />
          </div>

          <nav className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <HiUser className="h-4 w-4" />
              View Profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <HiCog6Tooth className="h-4 w-4" />
              Settings
            </Link>
          </nav>

          <div className="p-2 border-t border-border">
            <LogoutButton
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            />
          </div>
        </div>
      )}
    </div>
  );
}
