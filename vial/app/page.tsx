import { HomeHero } from "@/components/home/HomeHero";
import {
  AltarAlwaysLit,
  AppShowcase,
  AppStoryPartial,
  HomeSection8Pending,
  MoreThanAnApp,
  ResourcesPreview,
  WhyVialExists,
} from "@/components/home/HomeSections";
import { GiveSection, TestimonialsSection } from "@/components/sections/shared";

/** Home — Figma frames 199:9948 → 239:7970 → 239:8140 (audit §5.1). */
export default function HomePage() {
  return (
    <>
      <HomeHero>
        <MoreThanAnApp />
      </HomeHero>
      <WhyVialExists />
      <AltarAlwaysLit />
      <AppShowcase />
      <TestimonialsSection />
      <AppStoryPartial />
      <HomeSection8Pending />
      <ResourcesPreview />
      <GiveSection />
    </>
  );
}
