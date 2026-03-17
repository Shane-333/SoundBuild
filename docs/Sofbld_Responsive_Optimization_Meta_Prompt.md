# Sofbld Responsive Optimization Meta Prompt

## Purpose

Use this document as a high-fidelity meta prompt for improving the Sofbld website so it is genuinely responsive across mobile, tablet, laptop, and desktop contexts.

This is not a prompt for making a few sections "stack better."

This is a prompt for methodically improving:

- layout responsiveness
- interaction responsiveness
- perceived performance
- accessibility on touch devices
- visual consistency across breakpoints
- mobile usability without weakening Sofbld's premium positioning

The goal is to preserve the brand's high-trust, premium, technically credible feel while making every major section and interaction work cleanly on smaller and larger screens.

---

## Core Mandate

Treat responsiveness as a product quality system, not a CSS cleanup task.

The website should feel:

- premium on desktop
- clear on tablet
- effortless on mobile
- fast enough to feel responsive under real conditions
- stable under rotation, dynamic browser chrome, and mobile keyboards

Do not solve this with random breakpoint patches.

Do not solve this by stripping away all personality on mobile.

Do not optimize only for visual layout while ignoring interaction and performance.

The final result should feel intentionally designed for every viewport, not merely tolerated by every viewport.

---

## Project Context

The current website is a Vite + React single-page marketing site using component-scoped CSS rather than a utility framework or design system library.

Primary implementation references:

- `src/index.css`
- `src/App.jsx`
- `src/App.css`
- `src/components/Hero.jsx`
- `src/components/Hero.css`
- `src/components/HeroOrbitScene.jsx`
- `src/components/HeroOrbitScene.css`
- `src/components/Intake.jsx`
- `src/components/Intake.css`
- `src/components/Pricing.css`
- `src/components/Testimonials.css`
- `src/components/About.css`
- `src/components/FAQ.css`
- `src/components/LogoBar.css`

There is also an additional standalone file:

- `dapper-artisan-intake.jsx`

That file is not currently wired into the main app, but if it is ever reused, it should be treated as a separate responsive workstream because it relies heavily on inline fixed sizing and full-viewport layouts.

---

## What Responsiveness Means In This Project

For Sofbld, responsiveness must include all of the following:

### 1. Layout Responsiveness

Content should reflow cleanly across common viewport widths without overlap, clipping, excessive empty space, or cramped reading widths.

### 2. Interaction Responsiveness

Navigation, buttons, forms, overlays, and expandable sections should remain easy to use with thumbs, mobile keyboards, and touch interactions.

### 3. Performance Responsiveness

The page should feel responsive under load, especially on mobile devices where heavy hero visuals and animation can delay meaningful interaction.

### 4. Content Responsiveness

Longer text, multi-line labels, and dense cards should remain readable at all breakpoints. The site should not assume desktop line lengths.

### 5. Visual Hierarchy Responsiveness

Typography, spacing, padding, and section pacing should scale in a controlled way so the site still feels premium on smaller screens rather than crowded or visually collapsed.

---

## Strategic Goal

The responsive optimization effort should achieve five outcomes:

1. Make the Sofbld website comfortable and intuitive on phones.
2. Preserve premium visual quality on desktop.
3. Remove layout brittleness at tablet widths where many sections currently become dense too early.
4. Improve perceived speed and smoothness, especially in the hero and intake flow.
5. Create a repeatable responsive system so future sections are easier to build correctly.

---

## Current Audit Summary

The current codebase already has a decent mobile-first baseline in several content sections because many grids start as one column and expand at larger breakpoints.

However, responsiveness is currently handled in a fragmented, component-by-component way. The most important issues are structural rather than cosmetic.

### A. Header and Navigation

Current behavior:

- The header is sticky.
- Navigation links are hidden below `768px`.
- There is no replacement mobile menu.
- The CTA remains visible, which means small screens lose information architecture but keep a large action button.

Implication:

Mobile users lose wayfinding and section access, which is a major usability issue for a long landing page.

Primary references:

- `src/App.jsx`
- `src/App.css`

### B. Hero Section

Current behavior:

- The hero uses a full-height visual stage.
- It includes a lazy-loaded 3D scene using React Three Fiber.
- Decorative bubbles are absolutely positioned.
- An SVG connection overlay and animation loop run across the hero.
- Mobile treatment mostly hides or shifts some decorative elements rather than redefining the section structurally.

Implication:

- The hero is the biggest combined layout, interaction, and performance risk.
- It may remain visually impressive but still feel heavy or brittle on smaller devices.
- A premium desktop hero does not automatically make a premium mobile hero.

Primary references:

- `src/components/Hero.jsx`
- `src/components/Hero.css`
- `src/components/HeroOrbitScene.jsx`
- `src/components/HeroOrbitScene.css`

### C. Intake Overlay

Current behavior:

- The intake is a full-screen fixed overlay.
- The overlay itself uses `overflow: hidden`.
- Step panels are vertically centered.
- Some option groups remain horizontally dense.
- The thank-you summary uses horizontal key/value rows.

Implication:

- On short screens or when the mobile keyboard is open, content can become awkward, clipped, or difficult to reach.
- This is a high-priority conversion flow, so it must work especially well on mobile.

Primary references:

- `src/components/Intake.jsx`
- `src/components/Intake.css`

### D. Tablet Density

Current behavior:

- Some content-heavy sections move to 3 columns at `768px`.
- This is workable for short cards but too dense for sections with longer text.

Implication:

- Tablet and small laptop layouts may feel compressed even when they technically fit.

Primary references:

- `src/components/Testimonials.css`
- `src/components/About.css`
- `src/components/Pricing.css`

### E. Overflow and Clipping Risks

Current behavior:

- FAQ answers are revealed with a fixed max-height.
- Some labels use no-wrap behavior.
- Some decorative or badge elements are positioned in ways that can become fragile at smaller widths.

Implication:

- Narrow screens magnify clipping risk, text overflow risk, and awkward wrapping behavior.

Primary references:

- `src/components/FAQ.css`
- `src/components/LogoBar.css`
- `src/components/Pricing.css`

### F. Global Responsive System Gaps

Current behavior:

- Global typography only scales lightly.
- Container padding changes only once at very small widths.
- Breakpoint logic is spread across many component files.
- There is no clearly defined responsive scale for section spacing, card padding, and typographic rhythm.

Implication:

- The codebase can be made responsive, but it is not yet guided by a strong responsive system.

Primary references:

- `src/index.css`

### G. Performance Constraints That Affect Responsiveness

Current build observation:

- The `three` vendor bundle is very large relative to the rest of the site.
- The custom `Cardinal` display font is declared, but the referenced font files are not currently present in `public/fonts`.

Implication:

- Mobile users may experience a slower-feeling first impression.
- Typography may shift after load if the intended font is not available.

Primary references:

- `src/index.css`
- `src/components/HeroOrbitScene.jsx`

---

## Non-Negotiable Guardrails

Follow these rules throughout the responsiveness effort.

### Preserve Premium Positioning

Do not make the mobile experience feel cheaper, flatter, or visually generic in the name of responsiveness.

### Prefer Structural Solutions Over Hacks

If a section only works through isolated overrides, it is not truly responsive yet.

### Build A System, Not A Patchwork

Spacing, typography, containers, and breakpoints should become more consistent after this work, not less.

### Prioritize Conversion-Critical Flows

The header, hero, and intake flow matter more than secondary polish.

### Treat Performance As Part Of Responsiveness

A visually beautiful section that feels heavy, delayed, or unstable on mobile is not responsive enough.

---

## Definition Of Success

The effort should be considered successful only if all of the following are true:

- there is no horizontal scrolling at standard device widths
- the site has a complete, usable navigation pattern on mobile
- the hero remains premium but no longer feels fragile or overly heavy on mobile
- the intake flow is fully usable on short screens and with the keyboard open
- text-heavy sections remain readable on tablet and small laptops
- expandable content does not clip because of fixed-height assumptions
- spacing and typography scale intentionally across breakpoints
- the site feels responsive not just visually, but also interactively and perceptually

---

## Responsive Viewport Matrix

Use this matrix as the minimum baseline for design and QA decisions.

| Context | Target widths | Notes |
| --- | --- | --- |
| Small mobile | 320, 360 | Stress test for overflow and dense controls |
| Standard mobile | 375, 390, 393 | Common iPhone and Android widths |
| Large mobile | 414, 430 | Important for premium layout pacing |
| Tablet portrait | 768, 820 | Common density failure zone |
| Tablet landscape / small laptop | 1024, 1112 | Common transition point for multi-column layouts |
| Laptop | 1280, 1366 | Standard desktop baseline |
| Large desktop | 1440+ | Preserve premium spacing and composition |

Also test:

- portrait and landscape on mobile where relevant
- dynamic mobile browser chrome behavior
- mobile keyboard open during intake steps
- reduced motion preference

---

## Methodical Execution Plan

The work should happen in phases.

Do not jump straight to component edits before the responsive strategy is clear.

### Phase 0. Baseline Audit And Measurement

Objective:

Create a full responsiveness baseline before making changes.

Method:

- Review every major section at each width in the viewport matrix.
- Log issues under three labels:
  - visual layout
  - interaction usability
  - performance or perceived responsiveness
- Capture special attention points:
  - sticky header behavior
  - hero text readability
  - hero visual stability
  - intake with keyboard open
  - FAQ expansion
  - footer wrapping

Deliverable:

A breakpoint-by-breakpoint issue list that distinguishes:

- blockers
- high-priority degradations
- polish issues

Done criteria:

There is a documented baseline that can be checked again after implementation.

---

### Phase 1. Establish The Responsive Foundation

Objective:

Create a coherent system for responsive typography, spacing, containers, and breakpoint logic.

Method:

- Standardize the canonical breakpoint set used throughout the site.
- Define how section spacing should scale between mobile, tablet, and desktop.
- Define how card padding should scale between mobile, tablet, and desktop.
- Define how major headings, supporting text, and button sizing should scale.
- Clarify container widths and horizontal padding behavior.
- Reduce one-off responsive logic where possible by strengthening global tokens and shared patterns.

Primary files to review first:

- `src/index.css`
- `src/App.css`

Design intent:

The site should feel intentionally paced on mobile rather than simply compressed.

Done criteria:

- a clear responsive token strategy exists
- spacing and type scale are no longer mostly ad hoc
- future component work can follow shared rules

---

### Phase 2. Fix The App Shell First

Objective:

Make the site shell usable and trustworthy at every width.

Method:

- Replace the current "hide nav links on mobile" behavior with a complete mobile navigation pattern.
- Rebalance the header so branding, navigation, and CTA each have a clear role on small screens.
- Review sticky behavior and safe-area spacing on mobile.
- Ensure footer columns and legal links reflow cleanly without awkward crowding.

Primary files:

- `src/App.jsx`
- `src/App.css`

Priority reasoning:

If the shell fails, the rest of the page feels broken even if individual sections are improved.

Done criteria:

- mobile users can navigate the site cleanly
- header content never feels cramped or incomplete
- footer remains readable and orderly on narrow screens

---

### Phase 3. Redefine The Hero By Device Context

Objective:

Make the hero premium and readable everywhere while reducing mobile fragility and unnecessary load.

Method:

Treat the hero as three experience tiers rather than one visual forced across all screens:

#### Desktop Hero

Preserve the premium immersive feel, including richer motion and 3D, if it performs well.

#### Tablet Hero

Reduce visual density, simplify overlapping decorative layers, and ensure text remains dominant.

#### Mobile Hero

Prioritize:

- immediate message clarity
- strong CTA visibility
- stable composition
- lighter visual complexity
- reduced layout overlap risk

Hero-specific decision rules:

- If an absolute-positioned decorative element risks overlap, simplify or remove it on smaller screens rather than forcing it to fit.
- If the 3D scene degrades mobile performance or clarity, use a lighter fallback strategy for mobile rather than insisting on visual parity.
- If full viewport height produces awkward mobile chrome behavior, use a more stable viewport-height strategy.

Primary files:

- `src/components/Hero.jsx`
- `src/components/Hero.css`
- `src/components/HeroOrbitScene.jsx`
- `src/components/HeroOrbitScene.css`

Done criteria:

- the headline and CTA are dominant on mobile
- no decorative element compromises readability
- the hero still feels premium at every size
- mobile performance is materially better where needed

---

### Phase 4. Rebuild The Intake Flow Around Mobile Reality

Objective:

Make the intake experience smooth and conversion-friendly on phones.

Method:

- Rework the overlay so it can scroll appropriately on shorter screens.
- Avoid vertical centering when it makes form steps fragile.
- Ensure the close button remains accessible.
- Let option groups wrap naturally when screen width is limited.
- Rework any horizontal button clusters that become cramped.
- Ensure summary rows can stack when space is tight.
- Test every step with the keyboard open.
- Treat the intake flow like a product flow, not a modal decoration.

Primary files:

- `src/components/Intake.jsx`
- `src/components/Intake.css`

Priority reasoning:

This is the main conversion flow. If it is frustrating on mobile, responsiveness improvements elsewhere will not fully matter.

Done criteria:

- every step is reachable and readable on short screens
- no control cluster becomes too dense to tap comfortably
- final confirmation content can reflow without truncation

---

### Phase 5. Tune Content Density Section By Section

Objective:

Adjust multi-column behavior so sections feel deliberate rather than merely compressed.

Method:

Review each major content section and ask:

- Should this section remain one column longer?
- Should it move to two columns before three?
- Is card padding too large for mobile?
- Is card padding too tight for desktop?
- Does the reading length become uncomfortable at tablet sizes?

Highest-priority sections:

- testimonials
- about/team
- pricing
- trust section
- value proposition
- services
- call to action
- logo bar
- FAQ

Primary files:

- `src/components/Testimonials.css`
- `src/components/About.css`
- `src/components/Pricing.css`
- `src/components/TrustSection.css`
- `src/components/ValueProposition.css`
- `src/components/ConsultingUseCases.css`
- `src/components/CallToAction.css`
- `src/components/LogoBar.css`
- `src/components/FAQ.css`

Done criteria:

- tablet layouts no longer feel crowded
- 3-column layouts only appear where content can support them
- section rhythm feels intentional across viewports

---

### Phase 6. Remove Overflow, Clipping, And Fragile Assumptions

Objective:

Eliminate responsive bugs caused by hard-coded height assumptions, no-wrap labels, and rigid layouts.

Method:

- Replace fixed-height reveal assumptions in expandable content with content-driven logic.
- Audit no-wrap usage and only keep it where genuinely necessary.
- Review badges, decorative chips, and labels that may collide with narrower widths.
- Review any fixed minimum widths that can force layout stress.

Primary files:

- `src/components/FAQ.css`
- `src/components/Pricing.css`
- `src/components/LogoBar.css`
- `src/components/Hero.css`

Done criteria:

- no content is clipped because of arbitrary height caps
- labels wrap gracefully when needed
- decorative elements do not create responsive bugs

---

### Phase 7. Improve Perceived Responsiveness Through Performance

Objective:

Make the site feel faster and lighter, especially above the fold on mobile.

Method:

- Reevaluate the hero loading strategy.
- Reduce the amount of heavy code that must matter immediately on mobile.
- Consider whether the 3D experience should be gated by screen size, motion preference, or capability context.
- Ensure the fallback visual is good enough to stand on its own.
- Resolve the missing display font asset issue so typography behavior is predictable.
- Review asset usage and any unnecessary payloads that affect first impression quality.

Primary files:

- `src/components/Hero.jsx`
- `src/components/HeroOrbitScene.jsx`
- `src/index.css`

Performance principle:

Perceived responsiveness is part of the design.

A premium site should not only look polished. It should feel composed and immediate.

Done criteria:

- mobile users are not paying the full cost of a desktop-grade visual treatment unless it truly benefits them
- above-the-fold experience feels faster and more stable
- font behavior is reliable

---

### Phase 8. Accessibility And Touch Optimization

Objective:

Ensure the responsive redesign is truly usable, not just visually correct.

Method:

- Verify tap target sizes for buttons, controls, and navigation.
- Ensure hover-only affordances are not required for understanding.
- Verify focus states remain visible.
- Respect reduced motion where meaningful.
- Ensure reading line lengths are comfortable at each breakpoint.
- Ensure overlays and interactive panels remain keyboard accessible.

Done criteria:

- mobile touch use feels comfortable
- keyboard and focus behavior remain intact
- motion and interaction choices do not exclude users

---

### Phase 9. QA, Regression Control, And Sign-Off

Objective:

Prevent the responsiveness work from becoming a one-time cleanup that regresses later.

Method:

- Re-test the full viewport matrix after implementation.
- Compare against the original baseline captured in Phase 0.
- Use a sign-off checklist for all major sections.
- Document any intentional device-specific behavior.
- Note future responsive debt explicitly rather than leaving it hidden.

Minimum sign-off checklist:

- header works on mobile
- hero reads clearly on mobile
- intake flow works with keyboard open
- FAQ never clips answers
- pricing cards feel balanced on tablet
- testimonials and about sections are not overcrowded on tablet
- footer wraps cleanly
- no page-level horizontal overflow exists
- reduced motion behavior is acceptable

Done criteria:

The responsive system is not just improved. It is documented and testable.

---

## Recommended Implementation Order By ROI

If work must be sequenced for maximum value, use this order:

1. responsive foundation in `src/index.css`
2. mobile navigation and app shell
3. intake flow usability
4. hero mobile/tablet strategy
5. tablet density cleanup in pricing, testimonials, about
6. overflow and clipping fixes
7. performance refinements for hero and font handling
8. full QA pass and regression checklist

This order prioritizes:

- usability first
- conversion flow next
- premium visual quality after the foundation is stable

---

## Acceptance Criteria By Major Area

### Header

- mobile navigation exists and is usable
- sticky header never feels cramped
- CTA remains accessible without overpowering the layout

### Hero

- no text overlap or decorative collision
- mobile hero remains premium but simpler
- desktop hero can remain richer
- performance cost is justified by device context

### Intake

- every step works on short screens
- content remains reachable with keyboard open
- summary layout reflows cleanly

### Section Layouts

- no overcrowded tablet grids
- reading widths remain comfortable
- card spacing scales intentionally

### Content Behavior

- no clipped FAQ answers
- no forced overflow from no-wrap labels
- no fragile absolute positioning that breaks at common widths

### Performance

- heavy hero behavior is not imposed blindly on mobile
- above-the-fold experience feels stable and immediate
- font loading does not create unnecessary layout instability

---

## Future Note: Dapper Artisan Intake

If `dapper-artisan-intake.jsx` is ever integrated into the main product, it should receive a dedicated responsive redesign pass.

Why:

- it relies heavily on inline fixed sizes
- it uses full-viewport assumptions extensively
- it includes large decorative elements positioned absolutely
- it was not built around the current site's responsive token system

Do not assume that improving the main intake flow automatically makes that file production-ready.

---

## Final Instruction To The Implementer

Approach this work like a premium product systems refinement project.

Do not begin by changing isolated breakpoints.

Begin by understanding the responsive system the site should have, then make each major area conform to that system in a deliberate order:

1. establish the responsive foundation
2. fix the shell
3. fix the conversion flow
4. redefine the hero by device context
5. tune section density
6. eliminate fragile layout assumptions
7. improve perceived responsiveness through performance
8. verify everything through a structured QA matrix

The final result should make Sofbld feel more intentional, more trustworthy, and more premium on every screen size, not just more technically "mobile-friendly."
