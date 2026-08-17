"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { type ReactNode } from "react";
import { errorBase, helperBase, labelBase } from "./input-styles";

interface InputWrapperProps {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}

export function InputWrapper({
  id,
  label,
  error,
  helperText,
  required,
  children,
}: InputWrapperProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="InputWrapper flex flex-col gap-1.5">
      <LabelPrimitive.Root htmlFor={id} className={labelBase}>
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </LabelPrimitive.Root>

      {children}

      {error && (
        <p id={errorId} role="alert" className={errorBase}>
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className={helperBase}>
          {helperText}
        </p>
      )}
    </div>
  );
}
