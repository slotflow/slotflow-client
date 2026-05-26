import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/navs/Header";
import FooterBar from "@/components/navs/FooterBar";

const LandingLayout: React.FC = () => {

  console.log("LandingLayout")

  return (
    <>
      <Header />
      <Outlet />
      <FooterBar />
    </>
  )
}

export default LandingLayout