import { ChangeEvent, FocusEvent, forwardRef, InputHTMLAttributes, ReactElement, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactElement;
  error?: string | ReactElement;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, label, error, value, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = useMemo(() => !!value || isFocused, [value, isFocused]);

  function onFocus(e: FocusEvent<HTMLInputElement>) {
    setIsFocused(true);

    props.onFocus && props.onFocus(e);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange && props.onChange(e);
  }

  function onBlur(e: FocusEvent<HTMLInputElement>) {
    setIsFocused(false);
    props.onBlur && props.onBlur(e);
  }

  return (
    <div className={cn("block relative w-full h-14 mb-6")}>
      <div className={cn("absolute flex items-center pl-3 top-0 bottom-0")}>
        <div
          className={cn("leading-none select-none text-base text-gray-3 transition-all", {
            "text-xs -translate-y-[0.875rem]": isActive,
            "text-red": error,
          })}
        >
          {label}
        </div>
      </div>
      <input
        ref={ref}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        type={type}
        className={cn(
          "flex h-14 text-base w-full pl-3 bg-gray-1 hover:bg-gray-2 border-gray-1 placeholder:text-gray-3 placeholder:opacity-0 placeholder:transition-opacity focus:border-gray-2 transition rounded-md pt-4",
          isActive && "placeholder:opacity-100",
          className,
          error && "bg-red-soft border-none focus:border-none",
        )}
        {...props}
      />
      <div className="absolute -bottom-5 text-sm px-3 text-red">{error}</div>
    </div>
  );
});
Input.displayName = "Input";

export { Input };
