import type { OnNext, OnBack } from "@formity/react";

export interface MultiStepValue<T extends Record<string, unknown>> {
  onNext: OnNext<T>;
  onBack: OnBack<T>;
}
