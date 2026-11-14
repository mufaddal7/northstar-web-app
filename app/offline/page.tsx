import { ButtonLink, Eyebrow, Shell } from "@/components/ui";
export default function OfflinePage() {
  return (
    <section className="min-h-[65vh] py-20 sm:py-32">
      <Shell width="narrow">
        <Eyebrow>Offline</Eyebrow>
        <h1 className="font-display text-4xl sm:text-6xl">You&apos;re not connected right now.</h1>
        <p className="mt-5 leading-7 text-muted">Please check your connection and try again.</p>
        <ButtonLink className="mt-7" href="/">
          Try again
        </ButtonLink>
      </Shell>
    </section>
  );
}
