import {
  ArrowRight,
  Clock3,
  Globe,
  Mail,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="-form-details" className="py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.2fr_.8fr] lg:px-0">
        <div className="rounded-3xl border bg-background/60 p-8 backdrop-blur-xl lg:p-10">
          <h2 className="text-3xl font-bold">
            Send us a message
          </h2>

          <p className="mt-3 text-muted-foreground">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>

          <form className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <Input
                  placeholder="John Doe"
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Subject
              </label>

              <Input
                placeholder="How can we help?"
                className="h-12 rounded-xl"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Message
              </label>

              <Textarea
                rows={7}
                placeholder="Tell us more about your question..."
                className="rounded-xl resize-none"
              />
            </div>

            <Button
              className="group h-12 rounded-xl px-8"
              size="lg"
            >
              Send Message

              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>

        <div className="space-y-5">
          <InfoCard
            icon={<Mail className="h-5 w-5 text-primary" />}
            title="Email"
            value="support@slotflow.com"
            description="We'll respond within one business day."
          />

          <InfoCard
            icon={<Clock3 className="h-5 w-5 text-primary" />}
            title="Response Time"
            value="Within 24 Hours"
            description="Monday to Friday"
          />

          <InfoCard
            icon={<MapPin className="h-5 w-5 text-primary" />}
            title="Office"
            value="Kerala, India"
            description="Remote-first team"
          />

          <InfoCard
            icon={<Globe className="h-5 w-5 text-primary" />}
            title="Availability"
            value="India"
            description="Serving businesses"
          />
        </div>
      </div>
    </section>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const InfoCard = ({
  icon,
  title,
  value,
  description,
}: InfoCardProps) => {
  return (
    <div className="rounded-3xl border bg-background/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 font-medium">
        {value}
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default ContactSection;