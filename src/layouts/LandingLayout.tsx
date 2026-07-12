import { ReactLenis } from "lenis/react"
import { Outlet } from "react-router-dom";
import Header from "@/components/navs/Header";
import Footer from "@/components/navs/FooterBar";
import ReadingProgress from "@/components/scroll/ReadingProgress";

const LandingLayout = () => {

  console.log("LandingLayout")

  return (
    <ReactLenis root>
      <main className="bg-background transition-colors duration-300">
        <Header />
        <ReadingProgress />
        <Outlet />
        <Footer />
      </main>
    </ReactLenis>
  )
}

export default LandingLayout