"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getUserSettings } from "@/app/actions/get-user-settings";

type Preferences = {
  darkMode: boolean;
  compactView: boolean;
  timezone: string;
  language: string;
};

type SettingsContextType = {
  preferences: Preferences;
  setPreferences: (prefs: Preferences) => void;
  isLoading: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>({
    darkMode: false,
    compactView: false,
    timezone: "UTC (GMT+0:00)",
    language: "English",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getUserSettings();
        setPreferences(settings.preferences);
        
        // Apply dark mode
        if (settings.preferences.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    // Apply dark mode whenever it changes
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  return (
    <SettingsContext.Provider value={{ preferences, setPreferences, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
