import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type ComboboxProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
  hint?: string;
};

export function Combobox({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  hint,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const listboxId = `${autoId}-listbox`;

  const isExactOption = options.includes(value.trim());
  const query = isExactOption ? "" : value.trim().toLowerCase();
  const visibleOptions =
    query === ""
      ? options
      : options.filter((option) => option.toLowerCase().includes(query));

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const selectOption = (option: string) => {
    onChange(option);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(0);
        return;
      }
      setActiveIndex((i) => (i + 1) % Math.max(visibleOptions.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) =>
        i <= 0 ? visibleOptions.length - 1 : i - 1,
      );
    } else if (event.key === "Enter") {
      if (open && activeIndex >= 0 && visibleOptions[activeIndex]) {
        event.preventDefault();
        selectOption(visibleOptions[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={`${autoId}-input`}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          id={`${autoId}-input`}
          role="combobox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={
            activeIndex >= 0 ? `${autoId}-option-${activeIndex}` : undefined
          }
          aria-invalid={error ? true : undefined}
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            "h-11 w-full rounded-lg border bg-surface px-3 pr-9 text-base text-text-primary",
            "placeholder:text-text-dim transition-colors duration-100 ease-out",
            "focus:outline-none focus:ring-2",
            error
              ? "border-error focus:ring-error"
              : "border-border hover:border-border-light focus:border-accent focus:ring-accent",
          )}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-icon-muted">
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-4 w-4 transition-transform duration-150",
              open && "rotate-180",
            )}
          />
        </span>

        {open && visibleOptions.length > 0 && (
          <div
            id={listboxId}
            role="listbox"
            className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-border bg-surface shadow-popover"
          >
            {visibleOptions.map((option, index) => (
              <button
                key={option}
                id={`${autoId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={option === value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-text-primary",
                  "transition-colors duration-75",
                  activeIndex === index
                    ? "bg-surface-secondary"
                    : "hover:bg-surface-secondary",
                )}
              >
                <span>{option}</span>
                {option === value && (
                  <Check aria-hidden="true" className="h-4 w-4 text-accent" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {hint && !error && (
        <p className="text-xs text-text-muted">{hint}</p>
      )}

      {error && (
        <p role="alert" className="text-xs text-error-foreground">
          {error}
        </p>
      )}
    </div>
  );
}