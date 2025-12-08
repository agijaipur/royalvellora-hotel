import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Maximize, Bed, Check, Wifi, Tv, Coffee, Wind, Lock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getRoomById, rooms } from "@/data/rooms";
import { RoomCard } from "@/components/ui/RoomCard";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { useState } from "react";

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
            {/* Image Gallery */}
            <ScrollReveal animation="fade-right">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={room.images[selectedImage]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {room.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
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
    </Layout>
  );
};

export default RoomDetails;
