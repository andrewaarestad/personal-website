# Story Outline Template

Use this template to plan your content structure before writing. A well-crafted outline ensures your narrative flows logically, uses PostLayout components effectively, and aligns with brand voice.

**Copy this template** and fill it out completely before proceeding to the writing plan phase.

---

## Content Metadata

**Title:** [Working title for the content]

**Content Type:** [Project page / Thought leadership / Tutorial / How-to / Case study / etc.]

**Target Audience:** [Who will read this? Hiring managers / Technical peers / General audience / etc.]

**Estimated Length:** [Short (5-8 sections) / Medium (10-15 sections) / Long (15+ sections)]

**Date Created:** [YYYY-MM-DD]

---

## Thesis Statement

**Instructions:** Write 2-3 sentences max that capture the essence of this content. This should surface the primary concept or argument and define what readers will take away. Be ultra-concise.

**Thesis:**

[Your thesis statement here]

**Key Concepts/Points Surfaced:**
- [Concept 1]
- [Concept 2]
- [Concept 3]

---

## Content Goals

**What should readers take away from this content?**

1. [Takeaway 1 - e.g., "Understanding of how we solved X problem"]
2. [Takeaway 2 - e.g., "Insight into trade-offs between approaches A and B"]
3. [Takeaway 3 - e.g., "Appreciation for the complexity of production ML"]

**How does this align with brand values?**

- **Pragmatic Innovation:** [How does this demonstrate real systems that ship?]
- **Technical Depth with Perspective:** [What technical details + big picture context?]
- **Genuine Curiosity:** [What's genuinely interesting or surprising here?]
- **Constructive Realism:** [What challenges/trade-offs will we discuss honestly?]

---

## Narrative Structure

**Instructions:** List the major sections in order. For each section, note:
- Section heading (if applicable)
- Key points to cover
- PostLayout components to use
- Purpose in the overall narrative

### Section 1: [Section Name]

**PostLayout Components:**
- [ ] H1Section
- [ ] H2Section
- [ ] TextSection
- [ ] ImageSection
- [ ] TextImageSection (layout: image-left / image-right)
- [ ] DataVisualizationSection

**Key Points:**
- [Point 1]
- [Point 2]
- [Point 3]

**Purpose in Narrative:**
[Why is this section here? How does it advance the story?]

---

### Section 2: [Section Name]

**PostLayout Components:**
- [ ] H2Section
- [ ] TextSection
- [ ] ImageSection
- [ ] TextImageSection (layout: image-left / image-right)
- [ ] DataVisualizationSection

**Key Points:**
- [Point 1]
- [Point 2]

**Purpose in Narrative:**
[Why is this section here? How does it advance the story?]

---

### Section 3: [Section Name]

**PostLayout Components:**
- [ ] [Component types]

**Key Points:**
- [Points to cover]

**Purpose in Narrative:**
[Purpose]

---

[... Add more sections as needed ...]

---

## PostLayout Section Sequence

**Instructions:** List the exact sequence of PostLayout components you'll use. This gives you a visual map of the content flow.

**Example:**
```
1. H1Section (Title)
2. TextSection (Introduction)
3. ImageSection (Hero image)
4. H2Section (Problem heading)
5. TextSection (Problem description)
6. TextImageSection (Approach with visual)
7. H2Section (Results heading)
8. DataVisualizationSection (Chart)
9. TextSection (Conclusion)
```

**Your Sequence:**
```
1. [Component type] ([Purpose])
2. [Component type] ([Purpose])
3. [Component type] ([Purpose])
...
```

---

## Media & Interactive Elements

### Images Needed

**Instructions:** List all images you'll need, with descriptions. Note if you have the actual image or need a placeholder.

| Section | Image Description | Dimensions | Source | Status |
|---------|------------------|------------|--------|--------|
| [Section name] | [What the image shows] | [e.g., 1200x600] | [URL / Placeholder / User to provide] | [Available / Placeholder needed / Requested] |
| [Section name] | [Description] | [Dimensions] | [Source] | [Status] |

**Example:**
| Section | Image Description | Dimensions | Source | Status |
|---------|------------------|------------|--------|--------|
| Hero | System architecture diagram | 1200x600 | User to provide | Requested |
| Approach | ML pipeline flow | 800x600 | Placeholder | Placeholder needed |

### Data Visualizations Needed

**Instructions:** List charts, graphs, or interactive visualizations needed.

| Section | Visualization Type | Description | Component Available? | Notes |
|---------|-------------------|-------------|---------------------|-------|
| [Section] | [Chart type] | [What it shows] | [Yes / No / Partial] | [Additional notes] |

**Example:**
| Section | Visualization Type | Description | Component Available? | Notes |
|---------|-------------------|-------------|---------------------|-------|
| Results | Line chart | Water flow over time | Yes (WaterFlowChart) | Use existing component |
| Performance | Bar chart | Metric comparison | No | Need to build BarChartSection |

### Future Components to Flag

**Instructions:** List interactive elements or component types that would enhance the story but don't currently exist.

**Components we wish we had:**

1. **[Component Name]** (e.g., InteractiveQuizSection)
   - **Purpose:** [What it would do]
   - **Requirements:** [Key features needed]
   - **Priority:** [High / Medium / Low]
   - **Workaround:** [What we'll use instead for now]

2. **[Component Name]**
   - **Purpose:**
   - **Requirements:**
   - **Priority:**
   - **Workaround:**

**Example:**

1. **InteractiveQuizSection**
   - **Purpose:** Let readers test their understanding with multiple choice questions
   - **Requirements:** MCQ interface, answer feedback, progress tracking, keyboard accessible
   - **Priority:** Medium
   - **Workaround:** Use DataVisualizationSection with placeholder text describing the quiz

---

## Technical Depth Plan

**Instructions:** Define where you'll go deep technically vs. staying high-level. Plan how you'll layer complexity.

### High-Level Sections
**These sections stay accessible to all readers:**
- [Section name]: [What we'll cover at high level]
- [Section name]: [High-level coverage]

### Technical Deep-Dive Sections
**These sections provide detail for technical readers:**
- [Section name]: [What technical details we'll explore]
- [Section name]: [Technical coverage]

### Layering Strategy
**How will we make technical depth accessible?**

[Describe your approach, e.g.:]
- Start each technical section with big picture context
- Use Context → Concept → Why It Matters pattern
- Provide real-world examples to ground abstract concepts
- Explain trade-offs in practical terms
- Include diagrams/visuals to support technical explanations

---

## Voice & Tone Notes

**Instructions:** Note specific voice considerations for this content.

**Primary Tone:** [Select from tone spectrum in voice-tone.md]

**Specific Voice Considerations:**
- [e.g., "Avoid sounding like we're complaining about the problem"]
- [e.g., "Show enthusiasm through curiosity about technical approach"]
- [e.g., "Be honest about the challenges we faced without being negative"]

**Words/Phrases to Avoid:**
- [e.g., "Revolutionary," "game-changing," "at scale"]
- [Any other hype language or corporate speak relevant to this topic]

**Words/Phrases to Use:**
- [e.g., "Across 5,000 devices," "73% reduction," "real-time processing"]
- [Concrete, specific language]

---

## Open Questions & User Input Needed

**Instructions:** List anything you need clarification on before writing.

**Questions for User:**
1. [Question 1 - e.g., "Do you have any actual images from the project?"]
2. [Question 2 - e.g., "What were the specific metrics/results?"]
3. [Question 3 - e.g., "How technical should section X be?"]

**Information Needed:**
- [Info item 1]
- [Info item 2]

---

## Outline Quality Self-Check

Before presenting this outline to the user, verify:

- [ ] Thesis statement is clear and compelling (2-3 sentences max)
- [ ] Target audience and goals are defined
- [ ] Narrative structure follows logical flow
- [ ] Each section has clear purpose
- [ ] PostLayout components are mapped appropriately
- [ ] Section sequence is visualized
- [ ] All media needs are documented
- [ ] Future components are flagged with priorities
- [ ] Technical depth plan is clear
- [ ] Voice considerations are noted
- [ ] Open questions are documented

---

## Next Steps

After completing this outline:

1. ✅ Self-check using quality checklist above
2. ✅ Fill out writing plan template (`design/templates/writing-plan-template.md`)
3. ⚠️ **STOP - Present both outline and writing plan to user**
4. ⏸️ Wait for user approval
5. ✏️ Implement approved plan

**DO NOT proceed to writing without user approval.**

---

## Example: Filled-In Outline

See `docs/copywriting-workflow.md` Phase 3, Step 3.2 for a complete example of a filled-in outline for an ML anomaly detection project page.
