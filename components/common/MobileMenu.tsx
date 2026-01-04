"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MobileMenuProps {
  navigation: NavItem[];
}

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <HiOutlineX className="h-6 w-6" />
        ) : (
          <HiOutlineMenu className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-xl md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-lg font-semibold text-foreground">
                Menu
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <HiOutlineX className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
