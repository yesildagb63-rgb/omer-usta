"use client";

export default function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="inline-flex min-h-12 min-w-14 items-center justify-center"
    >
      <span className={`flex h-8 w-14 items-center rounded-full p-1 transition-colors ${checked ? "bg-accent" : "bg-border"}`}>
        <span className={`size-6 rounded-full bg-white transition-transform ${checked ? "translate-x-6" : ""}`} />
      </span>
    </button>
  );
}
