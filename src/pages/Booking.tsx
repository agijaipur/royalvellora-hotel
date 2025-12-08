import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Users, ChevronDown, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { rooms } from "@/data/rooms";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Booking = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no backend functionality
    if (step < 3) setStep(step + 1);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-secondary/30">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
                Reservations
              </span>
              <h1 className="heading-xl mb-4">Book Your Stay</h1>
              <p className="body-lg">
                Reserve your perfect retreat at Royal Vellora Inn. Complete the
                form below to begin your luxury experience.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-border">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {["Select Dates", "Choose Room", "Guest Details"].map((label, index) => (
                <div key={label} className="flex items-center gap-2 md:gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      step > index + 1
                        ? "bg-primary text-primary-foreground"
                        : step === index + 1
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span
                    className={cn(
                      "text-sm hidden md:block",
                      step === index + 1 ? "font-medium" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                  {index < 2 && (
                    <div className="w-8 md:w-16 h-px bg-border ml-2" />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Select Dates */}
              {step === 1 && (
                <ScrollReveal animation="fade-up">
                  <div className="space-y-8">
                    <h2 className="heading-md text-center mb-8">
                      When would you like to stay?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Check-in */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Check-in Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-12",
                                !checkIn && "text-muted-foreground"
                              )}
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {checkIn ? format(checkIn, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkIn}
                              onSelect={setCheckIn}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Check-out */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Check-out Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-12",
                                !checkOut && "text-muted-foreground"
                              )}
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {checkOut ? format(checkOut, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkOut}
                              onSelect={setCheckOut}
                              initialFocus
                              disabled={(date) => date <= (checkIn || new Date())}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Number of Guests</label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          disabled={guests <= 1}
                        >
                          -
                        </Button>
                        <div className="flex items-center gap-2 px-6 py-3 bg-muted rounded-md min-w-[100px] justify-center">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{guests}</span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setGuests(Math.min(6, guests + 1))}
                          disabled={guests >= 6}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="luxury"
                      size="xl"
                      type="submit"
                      className="w-full md:w-auto md:px-16"
                      disabled={!checkIn || !checkOut}
                    >
                      Continue to Room Selection
                    </Button>
                  </div>
                </ScrollReveal>
              )}

              {/* Step 2: Choose Room */}
              {step === 2 && (
                <ScrollReveal animation="fade-up">
                  <div className="space-y-8">
                    <h2 className="heading-md text-center mb-8">
                      Select Your Room
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                      {rooms.map((room, index) => (
                        <div
                          key={room.id}
                          style={{ animationDelay: `${index * 0.1}s` }}
                          className="animate-fade-in"
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedRoom(room.id)}
                            className={cn(
                              "w-full flex flex-col md:flex-row gap-4 p-4 rounded-lg border-2 text-left transition-all",
                              selectedRoom === room.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-full md:w-40 h-32 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-display font-medium text-lg">
                                    {room.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {room.capacity} guests · {room.size}m² · {room.bedType} bed
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-semibold">${room.price}</p>
                                  <p className="text-xs text-muted-foreground">per night</p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">
                                {room.description}
                              </p>
                            </div>
                            {selectedRoom === room.id && (
                              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        type="button"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="luxury"
                        size="xl"
                        type="submit"
                        className="flex-1 md:flex-none md:px-16"
                        disabled={!selectedRoom}
                      >
                        Continue to Details
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Step 3: Guest Details */}
              {step === 3 && (
                <ScrollReveal animation="fade-up">
                  <div className="space-y-8">
                    <h2 className="heading-md text-center mb-8">
                      Complete Your Reservation
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Guest Info */}
                      <div className="space-y-6">
                        <h3 className="font-display font-medium text-lg">Guest Information</h3>
                        <div className="grid grid-cols-2 gap-4">
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
                          <label className="text-sm font-medium">Email</label>
                          <Input type="email" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <Input type="tel" placeholder="+1 234 567 890" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Special Requests</label>
                          <Input placeholder="Any special requirements?" />
                        </div>
                      </div>

                      {/* Booking Summary */}
                      <div className="bg-secondary/50 p-6 rounded-lg h-fit">
                        <h3 className="font-display font-medium text-lg mb-4">
                          Booking Summary
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Check-in</span>
                            <span>{checkIn ? format(checkIn, "PP") : "-"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Check-out</span>
                            <span>{checkOut ? format(checkOut, "PP") : "-"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Guests</span>
                            <span>{guests} guests</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Room</span>
                            <span>
                              {rooms.find((r) => r.id === selectedRoom)?.name || "-"}
                            </span>
                          </div>
                          <div className="border-t border-border pt-3 mt-3">
                            <div className="flex justify-between font-semibold text-base">
                              <span>Total</span>
                              <span>
                                $
                                {rooms.find((r) => r.id === selectedRoom)?.price ||
                                  0}
                                /night
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        type="button"
                        onClick={() => setStep(2)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="luxury"
                        size="xl"
                        type="submit"
                        className="flex-1 md:flex-none md:px-16"
                      >
                        Complete Reservation
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-12 bg-muted/50 border-t border-border">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
            {[
              { title: "Free Cancellation", desc: "Cancel up to 48 hours before check-in for a full refund" },
              { title: "Best Rate Guarantee", desc: "Book directly for the best available rates" },
              { title: "Secure Payment", desc: "Your payment information is encrypted and secure" },
            ].map((policy, index) => (
              <ScrollReveal key={policy.title} animation="fade-up" delay={0.1} stagger={0.1} index={index}>
                <div>
                  <h4 className="font-medium mb-1">{policy.title}</h4>
                  <p className="text-muted-foreground">{policy.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
