import { Github } from 'lucide-react';
import { footerLinks } from '@/shared/utils/constants';
import logo from '../../assets/logos/company/slotflowLogoTransparent.png';

const Footer = () => {
  return (
    <footer className="overflow-hidden bg-background">

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-16 grid-col-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">

          <div className="space-y-6 col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 flex items-center justify-center rounded-xl">
                <img src={logo} className='p-2' />
              </div>

              <span className="text-3xl font-bold text-[#635bff]">
                Slotflow
              </span>
            </div>

            <p className="max-w-sm text-base text-zinc-500">
              Built for modern service businesses.
              <br />
              Trusted bookings, secure payments, and seamless scheduling.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Pages
            </h3>

            <ul className="space-y-4">
              {footerLinks.pages.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-zinc-400 transition dark:hover:text-white hover:text-zinc-700"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Socials
            </h3>

            <ul className="space-y-4">
              {footerLinks.socials.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <a
                      href="#"
                      className="group flex items-center gap-3 text-zinc-400 transition dark:hover:text-white hover:text-zinc-700"
                    >
                      <Icon
                        size={18}
                        className="opacity-70 transition group-hover:opacity-100"
                      />
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Legal
            </h3>

            <ul className="space-y-4">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-zinc-400 transition dark:hover:text-white hover:text-zinc-700"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Register
            </h3>

            <ul className="space-y-4">
              {footerLinks.account.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-zinc-400 transition dark:hover:text-white hover:text-zinc-700"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="pointer-events-none inset-x-0 bottom-0 flex justify-center max-w-7xl m-auto overflow-hidden">
        <h1 className="text-[clamp(5rem,20vw,20rem)] font-extrabold tracking-tight leading-none text-black/[0.1] dark:text-white/[0.1]">
          Slotflow
        </h1>
      </div>
      <div className="mt-12 p-6">
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} SlotFlow. All rights reserved.
          </p>
          <a
            href="https://github.com/slotflow"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <span>Source Code is available on</span>
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;