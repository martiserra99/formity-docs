import type { ReactNode } from "react";
import type { DefaultValues, Resolver } from "react-hook-form";

import { FormProvider, useForm } from "react-hook-form";
import { useMultiStep } from "@/multi-step";

interface FormStepProps<T extends Record<string, unknown>> {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  children: ReactNode;
}

export function FormStep<T extends Record<string, unknown>>({
  defaultValues,
  resolver,
  children,
}: FormStepProps<T>) {
  const form = useForm({ defaultValues, resolver });
  const { onNext } = useMultiStep();
  return (
    <form
      onSubmit={form.handleSubmit(onNext)}
      className="relative flex h-screen w-full items-center justify-center px-4 py-8 font-sans"
    >
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}

interface FormStepContentProps {
  children: ReactNode;
}

export function FormStepContent({ children }: FormStepContentProps) {
  return <div className="w-full max-w-md">{children}</div>;
}

interface FormStepHeadingProps {
  children: ReactNode;
}

export function FormStepHeading({ children }: FormStepHeadingProps) {
  return (
    <h2 className="mb-6 text-center text-4xl font-semibold text-white">
      {children}
    </h2>
  );
}

interface FormStepInputsProps {
  children: ReactNode;
}

export function FormStepInputs({ children }: FormStepInputsProps) {
  return <div className="mb-6 flex flex-col gap-4">{children}</div>;
}

interface FormStepRowProps {
  children: ReactNode;
}

export function FormStepRow({ children }: FormStepRowProps) {
  return <div className="flex gap-4">{children}</div>;
}
