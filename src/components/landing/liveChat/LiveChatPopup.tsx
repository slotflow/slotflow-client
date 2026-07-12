import { useEffect } from "react";
import { X, } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { toggleLiveChatBubble } from "@/shared/redux/slices/appSlice";
import slotflowAiLogoTransparent from "@/assets/logos/slotflowAi/slotfloAiLogoTransparent.png";

const LiveChatPopup = () => {

    const dispatch = useDispatch<AppDispatch>();
    const isLiveChatBubbleOpen = useSelector((state: RootState) => state.app.isLiveChatBubbleOpen);

    useEffect(() => {
    if (isLiveChatBubbleOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }

    return () => {
        document.body.style.overflow = "";
    };
}, [isLiveChatBubbleOpen]);

    return (
        <AnimatePresence mode="wait">
            {isLiveChatBubbleOpen && (
                <motion.div
                    key="live-chat-popup"
                    data-lenis-prevent
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="fixed bottom-28 right-6 z-[100] h-[680px] w-[390px] overflow-hidden rounded-[28px] border border-border/60 bg-background/80 shadow-2xl backdrop-blur-3xl max-md:bottom-24 max-md:right-4 max-md:left-4 max-md:h-[75vh] max-md:w-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                    <div className="relative flex items-center justify-between border-b border-border/50 px-6 py-5 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground shadow-lg">
                                <img src={slotflowAiLogoTransparent} alt="slotflowAiLogoTransparent" className="h-8 w-8 object-fit" />
                                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-70" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                                </span>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold">
                                    Slotflow AI
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Online • Usually replies instantly
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => dispatch(toggleLiveChatBubble())}
                            className="rounded-xl p-2 transition hover:bg-muted"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="relative flex h-[calc(100%-150px)] min-h-0 flex-col overflow-hidden px-6 py-6">
                        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 no-scrollbar">
                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: {
                                        transition: {
                                            staggerChildren: 0.08,
                                        },
                                    },
                                }}
                                className="flex flex-col gap-6"
                            >
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        show: { opacity: 1, y: 0 },
                                    }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
                                        <img src={slotflowAiLogoTransparent} alt="slotflowAiLogo" className="h-6 w-6 object-fit" />
                                    </div>

                                    <div className="flex-1 rounded-3xl border border-border/60 bg-muted/40 p-5 backdrop-blur-xl">
                                        <h4 className="font-semibold">
                                            Welcome 👋
                                        </h4>

                                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                            I'm Slotflow AI. I can answer questions about pricing,
                                            bookings, subscriptions, providers, payments and help you
                                            find the information you're looking for.
                                        </p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        show: { opacity: 1, y: 0 },
                                    }}
                                >
                                    <p className="mb-4 text-sm font-medium text-muted-foreground">
                                        Quick Actions
                                    </p>

                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            {
                                                title: "Pricing",
                                                description: "Plans & billing",
                                            },
                                            {
                                                title: "FAQ",
                                                description: "Common questions",
                                            },
                                            {
                                                title: "Contact",
                                                description: "Support team",
                                            },
                                        ].map((item) => (
                                            <motion.button
                                                key={item.title}
                                                whileHover={{ y: -4, scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="rounded-2xl border border-border/60 bg-background/70 p-4 text-left transition hover:border-primary/40 hover:shadow-lg"
                                            >
                                                <h5 className="font-medium">
                                                    {item.title}
                                                </h5>

                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        show: { opacity: 1, y: 0 },
                                    }}
                                >
                                    <p className="mb-4 text-sm font-medium text-muted-foreground">
                                        Suggested Questions
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "How does Slotflow work?",
                                            "Compare pricing plans",
                                            "Can I cancel anytime?",
                                            "Contact support",
                                        ].map((question) => (
                                            <motion.button
                                                key={question}
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="rounded-full border border-border bg-background px-4 py-2 text-sm transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                            >
                                                {question}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/70 px-5 py-4 backdrop-blur-xl">
                        <div className="flex h-12 items-center rounded-2xl border border-border bg-muted/40 px-4 text-sm text-muted-foreground">
                            Type your message...
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LiveChatPopup;

