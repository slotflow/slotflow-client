import { OptionType } from "@/shared/types/common";
import { Day, ServiceCategory, ServiceType } from "@/shared/types/enums";

// Service type options
export const serviceTypeOptions: OptionType<ServiceType>[] = [
  { label: 'One Time', value: ServiceType.ONE_TIME },
  { label: 'Recurring', value: ServiceType.RECURRING },
];

// Group options
export const bookingTypeOptions: OptionType<boolean>[] = [
  { label: 'Group', value: true },
  { label: 'Individual', value: false },
];

// Days of Week Options
export const daysOfWeekOptions: OptionType<Day>[] = [
  { label: 'Sunday', value: Day.SUNDAY },
  { label: 'Monday', value: Day.MONDAY },
  { label: 'Tuesday', value: Day.TUESDAY },
  { label: 'Wednesday', value: Day.WEDNESDAY },
  { label: 'Thursday', value: Day.THURSDAY },
  { label: 'Friday', value: Day.FRIDAY },
  { label: 'Saturday', value: Day.SATURDAY },
];

// isAvailable for the day options
export const isAvailableOptions: OptionType<boolean>[] = [
  { label: 'Available', value: true },
  { label: 'Not Available', value: false },
];

// Service Duration Options
export const serviceDurationsOptions: OptionType<number>[] = [
  { label: '10 minutes', value: 10 },
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '45 minutes', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '1 hour 15 minutes', value: 75 },
  { label: '1 hour 30 minutes', value: 90 },
  { label: '1 hour 45 minutes', value: 105 },
  { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },
  { label: '4hour', value: 240 },
  { label: '5 hours', value: 300 },
  { label: '6 hours', value: 360 },
  { label: '7 hours', value: 420 },
  { label: '8 hours', value: 480 },
];

// Service Categories Options
export const serviceCategoryOptions: OptionType<ServiceCategory>[] = [
  {
    label: 'Healthcare & Wellness',
    value: ServiceCategory.HEALTHCARE_AND_WELLNESS,
  },
  {
    label: 'Professional Services',
    value: ServiceCategory.PROFESSIONAL_SERVICES,
  },
  {
    label: 'Education & Training',
    value: ServiceCategory.EDUCATION_AND_TRAINING,
  },
  {
    label: 'Home & Maintenance',
    value: ServiceCategory.HOME_AND_MAINTENANCE,
  },
  {
    label: 'Beauty & Personal Care',
    value: ServiceCategory.BEAUTY_AND_PERSONAL_CARE,
  },
  {
    label: 'Fitness & Lifestyle',
    value: ServiceCategory.FITNESS_AND_LIFESTYLE,
  },
  {
    label: 'Automotive Services',
    value: ServiceCategory.AUTOMOTIVE_SERVICES,
  },
  {
    label: 'Events & Creative Services',
    value: ServiceCategory.EVENTS_AND_CREATIVE_SERVICES,
  },
  {
    label: 'Technology Services',
    value: ServiceCategory.TECHNOLOGY_SERVICES,
  },
  {
    label: 'Real Estate & Property',
    value: ServiceCategory.REAL_ESTATE_AND_PROPERTY,
  },
  {
    label: 'Food & Catering',
    value: ServiceCategory.FOOD_AND_CATERING,
  },
  {
    label: 'Travel & Hospitality',
    value: ServiceCategory.TRAVEL_AND_HOSPITALITY,
  },
  {
    label: 'Financial & Insurance',
    value: ServiceCategory.FINANCIAL_AND_INSURANCE,
  },
  {
    label: 'Pets & Animal Care',
    value: ServiceCategory.PETS_AND_ANIMAL_CARE,
  },
  {
    label: 'Legal & Government Services',
    value: ServiceCategory.LEGAL_AND_GOVERNMENT,
  },
  {
    label: 'Spiritual & Religious Services',
    value: ServiceCategory.SPIRITUAL_AND_RELIGIOUS,
  },
  {
    label: 'Childcare & Family Services',
    value: ServiceCategory.CHILDCARE_AND_FAMILY,
  },
  {
    label: 'Fashion & Tailoring',
    value: ServiceCategory.FASHION_AND_TAILORING,
  },
  {
    label: 'Photography & Media',
    value: ServiceCategory.PHOTOGRAPHY_AND_MEDIA,
  },
  {
    label: 'Business & Marketing',
    value: ServiceCategory.BUSINESS_AND_MARKETING,
  },
];