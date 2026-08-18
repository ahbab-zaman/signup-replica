import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Loader2,
  LocateFixed,
  MapPin,
  Search,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type FormEvent,
} from "react";
import { COUNTRIES, getStatesByCountryCode, type Country } from "@/data/location-data";
import { useWizard } from "../hooks/useWizard";
import { StepFooter } from "./StepFooter";
import {
  wizardCopyClass,
  wizardFieldErrorClass,
  wizardLabelClass,
  wizardPrimaryButtonClass,
  wizardStepClass,
  wizardTitleClass,
} from "./wizardStyles";

/* ─────────────────────────── Types ────────────────────────────── */
type GeoStatus = "idle" | "requesting" | "success" | "denied" | "error";

/* ─────────────────────────── Reverse-geocode ──────────────────── */
async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<{ countryCode: string; state: string } | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      countryCode?: string;
      principalSubdivision?: string;
    };
    return {
      countryCode: data.countryCode ?? "",
      state: data.principalSubdivision ?? "",
    };
  } catch {
    return null;
  }
}

/* ─────────────────────────── Premium Combobox ──────────────────── */
type ComboboxProps = {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  noOptionsText?: string;
};

function PremiumCombobox({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  icon,
  noOptionsText = "No options found",
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    return options.filter((o) =>
      o.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, query]);

  // Reset highlighted when filtered list changes
  useEffect(() => {
    setHighlighted(0);
  }, [filtered]);

  // Focus search input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const select = useCallback(
    (option: string) => {
      onChange(option);
      setOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlighted]) select(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    const item = listRef.current?.children[highlighted] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [highlighted]);

  const displayLabel = value || placeholder;
  const hasValue = Boolean(value);

  return (
    <div ref={containerRef} onKeyDown={handleKeyDown} className="relative">
      <label htmlFor={id} className={wizardLabelClass}>
        {label}
      </label>

      {/* Trigger button */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={[
          "relative h-[64px] w-full rounded-[14px] border bg-surface/95 px-5 text-left",
          "text-[1.06rem] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_28px_rgba(0,0,0,0.28)]",
          "outline-none transition-all duration-200",
          open
            ? "border-white/30 bg-surface ring-2 ring-white/10"
            : "border-white/12 hover:border-white/22",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
        ].join(" ")}
      >
        <span className="flex items-center gap-3">
          {icon && (
            <span className="shrink-0 text-white/40">{icon}</span>
          )}
          <span className={hasValue ? "text-white" : "text-white/30"}>
            {displayLabel}
          </span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center gap-2">
          {hasValue && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Clear"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="rounded-full p-0.5 text-white/30 transition-colors hover:text-white/60"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-white/35" />
          </motion.span>
        </span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-[18px] border border-white/10 bg-[#111]/97 shadow-[0_24px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
          >
            {/* Search bar */}
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-white/35" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-[0.95rem] text-white outline-none placeholder:text-white/30"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-white/30 hover:text-white/60"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* List */}
            <ul
              ref={listRef}
              role="listbox"
              aria-label={label}
              className="max-h-52 overflow-y-auto py-1.5 scrollbar-thin"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-center text-sm text-white/35">
                  {noOptionsText}
                </li>
              ) : (
                filtered.map((option, index) => {
                  const isSelected = option === value;
                  const isHighlighted = index === highlighted;
                  return (
                    <li
                      key={option}
                      role="option"
                      aria-selected={isSelected}
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={() => select(option)}
                      onMouseEnter={() => setHighlighted(index)}
                      className={[
                        "mx-1.5 flex cursor-pointer items-center justify-between rounded-[10px] px-3.5 py-2.5 text-[0.98rem] transition-colors",
                        isHighlighted ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/7",
                        isSelected ? "font-semibold text-white" : "",
                      ].join(" ")}
                    >
                      <span>{option}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 shrink-0 text-white" />
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────── Country Combobox ──────────────────── */
type CountryComboboxProps = {
  value: string; // country code
  onChange: (code: string) => void;
  disabled?: boolean;
};

function CountryCombobox({ value, onChange, disabled }: CountryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo<Country[]>(() => {
    if (!query.trim()) return COUNTRIES;
    return COUNTRIES.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  useEffect(() => setHighlighted(0), [filtered]);
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
    else setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open]);

  const select = useCallback(
    (code: string) => {
      onChange(code);
      setOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlighted]) select(filtered[highlighted].code);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    const item = listRef.current?.children[highlighted] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [highlighted]);

  const selected = COUNTRIES.find((c) => c.code === value);

  return (
    <div ref={containerRef} onKeyDown={handleKeyDown} className="relative">
      <label htmlFor="country-select" className={wizardLabelClass}>
        Country
      </label>

      <button
        id="country-select"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select country"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={[
          "relative h-[64px] w-full rounded-[14px] border bg-surface/95 px-5 text-left",
          "text-[1.06rem] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_28px_rgba(0,0,0,0.28)]",
          "outline-none transition-all duration-200",
          open
            ? "border-white/30 bg-surface ring-2 ring-white/10"
            : "border-white/12 hover:border-white/22",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
        ].join(" ")}
      >
        <span className="flex items-center gap-3">
          <span className="text-2xl leading-none">{selected?.flag ?? "🌍"}</span>
          <span className={selected ? "text-white" : "text-white/30"}>
            {selected?.name ?? "Select your country"}
          </span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-5 w-5 text-white/35" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-[18px] border border-white/10 bg-[#111]/97 shadow-[0_24px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-white/35" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search country…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-[0.95rem] text-white outline-none placeholder:text-white/30"
              />
            </div>

            <ul ref={listRef} role="listbox" className="max-h-52 overflow-y-auto py-1.5">
              {filtered.map((country, index) => {
                const isSelected = country.code === value;
                const isHighlighted = index === highlighted;
                return (
                  <li
                    key={country.code}
                    role="option"
                    aria-selected={isSelected}
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={() => select(country.code)}
                    onMouseEnter={() => setHighlighted(index)}
                    className={[
                      "mx-1.5 flex cursor-pointer items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-[0.98rem] transition-colors",
                      isHighlighted ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/7",
                      isSelected ? "font-semibold text-white" : "",
                    ].join(" ")}
                  >
                    <span className="text-xl leading-none">{country.flag}</span>
                    <span className="flex-1">{country.name}</span>
                    {isSelected && <Check className="h-4 w-4 shrink-0 text-white" />}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────── GeoPermissionCard ─────────────────── */
function GeoPermissionCard({
  status,
  onRequest,
}: {
  status: GeoStatus;
  onRequest: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={[
        "relative overflow-hidden rounded-[18px] border p-5",
        status === "success"
          ? "border-emerald-500/25 bg-emerald-500/8"
          : status === "denied" || status === "error"
            ? "border-white/8 bg-white/[0.025]"
            : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
    >
      {/* Subtle gradient shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 0%, rgba(87,36,255,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={[
            "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]",
            status === "success"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-white/8 text-white/50",
          ].join(" ")}
        >
          {status === "requesting" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : status === "success" ? (
            <LocateFixed className="h-5 w-5" />
          ) : (
            <MapPin className="h-5 w-5" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-[0.97rem] font-semibold text-white">
            {status === "success"
              ? "Location detected"
              : status === "requesting"
                ? "Detecting your location…"
                : status === "denied"
                  ? "Location access denied"
                  : status === "error"
                    ? "Couldn't detect location"
                    : "Use your current location"}
          </p>
          <p className="mt-0.5 text-[0.85rem] leading-relaxed text-white/50">
            {status === "success"
              ? "Fields filled in automatically. You can still change them below."
              : status === "denied"
                ? "Select your country and state manually below."
                : status === "error"
                  ? "Reverse geocoding failed. Select manually below."
                  : "We'll auto-fill your country and state. No data is stored."}
          </p>

          {(status === "idle" || status === "error") && (
            <button
              type="button"
              onClick={onRequest}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-1.5 text-[0.85rem] font-medium text-white/80 transition-all hover:bg-white/18 hover:text-white"
            >
              <LocateFixed className="h-3.5 w-3.5" />
              Allow location
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── LocationStep ──────────────────────── */
export function LocationStep() {
  const { state, dispatch } = useWizard();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [geoStatus, setGeoStatus] = useState<GeoStatus>("idle");
  const [country, setCountry] = useState(state.fields.country);
  const [selectedState, setSelectedState] = useState(state.fields.state);
  const [error, setError] = useState<string | undefined>();

  const stateOptions = useMemo(
    () => (country ? getStatesByCountryCode(country) : []),
    [country],
  );

  // Focus heading on mount
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // Reset state when country changes
  const handleCountryChange = (code: string) => {
    setCountry(code);
    setSelectedState("");
    setError(undefined);
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setError(undefined);
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const result = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        if (!result) {
          setGeoStatus("error");
          return;
        }

        // Try to match country code
        const matchedCountry = COUNTRIES.find(
          (c) => c.code === result.countryCode,
        );
        if (matchedCountry) {
          setCountry(matchedCountry.code);

          // Try to match state name (partial match)
          const states = matchedCountry.states;
          const matchedState = states.find(
            (s) =>
              s.toLowerCase() === result.state.toLowerCase() ||
              result.state.toLowerCase().includes(s.toLowerCase()) ||
              s.toLowerCase().includes(result.state.toLowerCase()),
          );
          setSelectedState(matchedState ?? "");
        }

        setGeoStatus("success");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setGeoStatus("denied");
        } else {
          setGeoStatus("error");
        }
      },
      { timeout: 10_000, maximumAge: 60_000 },
    );
  };

  const canContinue = Boolean(country && selectedState);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canContinue) {
      setError("Please select both your country and state.");
      return;
    }
    dispatch({ type: "SAVE_FIELD", field: "country", value: country });
    dispatch({ type: "SAVE_FIELD", field: "state", value: selectedState });
    dispatch({ type: "NEXT_STEP" });
  };

  const selectedCountryObj = COUNTRIES.find((c) => c.code === country);

  return (
    <section className={wizardStepClass}>
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={wizardTitleClass + " focus:outline-none"}
        >
          Where are you based?
        </h2>
        <p className={wizardCopyClass}>
          Help us surface events near you. We use this to personalize your experience.
        </p>
      </div>

      <form noValidate onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
        {/* Geolocation permission card */}
        <GeoPermissionCard status={geoStatus} onRequest={requestLocation} />

        {/* Status chip when geo succeeds */}
        <AnimatePresence>
          {geoStatus === "success" && selectedCountryObj && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 rounded-[10px] bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400">
                <LocateFixed className="h-4 w-4 shrink-0" />
                <span>
                  Detected:{" "}
                  <strong>
                    {selectedCountryObj.flag} {selectedCountryObj.name}
                    {selectedState ? `, ${selectedState}` : ""}
                  </strong>
                  . Adjust below if needed.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Country picker */}
        <CountryCombobox
          value={country}
          onChange={handleCountryChange}
          disabled={geoStatus === "requesting"}
        />

        {/* State picker — appears once a country is selected */}
        <AnimatePresence>
          {country && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <PremiumCombobox
                id="state-select"
                label="State / Region"
                placeholder="Select your state"
                options={stateOptions}
                value={selectedState}
                onChange={handleStateChange}
                disabled={geoStatus === "requesting" || stateOptions.length === 0}
                icon={<MapPin className="h-4 w-4" />}
                noOptionsText="No regions available — contact support"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p role="alert" className={wizardFieldErrorClass}>
            {error}
          </p>
        )}

        <StepFooter
          onBack={() => dispatch({ type: "PREV_STEP" })}
          primary={
            <button
              type="submit"
              aria-label="Continue"
              disabled={!canContinue}
              className={wizardPrimaryButtonClass}
            >
              NEXT
            </button>
          }
        />
      </form>
    </section>
  );
}
