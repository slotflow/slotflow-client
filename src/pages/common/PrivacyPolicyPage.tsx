import React from 'react';
import Heading from '@/components/landing/Heading';
import { privacyPolicyContent } from '@/shared/utils/constants';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <section id="privacy-policy" className="w-full py-16 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 md:px-0">

                <Heading
                    heading="Privacy Policy"
                    headingDescription="How we protect and manage your data"
                />

                <div className="max-w-4xl mx-auto text-justify space-y-4" data-aos="fade-up">
                    {privacyPolicyContent.map((para, index) => (
                        <p key={index} className="text-base md:text-lg" data-aos="fade-up">
                            {para}
                        </p>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default PrivacyPolicyPage;
