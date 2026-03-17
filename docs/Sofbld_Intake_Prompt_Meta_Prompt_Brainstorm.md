# Sofbld Intake Prompt Meta Prompt Brainstorm

## Purpose

This document captures ideas for improving Sofbld's two intake-response prompts:

- Architecture / Implementation Plan
- Pricing / Time Estimation

The goal is not just to make the prompts longer. The goal is to make them more reliable, more aligned with Sofbld's premium positioning, and more useful as internal decision-support artifacts.

These prompts should feel less like generic AI writing prompts and more like strong internal operating instructions for how SoundBuild interprets an early-stage lead.

---

## High-Level Direction

The current prompts are already clear and structured, but they are still a bit too request-shaped.

They tell the model what sections to output, but they do not fully define:

- who the audience is
- how to handle incomplete or ambiguous briefs
- how much inference is appropriate
- how to distinguish fact from assumption
- how to calibrate complexity to project size
- how to protect Sofbld's premium brand posture

The biggest improvement is to shift from:

> "Write a plan" or "Write a pricing estimate"

to:

> "Interpret this intake form like an experienced SoundBuild operator and produce a practical, credible, decision-ready document."

---

## What Should Improve

### 1. Stronger Audience Definition

Right now the model knows its role, but not clearly enough who the document is for.

That matters because the outputs may be used for:

- internal opportunity evaluation
- client follow-up
- rough sales qualification
- delivery planning

The architecture plan and pricing estimate should not necessarily sound identical.

The implementation plan can feel more like a practical scoping memo.

The pricing estimate should feel commercially aware, realistic, and client-safe.

### 2. Better Handling of Ambiguity

Most intake forms are incomplete.

The prompts should explicitly tell the model to:

- assume the brief is underspecified by default
- make reasonable inferences where helpful
- clearly label assumptions
- avoid pretending certainty where none exists

This will improve credibility and reduce fabricated specificity.

### 3. Alignment With Sofbld Positioning

The prompts should reinforce the brand posture already established elsewhere:

- premium custom software
- serious business use cases
- structured, disciplined execution
- practical AI where relevant
- high-trust communication
- outcomes over fluff

This helps prevent the model from drifting into generic agency-speak or bargain-freelancer language.

### 4. Complexity Calibration

The prompts should instruct the model not to over-engineer.

For example:

- do not recommend mobile unless the brief suggests it
- do not recommend AI unless it serves the actual use case
- do not force microservices or advanced infrastructure into simple MVPs
- do not imply enterprise architecture for a lightweight internal tool

The plan should match the likely scale and risk of the project.

### 5. Separation of Facts, Assumptions, and Recommendations

A major quality improvement would be to require the model to separate:

- confirmed client inputs
- assumptions
- recommendations

That makes the output feel more senior and easier to review internally.

### 6. More Useful Delivery Logic

The model should be asked to think operationally, not just narratively.

For example:

- what kind of engagement shape makes sense
- whether discovery should come first
- whether the project should be phased
- where the main cost drivers come from
- what open questions materially affect scope

### 7. Stronger Anti-Fluff Rules

"No filler" is helpful, but a stronger instruction would be:

- avoid generic statements unless tied to a concrete recommendation, risk, or decision
- explain why a stack or delivery approach fits the brief
- avoid broad claims that could apply to any software project

---

## Recommended Meta Prompt Structure

Instead of treating each prompt like a simple content-generation request, it would be stronger to use a shared meta prompt structure.

### Suggested Structure

#### Identity

Who the model is inside Sofbld.

Example:

- senior software architect
- senior delivery manager
- experienced custom software consultant

#### Objective

What the document is meant to accomplish.

Example:

- convert a raw intake form into a practical implementation plan
- convert an early-stage brief into a realistic, uncertainty-aware estimate

#### Audience

Who will read this.

Example:

- internal team
- client-facing follow-up
- hybrid internal/external audience

#### Inputs

What source material the model may use.

Example:

- the client brief only
- reasonable industry inference
- no invented business context beyond what can be responsibly inferred

#### Interpretation Rules

How to reason from an incomplete brief.

Example:

- infer carefully
- label assumptions
- do not fake certainty
- identify missing inputs that materially affect scope or price

#### Quality Bar

What good looks like.

Example:

- precise
- commercially aware
- technically credible
- premium in tone
- practical rather than performative

#### Output Contract

Exactly what sections to include and how to format them.

#### Guardrails

What not to do.

Example:

- no code fences
- no vague filler
- no over-engineering
- no forced AI recommendations
- no generic stack defaults without rationale

---

## Architecture Prompt: Better Meta Prompt Direction

The architecture prompt should do more than produce a tidy markdown plan.

It should behave like a senior scoping and systems-thinking artifact.

### Core Shift

Move from:

> write a detailed implementation plan

to:

> interpret this intake like a senior architect, identify what is known, surface what is assumed, recommend the simplest credible technical approach, and organize delivery into realistic phases

### What This Prompt Should Explicitly Instruct

- Treat the intake as incomplete by default.
- Use only the provided brief plus reasonable inference.
- Clearly distinguish confirmed facts from assumptions.
- Recommend the least-complex architecture that fits the likely need.
- Avoid introducing AI, mobile, microservices, or advanced infrastructure unless justified by the brief.
- If the project appears MVP-like, optimize for speed, validation, maintainability, and future extensibility.
- If the project appears business-critical, data-sensitive, or integration-heavy, address the controls that matter.
- Include relevant considerations such as user roles, integrations, admin needs, analytics, QA, deployment, observability, and support where appropriate.
- Name open discovery questions that would materially change architecture or delivery.

### Suggested Sections

- Project Overview
- Confirmed Requirements
- Key Assumptions
- Recommended Technical Architecture
- Core Features and System Components
- Implementation Phases
- Key Risks and Mitigations
- Discovery Questions
- Recommended Next Steps

### Why This Is Better

This structure makes the output:

- more reviewable internally
- more honest about ambiguity
- more useful as a scoping tool
- less likely to produce polished but shallow architecture language

---

## Pricing Prompt: Better Meta Prompt Direction

The pricing prompt should feel less like a quick quote and more like an experienced delivery estimate.

It should acknowledge uncertainty while still being decisively helpful.

### Core Shift

Move from:

> write a pricing estimate

to:

> interpret the likely scope, estimate it in a commercially realistic way, explain the logic behind the estimate, and highlight where scope, timeline, and budget may be misaligned

### What This Prompt Should Explicitly Instruct

- Treat the intake as an early-stage lead, not a fully scoped project.
- Estimate using reasonable assumptions and state them clearly.
- Avoid false precision.
- Use ranges where uncertainty is meaningful.
- Base pricing on delivery phases, not just a lump-sum guess.
- Let the scope implied by the brief drive the estimate.
- If the budget seems too low, say so diplomatically and explain why.
- If the opportunity would be better framed as a strategy sprint, phased MVP, or narrower engagement, say that explicitly.
- Maintain a premium, confident, practical tone.

### Suggested Sections

- Pricing Estimate for {name} — {company}
- Engagement Summary
- Scope Interpretation
- Assumptions Affecting Estimate
- Phase-by-Phase Cost Breakdown
- Total Estimate Range
- Recommended Engagement Shape
- What's Included
- What's Not Yet Included
- Notes and Assumptions
- Budget Fit Commentary
- Recommended Next Step

### Why This Is Better

This makes the estimate:

- more transparent
- more commercially useful
- less likely to sound arbitrary
- more aligned with Sofbld's flexible engagement model

It also creates space for the model to recommend:

- a discovery sprint
- a smaller MVP
- a staged rollout
- a more focused initial engagement

instead of forcing every opportunity into a full build estimate.

---

## Shared Prompt Enhancements

There are several improvements that should likely apply to both prompts.

### 1. Instruct the Model Not to Oversell

The outputs should feel consultative, not theatrical.

They should sound like an experienced operator, not exaggerated sales copy.

### 2. Require Budget Realism

If the stated budget conflicts with the apparent scope, the model should say so clearly but diplomatically.

This is especially important for maintaining credibility.

### 3. Encourage Phased Thinking

Many opportunities will be better framed as:

- discovery first
- MVP first
- phased implementation
- focused sprint before larger commitment

The prompts should explicitly allow and encourage that.

### 4. Use Confidence-Sensitive Specificity

The model should be concrete where justified and cautious where information is missing.

This is a strong signal of seniority.

### 5. Avoid Default Stack Reflexes

The model should not fall back on a generic "React, Node, AWS" pattern without explaining why that stack fits the use case.

The recommendation should be context-driven.

### 6. Tie Recommendations to Business Outcomes

Each major recommendation should connect back to something meaningful, such as:

- faster validation
- lower operational risk
- better maintainability
- easier scaling path
- reduced delivery complexity
- better budget alignment

---

## Stronger Shared Prompt Language

One useful direction would be to give both prompts a shared instruction set like this in spirit:

- Interpret the intake like a senior SoundBuild operator.
- Use the client brief as the primary source of truth.
- Make reasonable inferences, but clearly label assumptions.
- Do not imply certainty where information is missing.
- Recommend the simplest credible path that aligns with the likely business need.
- Keep the tone premium, practical, and commercially aware.
- Avoid generic statements unless tied to a specific recommendation or risk.

That shared layer would help the outputs feel more consistent across both models.

---

## A More Strategic Framing

Instead of thinking about these as two separate prompts, it may be better to think of them as two views of the same interpretation layer.

### Shared Interpretation Layer

First, the AI forms a clear internal understanding of:

- what the client likely needs
- what is known
- what is assumed
- what delivery shape makes sense
- what risks or unknowns matter most

### Then Two Output Lenses

From that same interpretation:

- one prompt expresses the opportunity as architecture and implementation logic
- the other expresses it as pricing and engagement logic

This would likely improve consistency between the plan and the estimate.

For example:

- the phases would align better
- the scope assumptions would match
- the pricing would better reflect the proposed delivery path
- the tone would feel more coherent

---

## Practical Meta Prompt Ingredients

If these prompts are rewritten in a stronger meta prompt format, the most important ingredients are likely:

- role clarity
- audience clarity
- ambiguity-handling rules
- assumption labeling
- complexity calibration
- premium tone guardrails
- anti-fluff rules
- phase-aware delivery thinking
- budget realism
- explicit output structure

These elements matter more than simply expanding the wording.

---

## Recommended Next Iteration

The next refinement step would be to turn these ideas into:

1. a polished meta prompt for the architecture model
2. a polished meta prompt for the pricing model
3. optionally, a shared interpretation wrapper that standardizes how both prompts reason from the intake brief

That would make the system more deliberate, more consistent, and more aligned with Sofbld's positioning.
