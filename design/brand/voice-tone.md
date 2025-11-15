# Voice & Tone Guide

## Core Voice Characteristics

The voice is distinctly **genuine, technical, and pragmatic** - shaped by 15+ years of shipping real ML systems. It's the voice of someone who has solved real problems and learned hard lessons, sharing that experience without pretension or hype.

**Key attributes:**
- **Dry but not cynical** - Honest and direct without being negative or jaded
- **Technical but accessible** - Depth available for those who want it, big picture for everyone
- **Earnest and genuine** - No performative enthusiasm, just authentic interest and curiosity
- **Constructive realism** - Discusses challenges and pitfalls without being a "hater"

## Writing Style

### Formality Level
**Conversational Professional** - Not corporate-speak, but not overly casual either. Like talking with a knowledgeable colleague over coffee.

### Technical Depth
**Layered Accessibility** - Start with the big picture that anyone can understand, then provide technical depth for those who want to dig deeper. Never assume the reader wants to stay at surface level, but never trap them in jargon without context.

### Content Length
**As long as it needs to be** - Concise when possible, detailed when valuable. Avoid both fluff and unnecessary brevity. Respect the reader's time while providing substance.

### Perspective
**First person when relevant** - This is a personal site. Use "I" when discussing your work, experience, and perspective. Use "we" when discussing collaborative work. Use "you" when addressing the reader directly.

## Tone Spectrum

The tone adapts to context while maintaining the core voice:

| Context | Tone | Example |
|---------|------|---------|
| Homepage / About | Welcoming, straightforward | "I'm an AI/ML engineer who's been building production systems since before it was cool." |
| Project Showcases | Technical, enthusiastic about the problem | "The challenge was combining Kalman filtering with real-time telemetry processing while keeping power consumption under 500mW." |
| Technical Deep Dives | Detailed, educational, honest | "This approach has trade-offs. You gain real-time performance but sacrifice some accuracy during rapid state transitions." |
| Discussing Challenges | Constructive, realistic, not complaining | "The biggest lesson was that model accuracy matters less than deployment reliability when you're shipping to production." |
| Personal Interests | Playful, curious, genuine | "When I'm not training models, you'll find me..." |
| Error Messages | Helpful, direct, not apologetic | "That page doesn't exist. Try the home page or check the URL." |

## Do's and Don'ts

### ✅ Do:

- **Start with the big picture** - "This project used ML to predict water leaks in residential homes."
- **Then add technical depth** - "We applied statistical modeling to detect anomalies in consumption patterns, using a custom algorithm optimized for sparse time-series data."
- **Be specific about experience** - "15+ years" not "extensive experience"
- **Discuss trade-offs honestly** - "This approach works well for X but struggles with Y"
- **Show enthusiasm through curiosity** - "The interesting question was whether..."
- **Use concrete examples** - "Across thousands of deployed devices" not "at scale"
- **Acknowledge complexity** - "This wasn't straightforward" or "The challenge was..."
- **Write like a human** - Occasional sentence fragments. Sometimes short sentences. It's okay.

### ❌ Don't:

- **Don't use hype language** - Avoid "revolutionary," "game-changing," "disruptive," "cutting-edge" (unless being ironic)
- **Don't hide behind jargon** - If you use a technical term, explain why it matters
- **Don't be performatively humble** - "I had the privilege..." ← No. Just describe what you did.
- **Don't be performatively enthusiastic** - "Super excited to share..." ← No. Just share it.
- **Don't apologize unnecessarily** - "Sorry, but..." or "Unfortunately..." (unless actually apologizing)
- **Don't oversell** - Let the work speak for itself
- **Don't disparage others** - You can discuss pitfalls without attacking people or technologies
- **Don't use corporate speak** - "Leverage," "synergy," "ideate," etc.

## Content Patterns

### Introducing Technical Concepts

**Pattern:** Context → Concept → Why It Matters

❌ **Bad:** "We implemented a Kalman filter for state estimation."

✅ **Good:** "Water meters need to measure flow in real-time, even when the signal is noisy. We used a Kalman filter to estimate the true flow rate by combining multiple measurements over time. This gave us accurate readings even in challenging conditions like air bubbles or turbulent flow."

❌ **Bad:** "We used RAG for the chatbot."

✅ **Good:** "The client's product documentation was spread across hundreds of pages. Users couldn't find answers quickly, leading to support tickets. We implemented Retrieval-Augmented Generation (RAG) to let users ask questions naturally while the system searched relevant documentation and synthesized answers. This reduced support volume by 40% while maintaining accuracy."

### Discussing Projects

**Pattern:** Problem → Approach → Result → Lessons

❌ **Bad:** "I built a RAG chatbot using LangChain and deployed it to AWS Lambda."

✅ **Good:** "A client needed to answer customer questions about their product catalog without hiring a support team. We built a RAG-based chatbot that could query their documentation and respond conversationally. The system handled 10K+ queries per month with 90% satisfaction ratings. The biggest lesson: prompt engineering mattered more than model size for this use case."

### Sharing Opinions

**Pattern:** Observation → Reasoning → Nuanced Conclusion

❌ **Bad:** "AI hype is out of control and most of it is garbage."

✅ **Good:** "There's a lot of excitement about AI right now, but much of it focuses on capabilities rather than real-world applications. After 15+ years building ML systems, I've learned that the hard part isn't the model—it's the data pipelines, deployment infrastructure, and understanding when ML is actually the right tool for the job."

### Personal / Interest Content

**Pattern:** Genuine curiosity, no forced connection to work

❌ **Bad:** "My hiking hobby teaches me important lessons about persistence that I apply to ML engineering."

✅ **Good:** "When I'm not debugging ML pipelines, you'll find me on trails around Minneapolis. There's something clarifying about getting away from screens for a few hours."

## Voice Examples

### Homepage Introduction

> I'm Andrew Aarestad, an AI/ML engineer who's been building production systems for over 15 years—since before machine learning was a household term.
>
> I work at the intersection of research and product, building everything from firmware-level signal processing to cloud-scale ML pipelines. I've co-founded companies, shipped dozens of products, and learned that the interesting problems are rarely about the models themselves.

### Project Showcase Introduction

**Example 1: IoT + Signal Processing**
> FLUID Water Meter combined IoT hardware, real-time signal processing, and machine learning to detect water leaks in homes before they became expensive disasters.
>
> As co-founder and CTO, I led the development of ultrasonic flow measurement algorithms, built ML models for anomaly detection, and designed the cloud infrastructure to process telemetry from thousands of devices.

**Example 2: Generative AI + Architecture**
> Building a personalized eCommerce platform meant solving for real-time recommendations, dynamic pricing, and content moderation—all while handling marketplace transactions and subscriptions at scale.
>
> I architected the ML pipeline integrating recommendation models with user behavior tracking, deployed generative AI for automated content moderation, and designed the serverless infrastructure to handle traffic spikes during product launches.

### Technical Explanation

**Example 1: Signal Processing**
> The challenge was measuring flow accurately with ultrasonic sensors, which are sensitive to environmental factors like temperature, air bubbles, and installation angles.
>
> We used Kalman filtering to combine multiple sensor readings over time, building a state estimation model that could predict the true flow rate even when individual measurements were noisy. The algorithm ran on embedded hardware with strict power constraints, so we optimized for computational efficiency without sacrificing accuracy.

**Example 2: ML Architecture**
> Personalization at scale requires balancing model latency with recommendation quality. Users expect sub-200ms response times, but running deep learning models for each request would blow our infrastructure budget.
>
> We implemented a two-tier architecture: lightweight collaborative filtering for real-time responses, with a background job processing deep learning models to update user embeddings overnight. This gave us 95% of the recommendation quality at 10% of the infrastructure cost.

### Honest Reflection

> Looking back, the hardest part wasn't the algorithms—it was building reliable infrastructure for OTA firmware updates across devices in the field. No amount of clever ML matters if you can't deploy fixes when something breaks.

## Adapting Tone for Different Audiences

### For Hiring Managers
- Be specific about experience (years, scale, outcomes)
- Show breadth across domains (signal processing, generative AI, personalization, architecture)
- Demonstrate communication skills through clear explanations
- Balance technical depth with business/product thinking

### For Technical Decision-Makers (Clients)
- Lead with business impact, provide technical depth as support
- Be direct about capabilities and limitations
- Show strategic thinking alongside technical expertise

### For Industry Peers
- Get into implementation details
- Discuss trade-offs and lessons learned
- Share knowledge openly, assume technical context

### For General Audiences
- Start with relatable problems
- Explain technical concepts in plain language
- Show enthusiasm through clear explanations, not exclamation points

## Writing Checklist

Before publishing any content, ask:

- [ ] Did I start with the big picture before diving into details?
- [ ] Did I explain technical terms in context, not just use them?
- [ ] Did I discuss trade-offs and challenges honestly?
- [ ] Does this sound like a real person, not a marketing department?
- [ ] Did I show rather than tell? (Concrete examples > Abstract claims)
- [ ] Did I avoid hype language and corporate speak?
- [ ] Is the tone appropriate for the context and audience?
- [ ] Would I actually say this out loud to someone?

---

**Remember:** The goal is to sound like yourself—knowledgeable, genuine, pragmatic, and willing to engage with both the technical details and the bigger picture. Trust that authenticity is more compelling than performance.
