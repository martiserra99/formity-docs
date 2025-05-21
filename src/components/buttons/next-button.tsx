import type { ComponentPropsWithoutRef } from "react";

import { Button } from "../button";

export function NextButton({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <Button type="submit" variant="primary" {...props}>
      {children}
    </Button>
  );
}
