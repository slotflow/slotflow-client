<div align="center">

# SlotFlow

### Appointment booking, simplified.

A modern appointment booking platform connecting users with service providers for seamless online and offline appointments.

**React · TypeScript · Vite · Tailwind CSS · Microservices · Real-time Communication**

[Live Application](https://slotflow.online) · [Backend](https://github.com/slotflow)

</div>

---

SlotFlow provides a unified platform for users to discover and book services, while enabling providers to manage their services, availability, appointments, and customer interactions.

The platform is built around a multi-role architecture with **Users, Providers, and Administrators**, and integrates real-time communication, payments, Google Calendar, push notifications, and role-based access control.


## Overview

SlotFlow supports three primary roles:

* **User** – Discover providers, view available services and slots, and book appointments.
* **Provider** – Create and manage services, manage availability, and handle appointments for online and offline services.
* **Admin** – Manage and oversee the platform.

The frontend communicates with a backend microservice architecture and provides dedicated interfaces and workflows based on the authenticated user's role and permissions.

## Core Features

### Appointment Booking

* Search and discover service providers
* Browse provider services and availability
* Book appointments based on available time slots
* Support for both online and offline appointments
* Appointment management and status handling
* Calendar-based scheduling

### Provider Management

Providers can:

* Offer and manage their services
* Configure availability
* Manage appointments
* Provide services online or at physical locations
* Manage their provider-side workflows

### Authentication & Authorization

SlotFlow supports:

* Email and password authentication
* Google authentication
* JWT-based authentication
* Role-based access control for Users, Providers, and Admins
* Protected routes using React Router

### Payments

Payment functionality is handled through a dedicated payment microservice and integrated with Stripe.

The frontend supports payment-related workflows required for appointment booking and provider operations.

### Google Calendar Integration

SlotFlow integrates with Google Calendar to allow appointment-related scheduling to work alongside users' existing calendars.

### Real-Time Communication

The frontend uses Socket.IO for real-time communication with the SlotFlow socket service.

Real-time functionality includes:

* One-to-one and service-related chat
* Real-time messaging
* WebSocket-based client communication

### Push Notifications

Firebase Cloud Messaging is used for push notifications.

The frontend uses Firebase's `onBackgroundMessage` functionality to handle background push notifications.

### Calendar & Scheduling UI

**FullCalendar** is used to provide calendar-based interfaces for scheduling and appointment management.

### Loading & User Experience

The application includes dedicated loading states and skeleton/shimmer components to provide visual feedback while data is being fetched or processed.

## Technology Stack

| Technology                   | Purpose                                                |
| ---------------------------- | ------------------------------------------------------ |
| **React.js**                 | Frontend application framework                         |
| **TypeScript**               | Static typing and type safety                          |
| **Vite**                     | Development server and build tooling                   |
| **Tailwind CSS**             | Utility-first styling                                  |
| **shadcn/ui**                | Accessible and reusable UI components                  |
| **Custom UI Components**     | Application-specific interface design                  |
| **Redux Toolkit**            | Client-side/global state management                    |
| **TanStack Query**           | Server-state management and asynchronous data fetching |
| **Axios**                    | HTTP client and API communication                      |
| **React Router**             | Client-side routing and protected routes               |
| **Framer Motion**            | UI animations and transitions                          |
| **GSAP**                     | Advanced animations and interactions                   |
| **Lenis**                    | Smooth scrolling                                       |
| **FullCalendar**             | Calendar and scheduling interfaces                     |
| **Socket.IO Client**         | Real-time communication and chat                       |
| **Firebase Cloud Messaging** | Push notifications                                     |
| **Stripe**                   | Payment integration                                    |

## Frontend Architecture

The SlotFlow frontend communicates with the backend through the API Gateway.

Standard REST API requests are routed through the gateway's HTTP proxy, while Socket.IO connections use a dedicated WebSocket proxy. This keeps both communication paths behind the API Gateway while allowing real-time connections to be handled separately.

```text
                        SlotFlow Client
                               │
                ┌──────────────┼──────────────┐
                │              │              │
             REST API       Socket.IO    Push Notifications
                │              │              ▲
                ▼              ▼              │
          API Gateway     API Gateway      Firebase
          WebSocket Proxy  HTTP Proxy         ▲ 
                │              │              │
        ┌───────┘   ┌────────┬─┴────────┐     │
        │           │        │          │     │
        ▼           ▼        ▼          ▼     │
      Socket       Core        Payment  Notification
      Service      Backend     Service  Service
        │          │           │         │
        │          │           │         │
        └──────────┴─────┬─────┴─────────┘
                         │       
        ┌──────────┬─────┴─────┬─────────┐
        │          │           │         │
        ▼          ▼           ▼         ▼
      Redis      Kafka        OTEL    MongoDB  (Service-specific DBs)    
    (Shared)                   │
                        ┌──────┼──────┐
                        │      │      │
                   Prometheus  Loki  Tempo
```

## Backend Services

SlotFlow follows a microservice-oriented backend architecture.

The frontend integrates with the following backend components:

* **API Gateway** – Entry point for frontend API communication, HTTP proxying, and WebSocket proxying.
* **Main Backend** – Core application functionality and business logic.
* **Socket Service** – Real-time communication and chat functionality.
* **Payment Service** – Payment processing and Stripe-related operations.
* **Notification Service** – Notification-related backend functionality.
* **Infrastructure** – Supports Kafka, observability, monitoring, and related infrastructure components.

### Backend Repositories

**API Gateway**
[slotflow-api-gateway](https://github.com/slotflow/slotflow-api-gateway?utm_source=chatgpt.com)

**Main Backend**
[slotflow-backend-main](https://github.com/slotflow/slotflow-backend-main?utm_source=chatgpt.com)

**Socket Service**
[slotflow-socket](https://github.com/slotflow/slotflow-socket?utm_source=chatgpt.com)

**Payment Service**
[slotflow-payment](https://github.com/slotflow/slotflow-payment?utm_source=chatgpt.com)

**Notification Service**
[slotflow-api-notification](https://github.com/slotflow/slotflow-api-notification?utm_source=chatgpt.com)

**Infrastructure**
[slotflow-infra](https://github.com/slotflow/slotflow-infra?utm_source=chatgpt.com)

## Infrastructure

The SlotFlow infrastructure repository manages supporting infrastructure for the distributed backend, including:

* Apache Kafka and Kafka UI
* OpenTelemetry Collector
* Prometheus
* Grafana
* Loki
* Tempo
* Docker-based infrastructure containers
* Kafka topic administration and creation

Contentful is also used to manage constant content and data for the SlotFlow landing pages and related routes.

## UI & Interaction

The interface combines reusable components from **shadcn/ui** with custom-designed application components.

The frontend uses:

* Tailwind CSS for responsive styling
* shadcn/ui for accessible component primitives
* Custom components for SlotFlow-specific workflows
* Framer Motion for interface transitions
* GSAP for advanced animations
* Lenis for smooth scrolling
* Skeleton and shimmer states for asynchronous content

The goal is to provide a responsive interface while maintaining consistent interaction patterns across user, provider, and admin workflows.

## State & Data Management

SlotFlow separates client-side state from server-side state.

### Redux Toolkit

Redux is used for application-level state that needs to be accessed across different parts of the client application.

### TanStack Query

TanStack Query is used for server state and API-driven data, including:

* Data fetching
* Caching
* Request lifecycle management
* Synchronization
* Loading and error states

### Axios

Axios provides the HTTP communication layer between the frontend and the SlotFlow API Gateway, including centralized response and error handling.

## Deployment

The SlotFlow frontend is deployed using **Vercel**.

The application is built as a React/Vite frontend and deployed as a production web application through Vercel.

## Project Focus

SlotFlow is designed as a full-stack, production-oriented SaaS project demonstrating:

* Multi-role application architecture
* Role-based access control
* Appointment scheduling
* Online and offline service workflows
* REST API integration
* Server-state management
* Real-time WebSocket communication
* Real-time chat
* Payment integration
* Google Calendar integration
* Push notifications
* Microservice-based backend communication
* Responsive component-driven UI
* Modern frontend animation and interaction patterns
* Production deployment
---

<p align="center">
  <strong>SlotFlow</strong>
  <br />
  Appointment booking, simplified.
</p>

<p align="center">
  Built with React, TypeScript, and a distributed microservice architecture.
</p>

<p align="center">
  <a href="https://slotflow.online">Live Application</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/slotflow">GitHub</a>
</p>

<p align="center">
  © 2026 SlotFlow Technologies Private Limited
</p>

---
