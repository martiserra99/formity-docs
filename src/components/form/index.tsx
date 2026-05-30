import type { DefaultValues, Resolver } from "react-hook-form";
import type { OnBack, OnNext } from "@formity/react";

import { useForm, FormProvider } from "react-hook-form";

import { ItemView, type Item } from "./item";

interface FormProps<T extends Record<string, unknown>> {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  heading: string;
  content: Item[];
  buttons: {
    back: string | null;
    next: string;
  };
  onBack: OnBack<T>;
  onNext: OnNext<T>;
}

export function Form<T extends Record<string, unknown>>({
  defaultValues,
  resolver,
  heading,
  content,
  buttons,
  onBack,
  onNext,
}: FormProps<T>) {
  const form = useForm({ defaultValues, resolver });
  return (
    <form
      onSubmit={form.handleSubmit(onNext)}
      className="flex h-screen w-full items-center justify-center px-4 py-8"
      autoComplete="off"
    >
      <FormProvider {...form}>
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-4xl font-bold text-gray-950">
            {heading}
          </h2>
          <div className="mb-6 flex flex-col gap-4">
            {content.map((field, index) => (
              <ItemView key={index} {...field} />
            ))}
          </div>
          <div className="flex gap-4">
            {buttons.back && (
              <button
                type="button"
                onClick={() => onBack(form.getValues())}
                className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-200 px-6 text-sm font-semibold text-gray-950 outline-2 outline-transparent transition-all hover:outline-offset-2 hover:outline-gray-200 focus-visible:outline-offset-2 focus-visible:outline-gray-950 disabled:pointer-events-none disabled:opacity-40"
              >
                {buttons.back}
              </button>
            )}
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-lg bg-gray-950 px-6 text-sm font-semibold text-white outline-2 outline-transparent transition-all hover:outline-offset-2 hover:outline-gray-200 focus-visible:outline-offset-2 focus-visible:outline-gray-950 disabled:pointer-events-none disabled:opacity-40"
            >
              {buttons.next}
            </button>
          </div>
        </div>
      </FormProvider>
    </form>
  );
}
