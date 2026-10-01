/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Sparkles,
  Car,
  Home,
  Check,
  Copy,
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  SlidersHorizontal,
  Camera,
  ShieldCheck,
  Clock,
  Droplets,
  Upload,
  Settings2,
} from 'lucide-react';

/**
 * ============================================================================
 * OWNER CONFIGURATION OBJECT
 * Replace the placeholder handles, phone numbers, and email below with your
 * real Grassendale Valet contact details. Everything across the website updates
 * automatically from this single object.
 * ============================================================================
 */
export const BUSINESS_CONFIG = {
  brandName: 'Grassendale Valet',
  tagline: 'Premium Mobile Car Valeting',
  description: 'Affordable Mobile Valeting + Driveway Restoration and Cleaning',
  location: 'South Liverpool, UK',
  primaryBookingMethod: 'DM to Book',
  valuePromise: 'Affordable, honest pricing — Get a free quote',

  // --- REPLACE THESE PLACEHOLDERS WITH YOUR REAL DETAILS ---
  instagramHandle: '@YOUR_INSTAGRAM_HANDLE',
  instagramUrl: 'https://instagram.com/YOUR_INSTAGRAM_HANDLE',
  facebookHandle: 'Grassendale Valet (YOUR_FACEBOOK_PAGE)',
  facebookUrl: 'https://facebook.com/YOUR_FACEBOOK_PAGE',
  whatsappNumber: '447000000000', // International format without '+' for wa.me links
  whatsappDisplay: '07000 000 000 (WhatsApp Placeholder)',
  phoneDisplay: '07000 000 000 (Phone Placeholder)',
  phoneHref: 'tel:+447000000000',
  email: 'hello@grassendalevalet-placeholder.co.uk',

  serviceAreas: [
    'Grassendale (L19)',
    'Aigburth (L17)',
    'Allerton (L18)',
    'Mossley Hill (L18)',
    'Cressington (L19)',
    'Garston (L19)',
    'Woolton (L25)',
    'Childwall (L16)',
    'Gateacre & Hunts Cross (L25)',
  ],
};

type ServiceId =
  | 'mobile-valet'
  | 'full-valet'
  | 'driveway-restoration'
  | 'both-car-driveway';

interface ServiceItem {
  id: ServiceId;
  number: string;
  category: 'automotive' | 'driveway';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  idealFor: string;
}

const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'mobile-valet',
    number: '01',
    category: 'automotive',
    categoryLabel: 'Mobile Automotive Care',
    title: 'Mobile Car Valeting (Interior & Exterior)',
    subtitle: 'Complete inside-and-out maintenance brought directly to your door',
    description:
      'Designed for regular upkeep and busy schedules across South Liverpool. We arrive at your home or workplace with professional-grade products to leave your cabin fresh and your paintwork gleaming.',
    features: [
      'Citrus pre-wash & thick pH-neutral snow foam dwell to loosen road grime safely',
      'Two-bucket safe contact hand wash with plush microfibre wash mitts',
      'Alloy wheel faces, barrels & wheel arches deep cleaned + satin tyre dressing',
      'Full interior vacuum of seats, carpets, boot space & floor mats',
      'Dashboard, centre console, door cards & switchgear cleaned and dressed',
      'Crystal-clear, streak-free interior and exterior glass treatment',
    ],
    idealFor: 'Regular fortnightly/monthly maintenance or refreshing daily drivers',
  },
  {
    id: 'full-valet',
    number: '02',
    category: 'automotive',
    categoryLabel: 'Signature Automotive Care',
    title: 'Full Valet',
    subtitle: 'Deep bumper-to-bumper interior & exterior transformation',
    description:
      'Our most thorough automotive package. Built for vehicles that need a complete reset—combining paintwork decontamination and protective wax/sealant with deep wet-extraction upholstery and leather care.',
    features: [
      'Includes every stage of our Mobile Car Valeting (Interior & Exterior) service',
      'Chemical tar spot & iron fallout decontamination across lower panels and alloys',
      'Hand-applied hydrophobic wax or gloss sealant for lasting water beading',
      'Deep fabric seat, carpet & mat shampoo with wet extraction stain removal',
      'Bespoke leather seat cleansing & satin conditioning balm to prevent cracking',
      'Intricate detailing of air vents, seat rails, door shuts, fuel flap & badges',
    ],
    idealFor: 'End-of-lease returns, pre-sale preparation, family cars & seasonal resets',
  },
  {
    id: 'driveway-restoration',
    number: '03',
    category: 'driveway',
    categoryLabel: 'Exterior Property Restoration',
    title: 'Driveway Restoration & Cleaning',
    subtitle: 'Specialist surface revival for block paving, stone, concrete & tarmac',
    description:
      'Restore your home’s kerb appeal alongside your vehicle. Using commercial rotary surface cleaners, we lift years of embedded moss, algae, black spot lichen, and weathering without damaging your stone or mortar.',
    features: [
      'High-torque rotary flat-surface cleaning for uniform, stripe-free restoration',
      'Deep removal of stubborn moss, weeds, green algae & ingrained organic staining',
      'Targeted degreaser treatment for vehicle oil drips and rubber tyre marks',
      'Full kiln-dried silica sand re-jointing for block-paved driveways once dry',
      'Safe tailored pressure calibration for Indian sandstone, tarmac, concrete & resin',
      'Full wash-down of surrounding kerbs, drainage channels & adjacent thresholds',
    ],
    idealFor: 'Block paving, Indian sandstone, imprinted concrete & weathered driveways',
  },
];

/**
 * Signature Gold Ringed "G" Monogram SVG Component
 * Recreates the luxury boutique circular gold ring and serif "G" emblem.
 */
function GoldMonogram({
  size = 'md',
  animated = false,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}) {
  const dimensions = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
    xl: 'w-36 h-36 sm:w-44 sm:h-44',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Soft ambient gold halo behind large emblems */}
      {(size === 'lg' || size === 'xl') && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#D4AF37]/15 blur-2xl pointer-events-none"
        />
      )}
      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label={`${BUSINESS_CONFIG.brandName} Gold Monogram`}
      >
        <defs>
          <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6E3A1" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="52%" stopColor="#FFF5CC" />
            <stop offset="75%" stopColor="#C59B27" />
            <stop offset="100%" stopColor="#8C6B1F" />
          </linearGradient>
          <linearGradient id="goldInnerGrad" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFF3C4" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6B1F" />
          </linearGradient>
          <radialGradient id="emblemPlate" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#171510" />
            <stop offset="70%" stopColor="#090909" />
            <stop offset="100%" stopColor="#020202" />
          </radialGradient>
        </defs>

        {/* Subtle dark luxury medallion backing */}
        <circle
          cx="110"
          cy="110"
          r="98"
          fill="url(#emblemPlate)"
          stroke="url(#goldRingGrad)"
          strokeWidth="0.75"
          strokeOpacity="0.35"
        />

        {/* Outer Fine Gold Ring (Draw-on animated in Hero) */}
        <circle
          cx="110"
          cy="110"
          r="98"
          stroke="url(#goldRingGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          className={animated ? 'animate-draw-ring' : ''}
        />

        {/* Inner Filigree Ring */}
        <circle
          cx="110"
          cy="110"
          r="86"
          stroke="url(#goldRingGrad)"
          strokeWidth="0.9"
          strokeOpacity="0.55"
          strokeDasharray="3 5"
        />

        {/* Inner Solid Hairline Ring */}
        <circle
          cx="110"
          cy="110"
          r="80"
          stroke="url(#goldRingGrad)"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Cardinal Diamond Ornaments on the Ring */}
        <polygon points="110,7 113.5,12 110,17 106.5,12" fill="url(#goldRingGrad)" />
        <polygon points="110,203 113.5,208 110,213 106.5,208" fill="url(#goldRingGrad)" />
        <polygon points="7,110 12,106.5 17,110 12,113.5" fill="url(#goldRingGrad)" />
        <polygon points="203,110 208,106.5 213,110 208,113.5" fill="url(#goldRingGrad)" />

        {/* Classic Luxury Serif "G" Monogram */}
        <g className={animated ? 'animate-monogram-glow' : ''}>
          <text
            x="110"
            y="144"
            textAnchor="middle"
            fill="url(#goldInnerGrad)"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '116px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            G
          </text>
          {/* Subtle horizontal crossbar accent inside the G */}
          <line
            x1="112"
            y1="113"
            x2="148"
            y2="113"
            stroke="url(#goldRingGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Decorative Gold Divider with Central Diamond & Ring Motif
 */
function GoldOrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto ${className}`}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#F6E3A1]/80" />
      <div className="relative flex items-center justify-center w-5 h-5">
        <span className="absolute inset-0 rounded-full border border-[#D4AF37]/60" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#F6E3A1]" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#F6E3A1]/80" />
    </div>
  );
}

export default function App() {
  // Active navigation section tracking
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Services filter state ('all' | 'automotive' | 'driveway')
  const [serviceFilter, setServiceFilter] = useState<'all' | 'automotive' | 'driveway'>('all');

  // Interactive Before/After comparison slider state
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [comparisonMode, setComparisonMode] = useState<'driveway' | 'valet'>('driveway');
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);

  // Optional custom photo preview slots for the "Add your work photo here" gallery
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});

  // Interactive DM Quote Builder state
  const [selectedService, setSelectedService] = useState<ServiceId>('mobile-valet');
  const [includePatioExtra, setIncludePatioExtra] = useState<boolean>(false);
  const [selectedArea, setSelectedArea] = useState<string>('Grassendale (L19)');
  const [vehicleOrSurfaceNote, setVehicleOrSurfaceNote] = useState<string>('');
  const [preferredTiming, setPreferredTiming] = useState<string>('Flexible / Next Available');
  const [copiedState, setCopiedState] = useState<'none' | 'message' | 'instagram' | 'facebook'>('none');

  // Owner Config Preview Modal state
  const [showConfigGuide, setShowConfigGuide] = useState<boolean>(false);

  // Scroll listener for navbar styling and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);

      const sectionIds = ['home', 'services', 'about', 'book', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle interactive Before/After drag movement
  const updateSliderFromClientX = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(Math.max(4, Math.min(96, percent)));
  };

  useEffect(() => {
    if (!isDraggingSlider) return;

    const handleMouseMove = (e: MouseEvent) => updateSliderFromClientX(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
    };
    const handleStop = () => setIsDraggingSlider(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', handleStop);
    window.addEventListener('touchend', handleStop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleStop);
      window.removeEventListener('touchend', handleStop);
    };
  }, [isDraggingSlider]);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-select a service and jump straight to the DM Quote Builder
  const handleSelectServiceForQuote = (serviceId: ServiceId, withPatio = false) => {
    setSelectedService(serviceId);
    if (withPatio) {
      setIncludePatioExtra(true);
    }
    scrollToSection('book');
  };

  // Handle local photo preview upload for "Add your work photo here" slots
  const handlePhotoUpload = (slotKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setCustomPhotos((prev) => ({ ...prev, [slotKey]: objectUrl }));
  };

  // Build the ready-to-send DM text for a free quote
  const serviceNameMap: Record<ServiceId, string> = {
    'mobile-valet': 'Mobile Car Valeting (Interior & Exterior)',
    'full-valet': 'Full Valet (Complete Interior & Exterior)',
    'driveway-restoration': 'Driveway Restoration & Cleaning',
    'both-car-driveway': 'Mobile Car Valeting + Driveway Restoration Package',
  };

  const generatedDmMessage = `Hi ${BUSINESS_CONFIG.brandName}, I'd love to get a free quote please!
• Service: ${serviceNameMap[selectedService]}${
    includePatioExtra ? ' + Driveway & Patio Pressure Washing (Optional Extra)' : ''
  }
• Location: ${selectedArea}
• Details: ${
    vehicleOrSurfaceNote.trim()
      ? vehicleOrSurfaceNote.trim()
      : 'Please let me know what details or photos you need'
  }
• Preferred Timing: ${preferredTiming}`;

  const handleCopyMessage = async (type: 'message' | 'instagram' | 'facebook') => {
    try {
      await navigator.clipboard.writeText(generatedDmMessage);
      setCopiedState(type);
      setTimeout(() => setCopiedState('none'), 4000);
    } catch {
      setCopiedState(type);
      setTimeout(() => setCopiedState('none'), 4000);
    }
  };

  const whatsappShareHref = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    generatedDmMessage
  )}`;

  const filteredServices = CORE_SERVICES.filter((s) =>
    serviceFilter === 'all' ? true : s.category === serviceFilter
  );

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'book', label: 'Book' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F1E8] relative overflow-x-hidden pb-16 md:pb-0">
      {/* =====================================================================
          1. NAVBAR (3-Zone Top Bar Contract)
      ===================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#000000]/90 backdrop-blur-md border-b border-[#D4AF37]/25 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Monogram + Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
          >
            <GoldMonogram size="sm" />
            <span className="font-serif-luxury text-lg sm:text-xl font-semibold tracking-[0.18em] uppercase text-[#F5F1E8] group-hover:text-[#F6E3A1] transition-colors whitespace-nowrap">
              {BUSINESS_CONFIG.brandName}
            </span>
          </a>

          {/* Zone 2: Primary Navigation Links (Single-line clean typography) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`relative py-1 text-sm tracking-[0.14em] uppercase transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#F6E3A1] font-medium'
                      : 'text-[#F5F1E8]/75 hover:text-[#F6E3A1]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#F6E3A1] via-[#D4AF37] to-[#8C6B1F] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action ("DM to Book") + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('book')}
              className="btn-gold-luxury px-5 py-2.5 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] whitespace-nowrap shrink-0 cursor-pointer"
            >
              DM to Book
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm border border-[#D4AF37]/35 bg-[#0B0B0B]/90 text-[#F6E3A1] hover:border-[#F6E3A1] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Luxury Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#000000]/98 backdrop-blur-xl md:hidden flex flex-col justify-between px-6 pt-24 pb-10 border-b border-[#D4AF37]/30">
          <div className="flex flex-col items-center text-center my-auto space-y-6">
            <GoldMonogram size="md" />
            <GoldOrnamentDivider />
            <nav className="flex flex-col items-center space-y-5 w-full">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`font-serif-luxury text-3xl tracking-[0.16em] uppercase transition-colors ${
                    activeSection === item.id ? 'text-gold-foil font-semibold' : 'text-[#F5F1E8]/85'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <GoldOrnamentDivider />
          </div>

          <div className="space-y-3 text-center">
            <button
              type="button"
              onClick={() => scrollToSection('book')}
              className="w-full btn-gold-luxury py-3.5 rounded-sm text-sm font-semibold uppercase tracking-[0.16em]"
            >
              DM to Book — Get a Free Quote
            </button>
            <p className="text-xs text-[#F5F1E8]/60 tracking-wider uppercase">
              {BUSINESS_CONFIG.location} · We Come To You
            </p>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. LANDING / HERO SECTION
      ===================================================================== */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden bg-carbon-subtle"
      >
        {/* Soft Golden Spotlight & Slow Moving Light Streak */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Central warm gold spotlight */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] sm:w-[820px] h-[580px] rounded-full opacity-25 blur-[130px]"
            style={{
              background:
                'radial-gradient(circle, rgba(246,227,161,0.45) 0%, rgba(212,175,55,0.18) 45%, rgba(0,0,0,0) 75%)',
            }}
          />
          {/* Slow-moving diagonal gold light streak */}
          <div
            className="animate-light-streak absolute -top-32 left-1/4 w-[750px] h-[180px] blur-3xl pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(246,227,161,0.18) 50%, transparent 100%)',
            }}
          />
          {/* Subtle luxury micro-dot texture */}
          <div className="absolute inset-0 bg-luxury-texture opacity-80" />
          {/* Top and bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-transparent to-[#000000]" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-auto text-center flex flex-col items-center">
          {/* Animated Ringed "G" Monogram Emblem */}
          <div className="mb-6 sm:mb-8">
            <GoldMonogram size="xl" animated />
          </div>

          {/* Main Brand Headline in Gold Foil Serif */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[0.16em] uppercase text-gold-shimmer leading-[1.08] [text-wrap:balance]">
            {BUSINESS_CONFIG.brandName}
          </h1>

          {/* Logo Tagline in Wide-Spaced Small Caps with Gold Ornament Line Beneath */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base uppercase tracking-[0.32em] text-[#F6E3A1] font-medium">
            {BUSINESS_CONFIG.tagline}
          </p>

          <div className="mt-4 mb-6 w-48 sm:w-64">
            <GoldOrnamentDivider />
          </div>

          {/* Subheading */}
          <p className="text-lg sm:text-2xl md:text-3xl font-serif-luxury text-[#F5F1E8] max-w-2xl leading-relaxed [text-wrap:balance]">
            Affordable Mobile Valeting + Driveway Restoration &amp; Cleaning
          </p>

          <p className="mt-3 text-sm sm:text-base text-[#F5F1E8]/70 max-w-xl leading-relaxed">
            Bespoke car care and specialist exterior pressure washing delivered directly to your
            door across South Liverpool. Honest, affordable pricing with tailored free quotes.
          </p>

          {/* Key Highlights Strip (Unboxed luxury metadata with typographic separators) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm tracking-[0.12em] uppercase text-[#F6E3A1]/90">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              South Liverpool
            </span>
            <span aria-hidden="true" className="text-[#D4AF37]/50">
              ·
            </span>
            <span>We Come To You</span>
            <span aria-hidden="true" className="text-[#D4AF37]/50">
              ·
            </span>
            <span>DM To Book</span>
          </div>

          {/* Dual Primary & Secondary CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollToSection('book')}
              className="w-full sm:w-auto btn-gold-luxury px-8 py-4 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] inline-flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer"
            >
              <span>DM To Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto px-8 py-4 rounded-sm border border-[#D4AF37]/55 bg-[#0B0B0B]/70 hover:bg-[#D4AF37]/10 hover:border-[#F6E3A1] text-[#F5F1E8] text-xs sm:text-sm font-medium uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer"
            >
              View Services
            </button>
          </div>

          {/* Scroll-Down Indicator */}
          <button
            type="button"
            onClick={() => scrollToSection('services')}
            aria-label="Scroll down to services"
            className="mt-10 sm:mt-12 inline-flex flex-col items-center gap-1.5 text-[#F5F1E8]/50 hover:text-[#F6E3A1] transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-[0.24em]">Discover</span>
            <ChevronDown className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Hero Bottom Trust Strip */}
        <div className="relative z-10 mt-8 border-t border-b border-[#D4AF37]/20 bg-[#0B0B0B]/85 backdrop-blur-md py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs sm:text-sm tracking-[0.2em] uppercase text-[#F6E3A1]/90 font-medium">
              Mobile Valeting <span className="mx-2 text-[#D4AF37]">•</span> Driveway Restoration{' '}
              <span className="mx-2 text-[#D4AF37]">•</span> Affordable Pricing{' '}
              <span className="mx-2 text-[#D4AF37]">•</span> South Liverpool
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2b. SERVICES SECTION (Two-Part Layout + Optional Extra + Before/After)
      ===================================================================== */}
      <section
        id="services"
        className="relative py-20 sm:py-28 bg-[#0B0B0B] border-b border-[#D4AF37]/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-medium">
              Bespoke Mobile Care · We Come To You
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-semibold text-gold-foil tracking-[0.08em] uppercase [text-wrap:balance]">
              Our Signature Services
            </h2>
            <div className="mt-4 mb-5">
              <GoldOrnamentDivider />
            </div>
            <p className="text-sm sm:text-base text-[#F5F1E8]/75 leading-relaxed">
              From meticulous interior and exterior car valeting to transformative driveway
              restoration and pressure washing across South Liverpool. Every booking is tailored to
              your vehicle or property with{' '}
              <span className="text-[#F6E3A1] font-medium">affordable, honest pricing</span>.
            </p>

            {/* Interactive Category Filter Controls */}
            <div className="mt-8 inline-flex items-center p-1 rounded-sm bg-[#141414] border border-[#D4AF37]/25">
              {[
                { key: 'all', label: 'All Services (4)' },
                { key: 'automotive', label: 'Part I · Car Valeting' },
                { key: 'driveway', label: 'Part II · Driveway Care' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setServiceFilter(tab.key as 'all' | 'automotive' | 'driveway')}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.14em] rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                    serviceFilter === tab.key
                      ? 'bg-gradient-to-r from-[#F6E3A1] to-[#D4AF37] text-[#090909] font-semibold shadow-sm'
                      : 'text-[#F5F1E8]/70 hover:text-[#F6E3A1]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Two-Part Service Pillar Banner Summary */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-7 rounded-sm bg-[#141414]/80 border border-[#D4AF37]/25 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-[#0B0B0B] flex items-center justify-center shrink-0 text-[#F6E3A1]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
                  Pillar I · Automotive Division
                </p>
                <h3 className="mt-1 font-serif-luxury text-2xl text-[#F5F1E8] font-semibold">
                  Mobile Car Valeting &amp; Full Valets
                </h3>
                <p className="mt-1.5 text-sm text-[#F5F1E8]/70 leading-relaxed">
                  Safe hand washes, deep interior wet-extraction, leather care, and protective
                  finishes performed on your driveway or at your workplace.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-sm bg-[#141414]/80 border border-[#D4AF37]/25 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-[#0B0B0B] flex items-center justify-center shrink-0 text-[#F6E3A1]">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
                  Pillar II · Exterior Property Division
                </p>
                <h3 className="mt-1 font-serif-luxury text-2xl text-[#F5F1E8] font-semibold">
                  Driveway Restoration &amp; Pressure Washing
                </h3>
                <p className="mt-1.5 text-sm text-[#F5F1E8]/70 leading-relaxed">
                  Deep rotary surface cleaning, moss and black-spot removal, block paving
                  re-sanding, and optional patio pressure washing.
                </p>
              </div>
            </div>
          </div>

          {/* Main 3 Core Service Cards */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-7">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="card-luxury-glass rounded-sm p-7 sm:p-8 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Quiet 1-line Editorial Kicker */}
                  <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
                    <span>
                      {service.number}. {service.categoryLabel}
                    </span>
                    <span className="text-[#F6E3A1]/80">We Come To You</span>
                  </div>

                  {/* Service Title */}
                  <h3 className="mt-4 font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#F5F1E8] group-hover:text-[#F6E3A1] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[#F6E3A1]/85">
                    {service.subtitle}
                  </p>

                  <div className="my-5 h-px bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37]/15 to-transparent" />

                  <p className="text-sm text-[#F5F1E8]/75 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included Checklist */}
                  <ul className="mt-6 space-y-3">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#F5F1E8]/85">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer: Honest Pricing Note + CTA */}
                <div className="mt-8 pt-5 border-t border-[#D4AF37]/20">
                  <div className="flex items-center justify-between text-xs text-[#F5F1E8]/65 mb-4">
                    <span>Affordable, honest pricing</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#F6E3A1]">Free tailored quote</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectServiceForQuote(service.id, false)}
                    className="w-full btn-gold-luxury py-3.5 px-5 rounded-sm text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Get a Free Quote via DM</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Service 4: Optional Extra — Driveway & Patio Pressure Washing */}
          {(serviceFilter === 'all' || serviceFilter === 'driveway') && (
            <div className="mt-8 card-luxury-glass rounded-sm p-7 sm:p-9 border border-[#D4AF37]/40 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F6E3A1]">
                    <span>04. Optional Extra · Under Driveway Services</span>
                    <span aria-hidden="true">·</span>
                    <span>Add To Any Booking</span>
                  </div>

                  <h3 className="mt-2 font-serif-luxury text-2xl sm:text-3xl font-semibold text-gold-foil">
                    Driveway &amp; Patio Pressure Washing (Optional Extra)
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-base text-[#F5F1E8]/80 leading-relaxed max-w-3xl">
                    Extend your exterior clean to rear garden patios, York stone or Indian sandstone
                    flags, side pathways, steps, and low perimeter walls. Because our mobile
                    pressure-washing unit is already on site, adding patio or pathway washing is a
                    highly affordable way to transform your entire outdoor space in a single visit.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#F5F1E8]/75">
                    <span className="inline-flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D4AF37]" /> Rear Garden Patios &amp; Terraces
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D4AF37]" /> Side Pathways &amp; Stone Steps
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D4AF37]" /> Slippery Algae &amp; Moss Removal
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => handleSelectServiceForQuote('driveway-restoration', true)}
                    className="btn-gold-luxury py-3.5 px-6 rounded-sm text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Quote Driveway + Patio Extra</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectServiceForQuote('both-car-driveway', true)}
                    className="py-3 px-5 rounded-sm border border-[#D4AF37]/45 hover:border-[#F6E3A1] text-xs uppercase tracking-[0.15em] text-[#F6E3A1] hover:bg-[#D4AF37]/10 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Combine Car Valet + Driveway
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              INTERACTIVE BEFORE / AFTER RESTORATION SLIDER & WORK PLACEHOLDERS
          ================================================================= */}
          <div className="mt-20 pt-16 border-t border-[#D4AF37]/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Explanation & Mode Switcher */}
              <div className="lg:col-span-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">
                  Interactive Visual Demonstration
                </p>
                <h3 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#F5F1E8] [text-wrap:balance]">
                  See the Restoration Difference
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#F5F1E8]/75 leading-relaxed">
                  Drag the gold monogram handle across the surface preview—or use the quick
                  comparison controls below—to see how our rotary surface cleaning, kiln-dried
                  re-sanding, and deep valeting restore tired surfaces.
                </p>

                {/* Switch between Driveway Restoration & Car Valeting visual demo */}
                <div className="mt-6 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setComparisonMode('driveway');
                      setSliderPosition(52);
                    }}
                    className={`px-4 py-2.5 rounded-sm text-xs uppercase tracking-[0.14em] border transition-all whitespace-nowrap cursor-pointer ${
                      comparisonMode === 'driveway'
                        ? 'border-[#F6E3A1] bg-[#D4AF37]/20 text-[#F6E3A1] font-semibold'
                        : 'border-[#D4AF37]/25 bg-[#141414] text-[#F5F1E8]/70 hover:text-[#F5F1E8]'
                    }`}
                  >
                    Driveway Restoration
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setComparisonMode('valet');
                      setSliderPosition(52);
                    }}
                    className={`px-4 py-2.5 rounded-sm text-xs uppercase tracking-[0.14em] border transition-all whitespace-nowrap cursor-pointer ${
                      comparisonMode === 'valet'
                        ? 'border-[#F6E3A1] bg-[#D4AF37]/20 text-[#F6E3A1] font-semibold'
                        : 'border-[#D4AF37]/25 bg-[#141414] text-[#F5F1E8]/70 hover:text-[#F5F1E8]'
                    }`}
                  >
                    Mobile Car Valeting
                  </button>
                </div>

                {/* Preset position buttons for accessibility */}
                <div className="mt-4 flex items-center gap-2 text-xs text-[#F5F1E8]/65">
                  <span>Quick View:</span>
                  {[
                    { label: 'Before', pos: 12 },
                    { label: '50 / 50 Split', pos: 50 },
                    { label: 'After Restoration', pos: 88 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setSliderPosition(preset.pos)}
                      className="underline decoration-[#D4AF37]/50 hover:text-[#F6E3A1] px-1.5 py-0.5 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="mt-7 p-5 rounded-sm bg-[#141414] border border-[#D4AF37]/25">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#F6E3A1] font-medium">
                    Want a Free Quote for Your Car or Driveway?
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#F5F1E8]/70 leading-relaxed">
                    Send us a quick DM with your postcode in South Liverpool (and a quick photo of
                    your driveway or car if handy) for an honest, no-obligation quote.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectServiceForQuote(
                        comparisonMode === 'driveway' ? 'driveway-restoration' : 'full-valet'
                      )
                    }
                    className="mt-4 text-xs uppercase tracking-[0.18em] text-[#F6E3A1] hover:underline inline-flex items-center gap-1.5 font-semibold cursor-pointer"
                  >
                    <span>Get a Free Quote Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Draggable Before/After Canvas */}
              <div className="lg:col-span-7">
                <div
                  ref={sliderContainerRef}
                  onMouseDown={(e) => {
                    setIsDraggingSlider(true);
                    updateSliderFromClientX(e.clientX);
                  }}
                  onTouchStart={(e) => {
                    setIsDraggingSlider(true);
                    if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
                  }}
                  className="relative h-80 sm:h-96 w-full rounded-sm overflow-hidden border border-[#D4AF37]/45 select-none cursor-ew-resize shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                  role="region"
                  aria-label="Before and after surface restoration comparison slider"
                >
                  {/* AFTER LAYER (Full Width Underneath — Restored & Clean) */}
                  <div className="absolute inset-0 bg-[#12110E] flex items-center justify-center">
                    {comparisonMode === 'driveway' ? (
                      /* Restored Block Paving SVG Pattern + Golden Sheen */
                      <svg
                        viewBox="0 0 800 500"
                        className="w-full h-full object-cover"
                        preserveAspectRatio="xMidYMid slice"
                      >
                        <defs>
                          <pattern
                            id="cleanPaving"
                            width="120"
                            height="60"
                            patternUnits="userSpaceOnUse"
                          >
                            {/* Clean warm sandstone/charcoal block paving with fresh kiln-dried gold sand joints */}
                            <rect
                              x="2"
                              y="2"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#2A2622"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                              strokeOpacity="0.55"
                            />
                            <rect
                              x="62"
                              y="2"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#332E28"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                              strokeOpacity="0.55"
                            />
                            <rect
                              x="-28"
                              y="32"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#2F2A25"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                              strokeOpacity="0.55"
                            />
                            <rect
                              x="32"
                              y="32"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#26221E"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                              strokeOpacity="0.55"
                            />
                            <rect
                              x="92"
                              y="32"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#312C26"
                              stroke="#D4AF37"
                              strokeWidth="1.5"
                              strokeOpacity="0.55"
                            />
                          </pattern>
                          <radialGradient id="cleanGlow" cx="65%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#F6E3A1" stopOpacity="0.22" />
                            <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                          </radialGradient>
                        </defs>
                        <rect width="800" height="500" fill="url(#cleanPaving)" />
                        <rect width="800" height="500" fill="url(#cleanGlow)" />
                        {/* Subtle sparkle highlights */}
                        <circle cx="560" cy="160" r="3" fill="#FFF5CC" opacity="0.8" />
                        <circle cx="640" cy="290" r="2.5" fill="#F6E3A1" opacity="0.7" />
                        <circle cx="480" cy="340" r="2" fill="#FFF5CC" opacity="0.7" />
                      </svg>
                    ) : (
                      /* Restored Gloss Black Paintwork & Gold Trim Automotive SVG */
                      <svg
                        viewBox="0 0 800 500"
                        className="w-full h-full object-cover"
                        preserveAspectRatio="xMidYMid slice"
                      >
                        <defs>
                          <linearGradient id="glossPaint" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#050505" />
                            <stop offset="42%" stopColor="#1A1814" />
                            <stop offset="50%" stopColor="#3A3222" />
                            <stop offset="58%" stopColor="#141310" />
                            <stop offset="100%" stopColor="#050505" />
                          </linearGradient>
                        </defs>
                        <rect width="800" height="500" fill="url(#glossPaint)" />
                        {/* Sleek vehicle silhouette & mirror reflection lines */}
                        <path
                          d="M110,320 C190,220 290,190 450,190 C570,190 660,240 710,320 Z"
                          fill="#0D0C0A"
                          stroke="#D4AF37"
                          strokeWidth="2.5"
                        />
                        <path
                          d="M160,305 C230,235 320,210 450,210 C550,210 625,248 670,305"
                          fill="none"
                          stroke="#F6E3A1"
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                        />
                        {/* Hydrophobic water beading & mirror gloss arcs */}
                        <circle cx="540" cy="255" r="18" stroke="#F6E3A1" strokeWidth="1" fill="none" opacity="0.45" />
                        <circle cx="380" cy="240" r="3.5" fill="#FFF5CC" opacity="0.85" />
                        <circle cx="520" cy="230" r="2.5" fill="#F6E3A1" opacity="0.85" />
                        <circle cx="600" cy="280" r="3" fill="#FFF5CC" opacity="0.85" />
                      </svg>
                    )}

                    {/* AFTER Label Top-Right */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-sm bg-[#000000]/85 border border-[#D4AF37]/50 text-[11px] uppercase tracking-[0.2em] text-[#F6E3A1] font-medium">
                      {comparisonMode === 'driveway'
                        ? 'After · Restored & Re-Sanded'
                        : 'After · Deep Valet & Gloss Sealant'}
                    </div>
                  </div>

                  {/* BEFORE LAYER (Clipped by sliderPosition — Weathered / Soiled) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    {comparisonMode === 'driveway' ? (
                      <svg
                        viewBox="0 0 800 500"
                        className="w-full h-full object-cover"
                        preserveAspectRatio="xMidYMid slice"
                      >
                        <defs>
                          <pattern
                            id="weatheredPaving"
                            width="120"
                            height="60"
                            patternUnits="userSpaceOnUse"
                          >
                            {/* Dull weathered grey-brown paving with dark moss joints and lichen spots */}
                            <rect
                              x="2"
                              y="2"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#181916"
                              stroke="#2E3B23"
                              strokeWidth="3"
                            />
                            <rect
                              x="62"
                              y="2"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#161714"
                              stroke="#2A371F"
                              strokeWidth="3"
                            />
                            <rect
                              x="-28"
                              y="32"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#151714"
                              stroke="#2E3B23"
                              strokeWidth="3"
                            />
                            <rect
                              x="32"
                              y="32"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#191A16"
                              stroke="#2A371F"
                              strokeWidth="3"
                            />
                            <rect
                              x="92"
                              y="32"
                              width="56"
                              height="26"
                              rx="2"
                              fill="#171815"
                              stroke="#2E3B23"
                              strokeWidth="3"
                            />
                            {/* Organic moss & black spot blotches */}
                            <circle cx="28" cy="15" r="7" fill="#1E2718" opacity="0.8" />
                            <circle cx="85" cy="44" r="9" fill="#111210" opacity="0.85" />
                            <circle cx="58" cy="30" r="5" fill="#2D3D22" opacity="0.9" />
                          </pattern>
                        </defs>
                        <rect width="800" height="500" fill="url(#weatheredPaving)" />
                        <rect width="800" height="500" fill="#0A0B08" opacity="0.35" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 800 500"
                        className="w-full h-full object-cover"
                        preserveAspectRatio="xMidYMid slice"
                      >
                        <rect width="800" height="500" fill="#181715" />
                        <path
                          d="M110,320 C190,220 290,190 450,190 C570,190 660,240 710,320 Z"
                          fill="#22201C"
                          stroke="#444038"
                          strokeWidth="2"
                        />
                        {/* Dull road film & water spots */}
                        <circle cx="230" cy="280" r="24" fill="#2E2B25" opacity="0.6" />
                        <circle cx="310" cy="255" r="35" fill="#2A2722" opacity="0.5" />
                        <circle cx="190" cy="300" r="18" fill="#332F28" opacity="0.6" />
                      </svg>
                    )}

                    {/* BEFORE Label Top-Left */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-sm bg-[#000000]/85 border border-white/20 text-[11px] uppercase tracking-[0.2em] text-[#F5F1E8]/80">
                      {comparisonMode === 'driveway'
                        ? 'Before · Weathered & Mossy'
                        : 'Before · Road Film & Dull Finish'}
                    </div>
                  </div>

                  {/* Gold Vertical Divider Line & Draggable Ring Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F6E3A1] via-[#D4AF37] to-[#8C6B1F] shadow-[0_0_16px_rgba(246,227,161,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#090909] border-2 border-[#F6E3A1] shadow-[0_0_24px_rgba(212,175,55,0.65)] flex items-center justify-center">
                      <SlidersHorizontal className="w-4 h-4 text-[#F6E3A1]" />
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#000000]/95 via-[#000000]/70 to-transparent px-5 py-3 flex items-center justify-between text-xs text-[#F5F1E8]/80">
                    <span>Drag slider left or right to compare</span>
                    <span className="text-[#F6E3A1] font-mono tabular-nums">{sliderPosition}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===============================================================
                STYLED "ADD YOUR WORK PHOTO HERE" GALLERY PLACEHOLDERS
                (No fragile external URLs; includes optional live owner preview)
            =============================================================== */}
            <div className="mt-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">
                    Recent Transformations · Portfolio Slots
                  </p>
                  <h3 className="mt-1 font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#F5F1E8]">
                    Our Work Across South Liverpool
                  </h3>
                </div>
                <p className="text-xs text-[#F5F1E8]/60">
                  Ready for your real vehicle &amp; driveway photography — click any panel to preview
                  your own photo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    key: 'slot-exterior',
                    category: 'Mobile Car Valeting',
                    title: 'Exterior Snow Foam & Mirror Gloss',
                    caption: 'Deep safe wash, alloy wheel decontamination & hydrophobic finish',
                  },
                  {
                    key: 'slot-interior',
                    category: 'Full Valet',
                    title: 'Interior Cabin & Leather Reset',
                    caption: 'Wet-extraction upholstery shampoo, leather care & trim detailing',
                  },
                  {
                    key: 'slot-driveway',
                    category: 'Driveway Restoration & Cleaning',
                    title: 'Block Paving & Patio Revival',
                    caption: 'Rotary pressure washing, moss removal & fresh kiln-dried re-sanding',
                  },
                ].map((slot) => {
                  const previewUrl = customPhotos[slot.key];
                  return (
                    <div
                      key={slot.key}
                      className="card-luxury-glass rounded-sm overflow-hidden flex flex-col justify-between group"
                    >
                      <div className="relative h-60 w-full bg-carbon-subtle border-b border-[#D4AF37]/25 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt={slot.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            {/* Corner gold framing brackets */}
                            <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#D4AF37]/60" />
                            <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#D4AF37]/60" />
                            <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#D4AF37]/60" />
                            <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#D4AF37]/60" />

                            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/45 bg-[#0B0B0B] flex items-center justify-center text-[#F6E3A1] mb-3 group-hover:scale-105 transition-transform">
                              <Camera className="w-5 h-5" />
                            </div>
                            <p className="font-serif-luxury text-lg font-semibold tracking-[0.12em] uppercase text-gold-foil">
                              Add your work photo here
                            </p>
                            <p className="mt-1 text-xs text-[#F5F1E8]/60 max-w-[230px]">
                              {slot.category} showcase slot
                            </p>
                          </>
                        )}

                        {/* Interactive File Input so the owner can test dropping their real photo in */}
                        <label className="mt-4 relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#000000]/85 border border-[#D4AF37]/40 text-[11px] uppercase tracking-[0.14em] text-[#F6E3A1] hover:border-[#F6E3A1] cursor-pointer transition-colors">
                          <Upload className="w-3 h-3" />
                          <span>{previewUrl ? 'Change Photo' : 'Preview Your Photo'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(slot.key, e)}
                            className="sr-only"
                          />
                        </label>
                      </div>

                      <div className="p-5">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#D4AF37]">
                          {slot.category}
                        </p>
                        <h4 className="mt-1 font-serif-luxury text-xl font-semibold text-[#F5F1E8]">
                          {slot.title}
                        </h4>
                        <p className="mt-1 text-xs text-[#F5F1E8]/70 leading-relaxed">
                          {slot.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ABOUT & WHY GRASSENDALE VALET SECTION
      ===================================================================== */}
      <section
        id="about"
        className="relative py-20 sm:py-28 bg-[#000000] border-b border-[#D4AF37]/15 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Brand Story & Monogram Seal */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-3">
                <GoldMonogram size="md" />
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">
                    South Liverpool · Mobile Specialist
                  </p>
                  <p className="font-serif-luxury text-lg text-[#F5F1E8] tracking-[0.12em] uppercase">
                    {BUSINESS_CONFIG.brandName}
                  </p>
                </div>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-gold-foil leading-tight [text-wrap:balance]">
                Boutique Care on Your Driveway. Honest, Affordable Pricing.
              </h2>

              <p className="text-sm sm:text-base text-[#F5F1E8]/80 leading-relaxed">
                Based in <strong className="text-[#F6E3A1] font-medium">South Liverpool</strong>,{' '}
                {BUSINESS_CONFIG.brandName} was built around a simple principle: premium car
                valeting and exterior driveway restoration shouldn’t require taking time out of your
                week or paying inflated showroom prices.
              </p>

              <p className="text-sm sm:text-base text-[#F5F1E8]/75 leading-relaxed">
                Whether your daily car needs an inside-and-out mobile valet, your family SUV needs a
                deep Full Valet, or your front driveway and garden patio need reviving with rotary
                pressure washing, we bring everything straight to your door.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('book')}
                  className="btn-gold-luxury px-7 py-3.5 rounded-sm text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className="text-xs uppercase tracking-[0.18em] text-[#F6E3A1] hover:underline py-2"
                >
                  View South Liverpool Areas
                </a>
              </div>
            </div>

            {/* Right Column: 4 Value Pillars Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Car,
                  num: '01',
                  title: '100% Mobile — We Come To You',
                  desc: 'No drop-offs or waiting rooms. We travel across Grassendale, Aigburth, Allerton, Woolton, Mossley Hill, and surrounding South Liverpool areas.',
                },
                {
                  icon: ShieldCheck,
                  num: '02',
                  title: 'Affordable, Honest Pricing',
                  desc: 'Clear, fair quotes tailored to your vehicle or driveway size. No hidden call-out charges—just message us for a free quote before you book.',
                },
                {
                  icon: Droplets,
                  num: '03',
                  title: 'Car + Driveway Expertise',
                  desc: 'One trusted local specialist for both your vehicle and your property’s kerb appeal—from snow-foam safe washes to block paving restoration.',
                },
                {
                  icon: Clock,
                  num: '04',
                  title: 'Fast DM Booking',
                  desc: 'Skip complicated booking portals. Send us a quick message on Instagram, Facebook, or WhatsApp and we’ll confirm your quote and time slot.',
                },
              ].map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="card-luxury-glass p-6 sm:p-7 rounded-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-[#D4AF37] tracking-widest">
                          {pillar.num}.
                        </span>
                        <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#0B0B0B] flex items-center justify-center text-[#F6E3A1]">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="font-serif-luxury text-2xl font-semibold text-[#F5F1E8]">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#F5F1E8]/70 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. BOOKING SECTION (DM TO BOOK + INTERACTIVE QUOTE MESSAGE BUILDER)
      ===================================================================== */}
      <section
        id="book"
        className="relative py-20 sm:py-28 bg-[#0B0B0B] border-b border-[#D4AF37]/15"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-medium">
              Simple &amp; Personal Booking
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-semibold text-gold-foil uppercase tracking-[0.08em] [text-wrap:balance]">
              DM To Book · Get a Free Quote
            </h2>
            <div className="mt-4 mb-5">
              <GoldOrnamentDivider />
            </div>
            <p className="text-sm sm:text-base text-[#F5F1E8]/75 leading-relaxed">
              Booking takes less than a minute. Choose your service below to build a ready-to-send
              enquiry, then send it straight to our{' '}
              <span className="text-[#F6E3A1] font-medium">Instagram DM</span>,{' '}
              <span className="text-[#F6E3A1] font-medium">Facebook Messenger</span>, or{' '}
              <span className="text-[#F6E3A1] font-medium">WhatsApp</span>.
            </p>
          </div>

          {/* 3-Step Horizontal Flow */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: '01. Choose Your Service',
                desc: 'Pick Mobile Car Valeting, Full Valet, or Driveway Restoration (+ optional Patio Pressure Washing).',
              },
              {
                step: '02. Send Us a Quick DM',
                desc: 'Copy your tailored quote request in one tap and message us on Instagram or Facebook.',
              },
              {
                step: '03. We Come To You',
                desc: 'We reply with your free, affordable quote and arrange a convenient slot at your address.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-sm bg-[#141414]/90 border border-[#D4AF37]/20"
              >
                <p className="font-serif-luxury text-xl font-semibold text-[#F6E3A1]">
                  {item.step}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-[#F5F1E8]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Quote Message Composer Card */}
          <div className="mt-10 card-luxury-glass rounded-sm p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 Columns: Service & Location Selectors */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#F6E3A1] mb-3">
                    1. Select Service for Your Free Quote
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(
                      [
                        {
                          id: 'mobile-valet',
                          title: 'Mobile Car Valeting',
                          sub: 'Interior & Exterior Care',
                        },
                        {
                          id: 'full-valet',
                          title: 'Full Valet',
                          sub: 'Deep Inside & Out Reset',
                        },
                        {
                          id: 'driveway-restoration',
                          title: 'Driveway Restoration',
                          sub: 'Cleaning & Re-Sanding',
                        },
                        {
                          id: 'both-car-driveway',
                          title: 'Car + Driveway Package',
                          sub: 'Combined Visit Quote',
                        },
                      ] as const
                    ).map((opt) => {
                      const active = selectedService === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedService(opt.id)}
                          className={`p-4 rounded-sm border text-left transition-all cursor-pointer ${
                            active
                              ? 'border-[#F6E3A1] bg-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                              : 'border-[#D4AF37]/25 bg-[#141414]/80 hover:border-[#D4AF37]/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif-luxury text-lg font-semibold text-[#F5F1E8]">
                              {opt.title}
                            </span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                active ? 'border-[#F6E3A1] bg-[#D4AF37]' : 'border-[#D4AF37]/40'
                              }`}
                            >
                              {active && <Check className="w-2.5 h-2.5 text-[#000000]" />}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#F5F1E8]/65">{opt.sub}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Extra Checkbox: Driveway & Patio Pressure Washing */}
                <div>
                  <button
                    type="button"
                    onClick={() => setIncludePatioExtra(!includePatioExtra)}
                    className={`w-full p-4 rounded-sm border text-left flex items-center justify-between gap-4 transition-all cursor-pointer ${
                      includePatioExtra
                        ? 'border-[#F6E3A1] bg-[#D4AF37]/15'
                        : 'border-[#D4AF37]/25 bg-[#141414]/60 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[#D4AF37]">
                        Optional Extra (Driveway Services)
                      </p>
                      <p className="font-serif-luxury text-lg font-semibold text-[#F5F1E8]">
                        + Add Driveway &amp; Patio Pressure Washing
                      </p>
                      <p className="text-xs text-[#F5F1E8]/65">
                        Include rear patio, garden flags, pathways or stone steps in your free quote
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-sm border flex items-center justify-center shrink-0 ${
                        includePatioExtra
                          ? 'bg-[#D4AF37] border-[#F6E3A1] text-[#090909]'
                          : 'border-[#D4AF37]/50'
                      }`}
                    >
                      {includePatioExtra && <Check className="w-4 h-4" />}
                    </div>
                  </button>
                </div>

                {/* Area & Timing Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="area-select"
                      className="block text-xs uppercase tracking-[0.18em] text-[#F6E3A1] mb-2"
                    >
                      2. Your Area in South Liverpool
                    </label>
                    <select
                      id="area-select"
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#141414] border border-[#D4AF37]/35 text-sm text-[#F5F1E8] focus:outline-none focus:border-[#F6E3A1]"
                    >
                      {BUSINESS_CONFIG.serviceAreas.map((area) => (
                        <option key={area} value={area} className="bg-[#141414] text-[#F5F1E8]">
                          {area}
                        </option>
                      ))}
                      <option value="Other Liverpool Postcode" className="bg-[#141414]">
                        Other Liverpool Postcode
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="timing-select"
                      className="block text-xs uppercase tracking-[0.18em] text-[#F6E3A1] mb-2"
                    >
                      3. Preferred Availability
                    </label>
                    <select
                      id="timing-select"
                      value={preferredTiming}
                      onChange={(e) => setPreferredTiming(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#141414] border border-[#D4AF37]/35 text-sm text-[#F5F1E8] focus:outline-none focus:border-[#F6E3A1]"
                    >
                      <option value="Flexible / Next Available">Flexible / Next Available</option>
                      <option value="Weekday Morning">Weekday Morning</option>
                      <option value="Weekday Afternoon">Weekday Afternoon</option>
                      <option value="Weekend Slot">Weekend Slot</option>
                    </select>
                  </div>
                </div>

                {/* Optional Vehicle / Driveway Note */}
                <div>
                  <label
                    htmlFor="notes-input"
                    className="block text-xs uppercase tracking-[0.18em] text-[#F6E3A1] mb-2"
                  >
                    4. Vehicle Model or Driveway Type (Optional)
                  </label>
                  <input
                    id="notes-input"
                    type="text"
                    value={vehicleOrSurfaceNote}
                    onChange={(e) => setVehicleOrSurfaceNote(e.target.value)}
                    placeholder="e.g. 5-door hatchback, SUV, or block-paved 2-car driveway..."
                    className="w-full px-4 py-3 rounded-sm bg-[#141414] border border-[#D4AF37]/35 text-sm text-[#F5F1E8] placeholder:text-[#F5F1E8]/35 focus:outline-none focus:border-[#F6E3A1]"
                  />
                </div>
              </div>

              {/* Right 5 Columns: Live Ready-to-Send DM Message & Direct Channel Buttons */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#090909] border border-[#D4AF37]/35 rounded-sm p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                      Ready-to-Send DM Quote Request
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyMessage('message')}
                      className="inline-flex items-center gap-1.5 text-xs text-[#F6E3A1] hover:underline cursor-pointer"
                    >
                      {copiedState === 'message' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Message Box */}
                  <pre className="p-4 rounded-sm bg-[#141414] border border-[#D4AF37]/20 text-xs sm:text-sm text-[#F5F1E8]/90 whitespace-pre-wrap font-sans leading-relaxed">
                    {generatedDmMessage}
                  </pre>

                  {copiedState !== 'none' && (
                    <div
                      role="status"
                      className="mt-3 p-3 rounded-sm bg-[#D4AF37]/15 border border-[#F6E3A1]/50 text-xs text-[#F6E3A1] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        Quote message copied to clipboard! Paste it directly into our DM chat.
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary DM Action Buttons */}
                <div className="mt-6 space-y-3">
                  <a
                    href={BUSINESS_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCopyMessage('instagram')}
                    className="w-full btn-gold-luxury py-3.5 px-5 rounded-sm text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Copy &amp; DM on Instagram</span>
                  </a>

                  <a
                    href={BUSINESS_CONFIG.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCopyMessage('facebook')}
                    className="w-full py-3.5 px-5 rounded-sm border border-[#D4AF37]/55 bg-[#141414] hover:border-[#F6E3A1] hover:bg-[#D4AF37]/10 text-[#F5F1E8] text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                    <span>Copy &amp; DM on Facebook</span>
                  </a>

                  <a
                    href={whatsappShareHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-sm border border-[#D4AF37]/30 hover:border-[#F6E3A1] text-[#F6E3A1] text-xs uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. CONTACT & SOUTH LIVERPOOL SERVICE AREA SECTION
      ===================================================================== */}
      <section id="contact" className="relative py-20 sm:py-28 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37]">
              Get In Touch · South Liverpool, UK
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-semibold text-gold-foil uppercase tracking-[0.08em]">
              Contact &amp; Coverage
            </h2>
            <div className="mt-4 mb-5">
              <GoldOrnamentDivider />
            </div>
            <p className="text-sm sm:text-base text-[#F5F1E8]/75">
              Instagram and Facebook DM are our primary booking channels. All contact placeholders
              below are stored in <code className="text-[#F6E3A1]">BUSINESS_CONFIG</code> at the top
              of the file for instant customisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Instagram DM Card */}
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-luxury-glass p-6 rounded-sm flex flex-col justify-between group"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  Primary · Instagram DM
                </p>
                <h3 className="mt-2 font-serif-luxury text-2xl font-semibold text-[#F5F1E8] group-hover:text-[#F6E3A1] transition-colors">
                  Instagram
                </h3>
                <p className="mt-2 text-xs font-mono text-[#F6E3A1] break-all">
                  {BUSINESS_CONFIG.instagramHandle}
                </p>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#F5F1E8]/70 group-hover:text-[#F6E3A1] inline-flex items-center gap-1.5">
                <span>Send a DM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </a>

            {/* Facebook DM Card */}
            <a
              href={BUSINESS_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-luxury-glass p-6 rounded-sm flex flex-col justify-between group"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  Primary · Facebook Page
                </p>
                <h3 className="mt-2 font-serif-luxury text-2xl font-semibold text-[#F5F1E8] group-hover:text-[#F6E3A1] transition-colors">
                  Facebook DM
                </h3>
                <p className="mt-2 text-xs font-mono text-[#F6E3A1] break-all">
                  {BUSINESS_CONFIG.facebookHandle}
                </p>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#F5F1E8]/70 group-hover:text-[#F6E3A1] inline-flex items-center gap-1.5">
                <span>Message Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </a>

            {/* WhatsApp & Phone Card */}
            <a
              href={BUSINESS_CONFIG.phoneHref}
              className="card-luxury-glass p-6 rounded-sm flex flex-col justify-between group"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  WhatsApp &amp; Phone
                </p>
                <h3 className="mt-2 font-serif-luxury text-2xl font-semibold text-[#F5F1E8] group-hover:text-[#F6E3A1] transition-colors">
                  Direct Line
                </h3>
                <p className="mt-2 text-xs font-mono text-[#F6E3A1] tabular-nums">
                  {BUSINESS_CONFIG.phoneDisplay}
                </p>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#F5F1E8]/70 group-hover:text-[#F6E3A1] inline-flex items-center gap-1.5">
                <span>Call or WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${BUSINESS_CONFIG.email}`}
              className="card-luxury-glass p-6 rounded-sm flex flex-col justify-between group"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  Email Enquiries
                </p>
                <h3 className="mt-2 font-serif-luxury text-2xl font-semibold text-[#F5F1E8] group-hover:text-[#F6E3A1] transition-colors">
                  Email Us
                </h3>
                <p className="mt-2 text-xs font-mono text-[#F6E3A1] break-all">
                  {BUSINESS_CONFIG.email}
                </p>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#F5F1E8]/70 group-hover:text-[#F6E3A1] inline-flex items-center gap-1.5">
                <span>Send Email</span>
                <Mail className="w-3.5 h-3.5" />
              </p>
            </a>
          </div>

          {/* South Liverpool Coverage Banner */}
          <div className="mt-10 p-6 sm:p-8 rounded-sm bg-[#0B0B0B] border border-[#D4AF37]/25 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F6E3A1]">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Mobile Service Area · South Liverpool, UK</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#F5F1E8]/75 leading-relaxed">
                {BUSINESS_CONFIG.serviceAreas.join(' · ')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowConfigGuide(!showConfigGuide)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-[#D4AF37]/35 text-xs uppercase tracking-[0.14em] text-[#F6E3A1] hover:border-[#F6E3A1] shrink-0 cursor-pointer"
            >
              <Settings2 className="w-4 h-4" />
              <span>{showConfigGuide ? 'Hide Owner Config' : 'Owner Config Guide'}</span>
            </button>
          </div>

          {/* Expandable Owner Config Guide */}
          {showConfigGuide && (
            <div className="mt-4 p-6 rounded-sm bg-[#141414] border border-[#D4AF37]/45 text-xs sm:text-sm text-[#F5F1E8]/85 space-y-2">
              <p className="font-semibold text-[#F6E3A1] uppercase tracking-wider">
                How to Update Your Contact Placeholders:
              </p>
              <p>
                Open <code className="text-[#F6E3A1]">src/App.tsx</code> and edit the{' '}
                <code className="text-[#F6E3A1]">BUSINESS_CONFIG</code> object at the very top of
                the file (lines 33–55) to set your live Instagram handle, Facebook page URL,
                WhatsApp number, phone, and email.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          6. QUIET LUXURY FOOTER
      ===================================================================== */}
      <footer className="bg-[#050505] border-t border-[#D4AF37]/25 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <GoldMonogram size="sm" />
            <div>
              <p className="font-serif-luxury text-lg font-semibold tracking-[0.16em] uppercase text-gold-foil">
                {BUSINESS_CONFIG.brandName}
              </p>
              <p className="text-xs text-[#F5F1E8]/55">
                {BUSINESS_CONFIG.tagline} · {BUSINESS_CONFIG.location}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.16em] text-[#F5F1E8]/65">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="hover:text-[#F6E3A1] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-[#F5F1E8]/45">
            © {new Date().getFullYear()} {BUSINESS_CONFIG.brandName}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* =====================================================================
          MOBILE STICKY BOTTOM "DM TO BOOK" BAR (Compact, <8% viewport height)
      ===================================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090909]/95 backdrop-blur-md border-t border-[#D4AF37]/40 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#F6E3A1] font-medium truncate">
            {BUSINESS_CONFIG.brandName} · South Liverpool
          </p>
          <p className="text-xs text-[#F5F1E8]/70 truncate">Get a free quote via DM</p>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection('book')}
          className="btn-gold-luxury px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap shrink-0"
        >
          DM to Book
        </button>
      </div>
    </div>
  );
}
