import { useCallback, useState } from "react";

import { Formity, type OnReturn, type ReturnOutput } from "@formity/react";

import { Output } from "./components/output";

import { schema, type Values } from "./schema";

export default function App() {
  const [output, setOutput] = useState<ReturnOutput<Values> | null>(null);

  const onReturn = useCallback<OnReturn<Values>>((output) => {
    setOutput(output);
  }, []);

  if (output) {
    return <Output output={output} onStart={() => setOutput(null)} />;
  }

  return <Formity<Values> schema={schema} onReturn={onReturn} />;
}
