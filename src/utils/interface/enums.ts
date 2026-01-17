export enum ServiceCategory {
    HealthcareAndWellness = "Healthcare & Wellness",
    ProfessionalServices = "Professional Services",
    EducationAndTraining = "Education & Training",
    HomeAndMaintenance = "Home & Maintenance",
    BeautyAndPersonalCare = "Beauty & Personal Care",
    FitnessAndLifestyle = "Fitness & Lifestyle",
    AutomotiveServices = "Automotive Services",
    EventsAndCreativeServices = "Events & Creative Services",
    TechnologyServices = "Technology Services",
    RealEstateAndProperty = "Real Estate & Property",
};

export enum AdminVerificationStatus {
    REQUESTED = "Requested",
    UNDER_REVIEW = "Under_review",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    RESUBMITTED = "Resubmitted",
    NOT_REQUESTED = "Not_submitted",
};

export enum AppointmentStatus {
    Booked = "Booked",
    Completed = "Completed",
    Cancelled = "Cancelled",
    RejectedByProvider = "RejectedByProvider",
    NotAttended = "NotAttended",
    Confirmed = "Confirmed",
    PaymentPending = "PaymentPending",
    Expired = "Expired",
};

export enum Day {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
};

export enum PaymentFor {
    ProviderSubscription = "ProviderSubscription",
    AppointmentBooking = "AppointmentBooking",
    ProviderPayout = "ProviderPayout",
    CancelBooking = "CancelBooking",
    CancelSubscription = "CancelSubscription",
};

export enum PaymentGateway {
    Stripe = "Stripe",
    Razorpay = "Razorpay",
    Paypal = "Paypal"
};

export enum PaymentMethod {
    Card = "Card",
    Upi = "Upi",
    Wallet = "Wallet",
    NetBanking = "NetBanking",
};

export enum PaymentStatus {
    Pending = "Pending",
    Paid = "Paid",
    Failed = "Failed",
    Cancelled = "Cancelled",
    Refunded = "Refunded",
};

export enum Role {
    Admin = "ADMIN",
    User = "USER",
    Provider = "PROVIDER",
};

export enum ServiceMode {
    Online = "Online",
    Offline = "Offline",
    Both = "Both",
};

export enum ServiceType {
    OneTime = "One-time",
    Recurring = "Recurring",
};

export enum SubscriptionStatus {
    Active = "Active",
    Expired = "Expired",
    Cancelled = "Cancelled",
    PaymentPending = "PaymentPending",
};

export enum SubscriptionValidity {
    SevenDays = 7,
    OneMonth = 30,
    ThreeMonths = 90,
    SixMonths = 180,
    TwelveMonths = 365,
};

export enum PlanName {
    Trial = "TRIAL",
    Starter = "STARTER",
    Professional = "PROFESSIONAL",
    Enterprise = "ENTERPRISE",
    NoSubscription = "NOSUBSCRIPTION"
};

export enum AppConnect {
    Google = "Google",
    Stripe = "Stripe",
    Notion = "Notion",
    WhatsApp = "WhatsApp",
    Razorpay = "Razorpay",
    Paypal = "Paypal",
};

export enum Platform {
    Android = "Android",
    Ios = "Ios",
    Web = "Web",
};



