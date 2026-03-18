'use client'

import { useRef } from 'react'
import { useLenis } from './lib/useLenis'
import { SECTIONS } from './data/sections'

import MorphingBrand from './components/MorphingBrand'
import StickyHeader from './components/StickyHeader'
import HeroSection from './components/HeroSection'
import DiscoverSection from './components/DiscoverSection'
import CircleSection from './components/CircleSection'
import CategoriesSection from './components/CategoriesSection'
import ProductSection from './components/ProductSection'
import Footer from './components/Footer'

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)

  useLenis()

  // Filter the data to only include the 4 requested categories.
  // Note: Make sure these strings perfectly match the casing in your data/sections.ts file.
  const targetCategories = ['FULL STACK WEBSITE', 'AI AGENTS', 'AUTOMATION', 'BUSINESS OPTIMIZATION']
  const filteredSections = SECTIONS.filter(section =>
    targetCategories.includes(section.category)
  )

  return (
    <main>
      <MorphingBrand heroRef={heroRef} />
      <HeroSection sectionRef={heroRef} />
      <StickyHeader />
      <DiscoverSection />
      <CircleSection />
      <CategoriesSection />

      {/* Replaced the map with a single call passing the filtered array */}
      <ProductSection data={filteredSections} />

      <Footer />
    </main>
  )
}