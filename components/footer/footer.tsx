'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { 
  FOOTER_BRAND, 
  FOOTER_SOCIAL_LINKS, 
  FOOTER_LINKS,
  FOOTER_COPYRIGHT_TEXT,
  FOOTER_ADDRESS,
} from '@/constants/footer'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
      <div className="relative z-10">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Top Section - Brand Only */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  {FOOTER_BRAND.logo}
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                  {FOOTER_BRAND.name}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
                {FOOTER_BRAND.tagline}
              </p>
              {/* Social Links */}
              <div className="flex gap-4">
                {FOOTER_SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 group hover:bg-muted"
                      style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'inherit' }} />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FOOTER_LINKS.map((section) => (
                <div key={section.category}>
                  <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide" style={{ color: 'var(--foreground)' }}>
                    {section.category}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          <span 
                            className="w-1 h-1 rounded-full group-hover:bg-accent transition-colors"
                            style={{ backgroundColor: 'var(--border)' }}
                          />
                          <span className="group-hover:text-foreground">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-16" style={{ backgroundColor: 'var(--border)' }} />

          {/* Bottom Section */}
          <div className="pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
              <p className="text-sm text-center sm:text-left" style={{ color: 'var(--muted-foreground)' }}>
                © {currentYear} {FOOTER_COPYRIGHT_TEXT}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  All systems operational
                </div>
                <div className="w-px h-4" style={{ backgroundColor: 'var(--border)' }} />
                <a 
                  href="#" 
                  className="text-xs transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Status Page
                </a>
              </div>
            </div>

            {/* Address Section - Compact Footer Bottom */}
            <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--muted)', color: 'var(--accent)' }}>
                    <MapPin className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--foreground)' }}>
                      Address
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {FOOTER_ADDRESS.street}<br />
                      {FOOTER_ADDRESS.city}, {FOOTER_ADDRESS.postal}<br />
                      {FOOTER_ADDRESS.country}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--muted)', color: 'var(--accent)' }}>
                    <Phone className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--foreground)' }}>
                      Phone
                    </p>
                    <a 
                      href={`tel:${FOOTER_ADDRESS.phone}`} 
                      className="text-xs transition-colors"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {FOOTER_ADDRESS.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--muted)', color: 'var(--accent)' }}>
                    <Mail className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--foreground)' }}>
                      Email
                    </p>
                    <a 
                      href={`mailto:${FOOTER_ADDRESS.email}`} 
                      className="text-xs transition-colors"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {FOOTER_ADDRESS.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
