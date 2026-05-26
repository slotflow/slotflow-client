import React from "react";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import logo from '../../assets/logos/logo.png';
import { FooterProps } from "react-day-picker";
import { about, footerColumnData, copyright, policies } from "@/shared/utils/constants";

const FooterBar: React.FC<FooterProps> = ({
  className,
}) => {

  return (
    <footer className={cn("bg-background w-full", className)}>
      <div className="px-4 lg:px-0 max-w-7xl mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex flex-col items-center justify-center p-2">
                <div>
                  <img src={logo} className='size-36' />
                </div>
                {/* <h4 className="text-[var(--mainColor)] text-2xl font-bold italic hover:text-white rounded-lg cursor-pointer">Slotflow</h4> */}
              </div>
            </FooterColumn>
            {footerColumnData.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <p className="text-[var(--textOne)] text-sm pt-1 px-2 text-center md:text-end">{about}</p>
              </div>
            </FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div>{"© "}{new Date().getFullYear()}{copyright}</div>
            <div className="flex items-center gap-4 hidden md:block">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}

export default FooterBar;