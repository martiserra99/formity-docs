import { tv } from "tailwind-variants";

export const inputClasses = tv({
  base: "w-full appearance-none rounded-lg border bg-neutral-900/50 px-3.5 py-2.5 font-sans text-sm text-white transition-[border-color,box-shadow,background-color] duration-150 outline-none placeholder:text-neutral-600",
  variants: {
    error: {
      false:
        "border-neutral-800 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10",
      true: "border-red-400/50 focus:border-red-400 focus:ring-3 focus:ring-red-400/10",
    },
  },
});

export const errorClasses = tv({
  base: "font-sans text-xs leading-tight text-red-400",
});
