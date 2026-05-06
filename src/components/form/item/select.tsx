import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import * as Label from "@radix-ui/react-label";
import * as RadixSelect from "@radix-ui/react-select";

import { cn } from "@/lib/cn";

import { inputClasses, errorClasses } from "./classes";

export interface Select {
  type: "select";
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  optional?: boolean;
}

export function SelectView({
  name,
  label,
  placeholder,
  options,
  optional,
}: Select) {
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
          <RadixSelect.Root value={field.value} onValueChange={field.onChange}>
            <RadixSelect.Trigger
              id={id}
              className={cn(
                inputClasses({ error: Boolean(error) }),
                "flex cursor-pointer items-center justify-between data-placeholder:text-neutral-600",
              )}
            >
              <RadixSelect.Value placeholder={placeholder} />
              <RadixSelect.Icon asChild>
                <ChevronDown
                  size={14}
                  className="shrink-0 text-neutral-400 transition-transform duration-150 group-data-[state=open]:rotate-180"
                />
              </RadixSelect.Icon>
            </RadixSelect.Trigger>
            <RadixSelect.Portal>
              <RadixSelect.Content
                position="popper"
                sideOffset={4}
                className="z-50 w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950"
              >
                <RadixSelect.Viewport className="bg-neutral-900/50 p-1">
                  {options.map((option) => (
                    <RadixSelect.Item
                      key={option.value}
                      value={option.value}
                      className="relative flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-white outline-none select-none data-disabled:pointer-events-none data-disabled:text-neutral-600 data-highlighted:bg-neutral-800"
                    >
                      <RadixSelect.ItemText>
                        {option.label}
                      </RadixSelect.ItemText>
                    </RadixSelect.Item>
                  ))}
                </RadixSelect.Viewport>
              </RadixSelect.Content>
            </RadixSelect.Portal>
          </RadixSelect.Root>
          {error && <span className={errorClasses()}>↳ {error.message}</span>}
        </div>
      )}
    />
  );
}
