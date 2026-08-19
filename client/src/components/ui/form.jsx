"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "form-description",
      id: formDescriptionId,
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-destructive text-sm", className),
      ...props,
      children: body
    }
  );
}
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
};
