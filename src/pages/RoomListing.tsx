import { Link } from "react-router-dom";
import { Filter } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/ui/RoomCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { rooms } from "@/data/rooms";

const RoomListing = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl">
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
    </Layout>
  );
};

export default RoomListing;
