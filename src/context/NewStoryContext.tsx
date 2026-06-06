"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";

interface NewStoryContextValue {
  canPublish: boolean;
  setCanPublish: (v: boolean) => void;
  triggerPublish: () => void;
  registerPublish: (fn: () => void) => void;
  publishLabel: string;
  setPublishLabel: (v: string) => void;
}

const NewStoryContext = createContext<NewStoryContextValue>({
  canPublish: false,
  setCanPublish: () => {},
  triggerPublish: () => {},
  registerPublish: () => {},
  publishLabel: "Publish",
  setPublishLabel: () => {},
});

export function NewStoryProvider({ children }: { children: React.ReactNode }) {
  const [canPublish, setCanPublish] = useState(false);
  const [publishLabel, setPublishLabel] = useState("Publish");
  const publishFnRef = useRef<() => void>(() => {});

  const registerPublish = useCallback((fn: () => void) => {
    publishFnRef.current = fn;
  }, []);

  const triggerPublish = useCallback(() => {
    publishFnRef.current();
  }, []);

  return (
    <NewStoryContext.Provider
      value={{ canPublish, setCanPublish, triggerPublish, registerPublish, publishLabel, setPublishLabel }}
    >
      {children}
    </NewStoryContext.Provider>
  );
}

export function useNewStory() {
  return useContext(NewStoryContext);
}
