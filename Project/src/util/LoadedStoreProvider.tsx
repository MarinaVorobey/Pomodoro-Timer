import { ReactNode } from "react";
import { useGetFromStorage } from "../hooks/useGetFromStorage";

export function LoadedStoreProvider({ children }: { children: ReactNode }) {
  useGetFromStorage();

  return <>{children}</>;
}
