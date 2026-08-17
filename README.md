<div align="center">

# SlotFlow

### Appointment booking, simplified.

A production-oriented appointment booking platform connecting users with service providers for seamless online and offline appointment management.

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production-success?style=for-the-badge" alt="Production" />
  <img src="https://img.shields.io/badge/Architecture-Microservices-6C63FF?style=for-the-badge" alt="Microservices" />
  <img src="https://img.shields.io/badge/Platform-Web-181717?style=for-the-badge" alt="Web Platform" />
</p>

### Technology Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-000000?style=for-the-badge" alt="Lenis" />
  <img src="https://img.shields.io/badge/FullCalendar-4285F4?style=for-the-badge" alt="FullCalendar" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Firebase_FCM-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Cloud Messaging" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Google_Calendar-4285F4?style=for-the-badge&logo=googlecalendar&logoColor=white" alt="Google Calendar" />
  <img src="https://img.shields.io/badge/Contentful-2478CC?style=for-the-badge&logo=contentful&logoColor=white" alt="Contentful" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" alt="Apache Kafka" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/OpenTelemetry-000000?style=for-the-badge&logo=opentelemetry&logoColor=white" alt="OpenTelemetry" />
  <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white" alt="Prometheus" />
  <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana" />
  <img src="https://img.shields.io/badge/Loki-F2CC0C?style=for-the-badge&logo=grafana&logoColor=black" alt="Loki" />
  <img src="https://img.shields.io/badge/Tempo-F2CC0C?style=for-the-badge&logo=grafana&logoColor=black" alt="Tempo" />
</p>

<p align="center">
  <a href="https://slotflow.online">
    <img src="https://img.shields.io/badge/Live_Application-SlotFlow-181717?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Application" />
  </a>
  <a href="https://github.com/slotflow">
    <img src="https://img.shields.io/badge/GitHub-SlotFlow-181717?style=for-the-badge&logo=github&logoColor=white" alt="SlotFlow GitHub" />
  </a>
</p>

</div>

---

## Overview

SlotFlow is a full-stack appointment booking platform designed to connect customers with service providers through a unified scheduling and service-management experience.

The platform supports **Users, Providers, and Administrators**, with role-specific workflows for discovering services, managing availability, booking appointments, handling payments, communicating in real time, and managing the overall platform.

SlotFlow is built using a **distributed microservice architecture**, with dedicated services for core application functionality, real-time communication, payments, notifications, and infrastructure.

The frontend communicates with these services through an **API Gateway**, providing a centralized entry point for REST APIs and WebSocket connections.

---

## Core Features

### Appointment Booking

* Discover and search service providers
* Browse provider services
* View real-time service availability
* Book available appointment slots
* Support for online and offline appointments
* Appointment status management
* Calendar-based scheduling
* Appointment-related notifications

### Provider Management

Providers can:

* Create and manage services
* Configure service availability
* Define online or physical service locations
* Manage appointments
* Manage provider-side workflows
* Handle customer interactions

### Authentication & Authorization

SlotFlow implements secure authentication and role-based authorization.

* Email and password authentication
* Google authentication
* JWT-based authentication
* Role-Based Access Control (RBAC)
* Protected frontend routes
* Role-specific application workflows
* User, Provider, and Admin authorization

### Payments

Payment processing is handled through a dedicated payment microservice integrated with **Stripe**.

The platform supports payment workflows required for appointment booking and provider subscription operations.

### Google Calendar Integration

SlotFlow integrates with **Google Calendar** to synchronize appointment scheduling with users' existing calendars.

This allows appointment-related events to coexist with users' existing calendar schedules.

### Real-Time Communication

Real-time communication is powered by **Socket.IO** through a dedicated socket service.

Features include:

* One-to-one messaging
* Service-related communication
* Real-time chat
* WebSocket-based communication
* Real-time connection handling

### Push Notifications

Firebase Cloud Messaging is used for push notification delivery.

The frontend supports background notification handling using Firebase Cloud Messaging APIs.

### Calendar & Scheduling

**FullCalendar** provides calendar-based interfaces for:

* Appointment scheduling
* Availability management
* Provider calendars
* Date and time selection
* Appointment visualization

### Content Management

**Contentful** is used to manage constant and configurable content for the SlotFlow landing pages and related frontend routes.

### User Experience

The frontend provides a responsive and interactive experience using:

* Skeleton loading states
* Shimmer effects
* Responsive layouts
* Smooth scrolling
* Page transitions
* Component-level animations
* Interactive UI elements

---

## Technology Stack

### Frontend

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-000000?style=for-the-badge" alt="Lenis" />
  <img src="https://img.shields.io/badge/FullCalendar-4285F4?style=for-the-badge" alt="FullCalendar" />
</p>

### Backend & Communication

<p align="left">
  <img src="https://img.shields.io/badge/Microservices-6C63FF?style=for-the-badge" alt="Microservices" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/REST_API-02569B?style=for-the-badge" alt="REST API" />
  <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge" alt="WebSocket" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/RBAC-6C63FF?style=for-the-badge" alt="RBAC" />
</p>

### Data & Messaging

<p align="left">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" alt="Apache Kafka" />
</p>

### Integrations

<p align="left">
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Firebase_FCM-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase Cloud Messaging" />
  <img src="https://img.shields.io/badge/Google_Calendar-4285F4?style=for-the-badge&logo=googlecalendar&logoColor=white" alt="Google Calendar" />
  <img src="https://img.shields.io/badge/Contentful-2478CC?style=for-the-badge&logo=contentful&logoColor=white" alt="Contentful" />
</p>

### Infrastructure, Deployment & Observability

<p align="left">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/OpenTelemetry-000000?style=for-the-badge&logo=opentelemetry&logoColor=white" alt="OpenTelemetry" />
  <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white" alt="Prometheus" />
  <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana" />
  <img src="https://img.shields.io/badge/Loki-F2CC0C?style=for-the-badge&logo=grafana&logoColor=black" alt="Loki" />
  <img src="https://img.shields.io/badge/Tempo-F2CC0C?style=for-the-badge&logo=grafana&logoColor=black" alt="Tempo" />
</p>

---

## Architecture

SlotFlow follows a **microservice-oriented architecture** where the frontend communicates with backend services through an API Gateway.

REST requests are routed through the gateway's HTTP proxy, while Socket.IO connections are handled through a dedicated WebSocket proxy.

```text
                                ┌──────────────────────┐
                                │     SlotFlow Web     │
                                │   React + TypeScript │
                                └───────────┬──────────┘
                                            │
                         ┌──────────────────┴──────────────────┐
                         │                                     │
                    REST / HTTP                           Socket.IO
                         │                                     │
                         ▼                                     ▼
                ┌─────────────────┐                  ┌─────────────────┐
                │   API Gateway   │                  │   API Gateway   │
                │   HTTP Proxy    │                  │ WebSocket Proxy │
                └────────┬────────┘                  └────────┬────────┘
                         │                                    │
        ┌────────────────┼────────────────────┐               │
        │                │                    │               │
        ▼                ▼                    ▼               ▼
┌──────────────┐ ┌──────────────┐   ┌──────────────┐ ┌──────────────┐
│    Main      │ │   Payment    │   │ Notification │ │    Socket    │
│   Backend    │ │   Service    │   │   Service    │ │    Service   │
└──────┬───────┘ └──────┬───────┘   └──────┬───────┘ └──────┬───────┘
       │                │                  │                │
       └────────────────┴──────────┬───────┴────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
               ┌─────────┐   ┌──────────┐   ┌─────────────┐
               │ MongoDB │   │  Redis   │   │    Kafka    │
               └─────────┘   └──────────┘   └─────────────┘
                                   │
                                   ▼
                         ┌──────────────────┐
                         │   Observability  │
                         │                  │
                         │ OpenTelemetry    │
                         │ Prometheus       │
                         │ Grafana          │
                         │ Loki             │
                         │ Tempo            │
                         └──────────────────┘
```

### Architecture Principles

* API Gateway as the primary backend entry point
* Independently deployable backend services
* Dedicated service for real-time communication
* Dedicated payment processing service
* Dedicated notification service
* Event-driven communication using Apache Kafka
* Redis for shared infrastructure and real-time workloads
* Centralized observability using OpenTelemetry
* Metrics, logs, and traces through Prometheus, Loki, Grafana, and Tempo
* Containerized infrastructure using Docker

---

## Backend Services

### API Gateway

The API Gateway provides the primary entry point between the frontend and backend services.

Responsibilities include:

* HTTP request proxying
* WebSocket proxying
* Routing requests to backend services
* Centralized API access

### Main Backend

The Main Backend contains the core application functionality and business logic.

Responsibilities include:

* User management
* Provider management
* Service management
* Appointment management
* Availability management
* Authentication and authorization
* Core business workflows

### Socket Service

The Socket Service handles real-time communication using Socket.IO.

Responsibilities include:

* Real-time messaging
* One-to-one communication
* Service-related chat
* Socket connection management
* Real-time event delivery

### Payment Service

The Payment Service manages payment-related operations and Stripe integration.

Responsibilities include:

* Payment processing
* Stripe integration
* Payment-related workflows
* Provider subscription operations

### Notification Service

The Notification Service handles notification-related backend workflows.

Responsibilities include:

* Notification processing
* Push notification workflows
* Firebase Cloud Messaging integration

### Infrastructure

The infrastructure repository manages shared distributed-system components including:

* Apache Kafka
* Kafka UI
* OpenTelemetry Collector
* Prometheus
* Grafana
* Loki
* Tempo
* Docker-based infrastructure
* Kafka topic configuration

---

## Backend Repositories

<p align="left">

<a href="https://github.com/slotflow/slotflow-api-gateway">
<img src="https://img.shields.io/badge/API_Gateway-slotflow--api--gateway-181717?style=for-the-badge&logo=github&logoColor=white" alt="API Gateway Repository" />
</a>

<a href="https://github.com/slotflow/slotflow-backend-main">
<img src="https://img.shields.io/badge/Main_Backend-slotflow--backend--main-181717?style=for-the-badge&logo=github&logoColor=white" alt="Main Backend Repository" />
</a>

<a href="https://github.com/slotflow/slotflow-socket">
<img src="https://img.shields.io/badge/Socket_Service-slotflow--socket-181717?style=for-the-badge&logo=github&logoColor=white" alt="Socket Service Repository" />
</a>

<a href="https://github.com/slotflow/slotflow-payment">
<img src="https://img.shields.io/badge/Payment_Service-slotflow--payment-181717?style=for-the-badge&logo=github&logoColor=white" alt="Payment Service Repository" />
</a>

<a href="https://github.com/slotflow/slotflow-api-notification">
<img src="https://img.shields.io/badge/Notification_Service-slotflow--api--notification-181717?style=for-the-badge&logo=github&logoColor=white" alt="Notification Service Repository" />
</a>

<a href="https://github.com/slotflow/slotflow-infra">
<img src="https://img.shields.io/badge/Infrastructure-slotflow--infra-181717?style=for-the-badge&logo=github&logoColor=white" alt="Infrastructure Repository" />
</a>

</p>

---

## State & Data Management

The frontend separates **client-side state** from **server-side state**.

### Redux Toolkit

Redux Toolkit manages application-level client state that needs to be accessed across multiple areas of the application.

### TanStack Query

TanStack Query manages server state and API-driven data.

It provides:

* Data fetching
* Caching
* Request lifecycle management
* Synchronization
* Loading states
* Error handling
* Query invalidation

### Axios

Axios provides the HTTP communication layer between the frontend and API Gateway.

Centralized Axios configuration is used for:

* API communication
* Request handling
* Response handling
* Error handling
* Authentication-related workflows

---

## Real-Time Communication

SlotFlow uses **Socket.IO** with a dedicated socket service for real-time communication.

```text
Client
  │
  │ Socket.IO
  ▼
API Gateway
  │
  │ WebSocket Proxy
  ▼
Socket Service
  │
  ├── Real-Time Messaging
  ├── Connection Management
  └── Service Communication
```

This architecture keeps WebSocket workloads isolated from the core application backend while maintaining a centralized gateway entry point.

---

## Observability

SlotFlow includes an observability stack designed for monitoring distributed backend services.

### OpenTelemetry

OpenTelemetry is used as the telemetry instrumentation and collection layer.

### Prometheus

Prometheus collects and stores application and infrastructure metrics.

### Grafana

Grafana provides dashboards and visualization for operational metrics.

### Loki

Loki is used for centralized log aggregation.

### Tempo

Tempo provides distributed tracing for analyzing requests across multiple microservices.

```text
                  ┌──────────────────┐
                  │ Backend Services │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ OpenTelemetry    │
                  │    Collector     │
                  └───────┬──────────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
        Prometheus       Loki        Tempo
          Metrics         Logs       Traces
             │            │            │
             └────────────┼────────────┘
                          ▼
                     ┌─────────┐
                     │ Grafana │
                     └─────────┘
```

---

## Deployment

### Frontend

The SlotFlow frontend is deployed using **Vercel**.

The frontend is built as a production React/Vite application.

### Backend

The backend services are designed as independently deployable microservices with Docker-based service environments.

The infrastructure layer manages supporting distributed-system components required by the backend architecture.

---

## Project Structure

The frontend repository follows a component-driven architecture designed around reusable UI components, role-specific workflows, and separation of client/server state.

```text
slotflow-client/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── routes/
│   ├── utils/
│   └── ...
│
├── screenshots/
├── .github/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Security & Access Control

SlotFlow implements role-aware access control across the application.

The authorization model distinguishes between:

* **Users**
* **Providers**
* **Administrators**

Protected routes and backend authorization ensure that users can only access workflows and resources permitted by their assigned role.

Authentication and authorization workflows use JWT-based authentication and role-based access control.

---

## Production Integrations

<p align="left">
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe Payments" />
  <img src="https://img.shields.io/badge/Google-Authentication_%26_Calendar-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Integration" />
  <img src="https://img.shields.io/badge/Firebase-Push_Notifications-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Contentful-Content_Management-2478CC?style=for-the-badge&logo=contentful&logoColor=white" alt="Contentful" />
</p>

---

## Live Application

<p align="left">
  <a href="https://slotflow.online">
    <img src="https://img.shields.io/badge/Live_Application-SlotFlow-181717?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Application" />
  </a>
</p>

---

## GitHub Organization

<p align="left">
  <a href="https://github.com/slotflow">
    <img src="https://img.shields.io/badge/GitHub-SlotFlow_Organization-181717?style=for-the-badge&logo=github&logoColor=white" alt="SlotFlow GitHub Organization" />
  </a>
</p>

---

## Project Highlights

SlotFlow demonstrates a production-oriented full-stack architecture with:

* Multi-role SaaS application design
* Role-Based Access Control
* Appointment scheduling
* Online and offline service workflows
* Microservice architecture
* API Gateway pattern
* REST API communication
* WebSocket communication
* Real-time chat
* Event-driven architecture with Apache Kafka
* Redis-based infrastructure
* Stripe payment integration
* Google authentication and calendar integration
* Firebase push notifications
* Server-state management with TanStack Query
* Client-state management with Redux Toolkit
* Responsive component-driven UI
* Advanced frontend animations
* Docker-based infrastructure
* CI/CD workflows with GitHub Actions
* Distributed observability with OpenTelemetry
* Metrics with Prometheus
* Logging with Loki
* Distributed tracing with Tempo
* Monitoring and visualization with Grafana
* Production deployment

---

## Related Repositories

All SlotFlow backend and infrastructure services are maintained within the SlotFlow GitHub organization.

<p align="left">
  <a href="https://github.com/slotflow">
    <img src="https://img.shields.io/badge/View_All_Repositories-SlotFlow-181717?style=for-the-badge&logo=github&logoColor=white" alt="View SlotFlow Repositories" />
  </a>
</p>

---

## License

## License

**Proprietary — All Rights Reserved**

Copyright © 2026 SlotFlow Technologies Private Limited.

The SlotFlow source code and associated assets are proprietary and confidential
property of SlotFlow Technologies Private Limited.

No permission is granted to any person or organization to:

- Use the software for personal, commercial, or production purposes
- Copy, reproduce, or redistribute the source code
- Modify, adapt, or create derivative works
- Sell, sublicense, lease, or otherwise commercialize the software
- Incorporate any portion of the software into another product or service
- Host or deploy the software without explicit written permission

Viewing the source code on GitHub does not grant any license or rights to use,
modify, distribute, or commercialize the software.

Any use beyond viewing the repository requires prior written permission from
SlotFlow Technologies Private Limited.

All rights reserved.

---

<div align="center">

### SlotFlow

**Appointment booking, simplified.**

Built with React, TypeScript, and a distributed microservice architecture.

<p>
  <a href="https://slotflow.online">Live Application</a>
  ·
  <a href="https://github.com/slotflow">GitHub</a>
</p>

© 2026 SlotFlow Technologies Private Limited

</div>
