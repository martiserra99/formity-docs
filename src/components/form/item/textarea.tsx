import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as Label from "@radix-ui/react-label";

import { cn } from "@/lib/cn";

import { inputClasses, errorClasses } from "./classes";

export interface Textarea {
  type: "textarea";
  name: string;
  label: string;
  placeholder: string;
  optional?: boolean;
}

export function TextareaView({ name, label, placeholder, optional }: Textarea) {
  const id = useId();
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <Label.Root
            htmlFor={id}
            className="block text-xs font-bold text-neutral-400 uppercase"
          >
            <>{label}</>
            {optional && (
              <span className="text-xs font-normal text-neutral-500 normal-case">
                {" "}
                — optional
              </span>
            )}
          </Label.Root>
          <textarea
            id={id}
            placeholder={placeholder}
            className={cn(
              inputClasses({ error: Boolean(error) }),
              "min-h-20 resize-y",
            )}
            {...field}
          />
          {error && <span className={errorClasses()}>↳ {error.message}</span>}
        </div>
      )}
    />
  );
}
