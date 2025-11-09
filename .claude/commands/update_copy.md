# Update Copy Command

You are tasked with helping update copy on website pages according to brand guidelines. Follow these phases carefully:

## Input

Page name: <page_name>#$ARGUMENTS</page_name>

If no page name is provided in <page_name>, stop and ask the user to provide it. This command requires a page name as an argument.

---

## Phase 1: Identify Page Source Code

Your first task is to identify which page the user means.

1. **Search for the page file** in the website app directory (`apps/website/src/app/`)
2. **Consider these possibilities:**
   - Homepage: `apps/website/src/app/page.tsx`
   - Named routes: `apps/website/src/app/[page-name]/page.tsx`
   - Nested routes: `apps/website/src/app/[parent]/[page-name]/page.tsx`
   - Design preview pages: `apps/website/src/app/design-preview/[board]/page.tsx`

3. **If there are multiple possible matches or uncertainty:**
   - List the possible matches you found
   - Ask the user to confirm which page they mean
   - Wait for confirmation before proceeding to Phase 2

4. **Once you've identified the correct page:**
   - Read the page file
   - Confirm with the user: "I've identified the page at `[file-path]`. Proceeding to analyze the copy."

**IMPORTANT:** Do not proceed to Phase 2 until you have confirmed the correct page with the user (if there was any ambiguity).

---

## Phase 2: Determine Copy on the Page

Now extract and organize all user-facing text from the page.

1. **Read the page file** (if you haven't already)
2. **Identify all user-facing copy**, including:
   - Headings (h1, h2, h3, etc.)
   - Paragraph text
   - Button text
   - Link text
   - Alt text for images
   - Any other text visible to users

3. **Organize copy into logical chunks** based on natural page sections:
   - Hero section
   - Introduction/overview
   - Feature sections
   - Call-to-action sections
   - Footer content
   - Any other distinct sections

4. **Present the chunks to the user** in this format:

   ```
   ## Copy Chunks Identified

   ### Chunk 1: [Section Name]
   [Copy text here]

   ### Chunk 2: [Section Name]
   [Copy text here]

   [etc.]
   ```

5. **Ask for confirmation:** "I've identified [X] chunks of copy. Would you like to proceed with reviewing each one against the brand guidelines?"

---

## Phase 3: Load Brand Documentation

Before analyzing the copy, refresh your understanding of the brand guidelines.

1. **Read the brand documentation files:**
   - `apps/website/design/brand/guidelines.md` - Mission, values, personality, positioning
   - `apps/website/design/brand/voice-tone.md` - Voice characteristics, writing style, tone spectrum, do's and don'ts
   - `apps/website/design/brand/persona.md` - Target audience

2. **Internalize the key principles:**
   - Voice: Genuine, technical, pragmatic, dry but not cynical
   - Style: Conversational professional, layered accessibility
   - Patterns: Context → Concept → Why It Matters
   - Avoid: Hype language, corporate speak, performative enthusiasm

3. **Don't display the documentation to the user.** Just confirm you've loaded it:

   "I've reviewed the brand guidelines. Ready to analyze the copy."

---

## Phase 4: Interactive Copy Review

Now work through each chunk interactively with the user.

**For each chunk, follow this algorithm:**

1. **Display the chunk:**
   ```
   ## Reviewing Chunk [N]/[Total]: [Section Name]

   **Current copy:**
   [Display the current copy]
   ```

2. **Analyze against brand guidelines:**
   - Does it match the voice (genuine, technical, pragmatic)?
   - Does it follow the style guide (layered accessibility, no hype)?
   - Does it use appropriate patterns (Context → Concept → Why It Matters)?
   - Are there specific violations of the do's and don'ts?

3. **Rate the copy:**
   Provide a rating on each dimension:

   ```
   **Brand Alignment Analysis:**

   - **Voice Alignment:** [Strong ✅ | Good ✓ | Needs Work ⚠️ | Misaligned ❌]
     [Brief explanation of why]

   - **Style Alignment:** [Strong ✅ | Good ✓ | Needs Work ⚠️ | Misaligned ❌]
     [Brief explanation of why]

   - **Pattern Adherence:** [Strong ✅ | Good ✓ | Needs Work ⚠️ | Misaligned ❌]
     [Brief explanation of why]

   **Overall:** [This copy is well-aligned / This copy could be improved / This copy needs revision]
   ```

4. **Provide two suggestions for rewording:**
   ```
   **Suggestion A:** [First alternative]
   *Rationale:* [Why this is better aligned with brand guidelines]

   **Suggestion B:** [Second alternative]
   *Rationale:* [Why this is better aligned with brand guidelines]
   ```

   **Guidelines for suggestions:**
   - Make them meaningfully different from each other
   - Each should address different aspects or take different approaches
   - Both should be improvements over the original (if original needs work)
   - Preserve any technical accuracy or factual information
   - Maintain the same general content and purpose

5. **Ask the user what they'd like to do:**
   ```
   **Options:**
   - Type "A" to use Suggestion A
   - Type "B" to use Suggestion B
   - Type "skip" to keep the current copy and move to the next chunk
   - Type "custom" to provide your own revised copy
   - Type "exit" to stop the review process

   What would you like to do?
   ```

6. **Process the user's response:**
   - **If "A":** Update the code with Suggestion A, confirm the change, move to next chunk
   - **If "B":** Update the code with Suggestion B, confirm the change, move to next chunk
   - **If "skip":** Confirm you're keeping the current copy, move to next chunk
   - **If "custom":** Ask the user to provide their revised copy, wait for response, update the code with their copy, confirm the change, move to next chunk
   - **If "exit":** Thank the user and summarize what was completed

7. **When making code changes:**
   - Use the Edit tool to replace the copy in the source file
   - Be careful to preserve the exact formatting, JSX structure, and code around the text
   - Only change the user-facing text strings
   - After each edit, confirm: "Updated [section name] copy in `[file-path]:[line-number]`"

8. **Repeat for all chunks** until complete or user exits.

---

## Final Summary

After all chunks have been reviewed (or user exits early):

```
## Copy Review Summary

**Page:** [page file path]
**Chunks reviewed:** [N] / [Total]
**Changes made:** [Number of chunks that were updated]

**Next steps:**
- Review the changes in the code
- Run `pnpm pr-check` to ensure no issues
- Test the updated copy on the live site
- Commit the changes when satisfied
```

---

## Important Notes

- **Be patient and thorough** - Don't rush through chunks
- **Wait for user input** at each decision point
- **Preserve code structure** - Only change text content, not JSX/component structure
- **Be specific in analysis** - Point to exact issues with examples from the voice-tone guide
- **Offer meaningful alternatives** - Don't just rephrase, improve according to guidelines
- **Respect user decisions** - If they skip or provide custom copy, accept it and move on
- **Track progress** - Always show which chunk you're on (e.g., "Chunk 3/7")

---

## Example Interaction

```
## Reviewing Chunk 1/3: Hero Section

**Current copy:**
"I'm super excited to share my revolutionary AI/ML engineering work! I leverage cutting-edge technologies to ideate innovative solutions."

**Brand Alignment Analysis:**

- **Voice Alignment:** Misaligned ❌
  Uses "super excited" (performative enthusiasm), "revolutionary" (hype), "leverage" and "ideate" (corporate speak)

- **Style Alignment:** Needs Work ⚠️
  Lacks the conversational professional tone; reads like marketing copy rather than genuine introduction

- **Pattern Adherence:** Needs Work ⚠️
  Doesn't follow the pattern of providing context or layered accessibility

**Overall:** This copy needs revision

**Suggestion A:** "I'm [Your Name], an AI/ML engineer who's been building production systems for over 15 years—since before machine learning was a household term."
*Rationale:* Removes performative enthusiasm and hype language. Uses specific experience ("15+ years") instead of vague claims. Establishes credibility through genuine, matter-of-fact statement.

**Suggestion B:** "I build AI/ML systems that ship. For over 15 years, I've worked at the intersection of research and product, from firmware-level signal processing to cloud-scale ML pipelines."
*Rationale:* Leads with pragmatic value ("systems that ship"). Provides concrete scope ("firmware to cloud") without hype. Dry but engaging.

**Options:**
- Type "A" to use Suggestion A
- Type "B" to use Suggestion B
- Type "skip" to keep the current copy and move to the next chunk
- Type "custom" to provide your own revised copy
- Type "exit" to stop the review process

What would you like to do?
```

---

Begin with Phase 1 now.
