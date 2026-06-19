"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { GiCentaurHeart } from "react-icons/gi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Classes", href: "/all-classes" },
  { label: "Community Forum", href: "/community-forum" },
  { label: "Portal Login", href: "/signin" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Support", href: "/support" },
];

const socialLinks = [
  { label: "X", href: "https://twitter.com", icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
];

const footerLinkClassName =
  "group inline-flex items-center gap-2 text-sm text-[#30475E] transition-all duration-200 hover:translate-x-1 hover:text-[#F05454] dark:text-zinc-400 dark:hover:text-[#F05454]";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <footer className="border-t border-[#30475E]/12 bg-[#DDDDDD] text-[#222831] dark:border-[#30475E]/35 dark:bg-[#222831] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.15fr_0.85fr_1fr_1fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F05454] text-white shadow-[0_14px_26px_-16px_rgba(240,84,84,0.9)]">
                <GiCentaurHeart size={22} />
              </span>
              <span>
                <span className="block text-2xl font-black tracking-tight text-[#222831] dark:text-white">
                  Flex<span className="text-[#F05454]">Pulse</span>
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.28em] text-[#30475E] dark:text-zinc-300">
                  Stronger Every Day
                </span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-[#30475E] dark:text-zinc-300">
              Elevate your body, mind, and spirit with premium trainers,
              classes, and community support at FlexPulse.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#30475E]/12 bg-white text-[#222831] transition-all duration-200 hover:-translate-y-1 hover:border-[#F05454] hover:bg-[#F05454] hover:text-white dark:border-white/10 dark:bg-[#30475E]/30 dark:text-zinc-200 dark:hover:border-[#F05454] dark:hover:bg-[#F05454]"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#222831] dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={footerLinkClassName}>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#F05454]/40 transition-all duration-200 group-hover:w-2 group-hover:bg-[#F05454]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#222831] dark:text-white">
              Contact Us
            </h3>
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=128+Pulse+Blvd+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-sm text-[#30475E] transition-colors duration-200 hover:text-[#F05454] dark:text-zinc-300 dark:hover:text-[#F05454]"
              >
                <FiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#F05454]" />
                <span className="max-w-xs leading-7">
                  128 Pulse Blvd, Cyber District, Dhaka, Bangladesh
                </span>
              </a>

              <a
                href="tel:+8801712345678"
                className="group flex items-center gap-3 text-sm text-[#30475E] transition-colors duration-200 hover:text-[#F05454] dark:text-zinc-300 dark:hover:text-[#F05454]"
              >
                <FiPhone className="h-5 w-5 shrink-0 text-[#F05454]" />
                <span>+880 1712-345678</span>
              </a>

              <a
                href="mailto:contact@flexpulse.com"
                className="group flex items-center gap-3 text-sm text-[#30475E] transition-colors duration-200 hover:text-[#F05454] dark:text-zinc-300 dark:hover:text-[#F05454]"
              >
                <FiMail className="h-5 w-5 shrink-0 text-[#F05454]" />
                <span>contact@flexpulse.com</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#222831] dark:text-white">
              Stay Updated
            </h3>
            <p className="max-w-sm text-sm leading-7 text-[#30475E] dark:text-zinc-300">
              Subscribe to get expert fitness tips, workout guides, and class
              announcements.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row xl:flex-col 2xl:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
                className="h-11 flex-1 rounded-2xl border border-[#30475E]/12 bg-white/80 px-4 text-sm text-[#222831] outline-none transition focus:border-[#F05454]/40 dark:border-white/10 dark:bg-[#30475E]/30 dark:text-white dark:placeholder:text-zinc-400"
              />
              <button
                type="submit"
                className="h-11 rounded-2xl bg-[#F05454] px-6 text-sm font-bold text-white transition hover:bg-[#222831] dark:hover:bg-[#30475E]"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#30475E]/10 pt-6 text-sm text-[#30475E] dark:border-white/8 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-[#F05454]">FlexPulse</span>. All
            Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-200 hover:text-[#F05454]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
