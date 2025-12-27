"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HiUser, HiCog6Tooth, HiArrowRightOnRectangle, HiChevronDown } from "react-icons/hi2";
import { UserProfile } from "./UserProfile";
import { LogoutButton } from "./LogoutButton";

interface UserMenuProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function UserMenu({ name, email, image }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <HiUser className="h-4 w-4" />
          )}
        </div>
        <HiChevronDown
          className={`h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <UserProfile name={name} email={email} image={image} />
          </div>

          <nav className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <HiUser className="h-4 w-4" />
              View Profile
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <HiCog6Tooth className="h-4 w-4" />
              Settings
            </Link>
          </nav>

          <div className="p-2 border-t border-gray-100 dark:border-gray-800">
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
