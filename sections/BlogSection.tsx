'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '@/constants';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const featuredVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function getAuthorInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogSection() {
  const featured = BLOG_POSTS[0];
  const recent = BLOG_POSTS.slice(1, 4);

  return (
    <section className="py-20 bg-white dark:bg-slate-900" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 mb-4">
            Blog &amp; Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Latest Healthcare Industry News
          </h2>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          variants={featuredVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="flex flex-col justify-center p-8 lg:p-12 bg-gray-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors duration-300">
              <span className="inline-block self-start px-3 py-1 text-xs font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full mb-4">
                {featured.category}
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200 leading-snug">
                {featured.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <span className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {getAuthorInitials(featured.author)}
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{featured.author}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime} min
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
                Read More <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Recent Posts Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14"
        >
          {recent.map((post) => (
            <motion.div key={post.id} variants={cardVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-teal-100 dark:bg-teal-900/70 text-teal-700 dark:text-teal-300 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <span className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
                        {getAuthorInitials(post.author)}
                      </div>
                      <span className="font-medium text-slate-600 dark:text-slate-300 truncate max-w-[100px]">{post.author}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1 ml-auto shrink-0">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold text-sm group-hover:gap-2 transition-all duration-200">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            View All Articles
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
