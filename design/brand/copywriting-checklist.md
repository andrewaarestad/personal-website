# Copywriting Quick Reference Checklist

A quick reference for AI agents to use while writing content. Keep this open alongside your work for constant voice and quality checks.

## Before You Start

- [ ] Read `design/brand/guidelines.md`
- [ ] Read `design/brand/voice-tone.md`
- [ ] Review 3 similar existing content pieces
- [ ] Understand target audience and content goals
- [ ] Research topic thoroughly (web + codebase if applicable)
- [ ] Create story outline
- [ ] Create writing plan
- [ ] **GET USER APPROVAL** before writing

## Core Voice Characteristics

**Remember: We are...**

- ✅ Dry but not cynical
- ✅ Technical but accessible
- ✅ Earnest and genuine
- ✅ Constructively realistic

**We are NOT...**

- ❌ Performatively enthusiastic
- ❌ Hiding behind jargon
- ❌ Using corporate speak
- ❌ Disparaging others

## Quick Do's and Don'ts

### ✅ DO:

- **Start with the big picture** before diving into technical details
- **Use specific numbers**: "15+ years," "5,000 devices," "73% reduction"
- **Explain technical terms in context**: "We used Kalman filtering to... This gave us..."
- **Discuss trade-offs honestly**: "This approach works well for X but struggles with Y"
- **Show enthusiasm through curiosity**: "The interesting question was whether..."
- **Use concrete examples**: Real implementations, not just theory
- **Acknowledge complexity**: "This wasn't straightforward" or "The challenge was..."
- **Write like a human**: Occasional fragments. Short sentences. It's okay.
- **Use first person when relevant**: "I built..." "I've learned..."

### ❌ DON'T:

- **No hype language**: Revolutionary, game-changing, disruptive, cutting-edge (unless ironic)
- **No jargon without context**: Don't just use technical terms, explain why they matter
- **No performative humility**: "I had the privilege..." ← No. Just describe what you did.
- **No performative enthusiasm**: "Super excited to share..." ← No. Just share it.
- **No unnecessary apologies**: "Sorry, but..." "Unfortunately..." (unless actually apologizing)
- **No overselling**: Let the work speak for itself
- **No disparaging**: Discuss pitfalls without attacking people or technologies
- **No corporate speak**: Leverage, synergy, ideate, utilize, etc.
- **No vague scale language**: "At scale," "extensively," "significantly"

## Content Patterns to Follow

### Introducing Technical Concepts

**Pattern:** Context → Concept → Why It Matters

❌ **Bad:** "We implemented a Kalman filter for state estimation."

✅ **Good:** "Water meters need to measure flow in real-time, even when the signal is noisy. We used a Kalman filter to estimate the true flow rate by combining multiple measurements over time. This gave us accurate readings even in challenging conditions like air bubbles or turbulent flow."

### Discussing Projects

**Pattern:** Problem → Approach → Result → Lessons

❌ **Bad:** "I built a RAG chatbot using LangChain and deployed it to AWS Lambda."

✅ **Good:** "A client needed to answer customer questions about their product catalog without hiring a support team. We built a RAG-based chatbot that could query their documentation and respond conversationally. The system handled 10K+ queries per month with 90% satisfaction ratings. The biggest lesson: prompt engineering mattered more than model size for this use case."

### Sharing Opinions

**Pattern:** Observation → Reasoning → Nuanced Conclusion

❌ **Bad:** "AI hype is out of control and most of it is garbage."

✅ **Good:** "There's a lot of excitement about AI right now, but much of it focuses on capabilities rather than real-world applications. After 15+ years building ML systems, I've learned that the hard part isn't the model—it's the data pipelines, deployment infrastructure, and understanding when ML is actually the right tool for the job."

## PostLayout Component Selection

**Available Components:**

1. **H1Section** - Main title (use once)
2. **H2Section** - Major section headings
3. **TextSection** - Body paragraphs
4. **ImageSection** - Full-width standalone images
5. **TextImageSection** - Text + image side-by-side
6. **DataVisualizationSection** - Charts, graphs, widgets

**Selection Tips:**

- Start every page with H1Section
- Use H2Section to break up major topics
- Balance text-heavy sections with visuals
- TextImageSection great for pairing explanations with diagrams
- Use DataVisualizationSection for interactive elements
- Reference `apps/website/src/app/projects/sample-post/page.tsx` for complete example

## Tone Spectrum (Context-Specific)

| Context               | Tone                                      | Example                                                                                                                         |
| --------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Homepage / About      | Welcoming, straightforward                | "I'm an AI/ML engineer who's been building production systems since before it was cool."                                        |
| Project Showcases     | Technical, enthusiastic about the problem | "The challenge was combining Kalman filtering with real-time telemetry processing while keeping power consumption under 500mW." |
| Technical Deep Dives  | Detailed, educational, honest             | "This approach has trade-offs. You gain real-time performance but sacrifice some accuracy during rapid state transitions."      |
| Discussing Challenges | Constructive, realistic, not complaining  | "The biggest lesson was that model accuracy matters less than deployment reliability when you're shipping to production."       |
| Personal Interests    | Playful, curious, genuine                 | "When I'm not training models, you'll find me..."                                                                               |

## Writing Quality Checklist

Before submitting ANY content, verify:

**Content:**

- [ ] Did I start with the big picture before diving into details?
- [ ] Did I explain technical terms in context, not just use them?
- [ ] Did I discuss trade-offs and challenges honestly?
- [ ] Does this sound like a real person, not a marketing department?
- [ ] Did I show rather than tell? (Concrete examples > Abstract claims)
- [ ] Did I avoid hype language and corporate speak?
- [ ] Is the tone appropriate for the context and audience?
- [ ] Would I actually say this out loud to someone?

**Voice:**

- [ ] Is the writing dry but not cynical?
- [ ] Is it technical but still accessible?
- [ ] Does it show genuine curiosity (not performative enthusiasm)?
- [ ] Are challenges discussed constructively (not negatively)?

**Structure:**

- [ ] Follows approved outline
- [ ] PostLayout components used correctly
- [ ] Logical narrative flow
- [ ] Appropriate technical depth for audience

**Technical:**

- [ ] All sections have unique keys
- [ ] Metadata is SEO-optimized
- [ ] Images have descriptive alt text
- [ ] TypeScript compiles without errors
- [ ] No broken imports

**Accessibility:**

- [ ] Alt text describes images meaningfully
- [ ] Heading hierarchy is logical (H1 → H2, not skipping)
- [ ] Text has sufficient contrast
- [ ] Links have descriptive text (not "click here")

## Common Mistakes to Avoid

### Mistake 1: Starting Too Technical

**Wrong:** "The autoencoder dimensionality reduction pipeline..."
**Right:** "Modern systems generate massive telemetry data. We used autoencoders to reduce dimensionality, making it practical to detect anomalies in real-time."

### Mistake 2: Vague Impact Claims

**Wrong:** "This significantly improved performance at scale."
**Right:** "This reduced latency by 73% across 5,000 deployed devices."

### Mistake 3: Performative Voice

**Wrong:** "I'm super excited to share this revolutionary approach!"
**Right:** "This approach solved a real problem we faced in production."

### Mistake 4: Jargon Without Context

**Wrong:** "We implemented SHAP for model explainability."
**Right:** "Engineers needed to understand why alerts fired. We added SHAP values to show which metrics contributed most to each detection."

### Mistake 5: Hiding Challenges

**Wrong:** "The project was a complete success."
**Right:** "The project achieved its goals, though model explainability proved more challenging than expected. We addressed this by adding SHAP values in v2."

## Target Audiences (Tailor Accordingly)

### For Hiring Managers:

- Be specific about experience (years, scale, outcomes)
- Show breadth across domains
- Demonstrate communication skills through clear explanations
- Balance technical depth with business/product thinking

### For Technical Decision-Makers (Clients):

- Lead with business impact, provide technical depth as support
- Be direct about capabilities and limitations
- Show strategic thinking alongside technical expertise

### For Industry Peers:

- Get into implementation details
- Discuss trade-offs and lessons learned
- Share knowledge openly, assume technical context

### For General Audiences:

- Start with relatable problems
- Explain technical concepts in plain language
- Show enthusiasm through clear explanations, not exclamation points

## Emergency Reference

**If you're stuck, ask yourself:**

1. **Am I starting with why this matters** before explaining how it works?
2. **Am I using a concrete example** instead of abstract description?
3. **Am I being specific** with numbers and details?
4. **Would I say this out loud** to a colleague over coffee?
5. **Am I explaining the trade-off** or challenge honestly?

**If the answer to any is "no," revise that section.**

## Quick Pattern Reference

**Technical Explanation:**

```
[Context: Why we needed this] →
[Concept: What we did] →
[Why It Matters: Impact/benefit]
```

**Project Description:**

```
[Problem: What needed solving] →
[Approach: How we solved it] →
[Result: What happened] →
[Lessons: What we learned]
```

**Opinion/Perspective:**

```
[Observation: What you've noticed] →
[Reasoning: Why this is the case] →
[Nuanced Conclusion: Balanced takeaway]
```

---

**When in doubt:** Reference `design/brand/voice-tone.md` for detailed examples and patterns.

**For complete workflow:** See `docs/copywriting-workflow.md`

**This is your constant companion during writing. Use it liberally.**
