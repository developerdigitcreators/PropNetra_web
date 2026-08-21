import PropertiesSection from "@/components/PropertiesSection";
import DealsSection from "@/components/DealsSection";
import AgentSection from "@/components/AgentSection";
import CreativeBanner from "@/components/Banner";
import DeveloperLogos from "@/components/DeveloperLogos";
import PlatformSection from "@/components/PlatformSection";
import StudioSection from "@/components/StudioSection";
import NewsletterSection from "@/components/NewsletterSection";
import LuxurySection from "@/components/LuxurySection";
import ContactCTA from "@/components/ContactCTA";
import ReferSection from "@/components/ReferSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import PropertyModal from "@/components/PropertyModal";
import AppFeatures from "@/components/AppFeatures";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import BookDemo from "@/components/BookDemo";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <>
      <PropertyModal />
      <CreativeBanner />
      <AboutSection />

      <AppFeatures />
      <HowItWorks />
      {/* <LuxurySection /> */}
      {/* <PlatformSection /> */}
      <StudioSection />
      {/* <DealsSection /> */}

      {/* <PropertiesSection /> */}

      {/* <AgentSection /> */}



      {/* <FAQSection /> */}
      <BookDemo />
      <Testimonials />
      {/* <NewsletterSection /> */}

      <BlogSection />
      <ContactCTA />
      {/* <ReferSection /> */}
      <DeveloperLogos />

    </>
  );
}
