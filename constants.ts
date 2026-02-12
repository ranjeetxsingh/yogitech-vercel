import { ServiceItem, SEOSettings } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Computer Repair',
    description: 'Expert diagnosis and repair for desktops, laptops, and peripherals. Hardware and software solutions.',
    icon: 'Cpu',
    category: 'IT'
  },
  {
    id: '2',
    title: 'Home Network IoT',
    description: 'Setup and securing of smart home devices, cameras, and integrated home automation systems.',
    icon: 'Wifi',
    category: 'IT'
  },
  {
    id: '3',
    title: 'IT Consultation',
    description: 'Strategic IT advice to help your business grow. Infrastructure planning and tech optimization.',
    icon: 'Briefcase',
    category: 'IT'
  },
  {
    id: '4',
    title: 'Data Recovery',
    description: 'Professional recovery of lost data from hard drives, SSDs, and USB devices.',
    icon: 'Database',
    category: 'IT'
  },
  {
    id: '5',
    title: 'Virus Cleanup',
    description: 'Comprehensive malware, spyware, and virus removal to protect your privacy and system speed.',
    icon: 'ShieldAlert',
    category: 'IT'
  },
  {
    id: '6',
    title: 'Smart Wifi',
    description: 'Mesh network setup and WiFi optimization for dead-zone free coverage in large homes or offices.',
    icon: 'Signal',
    category: 'IT'
  },
  {
    id: '7',
    title: 'Small Office Network',
    description: 'Robust networking solutions for SMBs including firewalls, switches, and secure server setups.',
    icon: 'Server',
    category: 'IT'
  },
  {
    id: '8',
    title: 'Digital Marketing',
    description: 'Boost your online presence with targeted campaigns and social media management.',
    icon: 'Megaphone',
    category: 'Marketing'
  },
  {
    id: '9',
    title: 'SEO',
    description: 'Search Engine Optimization to rank your business higher on Google and drive organic traffic.',
    icon: 'Search',
    category: 'Marketing'
  },
  {
    id: '10',
    title: 'Email Marketing',
    description: 'Engaging email campaigns to retain customers and promote new offers effectively.',
    icon: 'Mail',
    category: 'Marketing'
  },
  {
    id: '11',
    title: 'Graphic Design',
    description: 'Creative visual design for logos, branding materials, brochures, and digital assets.',
    icon: 'PenTool',
    category: 'Development'
  },
  {
    id: '12',
    title: 'Website Development',
    description: 'Modern, responsive, and high-performance websites tailored to your business needs.',
    icon: 'Layout',
    category: 'Development'
  },
  {
    id: '13',
    title: 'Software Development',
    description: 'Custom software solutions, mobile apps, and enterprise applications.',
    icon: 'Code',
    category: 'Development'
  }
];

export const INITIAL_SEO: SEOSettings = {
  title: 'YogiTech - Premier IT Solutions in New Zealand',
  metaDescription: 'Expert Computer Repair, IT Consultation, and Digital Marketing services.',
  keywords: ['IT Support', 'Computer Repair', 'Web Design', 'SEO', 'Data Recovery'],
  ogImage: 'https://picsum.photos/1200/630'
};