import { Highlight } from "prism-react-renderer";

import { cn } from "@/lib/cn";

interface Output<T> {
  output: T;
  onStart: () => void;
}

export function Output<T>({ output, onStart }: Output<T>) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4 py-8 font-sans">
      <div className="flex w-full max-w-md flex-col gap-4">
        <div className="scrollbar-hide max-h-96 w-full overflow-auto rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3">
          <Highlight
            code={JSON.stringify(output, null, 2)}
            language="json"
            theme={{ plain: {}, styles: [] }}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cn(
                  className,
                  "flex overflow-x-auto font-mono text-base leading-[170%]",
                )}
                style={style}
              >
                <code>
                  {tokens.map((line, lineIndex) => (
                    <div key={lineIndex} {...getLineProps({ line })}>
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </div>
        <button
          type="button"
          className="w-full rounded-xl border border-transparent bg-blue-500 px-6 py-2 text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onStart}
        >
          Start Again
        </button>
      </div>
    </div>
  );
}
