import React from "react";
import { ReactLenis } from "lenis/react"
import { Outlet } from "react-router-dom";
import Header from "@/components/navs/Header";
import Footer from "@/components/navs/FooterBar";

const LandingLayout: React.FC = () => {

  console.log("LandingLayout")

  return (
    <ReactLenis root>
      <main className="bg-background transition-colors duration-300">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </ReactLenis>
  )
}

export default LandingLayout