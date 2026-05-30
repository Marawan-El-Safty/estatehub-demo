"use client";

import { useState } from "react";

export function InquiryForm({ propertyTitle }: { propertyTitle: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // In production this POSTs to /api/inquiries and creates a CRM lead.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="card p-5 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)]/15 text-2xl">
          ✓
        </div>
        <h3 className="mt-3 font-semibold">Inquiry sent</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          The agent for {propertyTitle} will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-3 p-5">
      <h3 className="font-semibold">Book a viewing</h3>
      <input
        required
        placeholder="Your name"
        className="w-full rounded-lg border bg-[var(--surface-2)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
      />
      <input
        required
        type="email"
        placeholder="Email address"
        className="w-full rounded-lg border bg-[var(--surface-2)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
      />
      <textarea
        rows={3}
        placeholder="I'd like to schedule a viewing…"
        className="w-full resize-none rounded-lg border bg-[var(--surface-2)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request viewing"}
      </button>
    </form>
  );
}
