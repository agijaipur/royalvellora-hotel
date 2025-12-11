// Room data for the hotel
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";

export interface PanoramaScene {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "youtube";
  icon?: "bedroom" | "bathroom" | "lobby" | "balcony" | "living" | "dining";
}

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
  // 360° View fields - now supports multiple scenes
  panoramaScenes?: PanoramaScene[];
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
    panoramaScenes: [
      {
        id: "bedroom",
        name: "Bedroom",
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "bedroom",
      },
      {
        id: "bathroom",
        name: "Bathroom",
        url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "bathroom",
      },
    ],
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
    panoramaScenes: [
      {
        id: "bedroom",
        name: "Master Bedroom",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "bedroom",
      },
      {
        id: "living",
        name: "Living Area",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "living",
      },
      {
        id: "bathroom",
        name: "Spa Bathroom",
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "bathroom",
      },
    ],
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
    panoramaScenes: [
      {
        id: "bedroom",
        name: "Grand Bedroom",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "bedroom",
      },
      {
        id: "living",
        name: "Living Room",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "living",
      },
      {
        id: "dining",
        name: "Private Dining",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "dining",
      },
      {
        id: "bathroom",
        name: "Jacuzzi Bathroom",
        url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "bathroom",
      },
      {
        id: "balcony",
        name: "Private Balcony",
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "balcony",
      },
    ],
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
    panoramaScenes: [
      {
        id: "bedroom",
        name: "Bedroom",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "bedroom",
      },
      {
        id: "bathroom",
        name: "Bathroom",
        url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=4096&h=2048&fit=crop",
        type: "image",
        icon: "bathroom",
      },
    ],
  },
];

export const getRoomById = (id: string): Room | undefined => {
  return rooms.find((room) => room.id === id);
};
