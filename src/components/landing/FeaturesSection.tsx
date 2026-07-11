import MoveUpward from "../animation/MoveUpward";
import FeaturesGrid from "./features/FeaturesGrid";
import FeaturesHeader from "./features/FeaturesHeading";
import FeaturesBackground from "./features/FeaturesBackground";

const FeaturesSection = () => {
    return (
        <section className="max-w-7xl mx-auto relative overflow-hidden py-32 px-4 md:px-0">
            <FeaturesBackground />
            <div className="container relative z-10">
                <MoveUpward>
                    <FeaturesHeader />
                </MoveUpward>
                <MoveUpward>
                    <FeaturesGrid />
                </MoveUpward>
            </div>
        </section>
    );
};

export default FeaturesSection;