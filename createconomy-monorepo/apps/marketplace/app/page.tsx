import { DotBackground, Button, GlassCard, GlowButton } from "@repo/ui";
import { ShoppingBag, Search, Store } from "lucide-react";

export default function MarketplacePage() {
  return (
    <DotBackground>
      <div className="min-h-screen">
        {/* Hero Section */}
        <header className="border-b border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold">Createconomy</span>
            </div>
            <nav className="flex items-center gap-4">
              <Button variant="ghost">Browse</Button>
              <Button variant="ghost">Categories</Button>
              <Button variant="ghost">Sellers</Button>
              <GlowButton>Sign In</GlowButton>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Discover Unique Products from Creators
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Shop directly from independent creators and support the creative economy.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products, creators, categories..."
                  className="pl-10 pr-4 py-3 w-[400px] rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <GlowButton>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Explore
              </GlowButton>
            </div>
          </div>

          {/* Featured Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Digital Art", "Handcrafted", "Fashion", "Tech"].map((category) => (
                <GlassCard key={category} className="p-6 text-center cursor-pointer hover:scale-105 transition-transform">
                  <h3 className="font-semibold text-lg">{category}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Explore {category.toLowerCase()} products
                  </p>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Placeholder for Products Grid */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Trending Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <GlassCard key={i} className="p-4">
                  <div className="aspect-square rounded-lg bg-muted/50 mb-4" />
                  <h3 className="font-medium">Product {i}</h3>
                  <p className="text-sm text-muted-foreground">By Creator</p>
                  <p className="text-lg font-semibold mt-2">$29.99</p>
                </GlassCard>
              ))}
            </div>
          </section>
        </main>
      </div>
    </DotBackground>
  );
}
