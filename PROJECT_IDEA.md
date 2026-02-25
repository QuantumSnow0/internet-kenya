# Project Idea: Internet Kenya

**Internet Kenya** is an **internet acquisition platform**—a marketplace and distribution layer between customers and Internet Service Providers (ISPs). We sell internet services on behalf of multiple ISPs; comparison is a tool, **conversion is the objective**.

## Overview

We are building a **conversion-focused web platform** under the name **Internet Kenya** that:

- Connects consumers with ISPs by **selling internet services** (plans, sign-ups, installations), not only by displaying information.
- Acts as a **marketplace and distribution layer**: we aggregate offers, recommend plans, and guide users toward signing up—generating **leads and direct conversions** for ISPs.
- Is **location-first**: every experience starts from “where are you?” so we can show the best available options and recommend suitable plans by speed, price, and coverage.

The platform is not an ISP. We do not provide internet access ourselves. We are an **acquisition channel** for ISPs and a **single place** for customers to find and buy the right plan.

## Mission: conversion-focused

Our primary goal is to **sell internet services** from different ISPs. The platform should:

| Goal | Description |
|------|-------------|
| **Help users find the best internet in their location** | Location-first: address or area first, then show what’s available and suitable. |
| **Recommend suitable plans** | Use speed, price, and coverage to recommend plans that match the user’s needs. |
| **Guide users toward signing up** | Clear paths to apply, request a connection, or complete a purchase—not dead-end comparison. |
| **Generate leads or direct conversions for ISPs** | Every recommendation and CTA should support lead capture or sign-up; we measure success by conversions. |
| **Support partnerships and commission-based revenue** | Business model is built on leads and conversions (e.g. per-sign-up or per-lead commissions from ISPs). |

**Positioning:** We are an **internet acquisition platform**, not just an information or comparison site. Comparison supports conversion; it is not the end goal.

## How we help users (location-first)

- **Location first** — User enters address, area, or region; we show only what’s available there and rank or recommend by relevance.
- **Find & compare** — Users see providers and plans for their area, with clear criteria (speed, pricing, coverage, plans) so they can compare and choose.
- **Recommend** — We recommend suitable plans based on speed, price, and coverage to reduce friction and guide choice.
- **Convert** — Clear calls to action: sign up, request connection, apply. The journey ends in a lead or sign-up, not only in information.

## Core comparison criteria (in service of conversion)

Comparison is a **tool** to build trust and guide users to a plan. Users evaluate offers using:

| Criterion | Description |
|-----------|-------------|
| **Internet speed** | Upload and download speeds offered by each plan. |
| **Pricing** | Cost (e.g. monthly, annual), fees, and any promotional pricing. |
| **Location coverage** | Whether the provider and specific plans are available in the user’s area. |
| **Available plans** | Range of plans (e.g. basic, standard, premium) and their features. |

These criteria support **recommendation** and **conversion**: users choose a plan, then we guide them to the next step (sign-up, lead form, or partner flow).

## Business model (lead generation & commission)

- **Lead generation** — Capture interest (e.g. “Get this plan”, “Request connection”) and pass qualified leads to ISPs.
- **Commission-based revenue** — Revenue from ISPs based on leads, sign-ups, or activations (per lead, per conversion, or similar).
- **Partnerships** — Formal relationships with ISPs as a distribution/acquisition partner; the platform is the channel, not the product.

The product and UX are designed to maximize **qualified conversions** while keeping the experience clear and trustworthy for the user.

## Responsive design & mobile-first

The website must be **fully responsive** and work well on all devices:

| Device | Role |
|--------|------|
| **Mobile phones** | Primary focus — most users are expected to visit from mobile. |
| **Tablets** | Full support; layouts adapt. |
| **Laptops** | Full support; no desktop-only assumptions. |
| **Large desktop screens** | Content and layout scale appropriately. |

**Design approach:**

- **Mobile-first** — Base layout, typography, and touch targets are designed for small screens first; we then enhance for larger viewports (e.g. with media queries or responsive utilities), not the other way around.
- **Do not design for desktop only** — Every layout, component, and page must be considered at mobile width first and must adapt across breakpoints using responsive best practices (fluid layout, flexible grids, responsive images, readable line lengths, adequate touch targets).
- **Usability and clarity on small screens is critical** — Assume most traffic is mobile; if something works on desktop but is cramped or unclear on mobile, we fix it.

When building UI, we will **always explain how responsiveness is handled** (breakpoints, layout shifts, touch vs pointer, etc.) so the approach stays consistent and maintainable.

## SEO-Ready Architecture

The platform will be built with **search-engine-friendly (SEO-ready) architecture** from the start. This ensures:

- **Discoverability** — Comparison pages, location-based pages, and provider pages can rank well in search results so users find the platform when searching for internet options in their area.
- **Clean URLs & structure** — Logical, readable URLs (e.g. by location, provider, or plan type) and a clear information hierarchy for both users and crawlers.
- **Crawlability & indexing** — Technical choices that allow search engines to crawl and index content effectively (e.g. server-side or pre-rendered content where needed, proper meta and structured data).
- **Content that ranks** — Pages designed to answer real search intent (e.g. “best internet in [area]”, “compare ISPs [location]”) with useful, unique content.

SEO is treated as a core architectural requirement, not an afterthought. Organic search should drive traffic that can **convert** (find location → see plans → sign up or submit lead).

## One Important Rule (from day one)

- **Keep server logic in Server Components.** Data fetching, business logic, and rendering of main content happen on the server.
- **Only use Client Components when needed.** Use them for interactivity that truly requires the browser (e.g. forms, toggles, client-side state), not for default data or layout.

This keeps SEO strong: crawlers and users get full content from the server; Client Components are the exception, not the default.

## Recommended Stack

A stack that supports SEO, location-based data, and fast iteration:

| Layer | Recommendation | Why |
|-------|----------------|-----|
| **Frontend / full-stack** | **Next.js** (React) | Server-side rendering (SSR) and static generation (SSG) for SEO; clean file-based routing; built-in API routes; strong ecosystem and deployment (e.g. Vercel). |
| **Database** | **PostgreSQL** | Relational model fits providers, plans, coverage areas, and locations; supports complex queries (e.g. “providers in this area”). |
| **ORM / DB layer** | **Prisma** or **Drizzle** | Type-safe schema, migrations, and queries; good DX and alignment with TypeScript. |
| **Language** | **TypeScript** | Type safety across frontend and backend; fewer runtime bugs as the codebase grows. |
| **Hosting** | **Vercel** (or similar) | Optimized for Next.js; edge and serverless; easy previews and scaling. |

**Optional / later:**

- **Headless CMS** (e.g. Strapi, Payload) — If non-developers need to edit provider/plan copy or landing content.
- **Redis** — Caching for coverage lookups and comparison results to keep responses fast.
- **Map / geocoding** — For “providers in your area” (e.g. address → coordinates, coverage boundaries).

This stack keeps the project **SEO-ready** (server-rendered or pre-rendered pages, control over meta and structured data), **scalable**, and **maintainable** as you add more providers and locations.

## How we build (lead developer approach)

Development on this project is led with a **mentoring, explain-don’t-just-do** approach:

- **Guide architectural decisions** — Propose structure and patterns; explain why they fit this product and scale.
- **Suggest best practices** — Recommend conventions (naming, file layout, data flow) and the reasoning behind them.
- **Explain every important decision** — For non-obvious choices: what we’re doing, why, and what we’re not doing (and why).
- **Teach while building** — Prioritize understanding over speed. Assume a serious developer who wants to go deep.

**When building features:**

- **Break work into steps** — Clear, ordered steps so we can reason about each part and review as we go.
- **Explain reasoning** — Why this approach, why this abstraction, why this boundary (e.g. server vs client, API shape).
- **Call out tradeoffs** — When we pick one option over another, state the tradeoff (e.g. simplicity now vs flexibility later).
- **Highlight scalability** — Where a choice might limit growth (traffic, data, team size) and when to revisit it.
- **When building UI, explain responsiveness** — For each layout or component: how it behaves at different breakpoints, why those breakpoints, and how touch/pointer and readability are handled (see [Responsive design & mobile-first](#responsive-design--mobile-first)).

Code is written to be understood and maintained. We avoid large, unexplained blocks; we favor small, justified changes and clear intent. The goal is a scalable product and a team that understands how and why it’s built.

## Platform role & identity

| We are | We are not |
|--------|------------|
| An **internet acquisition platform** | An ISP (we do not provide internet access) |
| A **marketplace and distribution layer** between customers and ISPs | Only an information or comparison site |
| **Conversion-focused**: we sell internet services and generate leads/conversions for ISPs | Purely informational; conversion is the objective |
| **Location-first**: find best internet in your area → recommend → sign up | Desktop-only or one-size-fits-all |

---

*This document describes the product idea at a high level. No implementation or code is implied.*
