import { tv } from "tailwind-variants";

export const inputClasses = tv({
  base: "w-full appearance-none rounded-lg border bg-white px-4 py-2.5 font-sans text-sm font-medium text-gray-950 transition-all outline-none placeholder:text-gray-400",
  variants: {
    error: {
      false:
        "border-gray-200 focus-visible:border-gray-400 focus-visible:ring-2 focus-visible:ring-gray-400/15",
      true: "border-red-300 focus-visible:border-red-400 focus-visible:ring-2 focus-visible:ring-red-400/15",
    },
  },
});

export const errorClasses = tv({
  base: "font-sans text-xs leading-tight font-medium text-red-500",
});
