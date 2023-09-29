import * as React from "react";
import { ReactElement } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>((props, ref) => (
  <div
    className={cn(
      "text-base pt-4 transition-opacity opacity-0",
      "group-data-[state=open]:opacity-100 group-data-[value]:opacity-100",
    )}
  >
    <SelectPrimitive.Value ref={ref} placeholder="hello" asChild {...props} />
  </div>
));

interface SelectTriggerProps extends SelectPrimitive.SelectTriggerProps {
  label?: string | ReactElement;
  error?: string | ReactElement;
}

const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
  ({ className, children, value, label, error, ...props }: SelectTriggerProps, ref) => {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "group relative outline-none flex h-14 mb-5 w-full items-center justify-between rounded-md border-input bg-gray-1 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-2 transition border border-gray-1 data-[state=open]:border-gray-3",
          error && "bg-red-soft border-none focus:border-none",
          className,
        )}
        // Здесь не должно быть атрибута)
        data-value={value || undefined}
        {...props}
      >
        <div className={cn("absolute flex items-center top-0 bottom-0")}>
          <div
            className={cn(
              "leading-none select-none text-base text-gray-3 transition-all",
              "group-data-[state=open]:text-xs group-data-[state=open]:-translate-y-[0.875rem] group-data-[value]:text-xs group-data-[value]:-translate-y-[0.875rem]",
              { "text-red": error },
            )}
          >
            {label}
          </div>
        </div>
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-5 w-5 opacity-50 transition rotate-0 group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
        <div className="absolute -bottom-5 text-sm text-red">{error}</div>
      </SelectPrimitive.Trigger>
    );
  },
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md bg-white text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    props.onClick && props.onClick(e);
  }

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-4 pl-8 pr-2 text-base outline-none data-[state=checked]:bg-gray-1 data-[highlighted]:bg-gray-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator };
