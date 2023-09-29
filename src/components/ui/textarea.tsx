import * as React from "react";
import { ReactElement, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | ReactElement;
  error?: string | ReactElement;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = useMemo(() => value || isFocused, [value, isFocused]);

    function onFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
      setIsFocused(true);

      props.onFocus && props.onFocus(e);
    }

    function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      props.onChange && props.onChange(e);
    }

    function onBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
      setIsFocused(false);
      props.onBlur && props.onBlur(e);
    }
    return (
      <div className={cn("block relative w-full mb-6")}>
        <div className={cn("absolute pl-3 top-4 bottom-0")}>
          <div
            className={cn("leading-none select-none text-base text-gray-3 transition-all", {
              "text-xs -translate-y-[0.875rem]": isActive,
              "text-red": error,
            })}
          >
            {label}
          </div>
        </div>
        <textarea
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          className={cn(
            "flex min-h-[80px] text-base w-full pl-3 bg-gray-1 hover:bg-gray-2 border-gray-1 placeholder:text-gray-3 placeholder:opacity-0 placeholder:transition-opacity focus:border-gray-2 transition rounded-md pt-4",
            isActive && "placeholder:opacity-100",
            className,
            error && "bg-red-soft border-none focus:border-none",
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute -bottom-5 text-sm px-3 text-red">{error}</div>
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
