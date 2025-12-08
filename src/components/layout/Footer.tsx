import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const footerLinks = {
  explore: [
    { name: "Our Rooms", href: "/rooms" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Book Now", href: "/booking" },
  ],
  services: [
    { name: "Room Service", href: "#" },
    { name: "Spa & Wellness", href: "#" },
    { name: "Fine Dining", href: "#" },
    { name: "Concierge", href: "#" },
  ],
  policies: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cancellation Policy", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-display font-medium tracking-tight">
                Royal Vellora
              </span>
              <span className="block text-xs tracking-[0.3em] uppercase text-background/60">
                Inn
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Experience timeless elegance and unparalleled hospitality at Royal
              Vellora Inn, where every stay becomes a cherished memory.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm tracking-widest uppercase font-semibold mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase font-semibold mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm tracking-widest uppercase font-semibold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  123 Elegance Avenue,
                  <br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  +1 234 567 890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@royalvellora.com"
                  className="text-background/70 hover:text-background transition-colors text-sm"
                >
                  info@royalvellora.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Royal Vellora Inn. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.policies.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-background/50 hover:text-background/70 transition-colors text-xs"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
