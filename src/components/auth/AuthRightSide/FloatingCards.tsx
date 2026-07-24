import ChatCard from "./floating/Chat";
import ReviewCard from "./floating/Review";
import PaymentCard from "./floating/Payment";
import AppointmentCard from "./floating/Appointment";
import NotificationCard from "./floating/Notification";
import MoveAnything from "@/components/animation/MoveAnything";

const FloatingCards = () => {
    return (
        <div className="relative mx-auto mt-20 h-[430px] w-full max-w-5xl">
            <MoveAnything
                direction="left"
                delay={0.2}
                duration={7}
                className="absolute left-8 top-0"
            >
                <NotificationCard />
            </MoveAnything>

            <MoveAnything
                direction="right"
                delay={0.5}
                duration={8}
                className="absolute right-8 top-8"
            >
                <PaymentCard />
            </MoveAnything>

            <MoveAnything
                direction="bottom"
                delay={0.8}
                duration={6}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <AppointmentCard />
            </MoveAnything>

            <MoveAnything
                direction="left"
                delay={1.1}
                duration={9}
                className="absolute bottom-4 left-16"
            >
                <ChatCard />
            </MoveAnything>

            <MoveAnything
                direction="right"
                delay={1.4}
                duration={10}
                className="absolute bottom-0 right-10"
            >
                <ReviewCard />
            </MoveAnything>
        </div>
    );
};

export default FloatingCards;