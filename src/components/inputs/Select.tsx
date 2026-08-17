"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import {
  inputBase,
  inputDisabled,
  inputError,
  inputFocus,
  inputPadding,
} from "./input-styles";
import { InputWrapper } from "./InputWrapper";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Select({
  id,
  label,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  error,
  helperText,
  required,
  disabled,
  className = "",
}: SelectProps) {
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
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
      >
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`SelectTrigger ${inputBase} ${inputPadding} ${inputFocus} ${inputDisabled} flex items-center justify-between text-left ${error ? inputError : ""} ${className}`.trim()}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="text-g3 size-4" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="SelectContent border-n4 bg-n0 shadow-theme z-50 max-h-60 w-[var(--radix-select-trigger-width)] overflow-auto rounded-lg border"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="SelectItem text-g4 data-[highlighted]:bg-s0 data-[highlighted]:text-s5 flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-base outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="ml-auto">
                    <Check className="text-s3 size-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </InputWrapper>
  );
}
