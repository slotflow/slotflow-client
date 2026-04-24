import { motion } from "framer-motion";
import { Role } from "@/shared/interface/enums";

interface RoleSelectCardProps {
    role: Role;
    icon: string;
    title: string;
    description: string;
    selectedRole: Role | null;
    onSelect: (role: Role) => void;
}

const RoleSelectCard: React.FC<RoleSelectCardProps> = ({ role, icon, title, description, selectedRole, onSelect }) => {
    const isSelected = selectedRole === role;

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(role);
                }
            }}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(role)}
            className={`group cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-6 h-64 transition-all duration-300
                ${isSelected ? "border-[var(--mainColor)] shadow-2xl bg-white" : "hover:border-[var(--mainColor)] hover:shadow-xl bg-white/70 backdrop-blur"}`}
        >
            <img
                src={icon}
                alt={title}
                className="h-28 w-28 mb-4 transition-transform duration-300 group-hover:scale-110"
            />

            <h3 className="text-lg font-semibold text-gray-800">
                {title}
            </h3>

            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
                {description}
            </p>
        </motion.div>
    );
};

export default RoleSelectCard;