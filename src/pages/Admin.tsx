import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  Home,
  CreditCard,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: BedDouble, label: "Rooms", href: "/admin/rooms" },
  { icon: Calendar, label: "Reservations", href: "/admin/reservations" },
  { icon: Users, label: "Guests", href: "/admin/guests" },
  { icon: CreditCard, label: "Billing", href: "/admin/billing" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const stats = [
  { label: "Total Bookings", value: "1,284", change: "+12.5%", positive: true },
  { label: "Occupancy Rate", value: "78%", change: "+5.2%", positive: true },
  { label: "Revenue", value: "$142,500", change: "+18.3%", positive: true },
  { label: "Avg. Daily Rate", value: "$385", change: "-2.1%", positive: false },
];

const recentBookings = [
  { id: "BK001", guest: "Eleanor Martinez", room: "Presidential Suite", checkIn: "Dec 10", status: "Confirmed" },
  { id: "BK002", guest: "James Wilson", room: "Executive Suite", checkIn: "Dec 11", status: "Pending" },
  { id: "BK003", guest: "Sophie Chen", room: "Deluxe Room", checkIn: "Dec 12", status: "Confirmed" },
  { id: "BK004", guest: "Michael Brown", room: "Junior Suite", checkIn: "Dec 12", status: "Confirmed" },
];

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="text-xl font-display font-medium text-sidebar-foreground">
                Royal Vellora
              </span>
            </Link>
            <span className="text-[10px] tracking-[0.3em] uppercase text-sidebar-foreground/60">
              Admin Panel
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                  location.pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
            >
              <Home className="w-5 h-5" />
              View Website
            </Link>
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors w-full">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search guests, bookings..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">AD</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-display font-medium mb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening at Royal Vellora Inn.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold mb-1">{stat.value}</p>
                <span
                  className={cn(
                    "text-xs font-medium",
                    stat.positive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {stat.change} from last month
                </span>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-card rounded-lg border border-border">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-medium text-lg">
                Recent Bookings
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      Booking ID
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      Guest
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      Room
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      Check-in
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-border last:border-0 hover:bg-muted/50"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 text-sm">{booking.guest}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {booking.room}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {booking.checkIn}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex px-2 py-1 text-xs font-medium rounded-full",
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          )}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Placeholder Modules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  New Booking
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Users className="w-4 h-4" />
                  Add Guest
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <BedDouble className="w-4 h-4" />
                  Room Status
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Reports
                </Button>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-medium mb-4">Room Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Deluxe Rooms</span>
                  <span className="text-sm text-muted-foreground">8/10 available</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[80%]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Executive Suites</span>
                  <span className="text-sm text-muted-foreground">3/5 available</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[60%]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Presidential Suite</span>
                  <span className="text-sm text-muted-foreground">1/1 available</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
