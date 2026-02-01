import { DotBackground, Button, GlassCard, GlowButton } from "@repo/ui";
import { Shield, Users, BarChart3, Settings, Package, MessageSquare } from "lucide-react";

export default function AdminPage() {
  return (
    <DotBackground>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/50 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold">Admin Console</span>
          </div>
          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: "Dashboard" },
              { icon: Users, label: "Users" },
              { icon: Package, label: "Products" },
              { icon: MessageSquare, label: "Reports" },
              { icon: Settings, label: "Settings" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, products, and platform settings
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Users", value: "12,458", change: "+12%" },
              { label: "Active Sellers", value: "1,234", change: "+8%" },
              { label: "Products Listed", value: "45,678", change: "+15%" },
              { label: "Total Revenue", value: "$234,567", change: "+23%" },
            ].map((stat) => (
              <GlassCard key={stat.label} className="p-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-sm text-green-500 mt-1">{stat.change}</p>
              </GlassCard>
            ))}
          </div>

          {/* Recent Activity */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <GlassCard className="p-6">
              <div className="space-y-4">
                {[
                  "New user registration: john@example.com",
                  "Product flagged for review: #12345",
                  "Seller verification approved: Jane's Crafts",
                  "System update completed successfully",
                  "New support ticket: Order issue #789",
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <span className="text-sm">{activity}</span>
                    <span className="text-xs text-muted-foreground">
                      {i + 1}h ago
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <GlowButton>Review Flagged Content</GlowButton>
              <Button variant="outline">Export Reports</Button>
              <Button variant="outline">System Settings</Button>
            </div>
          </section>
        </main>
      </div>
    </DotBackground>
  );
}
