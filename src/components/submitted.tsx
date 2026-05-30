interface SubmittedProps {
  onStart: () => void;
}

export function Submitted({ onStart }: SubmittedProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4 py-8 font-sans">
      <div className="flex w-full max-w-md flex-col items-center">
        <h2 className="mb-6 text-center text-4xl font-bold text-gray-950">
          Thanks for your submission!
        </h2>
        <button
          onClick={onStart}
          className="flex h-10 items-center justify-center rounded-lg bg-gray-950 px-6 text-sm font-semibold text-white outline-2 outline-transparent transition-all hover:outline-offset-2 hover:outline-gray-200 focus-visible:outline-offset-2 focus-visible:outline-gray-950 disabled:pointer-events-none disabled:opacity-40"
        >
          Start Again
        </button>
      </div>
    </div>
  );
}
