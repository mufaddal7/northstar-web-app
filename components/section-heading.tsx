import { SectionHeading as Heading } from "@/components/ui";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  inverse?: boolean;
}) {
  return (
    <Heading eyebrow={eyebrow} title={title} copy={copy} inverse={inverse} />
  );
}
