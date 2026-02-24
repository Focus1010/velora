import { Hero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { HowItWorks } from "@/components/landing/how-it-works";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <HowItWorks />
    </main>
  );
}
