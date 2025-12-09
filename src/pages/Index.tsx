import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, Shield, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/ui/RoomCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { rooms } from "@/data/rooms";
import heroLobby from "@/assets/hero-lobby.jpg";
import spaImage from "@/assets/spa.jpg";
import diningImage from "@/assets/dining.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";

const bannerImages = [
  { src: heroLobby, alt: "Royal Vellora Inn Lobby", title: "Grand Lobby" },
  { src: roomDeluxe, alt: "Deluxe Room", title: "Deluxe Suite" },
  { src: roomExecutive, alt: "Executive Room", title: "Executive Room" },
  { src: roomPresidential, alt: "Presidential Suite", title: "Presidential Suite" },
  { src: spaImage, alt: "Spa & Wellness", title: "Spa & Wellness" },
  { src: diningImage, alt: "Fine Dining", title: "Fine Dining" },
];

const features = [
  {
    icon: Star,
    title: "Premium Experience",
    description: "Five-star amenities and personalized service for an unforgettable stay.",
  },
  {
    icon: Sparkles,
    title: "Elegant Spaces",
    description: "Thoughtfully designed rooms that blend comfort with sophistication.",
  },
  {
    icon: Shield,
    title: "Complete Privacy",
    description: "Discreet service and secure facilities for your peace of mind.",
  },
  {
    icon: Heart,
    title: "Curated Details",
    description: "Every element carefully selected to enhance your experience.",
  },
];

const testimonials = [
  {
    quote: "An absolutely magnificent experience. The attention to detail and impeccable service made our anniversary unforgettable.",
    author: "Eleanor & James",
    location: "New York",
    rating: 5,
  },
  {
    quote: "Royal Vellora Inn exceeded all expectations. The presidential suite is simply breathtaking, and the staff is world-class.",
    author: "Michael Chen",
    location: "Singapore",
    rating: 5,
  },
  {
    quote: "The perfect blend of luxury and warmth. We've stayed at many fine hotels, but Royal Vellora has a special place in our hearts.",
    author: "Sophie Laurent",
    location: "Paris",
    rating: 5,
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <Layout>
      {/* Hero Section with Banner Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Banner Carousel */}
        <div className="absolute inset-0">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 flex items-center justify-center text-background hover:bg-background/20 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 flex items-center justify-center text-background hover:bg-background/20 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "w-8 bg-primary" 
                  : "w-4 bg-background/40 hover:bg-background/60"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-luxury text-center pt-20">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-xs tracking-[0.4em] uppercase text-background/90 font-medium mb-6 animate-fade-in">
              Luxury Boutique Hotel
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium text-background mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Where Elegance
              <br />
              Meets Serenity
            </h1>
            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Discover the art of refined hospitality at Royal Vellora Inn.
              Experience timeless luxury in the heart of the city.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="luxury-rose" size="xl" asChild>
                <Link to="/booking">Reserve Your Stay</Link>
              </Button>
              <Button variant="luxury-outline" size="xl" className="border-background/50 text-background hover:bg-background hover:text-foreground" asChild>
                <Link to="/rooms">Explore Rooms</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-background/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-background/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              subtitle="Why Choose Us"
              title="The Art of Hospitality"
              description="At Royal Vellora Inn, we believe luxury lies in the details. Every aspect of your stay is crafted to perfection."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} animation="fade-up" delay={0.1} stagger={0.1} index={index}>
                <div className="text-center p-8 rounded-lg bg-card hover:shadow-luxury transition-all duration-500 group h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-display font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              subtitle="Accommodations"
              title="Exquisite Rooms & Suites"
              description="Each room is a sanctuary of comfort, designed with meticulous attention to detail and furnished with the finest amenities."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.slice(0, 3).map((room, index) => (
              <ScrollReveal key={room.id} animation="fade-up" delay={0.1} stagger={0.15} index={index}>
                <RoomCard {...room} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={0.4}>
            <div className="text-center mt-12">
              <Button variant="luxury-outline" size="lg" asChild>
                <Link to="/rooms" className="inline-flex items-center gap-2">
                  View All Rooms
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="fade-right">
              <div>
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
                  Experiences
                </span>
                <h2 className="heading-lg mb-6">Indulge in Timeless Luxury</h2>
                <p className="text-background/70 mb-8 leading-relaxed">
                  From our award-winning spa to exquisite dining experiences, Royal
                  Vellora Inn offers a world of refined pleasures. Let us curate
                  unforgettable moments during your stay.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h4 className="font-semibold mb-1">Spa & Wellness</h4>
                      <p className="text-background/60 text-sm">
                        Rejuvenate with bespoke treatments in our serene sanctuary.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h4 className="font-semibold mb-1">Fine Dining</h4>
                      <p className="text-background/60 text-sm">
                        Savor culinary masterpieces crafted by world-renowned chefs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <h4 className="font-semibold mb-1">Concierge Services</h4>
                      <p className="text-background/60 text-sm">
                        Your every wish attended to with discretion and care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src={spaImage}
                    alt="Spa & Wellness"
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  <img
                    src={diningImage}
                    alt="Fine Dining"
                    className="rounded-lg w-full h-64 object-cover"
                  />
                </div>
                <div className="pt-8">
                  <img
                    src={heroLobby}
                    alt="Hotel Experience"
                    className="rounded-lg w-full h-80 object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              subtitle="Guest Reviews"
              title="Words from Our Guests"
              description="The true measure of our success lies in the experiences of those we serve."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.author} animation="fade-up" delay={0.1} stagger={0.1} index={index}>
                <div className="bg-card p-8 rounded-lg border border-border/50 hover:shadow-luxury transition-all duration-500 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-foreground/80 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/30">
        <div className="container-luxury text-center">
          <ScrollReveal animation="scale">
            <h2 className="heading-lg mb-4">Begin Your Journey</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let us create unforgettable memories during your stay at Royal Vellora Inn.
            </p>
            <Button variant="luxury" size="xl" asChild>
              <Link to="/booking">Book Your Stay</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
