import type { ComponentPropsWithoutRef } from "react";

import { useFormContext } from "react-hook-form";

import { Button } from "../button";
import { useMultiStep } from "@/multi-step";

export function BackButton<T extends Record<string, unknown>>(
  props: ComponentPropsWithoutRef<"button">,
) {
  const { getValues } = useFormContext<T>();
  const { onBack } = useMultiStep<T>();
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => onBack(getValues())}
      {...props}
    />
  );
}
