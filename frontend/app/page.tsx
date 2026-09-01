import { LazyReCaptchaProvider } from '@/components/common/LazyReCaptchaProvider';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ConsultSection } from '@/components/lp/inheritance/ConsultSection';
import { FaqSection } from '@/components/lp/inheritance/FaqSection';
import { FinalCtaSection } from '@/components/lp/inheritance/FinalAndDock';
import { Header, HeroSection } from '@/components/lp/inheritance/HeaderHero';
import { LawyersSection } from '@/components/lp/inheritance/LawyersSection';
import { ProcessSection, ValueSection } from '@/components/lp/inheritance/ProcessValueSections';
import { ProblemSection, StoryIntroSection, TimeProtectionSection } from '@/components/lp/inheritance/StorySections';
import { StickyConsultBar } from '@/components/lp/inheritance/StickyConsultBar';

export default function Home() {
  return (
    <LazyReCaptchaProvider>
      <Header />
      <main>
        <HeroSection />
        <StoryIntroSection />
        <ProblemSection />
        <TimeProtectionSection />
        <ConsultSection />
        <ProcessSection />
        <ValueSection />
        <LawyersSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <StickyConsultBar />
    </LazyReCaptchaProvider>
  );
}
