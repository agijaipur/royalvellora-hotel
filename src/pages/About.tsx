import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { Award, Users, Heart, Globe } from "lucide-react";
import heroLobby from "@/assets/hero-lobby.jpg";
import spaImage from "@/assets/spa.jpg";
import diningImage from "@/assets/dining.jpg";

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "50K+", label: "Happy Guests" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "15", label: "Industry Awards" },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We pursue perfection in every detail, from the thread count of our linens to the precision of our service.",
  },
  {
    icon: Users,
    title: "Personalization",
    description: "Every guest is unique, and we tailor each experience to create lasting memories.",
  },
  {
    icon: Heart,
    title: "Warmth",
    description: "Beyond luxury, we offer genuine hospitality that makes you feel truly at home.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "We're committed to preserving our environment for future generations of travelers.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroLobby}
            alt="Royal Vellora Inn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative z-10 text-center text-background">
          <span className="inline-block text-xs tracking-[0.3em] uppercase font-medium mb-4 opacity-80 animate-fade-in">
            Our Story
          </span>
          <h1 className="heading-xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            About Royal Vellora Inn
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation="fade-right">
              <div>
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
                  Since 1998
                </span>
                <h2 className="heading-lg mb-6">A Legacy of Luxury</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Royal Vellora Inn was born from a vision to create more than just
                    a hotel — we sought to craft a sanctuary where timeless elegance
                    meets modern comfort, and where every guest becomes part of our
                    extended family.
                  </p>
                  <p>
                    Founded in 1998 by the Vellora family, our hotel has grown from
                    a charming boutique establishment to one of the city's most
                    beloved luxury destinations. Through the years, we've welcomed
                    dignitaries, celebrities, and most importantly, countless
                    families creating precious memories.
                  </p>
                  <p>
                    Today, Royal Vellora Inn continues to uphold the founding
                    principles of exceptional service, attention to detail, and
                    genuine warmth that have defined our reputation for over two
                    decades.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={spaImage}
                  alt="Hotel Spa"
                  className="rounded-lg w-full h-48 lg:h-64 object-cover"
                />
                <img
                  src={diningImage}
                  alt="Hotel Dining"
                  className="rounded-lg w-full h-48 lg:h-64 object-cover mt-8"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} animation="fade-up" delay={0.1} stagger={0.1} index={index}>
                <div>
                  <div className="text-4xl md:text-5xl font-display font-medium text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-background/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              subtitle="Our Philosophy"
              title="What We Stand For"
              description="Our values guide every interaction and decision, ensuring that the Royal Vellora experience remains unparalleled."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} animation="fade-up" delay={0.1} stagger={0.1} index={index}>
                <div className="text-center p-6 rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-luxury transition-all duration-500 h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-medium mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <SectionHeading
              subtitle="Leadership"
              title="Meet Our Team"
              description="Behind every exceptional stay is a team of dedicated professionals committed to your comfort."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Victoria Vellora", role: "CEO & Owner", initials: "VV" },
              { name: "James Morrison", role: "General Manager", initials: "JM" },
              { name: "Elena Santos", role: "Director of Hospitality", initials: "ES" },
            ].map((member, index) => (
              <ScrollReveal key={member.name} animation="scale" delay={0.1} stagger={0.1} index={index}>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-display text-primary">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-lg">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
