# Agent Quick Reference

Quick reference for AI agents working on this project.

## 🎯 First Time Working on This Project?

1. **Read**: `docs/design-workflow.md` - Complete visual design workflow
2. **Read**: `docs/copywriting-workflow.md` - Complete copywriting workflow
3. **Check**: `design/README.md` - Current design status
4. **Ask**: User what you're working on (design, content, features, etc.)

## 📋 Common Workflows

### Creating Content (Stories, Project Pages)

```
User: "Help me write a project page about [topic]"

You should:
1. Read: design/brand/guidelines.md (mission, values, personality)
2. Read: design/brand/voice-tone.md (writing style, do's/don'ts)
3. Read: Top 3 similar pages (e.g., apps/website/src/app/projects/*.tsx)
4. Conduct web research on topic
5. Create story outline using design/templates/story-outline-template.md
6. Create writing plan using design/templates/writing-plan-template.md
7. ⚠️ STOP - Present outline + writing plan to user
8. Wait for user approval
9. Implement with PostLayout components
10. Test on Vercel preview
```

**Key:** Always STOP for approval after outline/plan, before writing.

**PostLayout Components:**
- H1Section, H2Section - Headings
- TextSection - Body text
- ImageSection - Full-width images
- TextImageSection - Text + image (image-left or image-right)
- DataVisualizationSection - Charts, widgets

**Reference:** `apps/website/src/app/projects/sample-post/page.tsx`

### Starting Design Work

```
User: "Let's start on the design"

You should:
1. Check if brand guidelines exist (design/brand/guidelines.md)
2. If not: "Let's define brand guidelines first. What's the mission of this site?"
3. Use templates from docs/design-workflow.md
4. Create documents in design/brand/
```

### Creating a Mood Board

```
User: "Create a mood board for the homepage"

You should:
1. Ensure brand + visual system are documented
2. Create directory: design/mood-boards/v1-[name]/
3. Create page: apps/website/src/app/design-preview/v1-[name]/page.tsx
4. Showcase colors, typography, components, layout
5. Create README.md with iteration notes
6. Set up Playwright if not already done
7. Capture screenshots
8. Show screenshots to user
9. Deploy to Vercel for live review
```

### Adding Components

```
User: "Add a button component"

You should:
1. Use CLI: pnpx shadcn@latest add button
2. Component goes to: apps/website/src/components/ui/button.tsx
3. Import and use in pages: import { Button } from "@/components/ui/button"
4. Customize based on design system if one exists
```

### Taking Screenshots

```
User: "Take screenshots of the mood board"

You should:
1. Ensure Playwright is installed
2. Ensure playwright.config.ts exists
3. Create/update design-tests/mood-boards/capture.spec.ts
4. Run: pnpm dev (in background if needed)
5. Run: pnpm --filter @personal-website/website exec playwright test design-tests/
6. Screenshots saved to: design/mood-boards/[iteration]/screenshots/
7. Read screenshots and show to user
```

## 🛠️ Essential Commands

```bash
# Development
pnpm dev                                  # Start dev server (port 3000)

# Add components
pnpx shadcn@latest add button            # Add button
pnpx shadcn@latest add card              # Add card
pnpx shadcn@latest add [component]       # Add any component

# Playwright setup (first time)
pnpm --filter @personal-website/website add -D @playwright/test
pnpm --filter @personal-website/website exec playwright install chromium

# Playwright usage
pnpm --filter @personal-website/website exec playwright test design-tests/
pnpm --filter @personal-website/website exec playwright test --ui

# Quality checks (before committing)
pnpm pr-check                            # ⚡ Run ALL checks in parallel
pnpm format                              # Format code
pnpm type-check                          # Check TypeScript

# Git (follow branch naming convention!)
git add .
git commit -m "Add mood board iteration v1"
git push -u origin claude/[description]-[session-id]
```

## 📁 Key File Locations

```
docs/
├── design-workflow.md          # 📖 Visual design workflow guide
├── copywriting-workflow.md     # ✍️ Content creation workflow guide
├── ai-agents.md                # General AI collaboration guide
└── agent-quick-reference.md    # This file

design/                         # Design documentation (root level)
├── brand/                      # Brand guidelines
│   ├── guidelines.md           # Mission, values, personality
│   ├── voice-tone.md           # Writing style guide
│   └── copywriting-checklist.md # Quick reference for writing
├── visual/                     # Visual design system
│   ├── color-system.md
│   ├── typography.md
│   └── spacing-layout.md
├── mood-boards/                # Design iterations
├── templates/                  # Content templates
│   ├── story-outline-template.md
│   └── writing-plan-template.md
└── examples/                   # Example documents
    └── research-example.md

apps/website/
├── design-tests/               # Playwright automation
├── src/app/
│   ├── design-preview/         # Mood board pages
│   │   └── [board]/page.tsx
│   ├── projects/               # Project pages
│   │   ├── sample-post/        # PostLayout example
│   │   └── [project]/
│   └── page.tsx                # Homepage
├── src/components/
│   ├── post-layout/            # PostLayout components
│   └── ui/                     # shadcn components
├── components.json             # shadcn config
├── playwright.config.ts        # Playwright config
└── package.json                # Dependencies
```

## 🎨 Design Workflow Phases

```
Phase 1: Brand Guidelines
└─> Create: design/brand/*.md

Phase 2: Visual Design System
└─> Create: design/visual/*.md

Phase 3: Mood Boards
└─> Create: design/mood-boards/[iteration]/
    Create: src/app/design-preview/[iteration]/page.tsx
    Run: Playwright screenshots
    Deploy: Push to Vercel

Phase 4: Review & Iterate
└─> Show screenshots to user
    Get feedback
    Create new iteration or approve

Phase 5: Implementation
└─> Update: tailwind.config.ts
    Update: globals.css
    Add components with shadcn CLI
    Build features
```

## ✍️ Copywriting Workflow Phases

```
Phase 1: Preparation
└─> Read: design/brand/guidelines.md
    Read: design/brand/voice-tone.md
    Review: 3 similar content pieces

Phase 2: Research
└─> WebSearch: Topic research
    Create: Research notes (see design/examples/research-example.md)

Phase 3: Story Outline
└─> Use: design/templates/story-outline-template.md
    Plan: Narrative structure
    Map: PostLayout components

Phase 4: Writing Plan
└─> Use: design/templates/writing-plan-template.md
    Define: Tone, style, rhetorical approaches

Phase 5: ⚠️ USER APPROVAL (STOP HERE!)
└─> Present: Outline + Writing Plan
    Ask: For feedback
    Iterate: Until approved

Phase 6: Implementation
└─> Write: Content following approved plan
    Use: PostLayout components
    Add: Metadata for SEO
    Test: Vercel preview
```

## 🚨 Important Rules

### Always Do
- ✅ Check existing design docs before creating new ones
- ✅ Use CLI tools (pnpx shadcn, playwright) not MCP servers
- ✅ Show screenshots to user (multimodal capability!)
- ✅ Reference brand guidelines in all design decisions
- ✅ Run `pnpm pr-check` before committing
- ✅ Follow branch naming: `claude/[description]-[session-id]`
- ✅ Create descriptive commits

### Never Do
- ❌ Create production features before design is approved
- ❌ Use MCP servers (not available in cloud environment)
- ❌ Skip design documentation
- ❌ Commit without running pr-check
- ❌ Push to main/master directly

## 💬 User Communication

### When Showing Screenshots
```markdown
Here's the mood board iteration for v1-minimal:

[Show screenshot inline using multimodal capability]

**Design Decisions:**
- Colors: [Explain choices based on brand]
- Typography: [Explain choices]
- Layout: [Explain approach]

**What do you think? Any changes needed?**
```

### When Asking for Feedback
```markdown
I've created three variations:
1. [Variation 1 with screenshot]
2. [Variation 2 with screenshot]
3. [Variation 3 with screenshot]

Which direction do you prefer, or should I explore something different?
```

### When Design is Approved
```markdown
Great! I'll mark this iteration as approved and update the design tokens:
1. Update tailwind.config.ts with final colors
2. Update globals.css with CSS variables
3. Document component specifications
4. Ready to begin implementation

Should we start building the homepage with this design?
```

## 🔧 Troubleshooting

### "Playwright not found"
```bash
pnpm --filter @personal-website/website add -D @playwright/test
pnpm --filter @personal-website/website exec playwright install chromium
```

### "Component not found after adding with shadcn"
```bash
# Check it was added:
ls apps/website/src/components/ui/

# If not there, try again:
pnpx shadcn@latest add [component]

# Import correctly:
import { Button } from "@/components/ui/button"  // ✅
import { Button } from "../components/ui/button"  // ❌
```

### "Screenshots are blank"
```bash
# Ensure dev server is running:
pnpm dev

# Check playwright.config.ts has correct baseURL:
baseURL: 'http://localhost:3000'

# Add wait in test:
await page.waitForLoadState('networkidle')
```

### "Build fails on Vercel"
```bash
# Run checks locally first:
pnpm pr-check

# If passes locally but fails on Vercel:
# - Check Vercel logs
# - Ensure all deps in package.json
# - Check build script in vercel.json
```

## 📚 Additional Resources

- Next.js 15: https://nextjs.org/docs
- shadcn/ui: https://ui.shadcn.com/
- Playwright: https://playwright.dev/
- Tailwind CSS: https://tailwindcss.com/docs
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

**Remember**: This project uses a design-first approach. Always establish design guidelines before implementing features!
