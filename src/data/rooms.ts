// Room data for the hotel
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";

export interface Room {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  images: string[];
  capacity: number;
  size: number;
  bedType: string;
  amenities: string[];
  featured?: boolean;
}

export const rooms: Room[] = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    description: "Elegantly appointed room with premium amenities and city views.",
    longDescription: "Our Deluxe Rooms offer a perfect blend of comfort and sophistication. Featuring premium bedding, marble bathroom with rain shower, and floor-to-ceiling windows offering stunning city views. Each room is thoughtfully designed with luxury touches including Egyptian cotton linens, plush robes, and curated artwork.",
    price: 299,
    image: roomDeluxe,
    images: [roomDeluxe, roomExecutive, roomPresidential],
    capacity: 2,
    size: 35,
    bedType: "King",
    amenities: ["Free WiFi", "Smart TV", "Mini Bar", "Room Service", "Air Conditioning", "Safe Box", "Nespresso Machine", "Luxury Toiletries"],
    featured: false,
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    description: "Spacious suite with separate living area and panoramic views.",
    longDescription: "The Executive Suite offers generous living space with a distinct bedroom and sitting area. Enjoy panoramic city views, a marble bathroom with soaking tub, and premium entertainment systems. Perfect for business travelers or those seeking extra space and comfort during their stay.",
    price: 499,
    image: roomExecutive,
    images: [roomExecutive, roomDeluxe, roomPresidential],
    capacity: 3,
    size: 55,
    bedType: "King",
    amenities: ["Free WiFi", "Smart TV", "Mini Bar", "Room Service", "Air Conditioning", "Safe Box", "Nespresso Machine", "Luxury Toiletries", "Living Area", "Work Desk", "Bathtub"],
    featured: true,
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    description: "Our finest accommodation with unparalleled luxury and service.",
    longDescription: "The Presidential Suite represents the pinnacle of luxury at Royal Vellora Inn. Spanning an impressive floor area, this suite features a grand living room, private dining area, master bedroom with walk-in closet, and a spa-inspired bathroom. Guests enjoy exclusive butler service and access to our VIP lounge.",
    price: 899,
    image: roomPresidential,
    images: [roomPresidential, roomExecutive, roomDeluxe],
    capacity: 4,
    size: 95,
    bedType: "Super King",
    amenities: ["Free WiFi", "Smart TV", "Mini Bar", "24/7 Butler Service", "Air Conditioning", "Safe Box", "Nespresso Machine", "Luxury Toiletries", "Living Area", "Dining Area", "Jacuzzi", "VIP Lounge Access", "Private Check-in"],
    featured: true,
  },
  {
    id: "junior-suite",
    name: "Junior Suite",
    description: "Contemporary suite with modern amenities and elegant design.",
    longDescription: "Our Junior Suites offer the perfect balance of space and intimacy. Featuring a comfortable seating area, work desk, and premium king bed, these suites are ideal for extended stays or guests who appreciate extra room to relax. The marble bathroom includes both rain shower and deep soaking tub.",
    price: 399,
    image: roomDeluxe,
    images: [roomDeluxe, roomExecutive, roomPresidential],
    capacity: 2,
    size: 45,
    bedType: "King",
    amenities: ["Free WiFi", "Smart TV", "Mini Bar", "Room Service", "Air Conditioning", "Safe Box", "Nespresso Machine", "Luxury Toiletries", "Seating Area", "Work Desk"],
    featured: false,
  },
];

export const getRoomById = (id: string): Room | undefined => {
  return rooms.find((room) => room.id === id);
};
