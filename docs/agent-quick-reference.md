# Agent Quick Reference

Quick reference for AI agents working on this project.

## 🎯 First Time Working on This Project?

1. **Read**: `docs/design-workflow.md` - Complete workflow guide
2. **Check**: `apps/website/design/README.md` - Current design status
3. **Ask**: User what phase we're in (brand, visual, mood board, or implementation)

## 📋 Common Workflows

### Starting Design Work

```
User: "Let's start on the design"

You should:
1. Check if brand guidelines exist (apps/website/design/brand/guidelines.md)
2. If not: "Let's define brand guidelines first. What's the mission of this site?"
3. Use templates from docs/design-workflow.md
4. Create documents in apps/website/design/brand/
```

### Creating a Mood Board

```
User: "Create a mood board for the homepage"

You should:
1. Ensure brand + visual system are documented
2. Create directory: apps/website/design/mood-boards/v1-[name]/
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
├── design-workflow.md          # 📖 Complete workflow guide
├── ai-agents.md                # General AI collaboration guide
└── agent-quick-reference.md    # This file

apps/website/
├── design/                     # Design documentation
│   ├── brand/                  # Brand guidelines
│   ├── visual/                 # Visual design system
│   └── mood-boards/            # Iterations
├── design-tests/               # Playwright automation
├── src/app/
│   ├── design-preview/         # Mood board pages
│   │   └── [board]/page.tsx
│   └── page.tsx                # Homepage
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
import { Button } from "@/components/ui/button"  # ✅
import { Button } from "../components/ui/button"  # ❌
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
