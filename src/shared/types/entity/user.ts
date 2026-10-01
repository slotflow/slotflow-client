import { HearAboutUsOptionValue, OnboardingStatus, Role } from '../enums';

export interface TimeZone {
    value: string;
    label: string;
    offset: number;
    abbrev: string;
    altName: string;
}

export interface User {
  _id: string;
  username?: string;
  email: string;
  password?: string;
  role: Role;
  onboardingType: Role | null;
  onboardingStatus: OnboardingStatus;
  isBlocked: boolean;
  phone?: string;
  profileImage?: string;
  addressId?: string;
  googleConnected: boolean;
  googleId?: string;
  whereDidHearAboutUs: HearAboutUsOptionValue;
  referralCode?: string;
  referredBy?: string;
  timeZone: TimeZone | null;
  createdAt: Date;
  updatedAt: Date;
}
