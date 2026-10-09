import zoomLogo from '@/assets/logos/external/zoom.png';
import gmailLogo from '@/assets/logos/external/gmail.png';
import stripeLogo from '@/assets/logos/external/stripe.jpeg';
import whatsappLogo from '@/assets/logos/external/whatsapp.png';
import googleMapsLogo from '@/assets/logos/external/googleMap.png';
import googleCalendarLogo from '@/assets/logos/external/googleCalendar.png';
import {
  BlogCTAItems,
  BookingSteps,
  BookingStepsHeroPeople,
  CompanyValues,
  ContactSupportOptions,
  HeaderCompoenentNavsProps,
  LandingPageIntegrations,
} from '@/shared/types/common';
import {
  BadgeCheck,
  Ban,
  BookOpen,
  CalendarClock,
  CircleCheckBig,
  CircleHelp,
  Cookie,
  CreditCard,
  Facebook,
  FileText,
  Github,
  Instagram,
  Linkedin,
  MessageCircle,
  RotateCcw,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Twitter,
  UserPlus,
  Zap,
} from 'lucide-react';

// Header Navigation Array
export const headerLinks: HeaderCompoenentNavsProps[] = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Pricing', href: '/pricing', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

// FooterBar Data
export const footerLinks = {
  pages: [
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
    {
      name: 'Pricing',
      href: '/pricing',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
    {
      name: 'Faq',
      href: '/Faq',
    },
  ],

  socials: [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/slotflow',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/slotflow',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/slotflow',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/midhunkpaniker',
    },
    {
      name: 'Github',
      icon: Github,
      href: 'https://github.com/slotflow',
    },
  ],

  legal: [
    {
      name: 'Privacy Policy',
      href: '/legal/privacy-policy',
      description: 'Learn how we collect, use, protect, and process your personal information.',
      icon: Shield,
    },
    {
      name: 'Terms of Service',
      href: '/legal/terms-of-service',
      description: 'Read the terms and conditions governing the use of SlotFlow.',
      icon: FileText,
    },
    {
      name: 'Cookie Policy',
      href: '/legal',
      description: 'Read the cookie policy',
      icon: Cookie,
    },
    {
      name: 'Refund Policy',
      href: '/legal',
      description: 'Understand refunds, eligibility, processing timelines, and exceptions.',
      icon: RotateCcw,
    },
    {
      name: 'Cancellation Policy',
      href: '/legal',
      description:
        'Learn about booking cancellations, provider cancellations, and applicable charges.',
      icon: Ban,
    },
  ],

  account: [
    {
      name: 'Sign Up',
      href: '/register',
    },
    {
      name: 'Login',
      href: '/login',
    },
    {
      name: 'Forgot Password',
      href: '/verify/email',
    },
  ],
};

// Landing page workflow booking steps
export const bookingSteps: BookingSteps[] = [
  {
    title: 'Create an Account',
    description: 'Sign up to access trusted services and manage your bookings.',
    icon: UserPlus,
  },
  {
    title: 'Find a Service',
    description: 'Search for the service you need by category or location.',
    icon: Search,
  },
  {
    title: 'Choose a Provider',
    description: 'Compare verified providers and select the right one.',
    icon: BadgeCheck,
  },
  {
    title: 'Select a Time',
    description: 'Pick an available date and time that works for you.',
    icon: CalendarClock,
  },
  {
    title: 'Pay Securely',
    description: 'Complete your booking using our secure payment process.',
    icon: CreditCard,
  },
  {
    title: 'Booking Confirmed',
    description: "Receive instant confirmation and you're ready to go.",
    icon: CircleCheckBig,
  },
];

// Landing page hero section people list
export const heroPeople: BookingStepsHeroPeople[] = [
  {
    id: 1,
    name: 'Rahul Sharma',
    designation: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
  },
  {
    id: 2,
    name: 'Neeraj Gupta',
    designation: 'Product Manager',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Neha Kapoor',
    designation: 'Data Scientist',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Isha Gupta',
    designation: 'UX Designer',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Devansh Agarwal',
    designation: 'Soap Developer',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  },
  {
    id: 6,
    name: 'Kritika Desai',
    designation: 'Architecht',
    image:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80',
  },
];

// Landing page integrations section data
export const landingPageIntegrations: LandingPageIntegrations[] = [
  {
    title: 'Google Calendar',
    description: 'Two-way appointment synchronization.',
    logo: googleCalendarLogo,
    isActive: true,
  },
  {
    title: 'Stripe',
    description: 'Secure online payments.',
    logo: stripeLogo,
    isActive: true,
  },
  {
    title: 'Google Maps',
    description: 'Location and navigation.',
    logo: googleMapsLogo,
    isActive: true,
  },
  {
    title: 'Gmail',
    description: 'Booking confirmations.',
    logo: gmailLogo,
    isActive: true,
  },
  {
    title: 'WhatsApp',
    description: 'Instant booking notifications.',
    logo: whatsappLogo,
    isActive: false,
  },
  {
    title: 'Zoom',
    description: 'Online consultations.',
    logo: zoomLogo,
    isActive: false,
  },
];

export const contactSupportOptions: ContactSupportOptions[] = [
  {
    id: 1,
    icon: MessageCircle,
    title: 'Live Chat',
    button: 'Start Chat',
    action: 'chat',
  },
  {
    id: 2,
    icon: BookOpen,
    title: 'Help Center',
    button: 'Browse Docs',
    action: 'help',
  },
  {
    id: 3,
    icon: CircleHelp,
    title: 'FAQ',
    button: 'View FAQ',
    action: 'faq',
  },
] as const;

// company values
export const companyValues: CompanyValues[] = [
  {
    icon: Zap,
    title: 'Built for Speed',
    description:
      'From booking to confirmations, every interaction is optimized to save valuable time.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable & Secure',
    description:
      'Your scheduling data and customer information are protected with modern security practices.',
  },
  {
    icon: Sparkles,
    title: 'Simple Experience',
    description:
      'A clean interface that makes appointment management effortless for businesses and customers.',
  },
  {
    icon: BadgeCheck,
    title: 'Designed to Scale',
    description:
      "Whether you're an individual or an enterprise, Slotflow grows alongside your business.",
  },
];

// blogCTA items
export const blogCTAItems: BlogCTAItems[] = [
  {
    title: '25k+',
    subTitle: 'Appointments Managed',
  },
  {
    title: '98%',
    subTitle: 'Customer Satisfaction',
  },
  {
    title: '24/7',
    subTitle: 'Online Booking',
  },
  {
    title: 'AI',
    subTitle: 'Smart Scheduling',
  },
];

//
export const authCallbackLoadingSteps: string[] = [
  'Checking your credentials...',
  'Verifying authentication details...',
  'Creating a space for you...',
  'Finalizing your secure session...',
  'Redirecting you shortly...',
];
