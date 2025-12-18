"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FAQ_ITEMS } from "@/constants/about"

function FAQItem({ item, index }: { item: typeof FAQ_ITEMS[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card 
        className="border border-border bg-card backdrop-blur-md p-6 cursor-pointer hover:border-border/80 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground flex-1">{item.question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            height: isOpen ? "auto" : 0,
            marginTop: isOpen ? 16 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default function FAQPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/about">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to About
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Find answers to common questions about AiConnect and our services
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem key={index} item={item} index={index} />
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Contact our support team.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-full"
              >
                Contact Support
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
