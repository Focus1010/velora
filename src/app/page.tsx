import { Hero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { HowItWorks } from "@/components/landing/how-it-works";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <DashboardPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
