
export interface Dataset {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  size: string;
  format: string;
  rating: number;
  downloads: string;
  lastUpdated: string;
  tags: string[];
  image: string;
}

export const sampleDatasets: Dataset[] = [
  {
    id: '1',
    title: 'Robot Manipulation Task Dataset',
    description: 'Comprehensive dataset of robotic arm manipulation tasks including pick-and-place, assembly, and dexterous manipulation with RGB-D camera data, joint positions, and force/torque measurements.',
    price: '599',
    category: 'Robotics',
    size: '12.5 GB',
    format: 'ROS Bag, HDF5',
    rating: 4.9,
    downloads: '3.2K',
    lastUpdated: '2024-01-20',
    tags: ['manipulation', 'robotics', 'pick-place', 'force-feedback', 'rgb-d'],
    image: '/lovable-uploads/robot.jpg'
  },
  {
    id: '2',
    title: 'Autonomous Vehicle LiDAR Dataset',
    description: 'High-resolution LiDAR point clouds from urban driving scenarios with semantic segmentation labels, GPS coordinates, and synchronized camera data for autonomous navigation research.',
    price: '899',
    category: 'Autonomous Vehicles',
    size: '45.8 GB',
    format: 'PCL, PCD, PNG',
    rating: 4.8,
    downloads: '2.1K',
    lastUpdated: '2024-01-22',
    tags: ['lidar', 'autonomous-driving', 'point-cloud', 'segmentation', 'navigation'],
    image: '/lovable-uploads/car.jpg'
  },
  {
    id: '3',
    title: 'Human Motion Capture for HRI',
    description: 'Full-body motion capture data of humans performing various tasks and interactions, designed for human-robot interaction studies and gesture recognition systems.',
    price: '449',
    category: 'Human-Robot Interaction',
    size: '8.7 GB',
    format: 'BVH, C3D, JSON',
    rating: 4.7,
    downloads: '1.8K',
    lastUpdated: '2024-01-18',
    tags: ['mocap', 'human-motion', 'hri', 'gesture', 'interaction'],
    image: '/lovable-uploads/human.jpg'
  },
  {
    id: '4',
    title: 'Industrial IoT Sensor Networks',
    description: 'Multi-sensor data from industrial environments including temperature, vibration, pressure, and acoustic sensors for predictive maintenance and anomaly detection.',
    price: '359',
    category: 'Sensor Data',
    size: '6.3 GB',
    format: 'CSV, Time Series',
    rating: 4.6,
    downloads: '4.5K',
    lastUpdated: '2024-01-19',
    tags: ['iot', 'industrial', 'sensors', 'predictive-maintenance', 'anomaly-detection'],
    image: '/lovable-uploads/industry.webp'
  },
  {
    id: '5',
    title: 'Drone Navigation Dataset',
    description: 'Aerial navigation data from quadrotor drones including IMU data, camera feeds, GPS coordinates, and obstacle avoidance scenarios in various environments.',
    price: '299',
    category: 'Navigation',
    size: '15.2 GB',
    format: 'ROS Bag, MP4, CSV',
    rating: 4.5,
    downloads: '2.7K',
    lastUpdated: '2024-01-21',
    tags: ['drone', 'aerial', 'navigation', 'obstacle-avoidance', 'imu'],
    image: '/lovable-uploads/drone-2066933.jpg'
  },
  {
    id: '6',
    title: 'Tactile Sensing for Grasping',
    description: 'High-resolution tactile sensor data during object grasping tasks with various materials, shapes, and weights. Includes force profiles and slip detection data.',
    price: '799',
    category: 'Manipulation',
    size: '4.9 GB',
    format: 'HDF5, NumPy',
    rating: 4.8,
    downloads: '1.3K',
    lastUpdated: '2024-01-17',
    tags: ['tactile', 'grasping', 'force-sensing', 'slip-detection', 'materials'],
    image: '/lovable-uploads/hand palm.jpg'
  },
  {
    id: '7',
    title: 'Warehouse Robot Dataset',
    description: 'Complete dataset from warehouse automation including robot trajectories, shelf detection, package handling, and multi-robot coordination scenarios.',
    price: '659',
    category: 'Robotics',
    size: '22.1 GB',
    format: 'ROS Bag, JSON',
    rating: 4.7,
    downloads: '1.9K',
    lastUpdated: '2024-01-16',
    tags: ['warehouse', 'automation', 'logistics', 'multi-robot', 'coordination'],
    image: '/lovable-uploads/warehouse.jpg'
  },
  {
    id: '8',
    title: 'Embodied Vision-Language Tasks',
    description: 'Dataset combining visual scenes with natural language instructions for embodied AI agents, including navigation commands and object manipulation descriptions.',
    price: '549',
    category: 'Embodied AI',
    size: '18.4 GB',
    format: 'JSON, PNG, MP4',
    rating: 4.6,
    downloads: '2.3K',
    lastUpdated: '2024-01-23',
    tags: ['vision-language', 'embodied-ai', 'navigation', 'instruction-following', 'multimodal'],
    image: '/lovable-uploads/camera.jpg'
  },
  {
    id: '9',
    title: 'Biometric Gait Analysis',
    description: 'Comprehensive gait analysis data using motion capture and pressure sensors for biomechanics research and rehabilitation robotics applications.',
    price: '399',
    category: 'Motion Capture',
    size: '7.8 GB',
    format: 'C3D, CSV, MAT',
    rating: 4.4,
    downloads: '1.5K',
    lastUpdated: '2024-01-15',
    tags: ['gait', 'biomechanics', 'rehabilitation', 'pressure-sensors', 'walking'],
    image: '/lovable-uploads/Biometric.jpg'
  }
];
