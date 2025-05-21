import type { ReactNode } from "react";
import type { OnNext, OnBack } from "@formity/react";

import { useMemo } from "react";

import { MultiStepContext } from "./multi-step-context";

interface MultiStepProps {
  onNext: OnNext;
  onBack: OnBack;
  children: ReactNode;
}

export function MultiStep({ onNext, onBack, children }: MultiStepProps) {
  const values = useMemo(() => ({ onNext, onBack }), [onNext, onBack]);
  return (
    <MultiStepContext.Provider value={values}>
      {children}
    </MultiStepContext.Provider>
  );
}
