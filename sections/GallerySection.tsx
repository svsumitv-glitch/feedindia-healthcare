"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GALLERY_ITEMS } from "@/constants";

type FilterCategory = "All" | "Hospitals" | "Office" | "Projects";

const FILTER_TABS: FilterCategory[] = ["All", "Hospitals", "Office", "Projects"];

interface GalleryItem {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  category: string;
}

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems: GalleryItem[] =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(
          (item: GalleryItem) =>
            item.category.toLowerCase() === activeFilter.toLowerCase()
        );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goToPrev, goToNext]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 mb-4"
          >
            Our Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4"
          >
            Projects & Spaces
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            A visual showcase of our hospital setups, office spaces, and project milestones.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                activeFilter === tab
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-transparent shadow-md shadow-teal-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-teal-400 hover:text-teal-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: GalleryItem, index: number) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="break-inside-avoid mb-4"
              >
                <div
                  className="group relative rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white font-semibold text-base leading-tight mb-1">
                          {item.title}
                        </p>
                        <span className="inline-block text-xs text-teal-200 font-semibold uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 ml-3 flex-shrink-0">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-lg">
            No items found for this category.
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex items-center justify-between mb-3 px-1">
                <span className="text-white/70 text-sm font-medium">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <div className="text-center flex-1 px-4">
                  <p className="text-white font-semibold text-base truncate">
                    {filteredItems[lightboxIndex].title}
                  </p>
                  <p className="text-teal-400 text-xs uppercase tracking-wider">
                    {filteredItems[lightboxIndex].category}
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full max-h-[75vh] rounded-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Image
                      src={filteredItems[lightboxIndex].src}
                      alt={filteredItems[lightboxIndex].alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 ml-2 bg-black/50 hover:bg-teal-600/70 text-white rounded-full p-3 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 mr-2 bg-black/50 hover:bg-teal-600/70 text-white rounded-full p-3 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
