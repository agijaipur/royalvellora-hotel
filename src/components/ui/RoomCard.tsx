import { Link } from "react-router-dom";
import { ArrowRight, Users, Maximize, Wifi } from "lucide-react";

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  size: number;
}

export const RoomCard = ({
  id,
  name,
  description,
  price,
  image,
  capacity,
  size,
}: RoomCardProps) => {
  return (
    <Link
      to={`/rooms/${id}`}
      className="group block bg-card rounded-lg overflow-hidden transition-all duration-500 hover:shadow-luxury h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-64 flex-shrink-0">
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
      <div className="p-6 lg:p-8 flex flex-col flex-grow">
        <h3 className="text-xl lg:text-2xl font-display font-medium mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
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
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide group-hover:text-primary transition-colors mt-auto">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};
