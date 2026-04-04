import React from 'react';
import Heading from '@/components/landing/Heading';
import ceoImage from '../../assets/defaultImages/ceo.jpg';
import { aboutFeatures, aboutIntro, devWebPortfoilio } from '@/utils/constants';

const AboutPage: React.FC = () => {
    return (
        <section id="about" className="w-full py-16 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 md:px-0">

                <Heading
                    heading="About Us"
                    headingDescription="Know more about us"
                />

                <div className="max-w-4xl mx-auto text-justify space-y-4 mb-10" data-aos="fade-up">
                    {aboutIntro.map((para, index) => (
                        <p key={index} className="text-base md:text-lg" data-aos="fade-up">
                            {para}
                        </p>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto text-justify space-y-4 mb-10" data-aos="fade-up">
                    {aboutFeatures.map((para, index) => (
                        <p key={index} className="text-base md:text-lg" data-aos="fade-up">
                            {para}
                        </p>
                    ))}
                </div>

                <div
                    className="max-w-3xl mx-auto text-center mt-12 cursor-pointer"
                    data-aos="fade-up"
                    onClick={() => window.open(devWebPortfoilio, "_blank")}
                >
                    <img
                        src={ceoImage}
                        alt="CEO"
                        className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg object-cover"
                        data-aos="fade-up"
                    />
                    <h3 className="text-xl font-semibold">Midhun K Paniker</h3>
                    <p className="text-sm text-gray-400">Founder & CEO, Slotflow</p>
                </div>

            </div>
        </section>
    );
}

export default AboutPage;
