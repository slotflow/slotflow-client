import { ReactLenis } from "lenis/react"
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "@/components/navs/Header";
import Footer from "@/components/navs/FooterBar";
import { AppDispatch } from "@/shared/redux/appStore";
import ReadingProgress from "@/components/scroll/ReadingProgress";
import { toggleLiveChatBubble } from "@/shared/redux/slices/appSlice";
import LiveChatPopup from "@/components/landing/liveChat/LiveChatPopup";
import LiveChatBubble from "@/components/landing/liveChat/LiveChatBubble";

const LandingLayout = () => {

  const dispatch = useDispatch<AppDispatch>();

  return (
    <ReactLenis root>
      <div className="bg-background transition-colors duration-300 w-full">
        <Header />
        <ReadingProgress />
        <Outlet />
        <LiveChatPopup />
        <LiveChatBubble
          onClick={() => dispatch(toggleLiveChatBubble())}
        />
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default LandingLayout