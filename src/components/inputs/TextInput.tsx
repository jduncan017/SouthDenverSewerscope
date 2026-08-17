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

interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "id" | "className"> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      id,
      label,
      error,
      helperText,
      required,
      disabled,
      className = "",
      type = "text",
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
        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`TextInput ${inputBase} ${inputPadding} ${inputFocus} ${inputDisabled} ${error ? inputError : ""} ${className}`.trim()}
          {...rest}
        />
      </InputWrapper>
    );
  },
);
