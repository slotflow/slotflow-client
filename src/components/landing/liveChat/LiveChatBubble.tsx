import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import slotflowAiLogo from "@/assets/logos/slotflowAi/slotfloAiLogoTransparent.png"

interface LiveChatBubbleProps {
    onClick: () => void;
}

const LiveChatBubble = ({
    onClick,
}: LiveChatBubbleProps) => {
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, type: "spring", stiffness: 260, damping: 20 }}
                className="group relative"
            >
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-20 top-1/2 hidden -translate-y-1/2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-xl backdrop-blur-xl lg:flex items-center"
                >
                    <img
                        src={slotflowAiLogo}
                        alt="Slotflow AI Logo"
                        className="mr-2 h-4 w-4 shrink-0"
                    />
                    <span className="whitespace-nowrap">Ask Slotflow AI</span>
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <motion.button whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.95 }} onClick={onClick} className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-background/70 shadow-2xl backdrop-blur-2xl">
                    <MessageCircle className="h-7 w-7 text-primary" />
                    <span className="absolute bottom-3 right-3 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default LiveChatBubble;