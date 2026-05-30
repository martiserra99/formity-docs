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
          className="flex h-10 w-full items-center justify-center rounded-lg bg-gray-950 px-6 text-sm font-semibold text-white outline-2 outline-transparent transition-all hover:outline-offset-2 hover:outline-gray-200 focus-visible:outline-offset-2 focus-visible:outline-gray-950 disabled:pointer-events-none disabled:opacity-40"
          onClick={onStart}
        >
          Start Again
        </button>
      </div>
    </div>
  );
}
