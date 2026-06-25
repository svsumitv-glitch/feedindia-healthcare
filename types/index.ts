export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  slug: string
  category: 'hospital' | 'business'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  specialization?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: number
  author: string
  slug: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  title?: string
}

export interface Stat {
  label: string
  value: string
  suffix: string
  icon: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface Industry {
  title: string
  description: string
  icon: string
  count: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface ContactInfo {
  phone: string
  email: string
  whatsapp: string
  address: string
  workingHours: string
}
