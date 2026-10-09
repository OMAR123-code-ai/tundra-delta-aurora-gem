import { useEffect, useState } from "react";
import { rehydrateStore, useDbs } from "@/lib/store";

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    rehydrateStore();
    if (useDbs.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return useDbs.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}
