import type { Metadata } from 'next'
import HeroSection from '@/sections/HeroSection'
import StatsSection from '@/sections/StatsSection'
import AboutSection from '@/sections/AboutSection'
import ServicesSection from '@/sections/ServicesSection'
import ProcessSection from '@/sections/ProcessSection'
import IndustriesSection from '@/sections/IndustriesSection'
import TestimonialsSection from '@/sections/TestimonialsSection'
import TeamSection from '@/sections/TeamSection'
import GallerySection from '@/sections/GallerySection'
import FAQSection from '@/sections/FAQSection'
import BlogSection from '@/sections/BlogSection'
import ContactSection from '@/sections/ContactSection'

export const metadata: Metadata = {
  title: 'FeedIndia Healthcare & Consultancy | NABH, Hospital Licensing & More',
  description:
    'FeedIndia Healthcare offers NABH accreditation, hospital licensing, medical equipment procurement, healthcare recruitment and business consultancy across India.',
}

export default function HomePage() {
  return (
    <>
      <section id="hero"><HeroSection /></section>
      <section id="stats"><StatsSection /></section>
      <section id="about"><AboutSection /></section>
      <section id="services"><ServicesSection /></section>
      <section id="process"><ProcessSection /></section>
      <section id="industries"><IndustriesSection /></section>
      <section id="testimonials"><TestimonialsSection /></section>
      <section id="team"><TeamSection /></section>
      <section id="gallery"><GallerySection /></section>
      <section id="faq"><FAQSection /></section>
      <section id="blog"><BlogSection /></section>
      <section id="contact"><ContactSection /></section>
    </>
  )
}
