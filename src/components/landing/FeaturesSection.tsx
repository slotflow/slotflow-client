import FeaturesGrid from "./features/FeaturesGrid";
import FeaturesHeader from "./features/FeaturesHeading";
import FeaturesBackground from "./features/FeaturesBackground";

const FeaturesSection = () => {
    return (
        <section className="max-w-7xl mx-auto relative overflow-hidden py-32">
            <FeaturesBackground />
            <div className="container relative z-10">
                <FeaturesHeader />
                <FeaturesGrid />
            </div>
        </section>
    );
};

export default FeaturesSection;