import address from '@/assets/svgs/address.svg';
import working from '@/assets/svgs/working.svg';
import fileUpload from '@/assets/svgs/fileUpload.svg';
import chooseRole from '@/assets/svgs/chooseRole.png';
import service from '@/assets/svgs/serviceDetails.svg';
import hearAboutUs from '@/assets/svgs/hearAboutUs.png';
import typeUsername from '@/assets/svgs/typeUsername.png';
import availability from '@/assets/svgs/availability.svg';
import { HearAboutUsOptionValue } from '@/shared/types/enums';
import { BoardingStep, HearAboutUsOptions, OnboardingStep } from '@/shared/types/common';
import {
  AtSign,
  Facebook,
  HelpCircle,
  Instagram,
  Linkedin,
  MessageCircle,
  Search,
  Twitter,
  Users,
  Youtube,
} from 'lucide-react';

// Onboarding titles
export const onboardingContent: Record<
  string,
  {
    title: string;
    description: string;
    description2?: string;
    description3?: string;
  }
> = {
  address: {
    title: 'Provide Your Address',
    description: 'Enter your location for accurate service matching.',
  },
  serviceDetails: {
    title: 'Define Your Services',
    description: 'Describe the services you offer to customers.',
  },
  availability: {
    title: 'Set Your Availability',
    description: 'Specify when you are available for bookings.',
  },
  proofs: {
    title: 'Upload Verification Documents',
    description: 'Submit required documents for identity verification.',
  },
  profileApproval: {
    title: 'Profile Review and Approval',
    description: 'Submit your profile for verification and approval.',
    description2:
      'Submit your profile for review. Our team will verify your details within one business day.',
    description3: 'Your profile is under review. This may take up to 24 hours.',
  },
};

export const onboardingConfig: Record<string, OnboardingStep> = {
  '/profile-setup/role': {
    pageNumber: 0,
    path: '/profile-setup/role',
  },
  '/profile-setup/how-should-we-address-you': {
    pageNumber: 1,
    path: '/profile-setup//how-should-we-address-you',
  },
  '/profile-setup/hear-about-us': {
    pageNumber: 2,
    path: '/profile-setup/hear-about-us',
  },
  '/onboarding/address': {
    pageNumber: 3,
    heading: onboardingContent.address.title,
    description: onboardingContent.address.description,
    path: '/onboarding/address',
  },
  '/onboarding/service': {
    pageNumber: 4,
    heading: onboardingContent.serviceDetails.title,
    description: onboardingContent.serviceDetails.description,
    path: '/onboarding/service',
  },
  '/onboarding/availability': {
    pageNumber: 5,
    heading: onboardingContent.availability.title,
    description: onboardingContent.availability.description,
    path: '/onboarding/availability',
  },
  '/onboarding/proofs': {
    pageNumber: 6,
    heading: onboardingContent.proofs.title,
    description: onboardingContent.proofs.description,
    path: '/onboarding/proofs',
  },
  '/onboarding/pending': {
    pageNumber: 7,
    heading: onboardingContent.profileApproval.title,
    description: onboardingContent.profileApproval.description,
    path: '/onboarding/pending',
  },
};

// boarding data for the profile setup and onboarding pages
export const boardingData: BoardingStep[] = [
  {
    id: 0,
    title: 'Select Account Type',
    image: chooseRole,
    description:
      "Choose how you will use Slotflow. Whether you're booking appointments or managing services, we'll tailor your workspace accordingly.",
  },
  {
    id: 1,
    title: 'Profile Information',
    image: typeUsername,
    description:
      'Set your preferred display username so team members and clients can identify and address you across the platform.',
  },
  {
    id: 2,
    title: 'Source of Discovery',
    image: hearAboutUs,
    description:
      'Let us know how you discovered Slotflow. Your feedback helps us improve our outreach and better serve our community.',
  },
  {
    id: 3,
    title: 'Address',
    image: address,
    description:
      'Provide your business address accurately so customers can discover your services and book appointments with confidence.',
  },
  {
    id: 4,
    title: 'Service Details',
    image: service,
    description:
      "Tell customers about the services you provide, including descriptions, pricing, and any important information they'll need before booking.",
  },
  {
    id: 5,
    title: 'Availability',
    image: availability,
    description:
      'Set your working days and available time slots to ensure customers can book appointments that fit your schedule.',
  },
  {
    id: 6,
    title: 'Upload Proofs',
    image: fileUpload,
    description:
      'Upload the required verification documents. Please ensure they are valid, clearly visible, and meet the specified file requirements.',
  },
  {
    id: 7,
    title: 'Approval',
    image: working,
    description:
      "Your application is ready for review. Please submit your information for our team to review. Once your account has been approved, you'll receive an email confirmation.",
  },
];

// Hear about us options
export const hearAboutUsOptions: HearAboutUsOptions[] = [
  { label: 'Google Search', value: HearAboutUsOptionValue.GOOGLE, icon: Search },
  { label: 'Friend / Referral', value: HearAboutUsOptionValue.REFERRAL, icon: Users },
  { label: 'YouTube', value: HearAboutUsOptionValue.YOUTUBE, icon: Youtube },
  { label: 'LinkedIn', value: HearAboutUsOptionValue.LINKEDIN, icon: Linkedin },
  { label: 'Twitter (X)', value: HearAboutUsOptionValue.TWITTER, icon: Twitter },
  { label: 'Instagram', value: HearAboutUsOptionValue.INSTAGRAM, icon: Instagram },
  { label: 'WhatsApp', value: HearAboutUsOptionValue.WHATSAPP, icon: MessageCircle },
  { label: 'Facebook', value: HearAboutUsOptionValue.FACEBOOK, icon: Facebook },
  { label: 'Threads', value: HearAboutUsOptionValue.THREADS, icon: AtSign },
  { label: 'Other', value: HearAboutUsOptionValue.OTHER, icon: HelpCircle },
];
