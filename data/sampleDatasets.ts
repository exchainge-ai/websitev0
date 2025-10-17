export interface Dataset {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  size: string;
  format: string;
  lastUpdated: string;
  image: string;
  downloads: number;
  rating: number;
  tags: string[];
}

export const sampleDatasets: Dataset[] = [
  {
    id: 1,
    title: "Urban Robotics Navigation Dataset",
    description: "10,000+ hours of robot navigation data in urban environments",
    category: "Robotics",
    price: 299,
    size: "2.4 GB",
    format: "CSV, JSON",
    lastUpdated: "2w ago",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
    downloads: 1243,
    rating: 4.8,
    tags: ["Navigation", "Urban", "LIDAR"],
  },
  {
    id: 2,
    title: "Autonomous Vehicle Dataset - Highway",
    description: "Multi-sensor highway driving data with 500k labeled frames",
    category: "Autonomous Vehicles",
    price: 499,
    size: "15.2 GB",
    format: "Parquet",
    lastUpdated: "1w ago",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
    downloads: 892,
    rating: 4.9,
    tags: ["Highway", "Multi-sensor", "Labeled"],
  },
  {
    id: 3,
    title: "Manipulation Task Dataset",
    description: "Robot manipulation tasks with diverse objects and environments",
    category: "Robotics",
    price: 199,
    size: "5.7 GB",
    format: "HDF5",
    lastUpdated: "3w ago",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=400",
    downloads: 654,
    rating: 4.7,
    tags: ["Manipulation", "Objects", "Tasks"],
  },
  {
    id: 4,
    title: "Indoor Navigation Dataset",
    description: "Large-scale indoor navigation with RGB-D and IMU data",
    category: "Robotics",
    price: 249,
    size: "8.1 GB",
    format: "ROS Bag",
    lastUpdated: "1mo ago",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400",
    downloads: 1089,
    rating: 4.6,
    tags: ["Indoor", "RGB-D", "IMU"],
  },
  {
    id: 5,
    title: "Agricultural Robot Dataset",
    description: "Field navigation and crop monitoring data from multiple farms",
    category: "Agriculture",
    price: 349,
    size: "12.3 GB",
    format: "CSV, Images",
    lastUpdated: "5d ago",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    downloads: 432,
    rating: 4.8,
    tags: ["Agriculture", "Field", "Monitoring"],
  },
  {
    id: 6,
    title: "Warehouse Automation Dataset",
    description: "Comprehensive dataset for warehouse robotics and logistics",
    category: "Logistics",
    price: 399,
    size: "6.8 GB",
    format: "JSON, Video",
    lastUpdated: "1w ago",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
    downloads: 756,
    rating: 4.7,
    tags: ["Warehouse", "Logistics", "Automation"],
  },
];
