import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Elegance Avenue", "Beverly Hills, CA 90210"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 234 567 890", "+1 234 567 891"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@royalvellora.com", "reservations@royalvellora.com"],
  },
  {
    icon: Clock,
    title: "Reception Hours",
    details: ["24/7 Front Desk", "Concierge: 7AM - 11PM"],
  },
];

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no backend functionality
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container-luxury">
          <div className="max-w-3xl">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
              Get in Touch
            </span>
            <h1 className="heading-xl mb-4">Contact Us</h1>
            <p className="body-lg">
              We'd love to hear from you. Reach out to our team for reservations,
              inquiries, or any assistance you may need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div>
              <h2 className="heading-md mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input type="tel" placeholder="+1 234 567 890" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                  />
                </div>
                <Button variant="luxury" size="lg" type="submit">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="heading-md mb-6">Contact Information</h2>
              <div className="space-y-8 mb-12">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      {item.details.map((detail) => (
                        <p key={detail} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-lg overflow-hidden border border-border">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      Interactive map will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury text-center">
          <h2 className="heading-md mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Find quick answers to common questions about reservations, amenities,
            and services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            {[
              {
                q: "What is the check-in/check-out time?",
                a: "Check-in is at 3:00 PM and check-out is at 12:00 PM.",
              },
              {
                q: "Is parking available?",
                a: "Yes, we offer complimentary valet parking for all guests.",
              },
              {
                q: "Do you accommodate special requests?",
                a: "Absolutely! Contact our concierge for any special arrangements.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-card p-6 rounded-lg border border-border/50"
              >
                <h4 className="font-medium mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
