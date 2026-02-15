import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/all-products" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const supportLinks = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Help Center", path: "/help" },
    { name: "FAQs", path: "/faq" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://web.facebook.com/sumaiyameghla.CSE.PUST/",
      icon:
        "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/8801704707744",
      icon:
        "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sumaiyaameghla/",
      icon:
        "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sumaiya-khatun-web/",
      icon:
        "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <div className="h-12 w-12 rounded-xl bg-neutral-800/60 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/40 transition-shadow overflow-hidden">
                <Image src="/logo.png.png" alt="FabricPulse logo" width={48} height={48} />
              </div>
              <span className="text-2xl font-bold">
                <span className="text-orange-400">Care</span>
                <span className="text-amber-300">.IO</span>
              </span>
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Trusted caregiving with smart booking and verified caregivers for baby, elderly, and special care.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-neutral-800/50 hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-400 rounded-full flex items-center justify-center transition-all shadow-lg"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5 text-white">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-neutral-300 hover:text-orange-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-300 transition-all"></span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5 text-white">Support</h3>
            <nav className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-neutral-300 hover:text-amber-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-amber-300 transition-all"></span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5 text-white">Contact Us</h3>
            <div className="flex flex-col gap-4 text-neutral-300">
              <div className="flex items-start gap-3 group">
                <div className="bg-neutral-800/50 p-2 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                  <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm leading-relaxed">PUST, Pabna Sadar, Pabna, Bangladesh</span>
              </div>
              <a href="mailto:sumaiyameghla1111@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                <div className="bg-neutral-800/50 p-2 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                  <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm break-all">sumaiyameghla1111@gmail.com</span>
              </a>
              <a href="tel:+8801704707744" className="flex items-center gap-3 hover:text-white transition-colors group">
                <div className="bg-neutral-800/50 p-2 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                  <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm">+880 1704-707744</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm text-center md:text-left">
              © {currentYear} Care.IO. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-neutral-400 hover:text-orange-300 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-neutral-400 hover:text-orange-300 transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-neutral-400 hover:text-orange-300 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
