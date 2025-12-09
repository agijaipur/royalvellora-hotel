import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-foreground/30 backdrop-blur-sm py-6"
      )}
    >
      <div className="container-luxury">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className={cn(
              "text-2xl md:text-3xl font-display font-medium tracking-tight transition-colors drop-shadow-md",
              isScrolled 
                ? "text-foreground group-hover:text-primary" 
                : "text-white group-hover:text-primary"
            )}>
              Royal Vellora
            </span>
            <span className={cn(
              "text-[10px] md:text-xs tracking-[0.3em] uppercase drop-shadow-md",
              isScrolled ? "text-muted-foreground" : "text-white/80"
            )}>
              Inn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm tracking-wide uppercase font-medium transition-colors relative py-2 drop-shadow-md",
                  isScrolled
                    ? location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                    : location.pathname === item.href
                      ? "text-primary"
                      : "text-white/90 hover:text-white",
                  "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-left after:transition-transform after:duration-300",
                  location.pathname === item.href
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className={cn(
                "flex items-center gap-2 text-sm transition-colors drop-shadow-md",
                isScrolled 
                  ? "text-muted-foreground hover:text-foreground" 
                  : "text-white/90 hover:text-white"
              )}
            >
              <Phone className="w-4 h-4" />
              <span>+1 234 567 890</span>
            </a>
            <Button variant="luxury" size="lg" asChild>
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 drop-shadow-md",
              isScrolled ? "text-foreground" : "text-white"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-4 pb-6 border-t border-border pt-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-lg font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Phone className="w-4 h-4" />
                <span>+1 234 567 890</span>
              </a>
              <Button variant="luxury" size="lg" asChild>
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
