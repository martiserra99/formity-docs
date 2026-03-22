import { useContext } from "react";

import type { MultiStepValue } from "./multi-step-value";
import { MultiStepContext } from "./multi-step-context";

function useMultiStep<T extends Record<string, unknown>>(): MultiStepValue<T> {
  const context = useContext(MultiStepContext);
  if (!context) throw new Error("useMultiStep must be used within a MultiStep");
  return context as MultiStepValue<T>;
}

export { useMultiStep };
