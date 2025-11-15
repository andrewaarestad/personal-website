# Copywriting & Page Creation Workflow

This document outlines the comprehensive workflow for creating stories, project pages, and long-form content for this personal website. It's designed to guide AI agents through a structured, quality-focused process that maintains brand consistency and produces engaging, technically accurate content.

## Philosophy

Just as we follow a **design-first workflow** for visual elements, we follow a **content-first workflow** for copywriting. Before writing a single word of production content, we:

1. **Ground ourselves in brand guidelines** - Who we are, who we serve
2. **Research thoroughly** - Gather context, examples, technical details
3. **Plan strategically** - Outline structure, plan tone and style
4. **Seek approval** - Get user feedback before implementation
5. **Execute with quality** - Write, implement, and verify

This ensures every piece of content aligns with our brand voice, serves our audience, and demonstrates the technical depth and genuine curiosity that defines this site.

## The Six-Phase Copywriting Process

```
┌─────────────────────┐
│ 1. Preparation &    │
│    Context Gathering│
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ 2. Topic Research   │
│    (Web + Codebase) │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ 3. Story Outline    │
│    Creation         │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ 4. Writing Plan     │
│    Development      │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ 5. USER APPROVAL    │
│    ⚠️  CHECKPOINT   │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│ 6. Implementation   │
│    & Quality Check  │
└─────────────────────┘
```

---

## Phase 1: Preparation & Context Gathering

### Purpose
Ground yourself in the brand, understand the voice, and familiarize yourself with existing content before starting any new piece.

### Agent Instructions

#### Step 1.1: Review Brand Guidelines

**Required Reading:**
- `/design/brand/guidelines.md` - Brand mission, values, personality, positioning
- `/design/brand/voice-tone.md` - Writing style, tone spectrum, do's and don'ts
- `/design/brand/persona.md` - Target audience definitions (if completed)

**What to Look For:**
- **Mission & Values**: What does this site stand for? What are we trying to communicate?
- **Brand Personality**: What adjectives describe the voice? (Technical, Whimsical, Genuine, Pragmatic)
- **Key Messages**: What should readers take away?
- **Voice Characteristics**: Dry but not cynical, technical but accessible, earnest not performative
- **Do's and Don'ts**: Specific patterns to follow and avoid

#### Step 1.2: Review Top 3 Existing Content Pieces

**Find Similar Content:**
Look in `apps/website/src/app/` for existing pages similar to what you'll create:

**Project Pages:**
- `apps/website/src/app/projects/fluid-water-meter/page.tsx` - Full project showcase (traditional layout)
- `apps/website/src/app/projects/sample-post/page.tsx` - PostLayout system demo (comprehensive)
- `apps/website/src/app/projects/ambient-temperature-estimation/page.tsx` - Coming soon stub

**Other Content Types:**
- Homepage: `apps/website/src/app/page.tsx`
- Design process: `apps/website/src/app/design-process/page.tsx`
- Projects listing: `apps/website/src/app/projects/page.tsx`

**What to Analyze:**
- **Structure**: How are pages organized? What's the narrative flow?
- **Voice**: How does the writing sound? What tone is used?
- **Technical Depth**: How is complexity layered? Big picture → details?
- **Component Usage**: Which PostLayout sections are used? In what sequence?
- **Metadata**: How are titles and descriptions crafted?

#### Step 1.3: Understand the PostLayout Component System

**Review Available Components:**

**File:** `apps/website/src/components/post-layout/types.ts`

**6 Core Section Types:**

1. **H1Section** - Main page title with brand accent line
2. **H2Section** - Section headings for major content divisions
3. **TextSection** - Body text with prose styling
4. **ImageSection** - Full-width responsive images
5. **TextImageSection** - Combined text and image (left or right layout)
6. **DataVisualizationSection** - Container for charts, graphs, interactive widgets

**Best Reference:** `apps/website/src/app/projects/sample-post/page.tsx` shows all 6 section types in action with a complete narrative structure.

#### Step 1.4: Understand Content Goals

**Ask the User:**
- What type of content is this? (Project showcase, thought leadership, tutorial, etc.)
- Who is the primary audience? (Hiring managers, technical peers, general audience)
- What's the key message or takeaway?
- What technical depth is appropriate?
- Are there any specific media assets available? (Images, data, charts)
- Any constraints? (Length, timeline, special requirements)

**Document Answers** for reference throughout the process.

---

## Phase 2: Topic Research

### Purpose
Gather comprehensive information about the topic, focusing on aspects relevant to the brand positioning and audience needs.

### Agent Instructions

#### Step 2.1: Define Research Scope

Based on the content type and audience, determine what you need to research:

**For Project Pages:**
- Technical details about the problem space
- Relevant technologies, algorithms, approaches
- Industry context and challenges
- Comparable solutions or approaches
- Specific metrics, outcomes, or results

**For Thought Leadership:**
- Current state of the topic in the industry
- Diverse perspectives and viewpoints
- Real-world examples and case studies
- Technical foundations and recent developments
- Alignment with brand values (pragmatic innovation, technical depth, constructive realism)

**For Tutorials/How-To:**
- Current best practices
- Common pitfalls and challenges
- Prerequisites and background knowledge needed
- Related tools, libraries, frameworks

#### Step 2.2: Conduct Web Research

**Use WebSearch tool to find:**
- Technical articles and documentation
- Industry perspectives and analysis
- Real-world examples and case studies
- Recent developments and trends
- Data, statistics, benchmarks

**Focus Areas Aligned with Brand:**
- Bridges between research and product
- Pragmatic, shipping-focused insights
- Technical depth with business context
- Honest discussion of trade-offs
- Real-world validation and results

**Research Quality Criteria:**
- **Authoritative sources**: Technical documentation, peer-reviewed research, established industry voices
- **Recent information**: Prefer current sources (last 1-2 years) unless historical context is needed
- **Diverse perspectives**: Don't rely on a single source
- **Concrete examples**: Look for real implementations, not just theory

#### Step 2.3: Create Research Notes Document

**Template Location:** See `design/examples/research-example.md` for a complete example.

**Structure Your Notes:**

```markdown
# Research Notes: [Topic Name]

**Date:** [Date]
**Content Type:** [Project page / Thought leadership / Tutorial]
**Target Audience:** [Who this is for]

## Key Questions to Answer
- [Question 1]
- [Question 2]
- [Question 3]

## Research Findings

### [Category 1: e.g., Problem Space]
- **Finding:** [What you learned]
- **Source:** [URL or reference]
- **Relevance:** [Why this matters for our content]
- **Quote/Data:** [Specific quotes or data points]

### [Category 2: e.g., Technical Approach]
...

## Alignment with Brand Values
- **Pragmatic Innovation:** [How this topic demonstrates shipping real systems]
- **Technical Depth:** [What technical details we can explore]
- **Genuine Curiosity:** [What's genuinely interesting here]
- **Constructive Realism:** [What trade-offs and challenges exist]

## Content Opportunities
- Stories or examples we could tell
- Data visualizations we could create
- Technical concepts to explain
- Lessons learned or insights to share

## Open Questions
- [What still needs clarification]
- [What the user might need to provide]
```

#### Step 2.4: Review Codebase (if applicable)

If writing about a feature or project in this codebase:
- Review relevant source code
- Check tests for usage examples
- Review documentation and comments
- Identify key technical decisions

---

## Phase 3: Story Outline Creation

### Purpose
Plan the narrative structure, content flow, and component mapping before writing.

### Agent Instructions

#### Step 3.1: Use the Story Outline Template

**Template Location:** `design/templates/story-outline-template.md`

**Fill out each section completely:**

1. **Thesis Statement** (2-3 sentences max)
   - Ultra-concise summary
   - Surfaces the primary concept or argument
   - Defines what readers will take away

2. **Target Audience & Goals**
   - Who will read this?
   - What should they gain?

3. **Narrative Structure**
   - List of major sections
   - Key points in each section
   - Logical flow from introduction → conclusion

4. **PostLayout Section Mapping**
   - Map narrative sections to PostLayout components
   - Plan the sequence of H1, H2, Text, Image, TextImage, DataVisualization sections
   - Note image placement strategy

5. **Media & Interactive Elements**
   - Images needed (descriptions, sources, placeholders)
   - Charts or data visualizations planned
   - Interactive widgets (if any)
   - **Flag future components**: If the story would benefit from components not yet built (e.g., interactive quizzes, comparison tables, code playgrounds), document them here

6. **Technical Depth Plan**
   - Where will we go deep technically?
   - Where will we stay high-level?
   - How will we layer complexity?

#### Step 3.2: Example Outline Structure

For a project page about an ML anomaly detection system:

```markdown
## Thesis Statement
This project demonstrates how combining unsupervised learning with domain expertise can dramatically improve operational reliability. We reduced false positives by 82% while catching critical issues hours earlier than traditional threshold-based alerts.

## Narrative Structure

1. **Title & Introduction** (H1 + Text)
   - Project name and one-sentence description
   - Big picture: what problem this solves

2. **The Challenge** (H2 + Text + Image)
   - Problem statement: alert fatigue and missed anomalies
   - Context: distributed systems generating massive telemetry
   - Image: Architecture diagram

3. **Our Approach** (H2 + TextImage left + TextImage right)
   - Multi-stage pipeline overview
   - Dimensionality reduction with autoencoders
   - Isolation forests for anomaly scoring
   - Images: ML pipeline diagram, model architecture

4. **Technical Implementation** (H2 + Text + DataVisualization)
   - Streaming architecture (Kafka, Flink)
   - Model deployment (TensorFlow Serving)
   - Feature store design
   - Interactive chart: Real-time detection demo

5. **Results & Impact** (H2 + TextImage right + Image)
   - Precision/recall metrics
   - MTTD improvement (73%)
   - False positive reduction (82%)
   - Images: Performance dashboard

6. **Lessons Learned** (H2 + Text + TextImage left)
   - Model explainability (SHAP values)
   - Continuous retraining for concept drift
   - Collaboration between ML and SRE
   - Image: Team collaboration

7. **Conclusion** (Text)
   - Reflection on what worked
   - Broader takeaways
```

#### Step 3.3: Outline Quality Checklist

Before moving to Phase 4, verify your outline:

- [ ] Thesis statement is clear and compelling
- [ ] Structure follows a logical narrative flow
- [ ] Each section has a clear purpose
- [ ] PostLayout components are mapped appropriately
- [ ] Media placements enhance the story (not just decoration)
- [ ] Technical depth is layered (big picture → details)
- [ ] Conclusion provides meaningful takeaways
- [ ] Voice alignment opportunities are identified
- [ ] Future component needs are flagged

---

## Phase 4: Writing Plan Development

### Purpose
Define the specific tone, style, and rhetorical approaches for implementing the outline.

### Agent Instructions

#### Step 4.1: Use the Writing Plan Template

**Template Location:** `design/templates/writing-plan-template.md`

**Fill out each section:**

1. **Tone Selection**
   - Reference the tone spectrum in `design/brand/voice-tone.md`
   - Choose appropriate tone for this content type
   - Example: Technical deep dive = "Detailed, educational, honest"

2. **Voice Alignment Strategy**
   - How will we embody "dry but not cynical"?
   - How will we layer technical depth accessibly?
   - How will we show genuine curiosity?
   - How will we discuss challenges constructively?

3. **Rhetorical Devices & Techniques**
   - **Pattern: Context → Concept → Why It Matters** for technical explanations
   - **Pattern: Problem → Approach → Result → Lessons** for projects
   - **Pattern: Observation → Reasoning → Nuanced Conclusion** for opinions
   - Concrete examples over abstract claims
   - Specific numbers over vague "scale" language

4. **Do's and Don'ts for This Piece**
   - Specific items from `design/brand/voice-tone.md` to emphasize
   - Common pitfalls to avoid
   - Example: "Do: 'Across 5,000 deployed devices' / Don't: 'At scale'"

5. **Section-by-Section Writing Notes**
   - For each major section, note:
     - Key voice considerations
     - Technical depth level
     - Rhetorical approach
     - Example phrasing or style

#### Step 4.2: Example Writing Plan

For the ML anomaly detection project:

```markdown
## Tone
Technical, enthusiastic about the problem, honest about challenges

## Voice Alignment
- **Dry but not cynical**: Discuss alert fatigue as a real problem without complaining
- **Technical but accessible**: Start with big picture (alerting problems), then dive into algorithms
- **Genuine curiosity**: Show what was interesting about the multi-stage approach
- **Constructive realism**: Be honest about model explainability challenges

## Section-by-Section Notes

### Introduction
- **Style**: Direct, get right to the point
- **Avoid**: Performative enthusiasm ("Super excited to share...")
- **Use**: "This project used ML to predict..." not "We leveraged cutting-edge AI to revolutionize..."

### The Challenge
- **Pattern**: Problem → Context → Why it matters
- **Voice**: Constructive (not complaining about existing systems)
- **Example**: "Traditional threshold-based alerting creates alert fatigue while missing subtle patterns"

### Our Approach
- **Pattern**: Context → Technical detail → Why it matters
- **Depth**: Layer complexity - start with pipeline overview, then explain autoencoder rationale
- **Avoid**: Jargon without explanation
- **Example**: "We used isolation forests to score anomalies because [reason that matters]"

### Results & Impact
- **Style**: Specific numbers, concrete outcomes
- **Avoid**: Hype language ("game-changing"), vague metrics ("significantly improved")
- **Use**: "73% reduction in MTTD" not "dramatically faster detection"
```

#### Step 4.3: Writing Plan Quality Checklist

Before seeking approval:

- [ ] Tone is appropriate for content type and audience
- [ ] Voice alignment strategies address all core characteristics
- [ ] Rhetorical patterns are clearly defined
- [ ] Do's and don'ts are specific to this piece
- [ ] Section-by-section notes provide clear guidance
- [ ] Potential pitfalls are identified and addressed

---

## Phase 5: User Approval Checkpoint ⚠️

### Purpose
**STOP** and get user feedback before investing time in writing and implementation.

### Agent Instructions

#### Step 5.1: Present Outline and Writing Plan

**Format your presentation clearly:**

```markdown
# Content Plan for Review: [Title]

## Overview
- **Content Type**: [Project page / Thought leadership / etc.]
- **Target Audience**: [Who this is for]
- **Key Message**: [One sentence]

## Story Outline

### Thesis Statement
[Your 2-3 sentence thesis]

### Narrative Structure
1. **[Section Name]** (Components: H1, Text)
   - [Key points]

2. **[Section Name]** (Components: H2, TextImage left)
   - [Key points]

[... rest of outline ...]

### Media & Interactive Elements
- **Images needed**: [List with descriptions]
- **Data visualizations**: [What charts/graphs]
- **Future components flagged**: [What's not yet built but would enhance the story]

## Writing Plan

### Tone & Voice
- **Selected Tone**: [e.g., Technical, educational, honest]
- **Voice Alignment**: [How we'll embody brand characteristics]

### Key Rhetorical Approaches
- [Pattern 1: e.g., Context → Concept → Why It Matters]
- [Pattern 2: e.g., Problem → Approach → Result → Lessons]

### Section Highlights
- **[Section Name]**: [Writing approach notes]
- **[Section Name]**: [Writing approach notes]

## Questions for You

1. Does the narrative structure make sense?
2. Is the technical depth appropriate for the target audience?
3. Any media assets I should know about (images, data, etc.)?
4. Any sections you'd like to add, remove, or reorganize?
5. Any specific points or messages you want emphasized?
```

#### Step 5.2: Ask Specific Questions

**Always ask:**
- "Does this outline match your vision for the content?"
- "Is the technical depth appropriate?"
- "Are there any specific examples or details I should include?"
- "Do you have any images or data I should use, or should I use placeholders?"
- "Any changes to the structure or approach?"

#### Step 5.3: Iterate Based on Feedback

**If user requests changes:**
- Update the outline and/or writing plan
- Present revised version
- Repeat until approval

**If user approves:**
- Document approval (note it in your context)
- Proceed to Phase 6

**CRITICAL:** Do NOT move to implementation without explicit user approval.

---

## Phase 6: Implementation & Quality Check

### Purpose
Execute the approved plan with high quality and verify before delivery.

### Agent Instructions

#### Step 6.1: Write Content Following Approved Outline

**Use the PostLayout Component System:**

Create a Next.js page in `apps/website/src/app/[route]/page.tsx`

**Template Structure:**

```typescript
import type { Metadata } from "next";
import {
  PostLayout,
  H1Section,
  H2Section,
  TextSection,
  ImageSection,
  TextImageSection,
  DataVisualizationSection,
} from "@/components/post-layout";

export const metadata: Metadata = {
  title: "[Page Title] - Andrew Aarestad",
  description: "[Concise 1-2 sentence description for SEO]",
};

export default function YourPage() {
  return (
    <PostLayout>
      {[
        // Section 1: Title
        <H1Section
          key="title"
          text="[Your Main Title]"
        />,

        // Section 2: Introduction
        <TextSection
          key="intro"
          text="[Your introduction text. Can be multi-paragraph with \n\n between paragraphs.]"
        />,

        // Section 3: First Major Section
        <H2Section key="section1-heading" text="[Section Heading]" />,

        <TextSection
          key="section1-text"
          text="[Section body text]"
        />,

        // Section 4: Text with Image
        <TextImageSection
          key="section2"
          text="[Your text content]"
          imageUrl="[URL or placeholder]"
          imageAlt="[Descriptive alt text]"
          layout="image-left"  // or "image-right"
        />,

        // Section 5: Full-width image
        <ImageSection
          key="diagram"
          imageUrl="[URL or placeholder]"
          alt="[Descriptive alt text]"
        />,

        // Section 6: Data visualization (if applicable)
        <DataVisualizationSection
          key="chart"
          title="[Chart Title]"
          description="[Chart description]"
        >
          {/* Your chart component goes here */}
          {/* <YourChartComponent data={data} /> */}
          <div className="h-96 flex items-center justify-center bg-surface border border-border-light rounded">
            <p className="text-text-tertiary">[Placeholder for chart - component to be built]</p>
          </div>
        </DataVisualizationSection>,

        // ... more sections following your outline ...

        // Final section: Conclusion
        <TextSection
          key="conclusion"
          text="[Your conclusion text]"
        />,
      ]}
    </PostLayout>
  );
}
```

#### Step 6.2: Writing Guidelines

**Voice & Tone:**
- Reference `design/brand/copywriting-checklist.md` throughout writing
- Follow your approved writing plan
- Use the Do's and Don'ts from `design/brand/voice-tone.md`

**Technical Content:**
- **Pattern: Context → Concept → Why It Matters** for explanations
- Always explain why technical choices matter
- Layer complexity: big picture first, details for those who want them
- Use concrete examples and specific numbers

**Structure:**
- Keep paragraphs focused and scannable
- Use `\n\n` for paragraph breaks within TextSection
- Break long content into multiple TextSection components if needed
- Balance text-heavy sections with images

**Images:**
- Use placeholders if real images aren't available: `https://placehold.co/[width]x[height]/[color]/[textcolor]/png?text=[text]`
- Always include descriptive alt text
- Prefer images that illustrate concepts, not just decoration

#### Step 6.3: Implement Metadata

**SEO-Optimized Metadata:**

```typescript
export const metadata: Metadata = {
  title: "[Concise Page Title] - Andrew Aarestad",
  description: "[One compelling sentence describing the content, 120-160 characters]",
};
```

**Title Guidelines:**
- Keep under 60 characters
- Include key topic/keywords
- Always end with " - Andrew Aarestad"

**Description Guidelines:**
- 120-160 characters optimal for search results
- Compelling summary that makes people want to click
- Include key terms naturally
- Voice: direct and informative

#### Step 6.4: Handle Media Assets

**Real Images:**
- If user provides images, use them
- Optimize before adding (Next.js Image component handles some optimization)
- Store in `public/images/[project-name]/`

**Placeholder Images:**
- Use `https://placehold.co/` with appropriate dimensions
- Common sizes:
  - Full-width hero: 1200x600
  - TextImage sections: 800x600
  - Smaller graphics: 600x400
- Use brand colors when possible: `4F46E5` (purple), `EF4444` (red), `06B6D4` (cyan)

**Charts & Data Visualizations:**
- If chart component exists, integrate it
- If component doesn't exist, use placeholder with clear description
- Flag for future development in documentation

#### Step 6.5: Flag Custom Components Needed

If your outline includes interactive elements not yet built:

**Create a component wishlist comment:**

```typescript
// Section X: Interactive Quiz
// TODO: Build InteractiveQuizSection component
// Requirements:
// - Multiple choice questions
// - Immediate feedback on answers
// - Track user progress
// - Accessible keyboard navigation
<DataVisualizationSection
  key="quiz"
  title="Test Your Understanding"
  description="This section would include an interactive quiz once the component is built."
>
  <div className="h-96 flex items-center justify-center bg-surface border border-border-light rounded">
    <p className="text-text-tertiary">Interactive quiz component - flagged for development</p>
  </div>
</DataVisualizationSection>
```

**Document in a comment at the top of the file:**

```typescript
/**
 * Future Component Needs:
 * - InteractiveQuizSection: Multiple choice quiz with feedback
 * - ComparisonTableSection: Side-by-side feature comparison
 * - CodePlaygroundSection: Embedded code editor with live preview
 */
```

#### Step 6.6: Quality Control Checklist

**Before marking implementation complete, verify:**

**Content Quality:**
- [ ] Follows approved outline structure
- [ ] Implements approved writing plan
- [ ] Voice & tone align with brand guidelines
- [ ] Technical explanations use Context → Concept → Why It Matters pattern
- [ ] Concrete examples and specific numbers (avoid vague claims)
- [ ] No hype language, corporate speak, or performative enthusiasm
- [ ] Challenges and trade-offs discussed constructively
- [ ] Big picture presented before diving into details

**Technical Quality:**
- [ ] PostLayout components used correctly
- [ ] All sections have unique keys
- [ ] Metadata is optimized for SEO
- [ ] Images have descriptive alt text
- [ ] Code is type-safe (no TypeScript errors)
- [ ] Imports are correct
- [ ] File is in correct location

**Accessibility:**
- [ ] Alt text describes image content meaningfully
- [ ] Heading hierarchy is logical (H1 → H2, not skipping levels)
- [ ] Text has sufficient contrast
- [ ] Links have descriptive text (not "click here")

**Media:**
- [ ] Images load correctly (or placeholders are appropriate)
- [ ] Image dimensions are reasonable
- [ ] Charts/visualizations work (or placeholders document what's needed)

**Writing Checklist (from brand/voice-tone.md):**
- [ ] Started with big picture before diving into details?
- [ ] Explained technical terms in context, not just used them?
- [ ] Discussed trade-offs and challenges honestly?
- [ ] Sounds like a real person, not a marketing department?
- [ ] Showed rather than told (concrete examples > abstract claims)?
- [ ] Avoided hype language and corporate speak?
- [ ] Tone is appropriate for context and audience?
- [ ] Would I actually say this out loud to someone?

#### Step 6.7: Preview and Test

**Run development server:**
```bash
pnpm dev
```

**Navigate to your page:**
```
http://localhost:3000/[your-route]
```

**Visual checks:**
- Spacing and layout look correct
- Images render properly
- Text is readable
- Mobile responsiveness (resize browser)

**Deploy to Vercel for real device testing:**
```bash
git add apps/website/src/app/[your-route]/
git commit -m "Add [content type]: [title]"
git push -u origin [branch-name]
```

Review on Vercel preview URL on multiple devices.

#### Step 6.8: Final Delivery

**Present to user:**
- Link to Vercel preview
- Summary of what was created
- Note any custom components flagged for future development
- Ask for feedback

---

## PostLayout Component Library Reference

Quick reference for all available section components.

### H1Section - Main Page Title

**Purpose:** Primary page heading, used once at the top

**Props:**
- `key` (string, required): Unique identifier
- `text` (string, required): The heading text

**Example:**
```typescript
<H1Section
  key="title"
  text="Building a Real-Time Anomaly Detection System"
/>
```

**Visual:** Large, bold text with brand accent line above

---

### H2Section - Section Heading

**Purpose:** Major content section divisions

**Props:**
- `key` (string, required): Unique identifier
- `text` (string, required): The heading text

**Example:**
```typescript
<H2Section
  key="approach-heading"
  text="Our Approach"
/>
```

**Visual:** Bold heading, smaller than H1

---

### TextSection - Body Text

**Purpose:** Paragraphs of body content

**Props:**
- `key` (string, required): Unique identifier
- `text` (string, required): The text content (supports multi-paragraph with `\n\n`)

**Example:**
```typescript
<TextSection
  key="intro"
  text="This project demonstrates how combining unsupervised learning with domain expertise can dramatically improve operational reliability.\n\nWe reduced false positives by 82% while catching critical issues hours earlier than traditional threshold-based alerts."
/>
```

**Visual:** Prose-styled text with appropriate line height and spacing

---

### ImageSection - Full-Width Image

**Purpose:** Standalone images, diagrams, screenshots

**Props:**
- `key` (string, required): Unique identifier
- `imageUrl` (string, required): Image source URL
- `alt` (string, optional): Alt text for accessibility

**Example:**
```typescript
<ImageSection
  key="architecture"
  imageUrl="https://placehold.co/1200x600/4F46E5/FFFFFF/png?text=System+Architecture"
  alt="System architecture diagram showing data flow"
/>
```

**Visual:** Full-width responsive image with rounded corners and shadow, 400-500px height

---

### TextImageSection - Text + Image Combo

**Purpose:** Combine text with supporting image, side-by-side on desktop, stacked on mobile

**Props:**
- `key` (string, required): Unique identifier
- `text` (string, required): The text content
- `imageUrl` (string, required): Image source URL
- `imageAlt` (string, optional): Alt text
- `layout` ("image-left" | "image-right", required): Image position

**Example:**
```typescript
<TextImageSection
  key="approach-visual"
  text="Our approach combined unsupervised learning with domain expertise. We built a multi-stage pipeline that first reduced dimensionality using autoencoders, then applied isolation forests for anomaly scoring."
  imageUrl="https://placehold.co/800x600/7C3AED/FFFFFF/png?text=ML+Pipeline"
  imageAlt="Machine learning pipeline diagram"
  layout="image-left"
/>
```

**Visual:** Two-column grid on desktop (text + image), stacked on mobile, responsive sizing

---

### DataVisualizationSection - Interactive Charts/Widgets

**Purpose:** Container for charts, graphs, interactive visualizations

**Props:**
- `key` (string, required): Unique identifier
- `title` (string, optional): Chart title
- `description` (string, optional): Chart description
- `children` (ReactNode, required): The chart/visualization component

**Example:**
```typescript
<DataVisualizationSection
  key="flow-chart"
  title="Real-Time Flow Detection"
  description="Interactive visualization showing water usage patterns detected by our IoT sensor system."
>
  <WaterFlowChart data={waterFlowData} height={400} />
</DataVisualizationSection>
```

**Visual:** Title and description above the chart, chart renders within appropriate padding

---

## Content Type Templates

### Project Page Template

**Typical Structure:**

1. H1Section - Project title
2. TextSection - One paragraph introduction (big picture)
3. ImageSection - Hero image or key visual
4. H2Section - "The Challenge"
5. TextSection - Problem description
6. H2Section - "Our Approach"
7. TextImageSection (image-left) - Approach description with visual
8. H2Section - "Technical Implementation"
9. TextSection - Implementation details
10. DataVisualizationSection - Demo or data (if applicable)
11. H2Section - "Results & Impact"
12. TextImageSection (image-right) - Results with metrics
13. H2Section - "Lessons Learned"
14. TextSection - Reflections and takeaways
15. TextSection - Conclusion

**Voice:** Technical, enthusiastic about the problem, honest about challenges

---

### Thought Leadership Template

**Typical Structure:**

1. H1Section - Article title (perspective or thesis)
2. TextSection - Hook and context (why this matters)
3. H2Section - "The Current Landscape"
4. TextSection - Observation and current state
5. ImageSection - Illustrative image (optional)
6. H2Section - "A Different Perspective"
7. TextSection - Your viewpoint and reasoning
8. TextImageSection - Supporting example
9. H2Section - "What This Means in Practice"
10. TextSection - Practical implications
11. TextSection - Conclusion and call to reflection

**Voice:** Knowledgeable but not preachy, nuanced, constructive

---

### Tutorial/How-To Template

**Typical Structure:**

1. H1Section - Tutorial title ("How to...")
2. TextSection - What you'll learn and prerequisites
3. H2Section - "Background"
4. TextSection - Necessary context
5. H2Section - "Step 1: [First Step]"
6. TextImageSection - Step description with visual
7. H2Section - "Step 2: [Second Step]"
8. TextSection - Step description
9. ImageSection - Code example or screenshot
10. [... more steps ...]
11. H2Section - "Putting It All Together"
12. TextSection - Complete example
13. H2Section - "Common Pitfalls"
14. TextSection - What to watch out for
15. TextSection - Conclusion and next steps

**Voice:** Educational, clear, helpful without being condescending

---

## Common Pitfalls & How to Avoid Them

### Pitfall 1: Skipping Brand Guidelines Review
**Symptom:** Content sounds generic or doesn't match site voice
**Fix:** Always start with Phase 1, read guidelines thoroughly

### Pitfall 2: Implementing Before Approval
**Symptom:** Wasted effort when user wants different structure
**Fix:** STOP at Phase 5, get explicit approval

### Pitfall 3: Using Hype Language
**Symptom:** "Revolutionary," "game-changing," "cutting-edge"
**Fix:** Review Do's and Don'ts in voice-tone.md, use concrete specifics

### Pitfall 4: Hiding Behind Jargon
**Symptom:** Technical terms without context or explanation
**Fix:** Use Context → Concept → Why It Matters pattern

### Pitfall 5: Performative Enthusiasm
**Symptom:** "Super excited to share," "I had the privilege..."
**Fix:** Be genuine and direct, let the work speak for itself

### Pitfall 6: Vague Claims
**Symptom:** "At scale," "significantly improved," "extensive experience"
**Fix:** Use specific numbers: "5,000 devices," "73% reduction," "15+ years"

### Pitfall 7: Insufficient Research
**Symptom:** Shallow content lacking depth or interesting insights
**Fix:** Spend more time in Phase 2, look for unique angles

### Pitfall 8: Ignoring Accessibility
**Symptom:** Missing alt text, poor contrast, unclear link text
**Fix:** Use Quality Control Checklist in Phase 6

### Pitfall 9: Poor Component Selection
**Symptom:** Text-heavy with no visual breaks, or too many images
**Fix:** Reference sample-post.tsx, balance text and visuals

### Pitfall 10: Skipping the Writing Plan
**Symptom:** Inconsistent tone, unclear rhetorical approach
**Fix:** Complete Phase 4 thoroughly, document section-by-section notes

---

## Quick Start Checklist for Agents

When asked to create content:

1. [ ] Read brand guidelines (`design/brand/guidelines.md`, `design/brand/voice-tone.md`)
2. [ ] Review top 3 similar content pieces
3. [ ] Understand PostLayout components
4. [ ] Ask user about content goals and audience
5. [ ] Conduct web research, create research notes
6. [ ] Create story outline using template
7. [ ] Create writing plan using template
8. [ ] **STOP - Present outline + plan to user**
9. [ ] Get explicit approval (iterate if needed)
10. [ ] Implement content following approved plan
11. [ ] Run quality control checklist
12. [ ] Test locally and on Vercel preview
13. [ ] Present to user with preview link

---

## Tools & Resources

**Required Reading:**
- `design/brand/guidelines.md` - Brand foundation
- `design/brand/voice-tone.md` - Writing style guide
- `design/brand/copywriting-checklist.md` - Quick reference checklist

**Templates:**
- `design/templates/story-outline-template.md` - Story outline template
- `design/templates/writing-plan-template.md` - Writing plan template

**Examples:**
- `design/examples/research-example.md` - Research notes example
- `apps/website/src/app/projects/sample-post/page.tsx` - Complete PostLayout example

**Component Reference:**
- `apps/website/src/components/post-layout/` - PostLayout component source

**Related Workflows:**
- `docs/design-workflow.md` - Design-first workflow
- `docs/ai-agents.md` - General AI agent guidelines

---

## Additional Notes

### Content Maintenance
- Keep design docs updated as brand evolves
- Archive outdated content appropriately
- Review existing content periodically for voice consistency

### Future Enhancements
As the component library grows, update this document to reflect:
- New PostLayout section types
- New content type templates
- New interaction patterns
- Evolved voice guidelines

### Feedback Loop
After publishing content:
- Note what worked well
- Document what could be improved
- Update templates and guidelines accordingly
- Share learnings with user

---

**Remember:** Great content starts with great planning. Don't rush the research and outline phases—they're what enable high-quality, on-brand writing that resonates with readers and demonstrates genuine expertise.
