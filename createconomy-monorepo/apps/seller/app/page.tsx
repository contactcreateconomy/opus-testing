import { DotBackground, Button, GlassCard, GlowButton } from "@repo/ui";
import { Store, Package, BarChart3, Settings, Plus, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

export default function SellerPage() {
  return (
    <DotBackground>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/50 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-8">
            <Store className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold">Seller Portal</span>
          </div>
          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: "Dashboard" },
              { icon: Package, label: "Products" },
              { icon: ShoppingCart, label: "Orders" },
              { icon: DollarSign, label: "Earnings" },
              { icon: TrendingUp, label: "Analytics" },
              { icon: Settings, label: "Store Settings" },
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
          <div className="mt-8">
            <GlowButton className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </GlowButton>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your store, products, and orders
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: DollarSign, label: "Today's Sales", value: "$1,234", change: "+18%" },
              { icon: ShoppingCart, label: "Pending Orders", value: "23", change: "+5" },
              { icon: Package, label: "Active Products", value: "156", change: "+3" },
              { icon: TrendingUp, label: "Monthly Revenue", value: "$12,456", change: "+12%" },
            ].map((stat) => (
              <GlassCard key={stat.label} className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-green-500 mt-1">{stat.change}</p>
              </GlassCard>
            ))}
          </div>

          {/* Recent Orders */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <GlassCard className="p-6">
              <div className="space-y-4">
                {[
                  { id: "#ORD-001", customer: "John Doe", product: "Digital Art Print", amount: "$29.99", status: "Processing" },
                  { id: "#ORD-002", customer: "Jane Smith", product: "Custom Mug", amount: "$15.99", status: "Shipped" },
                  { id: "#ORD-003", customer: "Bob Wilson", product: "T-Shirt Design", amount: "$24.99", status: "Delivered" },
                  { id: "#ORD-004", customer: "Alice Brown", product: "Sticker Pack", amount: "$9.99", status: "Processing" },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <div>
                      <span className="font-medium">{order.id}</span>
                      <span className="text-muted-foreground ml-2">{order.customer}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{order.product}</div>
                    <div className="font-medium">{order.amount}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500/20 text-green-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {order.status}
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
              <GlowButton>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </GlowButton>
              <Button variant="outline">Manage Inventory</Button>
              <Button variant="outline">View Analytics</Button>
            </div>
          </section>
        </main>
      </div>
    </DotBackground>
  );
}
