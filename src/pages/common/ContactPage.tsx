import MoveUpward from "@/components/animation/MoveUpward";
import ContactCTA from "@/components/landing/contact/ContactCTA";
import ContactHero from "@/components/landing/contact/ContactHero";
import ContactSection from "@/components/landing/contact/ContactSection";
import ContactSupportSection from "@/components/landing/contact/ContactSupportSection";

const ContactPage = () => {

  return (
    <section id="contact" className="py-32">
      <ContactHero />
      <MoveUpward>
        <ContactSection />
      </MoveUpward>
      <MoveUpward>
        <ContactSupportSection />
      </MoveUpward>
      <MoveUpward>
        <ContactCTA />
      </MoveUpward>
    </section>
  );
};

export default ContactPage;