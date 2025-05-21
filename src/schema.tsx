import type { Schema, Form, Return, Cond } from "@formity/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  FormStep,
  FormStepContent,
  FormStepHeading,
  FormStepInputs,
  FormStepRow,
} from "./components/form-step";

import { Select } from "./components/input/select";
import { TextInput } from "./components/input/text-input";
import { NumberInput } from "./components/input/number-input";
import { NextButton } from "./components/buttons/next-button";
import { BackButton } from "./components/buttons/back-button";

import { MultiStep } from "./multi-step";

export type Values = [
  Form<{ name: string; surname: string; age: number }>,
  Form<{ softwareDeveloper: string }>,
  Cond<{
    then: [
      Form<{ expertise: string }>,
      Return<{
        name: string;
        surname: string;
        age: number;
        softwareDeveloper: true;
        expertise: string;
      }>,
    ];
    else: [
      Form<{ interested: string }>,
      Return<{
        name: string;
        surname: string;
        age: number;
        softwareDeveloper: false;
        interested: string;
      }>,
    ];
  }>,
];

export const schema: Schema<Values> = [
  {
    form: {
      values: () => ({
        name: ["", []],
        surname: ["", []],
        age: [20, []],
      }),
      render: ({ values, onNext, onBack }) => (
        <MultiStep onNext={onNext} onBack={onBack}>
          <FormStep
            key="yourself"
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                name: z
                  .string()
                  .min(1, { message: "Required" })
                  .max(20, { message: "Must be at most 20 characters" }),
                surname: z
                  .string()
                  .min(1, { message: "Required" })
                  .max(20, { message: "Must be at most 20 characters" }),
                age: z
                  .number()
                  .min(18, { message: "Minimum of 18 years old" })
                  .max(99, { message: "Maximum of 99 years old" }),
              }),
            )}
          >
            <FormStepContent>
              <FormStepHeading>Tell us about yourself</FormStepHeading>
              <FormStepInputs>
                <FormStepRow>
                  <TextInput name="name" label="Name" placeholder="Your name" />
                  <TextInput
                    name="surname"
                    label="Surname"
                    placeholder="Your surname"
                  />
                </FormStepRow>
                <NumberInput name="age" label="Age" placeholder="Your age" />
              </FormStepInputs>
              <NextButton>Next</NextButton>
            </FormStepContent>
          </FormStep>
        </MultiStep>
      ),
    },
  },
  {
    form: {
      values: () => ({
        softwareDeveloper: ["yes", []],
      }),
      render: ({ values, onNext, onBack }) => (
        <MultiStep onNext={onNext} onBack={onBack}>
          <FormStep
            key="softwareDeveloper"
            defaultValues={values}
            resolver={zodResolver(
              z.object({
                softwareDeveloper: z.string(),
              }),
            )}
          >
            <FormStepContent>
              <FormStepHeading>Are you a software developer?</FormStepHeading>
              <FormStepInputs>
                <Select
                  name="softwareDeveloper"
                  label="Software developer"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </FormStepInputs>
              <FormStepRow>
                <BackButton>Back</BackButton>
                <NextButton>Next</NextButton>
              </FormStepRow>
            </FormStepContent>
          </FormStep>
        </MultiStep>
      ),
    },
  },
  {
    cond: {
      if: ({ softwareDeveloper }) => softwareDeveloper === "yes",
      then: [
        {
          form: {
            values: () => ({
              expertise: ["frontend", []],
            }),
            render: ({ values, onNext, onBack }) => (
              <MultiStep onNext={onNext} onBack={onBack}>
                <FormStep
                  key="expertise"
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      expertise: z.string(),
                    }),
                  )}
                >
                  <FormStepContent>
                    <FormStepHeading>
                      What is your area of expertise?
                    </FormStepHeading>
                    <FormStepInputs>
                      <Select
                        name="expertise"
                        label="Expertise"
                        options={[
                          { value: "frontend", label: "Frontend development" },
                          { value: "backend", label: "Backend development" },
                          { value: "mobile", label: "Mobile development" },
                        ]}
                      />
                    </FormStepInputs>
                    <FormStepRow>
                      <BackButton>Back</BackButton>
                      <NextButton>Submit</NextButton>
                    </FormStepRow>
                  </FormStepContent>
                </FormStep>
              </MultiStep>
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
            values: () => ({
              interested: ["yes", []],
            }),
            render: ({ values, onNext, onBack }) => (
              <MultiStep onNext={onNext} onBack={onBack}>
                <FormStep
                  key="interested"
                  defaultValues={values}
                  resolver={zodResolver(
                    z.object({
                      interested: z.string(),
                    }),
                  )}
                >
                  <FormStepContent>
                    <FormStepHeading>
                      Are you interested in learning how to code?
                    </FormStepHeading>
                    <FormStepInputs>
                      <Select
                        name="interested"
                        label="Interested"
                        options={[
                          { value: "yes", label: "Yes, I am interested." },
                          { value: "no", label: "No, it is not for me." },
                          { value: "maybe", label: "Maybe, I am not sure." },
                        ]}
                      />
                    </FormStepInputs>
                    <FormStepRow>
                      <BackButton>Back</BackButton>
                      <NextButton>Submit</NextButton>
                    </FormStepRow>
                  </FormStepContent>
                </FormStep>
              </MultiStep>
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
