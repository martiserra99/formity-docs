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
      className="color-scheme-dark flex h-screen w-full items-center justify-center px-4 py-8"
      autoComplete="off"
    >
      <FormProvider {...form}>
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-4xl font-semibold text-white">
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
                className="bg-neutral-90 w-full rounded-xl border border-neutral-800 px-6 py-2 text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {buttons.back}
              </button>
            )}
            <button
              type="submit"
              className="w-full rounded-xl border border-transparent bg-blue-500 px-6 py-2 text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {buttons.next}
            </button>
          </div>
        </div>
      </FormProvider>
    </form>
  );
}
