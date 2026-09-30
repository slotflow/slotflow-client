export enum PermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  DEFAULT = 'default',
}

export enum FileType {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
}

export enum PeerValues {
  TRACK = 'track',
  STABLE = 'stable',
  NEGOTIATION_NEEDED = 'negotiationneeded',
}

export enum MediaTrackKind {
  VIDEO = 'video',
  AUDIO = 'audio',
}

export enum ServiceCategory {
  HEALTHCARE_AND_WELLNESS = 'Healthcare & Wellness',
  PROFESSIONAL_SERVICES = 'Professional Services',
  EDUCATION_AND_TRAINING = 'Education & Training',
  HOME_AND_MAINTENANCE = 'Home & Maintenance',
  BEAUTY_AND_PERSONAL_CARE = 'Beauty & Personal Care',
  FITNESS_AND_LIFESTYLE = 'Fitness & Lifestyle',
  AUTOMOTIVE_SERVICES = 'Automotive Services',
  EVENTS_AND_CREATIVE_SERVICES = 'Events & Creative Services',
  TECHNOLOGY_SERVICES = 'Technology Services',
  REAL_ESTATE_AND_PROPERTY = 'Real Estate & Property',
  FOOD_AND_CATERING = 'Food & Catering',
  TRAVEL_AND_HOSPITALITY = 'Travel & Hospitality',
  FINANCIAL_AND_INSURANCE = 'Financial & Insurance',
  PETS_AND_ANIMAL_CARE = 'Pets & Animal Care',
  LEGAL_AND_GOVERNMENT = 'Legal & Government Services',
  SPIRITUAL_AND_RELIGIOUS = 'Spiritual & Religious Services',
  CHILDCARE_AND_FAMILY = 'Childcare & Family Services',
  FASHION_AND_TAILORING = 'Fashion & Tailoring',
  PHOTOGRAPHY_AND_MEDIA = 'Photography & Media',
  BUSINESS_AND_MARKETING = 'Business & Marketing',
}

export enum Platform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
}

export enum AdminVerificationStatus {
  REQUESTED = 'REQUESTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  RESUBMITTED = 'RESUBMITTED',
  NOT_REQUESTED = 'NOT_REQUESTED',
}

export enum AppointmentStatus {
  BOOKED = 'BOOKED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED_BY_PROVIDER = 'REJECTED_BY_PROVIDER',
  NOT_ATTENDED = 'NOT_ATTENDED',
  CONFIRMED = 'CONFIRMED',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING'
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  PROVIDER = 'PROVIDER',
}

export enum Day {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export enum AppConnect {
  GOOGLE = 'GOOGLE',
  STRIPE = 'STRIPE',
  NOTION = 'NOTION',
  WHATSAPP = 'WHATSAPP',
  RAZORPAY = 'RAZORPAY',
  PAYPAL = 'PAYPAL',
}

export enum OtpPurpose {
  REGISTRATION = 'REGISTRATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

export enum PaymentFor {
  SUBSCRIPTION = 'SUBSCRIPTION',
  APPOINTMENT_BOOKING = 'APPOINTMENT_BOOKING',
  PROVIDER_PAYOUT = 'PROVIDER_PAYOUT',
  CANCEL_BOOKING = 'CANCEL_BOOKING',
  CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION',
}

export enum PaymentGateway {
  STRIPE = 'STRIPE',
  RAZORPAY = 'RAZORPAY',
  PAYPAL = 'PAYPAL',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PlanName {
  TRIAL = 'TRIAL',
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
  NO_SUBSCRIPTION = 'NO_SUBSCRIPTION',
}

export enum ServiceMode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BOTH = 'BOTH',
}

export enum ServiceType {
  ONE_TIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  TRIALING = "TRIALING",
  PAST_DUE = "PAST_DUE",
  UNPAID = "UNPAID",
  INCOMPLETE = "INCOMPLETE",
  INCOMPLETE_EXPIRED = "INCOMPLETE_EXPIRED",
  EXPIRED = "EXPIRED",
  PAYMENT_FAILED = "PAYMENT_FAILED"
}

export enum RefundStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCEEDED",
    FAILED = "FAILED",
}

export enum RefundReason {
    DUPLICATE = "duplicate",
    FRAUDULENT = "fraudulent",
    REQUESTED_BY_CUSTOMER = "requested_by_customer"
}

export enum RefundFor {
    CANCEL_BOOKING = "CANCEL_BOOKING",
    CANCEL_SUBSCRIPTION = "CANCEL_SUBSCRIPTION",
}

export enum HearAboutUsOptionValue {
  GOOGLE = 'GOOGLE',
  REFERRAL = 'REFERRAL',
  YOUTUBE = 'YOUTUBE',
  LINKEDIN = 'LINKEDIN',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  WHATSAPP = 'WHATSAPP',
  FACEBOOK = 'FACEBOOK',
  THREADS = 'THREADS',
  OTHER = 'OTHER',
}

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ReferralStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REWARDED = 'REWARDED',
}

export enum CreditTransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum CreditTransactionSource {
  REFERRAL = 'REFERRAL',
  BOOKING_DISCOUNT = 'BOOKING_DISCOUNT',
  SUBSCRIPTION_DISCOUNT = 'SUBSCRIPTION_DISCOUNT',
  ADMIN = 'ADMIN',
  PROMOTION = 'PROMOTION',
}

export enum CreditTransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum PaymentProcessStatus {
    IDLE = 'IDLE',
    PROCESSING = 'PROCESSING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum PaymentProcessType {
  BOOKING = 'BOOKING',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum PaymentAccountStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  RESTRICTED = "RESTRICTED",
  REVOKED = "REVOKED",
  NOT_CONNECTED = "NOT_CONNECTED",
}

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum StripeSyncStatus {
  PENDING = 'PENDING',
  SYNCED = 'SYNCED',
}

export enum EventSocketEnum {
  // The socket connection is ready.
  connect = 'connect',
  // The socket connection has been restored.
  reconnect = 'reconnect',
  // The socket connection has ended.
  disconnect = 'disconnect',
  // Notify the user that their subscription is active.
  subscriptionActivated = 'subscription:activated',
  // Subscribe to updates for a provider.
  providerJoin = 'provider:join',
  // Request access to a provider's time slot.
  slotEngageRequest = 'slot:engage:request',
  // Notify that the slot request was rejected.
  slotEngageRejected = 'slot:engage:rejected',
  // Notify that the slot request was approved.
  slotEngageApproved = 'slot:engage:approved',
  // Stop receiving updates for a provider.
  providerLeave = 'provider:leave',
  // Notify that a time slot has been locked.
  slotLocked = 'slot:locked',
  // Request that a locked slot be released.
  slotUnlockRequest = 'slot:unlock:request',
  // Notify that a time slot is available again.
  slotUnlocked = 'slot:unlocked',
  // Notify that the provider's Stripe account status changed.
  stripeAccountStatusUpdated = 'stripeAccountStatusUpdated',
}

export enum VideoSocketEnum {
  // Join the active call room.
  roomJoin = 'room:join',
  // Watch lobby updates for a call room.
  roomWatch = 'room:watch',
  // Stop watching lobby updates for a call room.
  roomUnwatch = 'room:unwatch',
  // Receive the current participants in a call room.
  roomState = 'room:state',
  // Notify the room that a participant joined.
  userJoined = 'user:joined',
  // Send a call offer to another participant.
  userCall = 'user:call',
  // Receive a call offer from another participant.
  incomingCall = 'incoming:call',
  // Return the answer to a call offer.
  callAccepted = 'call:accepted',
  // Send a WebRTC renegotiation offer.
  peerNegotiation = 'peer:nego:needed',
  // Return the answer to a renegotiation offer.
  peerNegotiationDone = 'peer:nego:done',
  // Receive the final renegotiation answer.
  peerNegotiationFinal = 'peer:nego:final',
  // Leave the active call room.
  roomLeave = 'room:leave',
  // Notify the room that a participant left.
  userLeft = 'user:left',
  // Notify that the video socket connected.
  connect = 'connect',
}

export enum ChatSocketEnum {
  typing = 'typing',
  stopTyping = 'stopTyping',
  connect = 'connect',
  newMessage = 'newMessage',
}