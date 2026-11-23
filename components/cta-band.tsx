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
    <section className="bg-brand-navy py-[clamp(4rem,7vw,7rem)] text-white">
      <Shell className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end lg:gap-20">
        <div>
          <Eyebrow inverse>Start a conversation</Eyebrow>
          <h2 className="max-w-3xl font-display text-[clamp(2.25rem,4vw,4.5rem)] leading-tight tracking-[-0.04em]">{title}</h2>
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
