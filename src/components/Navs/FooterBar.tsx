import { footerLinks } from '@/shared/utils/constants';
import logo from '../../assets/logos/logo-transparent.png';

const Footer = () => {
  return (
    <footer className="overflow-hidden bg-[var(--background)]">

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-white">
                <img src={logo} className='p-2' />
              </div>

              <span className="text-3xl font-bold">
                Slotflow
              </span>
            </div>

            <p className="max-w-sm text-base text-zinc-500">
              © Copyright Slotflow 2026.
              <br />
              All rights reserved.
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
                    className="text-zinc-400 transition hover:text-white"
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
                      className="group flex items-center gap-3 text-zinc-400 transition hover:text-white"
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
                    className="text-zinc-400 transition hover:text-white"
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
                    className="text-zinc-400 transition hover:text-white"
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
        <h1 className="select-none text-[20rem] font-extrabold tracking-tight dark:text-white/[0.1] text-black/[0.1] leading-none">
          Slotflow
        </h1>
      </div>
    </footer>
  );
}

export default Footer;