import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Dark Mode Theme Test | Personal Website",
  description: "Test page for verifying dark mode implementation",
};

/**
 * Theme test page to verify dark mode implementation
 *
 * This page tests:
 * - All brand colors (Red, Cyan, Lime)
 * - Semantic colors (success, error, warning, info)
 * - Text colors and hierarchy
 * - Background and surface colors
 * - Border colors
 * - Button variants
 * - Card components
 */
export default function ThemeTestPage() {
  return (
    <main className="min-h-screen bg-background">
      <Section className="py-16">
        <PageContainer>
          <div className="space-y-16">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-h1 font-extrabold text-foreground mb-4">Dark Mode Theme Test</h1>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                This page demonstrates all colors and components in both light and dark modes.
                Toggle the theme using the button in the top-right corner.
              </p>
            </div>

            {/* Brand Colors */}
            <div className="space-y-6">
              <h2 className="text-h2 font-bold text-foreground mb-4">
                Brand Colors (Electric Modern)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-h4">Primary (Red)</CardTitle>
                    <CardDescription>#EF4444</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-20 bg-brand-light rounded-md flex items-center justify-center">
                        Light
                      </div>
                      <div className="h-20 bg-brand rounded-md flex items-center justify-center text-white">
                        Default
                      </div>
                      <div className="h-20 bg-brand-dark rounded-md flex items-center justify-center text-white">
                        Dark
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-h4">Secondary (Cyan)</CardTitle>
                    <CardDescription>#06B6D4</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-20 bg-brand-secondary-light rounded-md flex items-center justify-center">
                        Light
                      </div>
                      <div className="h-20 bg-brand-secondary rounded-md flex items-center justify-center text-white">
                        Default
                      </div>
                      <div className="h-20 bg-brand-secondary-dark rounded-md flex items-center justify-center text-white">
                        Dark
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-h4">Accent (Lime)</CardTitle>
                    <CardDescription>#84CC16</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-20 bg-highlight-light rounded-md flex items-center justify-center">
                        Light
                      </div>
                      <div className="h-20 bg-highlight rounded-md flex items-center justify-center text-white">
                        Default
                      </div>
                      <div className="h-20 bg-highlight-dark rounded-md flex items-center justify-center text-white">
                        Dark
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Semantic Colors */}
            <div className="space-y-6">
              <h2 className="text-h2 font-bold text-foreground mb-4">Semantic Colors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-h5">Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-16 bg-success-light rounded-md" />
                      <div className="h-16 bg-success rounded-md" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-h5">Error</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-16 bg-error-light rounded-md" />
                      <div className="h-16 bg-error rounded-md" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-h5">Warning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-16 bg-warning-light rounded-md" />
                      <div className="h-16 bg-warning rounded-md" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-h5">Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-16 bg-info-light rounded-md" />
                      <div className="h-16 bg-info rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-6">
              <h2 className="text-h2 font-bold text-foreground mb-4">Typography</h2>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <h1 className="text-h1 text-foreground">Heading 1</h1>
                    <p className="text-body text-text-secondary">3rem, extrabold</p>
                  </div>
                  <div>
                    <h2 className="text-h2 text-foreground">Heading 2</h2>
                    <p className="text-body text-text-secondary">2.5rem, bold</p>
                  </div>
                  <div>
                    <h3 className="text-h3 text-foreground">Heading 3</h3>
                    <p className="text-body text-text-secondary">2rem, bold</p>
                  </div>
                  <div className="pt-4 space-y-2">
                    <p className="text-body text-text-primary">Primary text - Main content</p>
                    <p className="text-body text-text-secondary">
                      Secondary text - Supporting content
                    </p>
                    <p className="text-body text-text-tertiary">
                      Tertiary text - Less important content
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Buttons */}
            <div className="space-y-6">
              <h2 className="text-h2 font-bold text-foreground mb-4">Buttons</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Button variant="brand" className="w-full">
                        Brand
                      </Button>
                      <p className="text-body-sm text-text-secondary text-center">Primary CTA</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="info" className="w-full">
                        Info
                      </Button>
                      <p className="text-body-sm text-text-secondary text-center">Secondary</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="highlight" className="w-full">
                        Highlight
                      </Button>
                      <p className="text-body-sm text-text-secondary text-center">Accent</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="emphasis" className="w-full">
                        Emphasis
                      </Button>
                      <p className="text-body-sm text-text-secondary text-center">Strong</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <Button variant="outline" className="w-full">
                      Outline
                    </Button>
                    <Button variant="ghost" className="w-full">
                      Ghost
                    </Button>
                    <Button variant="link" className="w-full">
                      Link
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Destructive
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              <h2 className="text-h2 font-bold text-foreground mb-4">Feature Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard border="brand">
                  <h3 className="text-h5 font-bold text-foreground mb-2">Brand Border</h3>
                  <p className="text-body text-text-secondary">Primary brand color accent</p>
                </FeatureCard>

                <FeatureCard border="info">
                  <h3 className="text-h5 font-bold text-foreground mb-2">Info Border</h3>
                  <p className="text-body text-text-secondary">Secondary info color accent</p>
                </FeatureCard>

                <FeatureCard border="highlight">
                  <h3 className="text-h5 font-bold text-foreground mb-2">Highlight Border</h3>
                  <p className="text-body text-text-secondary">Accent highlight color</p>
                </FeatureCard>
              </div>
            </div>

            {/* Backgrounds and Surfaces */}
            <div className="space-y-6">
              <h2 className="text-h2 font-bold text-foreground mb-4">Backgrounds & Surfaces</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background border-2 border-border-light rounded-lg p-6">
                  <h3 className="text-h5 font-bold text-foreground mb-2">Background</h3>
                  <p className="text-body text-text-secondary">Main page background color</p>
                </div>

                <div className="bg-card border-2 border-border-default rounded-lg p-6">
                  <h3 className="text-h5 font-bold text-foreground mb-2">Card</h3>
                  <p className="text-body text-text-secondary">Surface/card background color</p>
                </div>

                <div className="bg-muted border-2 border-border-light rounded-lg p-6">
                  <h3 className="text-h5 font-bold text-foreground mb-2">Muted</h3>
                  <p className="text-body text-muted-foreground">
                    Muted background with muted foreground text
                  </p>
                </div>

                <div className="bg-primary text-primary-foreground border-2 border-border-default rounded-lg p-6">
                  <h3 className="text-h5 font-bold mb-2">Primary</h3>
                  <p className="text-body">Primary background with foreground text</p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
