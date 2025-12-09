import { Link } from "react-router-dom";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/ui/RoomCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { rooms } from "@/data/rooms";
import { useState, useEffect, useCallback } from "react";

import heroLobby from "@/assets/hero-lobby.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";
import spa from "@/assets/spa.jpg";
import dining from "@/assets/dining.jpg";

const bannerSlides = [
  {
    image: heroLobby,
    title: "Luxury Redefined",
    subtitle: "Experience Elegance",
  },
  {
    image: roomDeluxe,
    title: "Deluxe Comfort",
    subtitle: "Spacious & Refined",
  },
  {
    image: roomExecutive,
    title: "Executive Suite",
    subtitle: "Business Meets Luxury",
  },
  {
    image: roomPresidential,
    title: "Presidential Suite",
    subtitle: "Ultimate Opulence",
  },
  {
    image: spa,
    title: "Wellness Retreat",
    subtitle: "Rejuvenate Your Soul",
  },
  {
    image: dining,
    title: "Culinary Excellence",
    subtitle: "Fine Dining Experience",
  },
];

const RoomListing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  }, []);

  return (
    <Layout>
      {/* Banner Carousel */}
      <section 
        className="relative h-[60vh] min-h-[400px] overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            
            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`text-center transition-all duration-700 delay-300 ${
                  currentSlide === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span className="inline-block text-xs tracking-[0.4em] uppercase text-primary font-semibold mb-3 px-4 py-1.5 bg-background/20 backdrop-blur-sm rounded-full">
                  {slide.subtitle}
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-foreground drop-shadow-lg">
                  {slide.title}
                </h2>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-background/60 hover:scale-110 border border-border/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-background/60 hover:scale-110 border border-border/30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: currentSlide === index ? "48px" : "12px" }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="absolute inset-0 bg-foreground/30" />
              {currentSlide === index && (
                <span 
                  className="absolute inset-0 bg-primary origin-left"
                  style={{
                    animation: isAutoPlaying ? "progress 4s linear forwards" : "none",
                    width: isAutoPlaying ? undefined : "100%",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 px-4 py-2 bg-background/30 backdrop-blur-md rounded-full border border-border/30">
          <span className="text-sm font-medium text-foreground">
            {String(currentSlide + 1).padStart(2, "0")}{" "}
            <span className="text-muted-foreground">/</span>{" "}
            <span className="text-muted-foreground">{String(bannerSlides.length).padStart(2, "0")}</span>
          </span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
                Accommodations
              </span>
              <h1 className="heading-xl mb-4">Our Rooms & Suites</h1>
              <p className="body-lg">
                Discover our collection of elegantly appointed rooms and suites,
                each designed to provide the ultimate in comfort and luxury.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Bar (UI Only) */}
      <section className="py-6 border-b border-border sticky top-[72px] bg-background/95 backdrop-blur-md z-40">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="ghost" size="sm">Price: Low to High</Button>
                <Button variant="ghost" size="sm">Price: High to Low</Button>
                <Button variant="ghost" size="sm">Recommended</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Showing {rooms.length} rooms
            </p>
          </div>
        </div>
      </section>

      {/* Room Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room, index) => (
              <ScrollReveal key={room.id} animation="fade-up" delay={0.05} stagger={0.1} index={index}>
                <RoomCard {...room} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-luxury text-center">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              subtitle="Need Assistance?"
              title="Let Us Help You Choose"
              description="Our concierge team is ready to assist you in finding the perfect accommodation for your stay."
            />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="luxury" size="lg" asChild>
                <Link to="/contact">Contact Concierge</Link>
              </Button>
              <Button variant="luxury-outline" size="lg" asChild>
                <Link to="/booking">Book Directly</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Progress Animation Keyframes */}
      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </Layout>
  );
};

export default RoomListing;
