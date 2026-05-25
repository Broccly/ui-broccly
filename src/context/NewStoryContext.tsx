"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";

interface NewStoryContextValue {
  canPublish: boolean;
  setCanPublish: (v: boolean) => void;
  triggerPublish: () => void;
  registerPublish: (fn: () => void) => void;
}

const NewStoryContext = createContext<NewStoryContextValue>({
  canPublish: false,
  setCanPublish: () => {},
  triggerPublish: () => {},
  registerPublish: () => {},
});

export function NewStoryProvider({ children }: { children: React.ReactNode }) {
  const [canPublish, setCanPublish] = useState(false);
  const publishFnRef = useRef<() => void>(() => {});

  const registerPublish = useCallback((fn: () => void) => {
    publishFnRef.current = fn;
  }, []);

  const triggerPublish = useCallback(() => {
    publishFnRef.current();
  }, []);

  return (
    <NewStoryContext.Provider value={{ canPublish, setCanPublish, triggerPublish, registerPublish }}>
      {children}
    </NewStoryContext.Provider>
  );
}

export function useNewStory() {
  return useContext(NewStoryContext);
}
