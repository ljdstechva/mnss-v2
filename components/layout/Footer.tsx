import Link from 'next/link'
import Image from 'next/image'
import { Globe, Mail, Phone, Shield } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { label: 'Website', href: '/', icon: Globe },
  { label: 'Email', href: 'mailto:info@mnsconsultants.com', icon: Mail },
  { label: 'Phone', href: 'tel:+6321234567', icon: Phone },
  { label: 'Compliance services', href: '/services', icon: Shield },
]

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/mnss-logo.png"
                  alt="MNS Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-primary">MNS</span>
            </Link>
            <p className="text-foreground/60 leading-relaxed mb-8">
              Pioneering sustainable environmental solutions since 1997. Expert consultancy for a greener tomorrow.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} aria-label={label} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-8 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-8 text-lg">Our Services</h4>
            <ul className="space-y-4">
              {[
                'Environmental Assessment',
                'Sustainability Auditing',
                'Waste Management',
                'Renewable Energy',
                'Ecological Restoration',
                'Permit Compliance'
              ].map((link) => (
                <li key={link}>
                  <Link href="/services" className="text-foreground/60 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-8 text-lg">Newsletter</h4>
            <p className="text-foreground/60 mb-6">Stay updated with our latest sustainability insights.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-6 py-4 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-4 rounded-xl text-sm font-bold">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
          <p className="text-foreground/40 text-sm">
            (c) 2026 MNS Suarez Environmental Studies Consultants.
          </p>
          <div className="flex gap-8 text-sm text-foreground/40">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
