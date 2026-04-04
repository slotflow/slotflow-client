import React from 'react';
import Heading from '@/components/landing/Heading';
import { termsAndConditionsContent } from '@/utils/constants';

const TermsAndConditionsPage: React.FC = () => {
    return (
        <section id="terms-conditions" className="w-full py-16 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 md:px-0">

                <Heading
                    heading="Terms & Conditions"
                    headingDescription="Understand the rules and guidelines for using Slotflow"
                />

                <div className="max-w-4xl mx-auto text-justify space-y-4" data-aos="fade-up">
                    {termsAndConditionsContent.map((para, index) => (
                        <p key={index} className="text-base md:text-lg" data-aos="fade-up">
                            {para}
                        </p>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default TermsAndConditionsPage;
