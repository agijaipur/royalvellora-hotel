import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Maximize, Bed, Check, Wifi, Tv, Coffee, Wind, Lock, ChevronLeft, ChevronRight, View } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getRoomById, rooms } from "@/data/rooms";
import { RoomCard } from "@/components/ui/RoomCard";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { useState, useEffect, useCallback } from "react";
import { Viewer360 } from "@/components/ui/Viewer360";

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Free WiFi": Wifi,
  "Smart TV": Tv,
  "Nespresso Machine": Coffee,
  "Air Conditioning": Wind,
  "Safe Box": Lock,
};

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = getRoomById(id || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [is360ViewOpen, setIs360ViewOpen] = useState(false);

  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    if (!room || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % room.images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [room, isAutoPlaying]);

  const goToNext = useCallback(() => {
    if (!room) return;
    setIsAutoPlaying(false);
    setSelectedImage((prev) => (prev + 1) % room.images.length);
  }, [room]);

  const goToPrev = useCallback(() => {
    if (!room) return;
    setIsAutoPlaying(false);
    setSelectedImage((prev) => (prev - 1 + room.images.length) % room.images.length);
  }, [room]);

  if (!room) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Room Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The room you're looking for doesn't exist.
            </p>
            <Button variant="luxury" asChild>
              <Link to="/rooms">View All Rooms</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const otherRooms = rooms.filter((r) => r.id !== room.id).slice(0, 2);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-secondary/30">
        <div className="container-luxury">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rooms
          </button>
        </div>
      </div>

      {/* Room Details */}
      <section className="section-padding pt-8">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery Carousel */}
            <ScrollReveal animation="fade-right">
              <div className="space-y-4">
                {/* Main Carousel */}
                <div 
                  className="relative aspect-[4/3] rounded-lg overflow-hidden group"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Image Container with Slide Animation */}
                  <div className="relative w-full h-full">
                    {room.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${room.name} view ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                          selectedImage === index 
                            ? "opacity-100 scale-100" 
                            : "opacity-0 scale-105"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110 shadow-elegant"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background hover:scale-110 shadow-elegant"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>

                  {/* Progress Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {room.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setSelectedImage(index);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          selectedImage === index 
                            ? "w-8 bg-primary" 
                            : "w-1.5 bg-background/60 hover:bg-background/80"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Auto-play Indicator */}
                  {isAutoPlaying && (
                    <div className="absolute top-4 right-4 px-2 py-1 rounded bg-background/60 backdrop-blur-sm">
                      <span className="text-xs text-foreground/80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Auto
                      </span>
                    </div>
                  )}

                  {/* 360° View Button */}
                  {room.panorama360 && (
                    <button
                      onClick={() => setIs360ViewOpen(true)}
                      className="absolute top-4 left-4 px-3 py-2 rounded-lg bg-primary text-primary-foreground flex items-center gap-2 text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      <View className="w-4 h-4" />
                      360° View
                    </button>
                  )}
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-3 gap-4">
                  {room.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setSelectedImage(index);
                      }}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-transparent hover:border-border opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${room.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Room Info */}
            <ScrollReveal animation="fade-left" delay={0.1}>
              <div>
                <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-3">
                  {room.featured ? "Featured Suite" : "Accommodation"}
                </span>
                <h1 className="heading-lg mb-4">{room.name}</h1>
                
                {/* Quick Facts */}
                <div className="flex flex-wrap gap-6 mb-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5" />
                    <span>{room.size} m²</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5" />
                    <span>{room.bedType} Bed</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {room.longDescription}
                </p>

                {/* Price */}
                <div className="bg-secondary/50 p-6 rounded-lg mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-display font-semibold">
                      ${room.price}
                    </span>
                    <span className="text-muted-foreground">per night</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Includes taxes and breakfast for two
                  </p>
                  <Button variant="luxury" size="xl" className="w-full" asChild>
                    <Link to="/booking">Reserve This Room</Link>
                  </Button>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-display font-medium mb-4">
                    Room Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {room.amenities.map((amenity, index) => {
                      const Icon = amenityIcons[amenity] || Check;
                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <Icon className="w-4 h-4 text-primary" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Other Rooms */}
      <section className="section-padding bg-secondary/30">
        <div className="container-luxury">
          <ScrollReveal animation="fade-up">
            <h2 className="heading-md text-center mb-8">You May Also Like</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherRooms.map((r, index) => (
              <ScrollReveal key={r.id} animation="fade-up" delay={0.1} stagger={0.15} index={index}>
                <RoomCard {...r} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 360° Viewer Modal */}
      {room.panorama360 && (
        <Viewer360
          isOpen={is360ViewOpen}
          onClose={() => setIs360ViewOpen(false)}
          mediaUrl={room.panorama360.url}
          mediaType={room.panorama360.type}
          roomName={room.name}
        />
      )}
    </Layout>
  );
};

export default RoomDetails;
