"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/Button";
import { TextInput, Textarea, Select } from "@/components/inputs";
import { usePersistedQueryString } from "@/components/QueryParamProvider";
import { site } from "@/lib/site";

/*
 * Inquiry form. Deliberately short: name, phone, email, city, what they need.
 * Every extra required field on a trades lead form costs conversions, and
 * anything else we need we can ask on the phone.
 *
 * Unlike the library's fire and forget version, this awaits the POST and shows
 * a real failure state. On a page running paid traffic, a lead that silently
 * fails to send is a lead we paid for and lost.
 */

const SERVICES = [
  { value: "sewer-scope", label: "Sewer Scope Inspection" },
  { value: "pre-purchase", label: "Pre Purchase or Real Estate Inspection" },
  { value: "drain-cleaning", label: "Drain Cleaning" },
  { value: "repair", label: "Sewer Repair or Excavation" },
  { value: "not-sure", label: "Not Sure Yet, Need Advice" },
];

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  message: "",
  company: "", // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Any 10 digits, however the person chose to punctuate them.
const PHONE_RE = /^[\d\s().+-]{10,}$/;

export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  const source = usePersistedQueryString();

  const update = (key: keyof typeof EMPTY, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.company) return; // honeypot tripped: silently drop

    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!PHONE_RE.test(form.phone.trim()))
      next.phone = "Please enter a phone number we can reach you on.";
    if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          service:
            SERVICES.find((s) => s.value === form.service)?.label ??
            form.service,
          source,
        }),
      });
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="ContactSuccess border-s2 bg-s0 flex flex-col items-start gap-4 rounded-2xl border p-8 md:p-10">
        <span className="ContactSuccessIcon bg-s3 text-n0 flex size-12 items-center justify-center rounded-2xl">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="ContactSuccessTitle text-2xl">Got It, Thank You</h3>
        <p className="ContactSuccessBody text-g3 max-w-text">
          {site.owner.name} will get back to you personally, usually the same
          evening. If you would rather not wait, call or text{" "}
          <a
            href={site.contact.phoneHref}
            className="ContactSuccessPhone text-s4 hover:text-s5 focus-visible:ring-s4 font-semibold underline underline-offset-4 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
          >
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="ContactForm flex flex-col gap-6"
    >
      <div className="ContactFormRow grid gap-6 sm:grid-cols-2">
        <TextInput
          id="name"
          name="name"
          label="Your Name"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <TextInput
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />
      </div>

      <div className="ContactFormRow grid gap-6 sm:grid-cols-2">
        <TextInput
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <TextInput
          id="city"
          name="city"
          label="City or Neighborhood"
          autoComplete="address-level2"
          placeholder="Littleton"
          helperText="So we can confirm there's no destination charge."
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
        />
      </div>

      <Select
        id="service"
        label="What Do You Need?"
        options={SERVICES}
        value={form.service}
        onValueChange={(value) => update("service", value)}
        placeholder="Choose one"
      />

      <Textarea
        id="message"
        name="message"
        label="Anything We Should Know?"
        rows={4}
        placeholder="Closing date, what the drain is doing, anything you've already been told. Whatever is useful."
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />

      {/* Honeypot: hidden from people, catches bots that fill every field. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
      />

      {status === "failed" && (
        <p role="alert" className="ContactFormError text-base text-red-600">
          That didn&apos;t go through. Please call or text{" "}
          <a
            href={site.contact.phoneHref}
            className="font-semibold underline underline-offset-4"
          >
            {site.contact.phoneDisplay}
          </a>{" "}
          and we&apos;ll sort it out right away.
        </p>
      )}

      {/* No "or call us" alternative here any more: the phone number sits in
          the panel beside this form at 3xl, and on phones it is pinned to the
          bottom of the viewport. A third copy in the submit row was just
          competing with the action we actually want. */}
      <div className="ContactFormActions">
        <Button
          type="submit"
          loading={status === "sending"}
          className="w-full sm:w-auto"
        >
          {status === "sending" ? "Sending" : "Send My Request"}
        </Button>
      </div>

      <p className="ContactFormPrivacy text-g3 text-sm">
        We use your details to reply to this request and nothing else. No lists,
        no sharing, no sales calls.
      </p>
    </form>
  );
}
