import type { ReactNode } from "react";
import type { OnNext, OnBack } from "@formity/react";

import { useMemo } from "react";

import type { MultiStepValue } from "./multi-step-value";
import { MultiStepContext } from "./multi-step-context";

interface MultiStepProps<T extends Record<string, unknown>> {
  onNext: OnNext<T>;
  onBack: OnBack<T>;
  children: ReactNode;
}

export function MultiStep<T extends Record<string, unknown>>({
  onNext,
  onBack,
  children,
}: MultiStepProps<T>) {
  const values = useMemo(
    () => ({ onNext, onBack }),
    [onNext, onBack],
  ) as MultiStepValue<Record<string, unknown>>;
  return (
    <MultiStepContext.Provider value={values}>
      {children}
    </MultiStepContext.Provider>
  );
}
