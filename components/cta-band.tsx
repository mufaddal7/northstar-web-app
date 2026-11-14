import { ArrowUpRight } from "@/components/icons";
import { ContactDialog } from "@/components/contact-dialog";
import { ButtonLink, Eyebrow, Shell } from "@/components/ui";
import { BOOKING_URL } from "@/lib/site-data";

export function CtaBand({
  title = "Ready to move forward?",
  copy = "Tell us what you’re trying to achieve. We’ll help you identify where technology can make the greatest difference.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="bg-brand-navy py-16 text-white sm:py-20 lg:py-24">
      <Shell className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end lg:gap-20">
        <div>
          <Eyebrow inverse>Start a conversation</Eyebrow>
          <h2 className="max-w-3xl font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/70">{copy}</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <ContactDialog label="Tell us what you need" />
          <ButtonLink href={BOOKING_URL} secondary external>
            Book a 30-minute conversation <ArrowUpRight />
          </ButtonLink>
        </div>
      </Shell>
    </section>
  );
}
