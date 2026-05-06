import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as Label from "@radix-ui/react-label";

import { inputClasses, errorClasses } from "./classes";

export interface Input {
  type: "input";
  name: string;
  label: string;
  placeholder: string;
  optional?: boolean;
}

export function InputView({ name, label, placeholder, optional }: Input) {
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
          <input
            id={id}
            placeholder={placeholder}
            className={inputClasses({ error: Boolean(error) })}
            {...field}
          />
          {error && <span className={errorClasses()}>↳ {error.message}</span>}
        </div>
      )}
    />
  );
}
