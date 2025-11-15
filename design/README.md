# Design Documentation

This directory contains all design documentation for the personal website project.

## Structure

```
design/
├── brand/          # Brand guidelines, personas, voice & tone
├── visual/         # Visual design system (colors, typography, spacing)
└── mood-boards/    # Design iterations with screenshots
```

## Getting Started

Before implementing any features, establish the design foundation:

1. **Define Brand** (`brand/`)
   - Create `guidelines.md` - brand mission, values, personality
   - Create `persona.md` - target audience definition
   - Create `voice-tone.md` - writing style guide

2. **Create Visual System** (`visual/`)
   - Create `color-system.md` - color palette and usage
   - Create `typography.md` - font system and hierarchy
   - Create `spacing-layout.md` - spacing scale and grid
   - Create `components-catalog.md` - component patterns

3. **Generate Mood Boards** (`mood-boards/`)
   - Create iteration directories (e.g., `v1-minimal/`)
   - Build live preview pages in `src/app/design-preview/`
   - Capture screenshots with Playwright
   - Document decisions and feedback

## Workflow

See [../../docs/design-workflow.md](../../docs/design-workflow.md) for complete workflow instructions.

## Current Status

- [ ] Brand guidelines defined
- [ ] Visual design system created
- [ ] First mood board iteration complete
- [ ] Design approved and frozen

---

**Note for AI Agents:** Follow the templates in `docs/design-workflow.md` when creating these documents.
