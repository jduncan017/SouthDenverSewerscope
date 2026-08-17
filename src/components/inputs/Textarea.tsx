"use client";

import { type ComponentPropsWithoutRef, forwardRef } from "react";
import {
  inputBase,
  inputDisabled,
  inputError,
  inputFocus,
  inputPadding,
} from "./input-styles";
import { InputWrapper } from "./InputWrapper";

interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "id" | "className"> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      id,
      label,
      error,
      helperText,
      required,
      disabled,
      className = "",
      rows = 4,
      ...rest
    },
    ref,
  ) {
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <InputWrapper
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        required={required}
      >
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`Textarea ${inputBase} ${inputPadding} ${inputFocus} ${inputDisabled} resize-y ${error ? inputError : ""} ${className}`.trim()}
          {...rest}
        />
      </InputWrapper>
    );
  },
);
