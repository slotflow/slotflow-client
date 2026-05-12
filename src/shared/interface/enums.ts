export enum PermissionStatus {
    GRANTED = "granted",
    DENIED = "denied",
    DEFAULT = "default",
};

export enum Platform {
  ANDROID = "ANDROID",
  IOS = "IOS",
  WEB = "WEB",
};

export enum AdminVerificationStatus {
  REQUESTED = "REQUESTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  RESUBMITTED = "RESUBMITTED",
  NOT_REQUESTED = "NOT_REQUESTED",
};

export enum AppointmentStatus {
  BOOKED = "BOOKED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REJECTED_BY_PROVIDER = "REJECTED_BY_PROVIDER",
  NOT_ATTENDED = "NOT_ATTENDED",
  CONFIRMED = "CONFIRMED",
  PAYMENT_PENDING = "PAYMENT_PENDING",
  EXPIRED = "EXPIRED",
};


export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    PROVIDER = "PROVIDER",
};

export enum Boolean {
    TRUE = "true",
    FALSE = "false"
};

export enum FileType {
    PNG="image/png",
    JPEG="image/jpeg",
    JPG="image/jpg"
};

export enum Day {
    SUNDAY = "Sunday",
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
};

export enum AppConnect {
    GOOGLE = "GOOGLE",
    STRIPE = "STRIPE",
    NOTION = "NOTION",
    WHATSAPP = "WHATSAPP",
    RAZORPAY = "RAZORPAY",
    PAYPAL = "PAYPAL",
};

export enum OtpPurpose {
  REGISTRATION = "REGISTRATION",
  PASSWORD_RESET = "PASSWORD_RESET",
};

export enum PaymentFor {
    PROVIDER_SUBSCRIPTION = "PROVIDER_SUBSCRIPTION",
    APPOINTMENT_BOOKING = "APPOINTMENT_BOOKING",
    PROVIDER_PAYOUT = "PROVIDER_PAYOUT",
    CANCEL_BOOKING = "CANCEL_BOOKING",
    CANCEL_SUBSCRIPTION = "CANCEL_SUBSCRIPTION",
};

export enum PaymentGateway {
    STRIPE = "STRIPE",
    RAZORPAY = "RAZORPAY",
    PAYPAL = "PAYPAL"
};

export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
};

export enum PaymentMethod {
    CARD = "card",
    UPI = "upi",
    NETBANKING = "netbanking"
}

export enum PlanName {
  TRIAL = "TRIAL",
  STARTER = "STARTER",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE",
  NO_SUBSCRIPTION = "NO_SUBSCRIPTION"
};

export enum ServiceCategory {
    HEALTHCARE_AND_WELLNESS = "Healthcare & Wellness",
    PROFESSIONAL_SERVICES = "Professional Services",
    EDUCATION_AND_TRAINING = "Education & Training",
    HOME_AND_MAINTENANCE = "Home & Maintenance",
    BEAUTY_AND_PERSONAL_CARE = "Beauty & Personal Care",
    FITNESS_AND_LIFESTYLE = "Fitness & Lifestyle",
    AUTOMOTIVE_SERVICES = "Automotive Services",
    EVENTS_AND_CREATIVE_SERVICES = "Events & Creative Services",
    TECHNOLOGY_SERVICES = "Technology Services",
    REAL_ESTATE_AND_PROPERTY = "Real Estate & Property",
};

export enum ServiceMode {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    BOTH = "BOTH",
};

export enum ServiceType {
    ONE_TIME = "ONE_TIME",
    RECURRING = "RECURRING",
};

export enum SubscriptionStatus {
   ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    CANCELLED = "CANCELLED",
    PENDING = "PENDING",
    PAST_DUE = "PAST_DUE",
    FAILED = "FAILED",
};

export enum SubscriptionValidity {
    SEVEN_DAYS = 7,
    ONE_MONTH = 30,
    THREE_MONTHS = 90,
    SIX_MONTHS = 180,
    TWELVE_MONTHS = 360,
};

export enum NotificationType {
    BOOKING_CONFIRMED = "BOOKING_CONFIRMED",
    BOOKING_CANCELLED = "BOOKING_CANCELLED",
    BOOKING_RESCHEDULED = "BOOKING_RESCHEDULED",
    BOOKING_REJECTED = "BOOKING_REJECTED",
    BOOKING_NOT_ATTENDED = "BOOKING_NOT_ATTENDED",
    BOOKING_APPROVED = "BOOKING_APPROVED",

    APPOINTMENT_CREATED = "APPOINTMENT_CREATED",
    APPOINTMENT_CANCELLED = "APPOINTMENT_CANCELLED",
    APPOINTMENT_RESCHEDULED = "APPOINTMENT_RESCHEDULED",
    APPOINTMENT_NOT_ATTENDED = "APPOINTMENT_NOT_ATTENDED",

    PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
    PAYMENT_FAILED = "PAYMENT_FAILED",

    SUBSCRIPTION_EXPIRING = "SUBSCRIPTION_EXPIRING",
    SUBSCRIPTION_EXPIRED = "SUBSCRIPTION_EXPIRED",

    BOOKING = "BOOKING",
    APPOINTMENT = "APPOINTMENT",

    SYSTEM = "SYSTEM",
};

export enum VideoCallSocket {
  roomJoin = "room:join",
  userJoined = "user:joined",
  userCall = "user:call",
  incomingCall = "incoming:call",
  callAccepted = "call:accepted",
  peerNegotiation = "peer:nego:needed",
  peerNegotiationDone = "peer:nego:done",
  peerNegotiationFinal = "peer:nego:final",
  roomLeave = "room:leave",
  userLeft = "user:left",
}

export enum PeerValues {
    TRACK = "track",
    STABLE = "stable",
    NEGOTIATION_NEEDED = "negotiationneeded"
}

export enum MediaTrackKind {
  VIDEO = "video",
  AUDIO = "audio",
}

export enum RefundStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCEEDED",
    FAILED = "FAILED",
}

export enum RefundReason {
    DUPLICATE = "duplicate",
    FRAUDUKENT = "fraudulent",
    REQUESTED_BY_CUSTOMER = "requested_by_customer"
}

export enum RefundFor {
    CANCEL_BOOKING = "CANCEL_BOOKING",
    CANCEL_SUBSCRIPTION = "CANCEL_SUBSCRIPTION",
}

export enum HearAboutUsOptionValue {
  GOOGLE = "google",
  REFERRAL = "referral",
  YOUTUBE = "youtube",
  LINKEDIN = "linkedin",
  TWITTER = "twitter",
  INSTAGRAM = "instagram",
  WHATSAPP = "whatsapp",
  FACEBOOK = "facebook",
  THREADS = "threads",
  OTHER = "other",
}

export enum OnboardingStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum ReferralStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  REWARDED = "REWARDED",
}

export enum CreditTransactionType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT"
}

export enum CreditTransactionSource {
  REFERRAL = "REFERRAL",
  BOOKING_DISCOUNT = "BOOKING_DISCOUNT",
  SUBSCRIPTION_DISCOUNT = "SUBSCRIPTION_DISCOUNT",
  ADMIN = "ADMIN",
  PROMOTION = "PROMOTION"
}

export enum CreditTransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}