import { content } from "@/data/content";

const LABELS: Record<keyof typeof content.stats, string> = {
  yearsExperience: "Years of experience",
  eventsServed: "Events served",
  guestsServed: "Guests served",
  equipmentInventory: "Equipment items",
};

/** Hidden until content.showStats is true and verified figures are entered. */
export function Stats() {
  if (!content.showStats) return null;
  const entries = (Object.keys(content.stats) as (keyof typeof content.stats)[]).filter((k) => content.stats[k]);
  if (!entries.length) return null;
  return (
    <section aria-label="Key figures" className="border-y border-gold/15 bg-night py-14">
      <dl className="wrap grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {entries.map((k) => (
          <div key={k}>
            <dt className="text-sm text-muted">{LABELS[k]}</dt>
            <dd className="mt-2 font-serif text-5xl text-gold-light">{content.stats[k]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
