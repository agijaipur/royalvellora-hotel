import { Link } from "react-router-dom";
import { ArrowRight, Users, Maximize, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  size: number;
  featured?: boolean;
}

export const RoomCard = ({
  id,
  name,
  description,
  price,
  image,
  capacity,
  size,
  featured = false,
}: RoomCardProps) => {
  return (
    <Link
      to={`/rooms/${id}`}
      className={cn(
        "group block bg-card rounded-lg overflow-hidden transition-all duration-500 hover:shadow-luxury",
        featured && "lg:col-span-2 lg:grid lg:grid-cols-2"
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden", featured ? "h-80 lg:h-full" : "h-64")}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-sm font-semibold">
            ${price}
            <span className="text-muted-foreground font-normal">/night</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h3 className="text-xl lg:text-2xl font-display font-medium mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" />
            <span>{size} m²</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-4 h-4" />
            <span>Free WiFi</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide group-hover:text-primary transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};
