interface SubmittedProps {
  onStart: () => void;
}

export function Submitted({ onStart }: SubmittedProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4 py-8 font-sans">
      <div className="flex w-full max-w-md flex-col items-center">
        <h2 className="mb-6 text-center text-4xl font-semibold text-white">
          Thanks for your submission!
        </h2>
        <button
          onClick={onStart}
          className="w-full max-w-max rounded-xl border border-transparent bg-blue-500 px-6 py-2 text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Start Again
        </button>
      </div>
    </div>
  );
}
