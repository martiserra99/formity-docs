import { useCallback, useState } from "react";

import {
  Formity,
  type s,
  type Flow,
  type OnReturn,
  type ReturnOutput,
} from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "./components/form";
import { Output } from "./components/output";

type Schema = {
  render: React.ReactNode;
  struct: [
    s.Form<{ name: string; surname: string; age: number }>,
    s.Form<{ softwareDeveloper: string }>,
    s.Condition<{
      then: [
        s.Form<{ expertise: string }>,
        s.Return<{
          name: string;
          surname: string;
          age: number;
          softwareDeveloper: true;
          expertise: string;
        }>,
      ];
      else: [
        s.Form<{ interested: string }>,
        s.Return<{
          name: string;
          surname: string;
          age: number;
          softwareDeveloper: false;
          interested: string;
        }>,
      ];
    }>,
  ];
  inputs: Record<never, never>;
  params: Record<never, never>;
};

const flow: Flow<Schema> = [
  {
    form: {
      fields: () => ({
        name: ["", []],
        surname: ["", []],
        age: [20, []],
      }),
      render: ({ fields, onBack, onNext }) => (
        <Form
          key="yourself"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              name: z.string().nonempty("Required"),
              surname: z.string().nonempty("Required"),
              age: z.number().min(18, "Min. 18").max(99, "Max. 99"),
            }),
          )}
          heading="Tell us about yourself"
          content={[
            {
              type: "columns",
              columns: [
                {
                  type: "input",
                  name: "name",
                  label: "Name",
                  placeholder: "Your name",
                },
                {
                  type: "input",
                  name: "surname",
                  label: "Surname",
                  placeholder: "Your surname",
                },
              ],
            },
            {
              type: "number",
              name: "age",
              label: "Age",
              placeholder: "Your age",
            },
          ]}
          buttons={{
            back: null,
            next: "Next",
          }}
          onBack={onBack}
          onNext={onNext}
        />
      ),
    },
  },
  {
    form: {
      fields: () => ({
        softwareDeveloper: ["", []],
      }),
      render: ({ fields, onBack, onNext }) => (
        <Form
          key="softwareDeveloper"
          defaultValues={fields}
          resolver={zodResolver(
            z.object({
              softwareDeveloper: z.string().nonempty("Required"),
            }),
          )}
          heading="Are you a software developer?"
          content={[
            {
              type: "select",
              name: "softwareDeveloper",
              label: "Software Developer",
              placeholder: "Select an option",
              options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ],
            },
          ]}
          buttons={{
            back: "Back",
            next: "Next",
          }}
          onBack={onBack}
          onNext={onNext}
        />
      ),
    },
  },
  {
    condition: {
      if: ({ softwareDeveloper }) => softwareDeveloper === "yes",
      then: [
        {
          form: {
            fields: () => ({
              expertise: ["", []],
            }),
            render: ({ fields, onBack, onNext }) => (
              <Form
                key="expertise"
                defaultValues={fields}
                resolver={zodResolver(
                  z.object({
                    expertise: z.string().nonempty("Required"),
                  }),
                )}
                heading="What is your area of expertise?"
                content={[
                  {
                    type: "select",
                    name: "expertise",
                    label: "Expertise",
                    placeholder: "Select an option",
                    options: [
                      { value: "frontend", label: "Frontend development" },
                      { value: "backend", label: "Backend development" },
                      { value: "mobile", label: "Mobile development" },
                    ],
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Submit",
                }}
                onBack={onBack}
                onNext={onNext}
              />
            ),
          },
        },
        {
          return: ({ name, surname, age, expertise }) => ({
            name,
            surname,
            age,
            softwareDeveloper: true,
            expertise,
          }),
        },
      ],
      else: [
        {
          form: {
            fields: () => ({
              interested: ["", []],
            }),
            render: ({ fields, onBack, onNext }) => (
              <Form
                key="interested"
                defaultValues={fields}
                resolver={zodResolver(
                  z.object({
                    interested: z.string().nonempty("Required"),
                  }),
                )}
                heading="Are you interested in learning how to code?"
                content={[
                  {
                    type: "select",
                    name: "interested",
                    label: "Interested",
                    placeholder: "Select an option",
                    options: [
                      { value: "yes", label: "Yes, I am interested." },
                      { value: "no", label: "No, it is not for me." },
                      { value: "maybe", label: "Maybe, I am not sure." },
                    ],
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Submit",
                }}
                onBack={onBack}
                onNext={onNext}
              />
            ),
          },
        },
        {
          return: ({ name, surname, age, interested }) => ({
            name,
            surname,
            age,
            softwareDeveloper: false,
            interested,
          }),
        },
      ],
    },
  },
];

export default function App() {
  const [output, setOutput] = useState<ReturnOutput<Schema> | null>(null);

  const onReturn = useCallback<OnReturn<Schema>>((output) => {
    setOutput(output);
  }, []);

  if (output) {
    return <Output output={output} onStart={() => setOutput(null)} />;
  }

  return <Formity<Schema> flow={flow} onReturn={onReturn} />;
}
