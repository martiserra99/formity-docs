import type { ComponentPropsWithoutRef } from "react";

import { useFormContext } from "react-hook-form";

import { Button } from "../button";
import { useMultiStep } from "@/multi-step";

export function BackButton(props: ComponentPropsWithoutRef<"button">) {
  const { getValues } = useFormContext();
  const { onBack } = useMultiStep();
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => onBack(getValues())}
      {...props}
    />
  );
}
