import { MessageSquareMore } from "lucide-react";
import MoveUpward from "@/components/animation/MoveUpward";
import SectionHeading from "@/components/common/SectionHeading";
import ContactCTA from "@/components/landing/contact/ContactCTA";
import ContactSection from "@/components/landing/contact/ContactSection";
import ContactSupportSection from "@/components/landing/contact/ContactSupportSection";

const ContactPage = () => {

  return (
    <main className="w-full">
      <SectionHeading
        badge="Contact Us"
        badgeIcon={MessageSquareMore}
        title={
          <>
            Let's build something
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">great</span> together.
          </>
        }
        description="Whether you have a question, need support, want to discuss a
                            partnership, or simply want to learn more about Slotflow, our team
                            is here to help. We'd love to hear from you."
        children={<MoveUpward>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500" />
              Usually replies within 24 hours
            </div>

            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary" />
              Available Monday – Friday
            </div>
          </div>
        </MoveUpward>}
      />
      <MoveUpward>
        <ContactSection />
      </MoveUpward>
      <MoveUpward>
        <ContactSupportSection />
      </MoveUpward>
      <MoveUpward>
        <ContactCTA />
      </MoveUpward>
    </main>
  );
};

export default ContactPage;