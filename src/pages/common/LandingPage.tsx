import React from "react";
import SectionOne from "@/components/landing/SectionOne";
import SectionPricing from "@/components/landing/SectionPricing";
import SectionReviews from "@/components/landing/SectionReviews";
import SectionFeatures from "@/components/landing/SectionFeatures";

const LandingPage = () => {

  return (
    <React.Fragment>
      <SectionOne />
      <SectionFeatures />
      <SectionPricing />
      <SectionReviews />
    </React.Fragment>
  )
}

export default LandingPage