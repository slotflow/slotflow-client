import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import HeroSection from "@/components/landing/HeroSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";

const LandingPage = () => {

  return (
    <main className="w-full">
      <HeroSection />
      <WorkflowSection />
      <FeaturesSection />
      <IntegrationsSection />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}

export default LandingPage