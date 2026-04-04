import world from '../../../assets/svgs/world2.svg';

const SectionOne = () => {

    return (
        <section
            id="home"
            className="w-full bg-[var(--background)] space-x-2 transition-colors duration-300 ease-in-out"
        >
            <div className="mx-auto flex flex-col justify-center items-center max-w-7xl px-4 lg:px-0 h-screen text-center">
                <img
                    src={world}
                    className="absolute opacity-30 h-[80%]"
                />
                <h1
                    className="text-[var(--mainColor)] text-7xl md:text-9xl font-bold italic"
                    data-aos="fade-up"
                >
                    SLOTFLOW
                </h1>
            </div>
        </section>
    );
};

export default SectionOne;
