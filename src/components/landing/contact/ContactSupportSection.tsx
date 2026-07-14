import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/shared/redux/appStore";
import { contactSupportOptions } from "@/shared/utils/constants";
import { toggleLiveChatBubble } from "@/shared/redux/slices/appSlice";

const ContactSupportSection = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAction = (action: string) => {
    switch (action) {
      case "chat":
        dispatch(toggleLiveChatBubble());
        break;

      case "help":
        navigate("/help");
        break;

      case "faq":
        navigate("/faq");
        break;
    }
  };

  return (
    <section id="support" className="py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Need help right away?
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Choose the fastest way to connect with our team or explore helpful
            resources at your own pace.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {contactSupportOptions.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border bg-background/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition group-hover:bg-primary/20">
                <item.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {item.title}
              </h3>

              <button
                className="mt-10 flex items-center gap-2 font-semibold text-primary transition hover:gap-3 cursor-pointer"
                onClick={() => handleAction(item.action)}
              >
                {item.button}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSupportSection;